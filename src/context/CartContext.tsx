import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Medicine, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (medicine: Medicine | any) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (medicine: Medicine | any) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === medicine.id || (item.medicine && item.medicine.id === medicine.id));
            if (existingItem) {
                return prevItems.map(item =>
                    (item.id === medicine.id || (item.medicine && item.medicine.id === medicine.id))
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Handle both structures if needed, but standardize on CartItem
            const newItem: CartItem = {
                id: medicine.id, // For simple cart structure where id is medicine id
                medicine: medicine as Medicine,
                quantity: 1
            };
            // Or if CartItem is id, name, price...
            return [...prevItems, {
                id: medicine.id,
                name: medicine.name,
                price: medicine.price,
                quantity: 1,
                image: medicine.image,
                // Keep structure consistent with what Cart.tsx expects
                medicine: medicine as Medicine
            } as any];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        // Handle both potential structures during migration
        const price = item.price || (item.medicine ? item.medicine.price : 0);
        return total + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
