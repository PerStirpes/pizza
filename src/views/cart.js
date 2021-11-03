import React from "react"

import { useCartState } from "../utils/use-cart"
import products from "../utils/contentData"
import Table from "../components/Table"

const columns = [
    {
        columnId: "title",
        Header: "Product Name",
    },
    {
        columnId: "quantity",
        Header: "Quantity",
    },
    {
        columnId: "pricePerUnit",
        Header: "Price Per Item",
    },
    {
        columnId: "total",
        Header: "Item Total",
    },
]

export default function Home() {
    const { cartItems } = useCartState()

    const data = cartItems.map(({ id, quantity, pricePerUnit }) => {
        const product = products.find(({ id: pid }) => pid === id)
        const { title } = product || {}
        return {
            id,
            title,
            quantity,
            pricePerUnit: pricePerUnit.toFixed(2),
            total: (quantity * pricePerUnit).toFixed(2),
        }
    })

    return (
        <div className="container">
            <main className="mains">
                <h1 className="title">Pizza Order Cart </h1>

                <Table className="table" data={data} columns={columns} />

                <p className="checkout">
                    <button className="button" onClick={console.log("checkout button")}>
                        Check Out
                    </button>
                </p>
            </main>
        </div>
    )
}
