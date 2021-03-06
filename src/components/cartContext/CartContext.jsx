import React, { createContext, useState } from 'react';

export const contexto = createContext();

const CartContext = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, count) => {
        
        if (isInCart(product.id)) {

            setCart(
                cart.map((item) =>
                    item.item.id === product.id ? { ...item, count: item.count + count } : item
                )
            )

        } else {
            setCart([...cart, { item: product, count }])
        }
    }


    const isInCart = (id) => {
        return cart.some(element => element.item.id === id)
    }

    const clearCart=()=>{
        setCart([]);
    }

    const deleteItem = (id) =>{
        const cartActualizada = cart.filter( element => element.item.id !== id)
        setCart(cartActualizada);
    }

    const sumarTotalCart = () =>{
        return (cart.length > 0)?cart.map(item=>item.item.price*item.count).reduce((a,b)=>a+b) : 0;
    }

    return (
        <>
            <contexto.Provider value={{ cart, addToCart, clearCart, deleteItem,sumarTotalCart }}>
                {children}
            </contexto.Provider>
        </>
    );
};

export default CartContext;
