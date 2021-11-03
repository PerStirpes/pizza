import React from "react"

import Content from "../components/Content"
import { CartContext, useCartState } from "../utils/use-cart"

const Home = () => {
    const cart = useCartState()
    return (
        <CartContext.Provider value={cart}>
            <Content />
        </CartContext.Provider>
    )
}

export default Home
