/**
 * cart.tsx - Cart context for Integrity Chimney shop.
 *
 * Persists cart state to localStorage and exposes drawer-open helpers.
 * Pricing is stored in cents at the data layer (per Pro-tier scaffold rules).
 *
 * If the client later upgrades to Premium and adds STRIPE_SECRET_KEY +
 * PRINTFUL_API_KEY env vars, this provider needs no changes - only the
 * checkout API route flips from demo to live.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "integrity-cart-v1";

export interface CartItem {
  /** Cart line ID - variant ID when a variant is chosen, else product ID. */
  id: string;
  /** Display name including variant detail (e.g. "Standard Tee - Black / L"). */
  name: string;
  /** Unit price in cents. */
  price: number;
  /** Quantity of this line. */
  quantity: number;
  /** Optional preview image (relative or absolute URL). */
  image?: string;
  /** Optional variant ID - used by Stripe + Printful when wired live. */
  variantId?: string;
  /** Optional descriptors for drawer display. */
  size?: string;
  color?: string;
  category?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  /** Subtotal in cents. */
  subtotal: number;
  /** Total quantity across all lines. */
  itemCount: number;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Storage may be blocked (Safari private mode). Silent fallback.
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never overwrite saved cart with [] on mount.
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((incoming) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === incoming.id);
      if (existing) {
        return prev.map((line) =>
          line.id === incoming.id
            ? {
                ...line,
                quantity: line.quantity + (incoming.quantity ?? 1),
              }
            : line,
        );
      }
      return [
        ...prev,
        { ...incoming, quantity: incoming.quantity ?? 1 } as CartItem,
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback<CartContextValue["removeItem"]>((id) => {
    setItems((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    (id, qty) => {
      if (qty <= 0) {
        setItems((prev) => prev.filter((line) => line.id !== id));
        return;
      }
      setItems((prev) =>
        prev.map((line) => (line.id === id ? { ...line, quantity: qty } : line)),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isOpen,
    openDrawer,
    closeDrawer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}

/** Format a cents-denominated price as a USD string ($XX.XX). */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
