import React from "react"
import { Link } from "react-router-dom"

import products from "../utils/contentData"

import { useCart } from "../utils/use-cart.js"

export default function Content() {
    const { subtotal, quantity, addToCart } = useCart()

    return (
        <div className="containers">
            <h1 className="title">Pizza 42</h1>
            <p className="description">Hungry for a Jumbo Slice? The Best Jumbo Slice in Your Town!</p>
            <p className="description">
                <strong>Items:</strong> {quantity}
                <br />
                <strong>Total:</strong> ${subtotal.toFixed(2)}
                <br />
                <Link to="/cart">Check Out</Link>
            </p>
            <main className="mains">
                <ul className="grid">
                    {products.map((product, i) => {
                        const { id, link, title, image, description, price } = product
                        return (
                            <li key={i} className="card">
                                <a href={link}>
                                    <img src={image} alt={title} />
                                    <br />
                                    <h3> {title}</h3>

                                    <p>${price.toFixed(2)}</p>
                                </a>
                                <p>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            addToCart({ id })
                                        }}
                                    >
                                        Order Now
                                    </button>
                                </p>
                                <p>{description}</p>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </div>
    )
}
