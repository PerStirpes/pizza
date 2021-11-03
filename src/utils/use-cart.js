import { useState, createContext, useContext, useEffect } from "react"
import products from "./contentData"

const defaultCart = {
    products: {},
}

export const CartContext = createContext()

export function useCartState() {
    const [cart, updateCart] = useState(defaultCart)

    useEffect(() => {
        const stateFromStorage = window.localStorage.getItem("pizza_cart")
        const data = stateFromStorage && JSON.parse(stateFromStorage)
        if (data) {
            updateCart(data)
        }
    }, [])

    useEffect(() => {
        const data = JSON.stringify(cart)
        window.localStorage.setItem("pizza_cart", data)
    }, [cart])

    const cartItems = Object.keys(cart.products).map((key) => {
        const product = products.find(({ id }) => `${id}` === `${key}`)
        return {
            ...cart.products[key],
            pricePerUnit: product.price,
        }
    })

    const subtotal = cartItems.reduce((acc, { pricePerUnit, quantity }) => {
        return acc + pricePerUnit * quantity
    }, 0)

    const quantity = cartItems.reduce((acc, { quantity }) => {
        return acc + quantity
    }, 0)

    function addToCart({ id }) {
        updateCart((prev) => {
            let cart = { ...prev }

            if (cart.products[id]) {
                cart.products[id].quantity = cart.products[id].quantity + 1
            } else {
                cart.products[id] = {
                    id,
                    quantity: 1,
                }
            }

            return cart
        })
    }

    return {
        cart,
        cartItems,
        subtotal,
        quantity,
        addToCart,
    }
}

export function useCart() {
    const cart = useContext(CartContext)
    return cart
}
