import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

interface CartStore {
    items: CartItem[]
    pendingOrders: number
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    createOrder: (email: string) => Promise<any>
    clearNotifications: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            pendingOrders: 0,
            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id)
                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    }
                }
                return { items: [...state.items, { ...item, quantity: 1 }] }
            }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                const items = get().items
                return items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
            createOrder: async (email: string) => {
                // Mock order creation for now
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Clear cart and increment pending orders after successful order
                set((state) => ({ pendingOrders: state.pendingOrders + 1 }));
                get().clearCart();

                return { id: 'mock-order-id', status: 'created' };
            },
            clearNotifications: () => set({ pendingOrders: 0 }),
        }),
        {
            name: 'cart-storage',
        }
    )
)
