import React from "react"
import { useCart } from "../utils/use-cart"

const Button = () => {
    const { addToCart } = useCart()
    return (
        <button
            className="button"
            onClick={() => {
                addToCart({ id })
            }}
        >
            Order Now
        </button>
    )
}

export default Button
