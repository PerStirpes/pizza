import React from "react"

import { useCartState } from "../utils/use-cart"
import products from "../utils/contentData"
import Table from "../components/Table"
import { Button } from "reactstrap"
import { useAuth0 } from "@auth0/auth0-react"

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
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
    console.log("user", user)

    function clearStorage() {
        if (user.email_verified === true) {
            window.localStorage.clear()
            alert("Order Placed")
            logout()
        } else {
            alert("Please Verify Your Email Address")
        }
    }

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
                    {!isAuthenticated && (
                        <Button
                            id="qsLoginBtn"
                            color="primary"
                            className="btn-margin"
                            onClick={() => loginWithRedirect()}
                        >
                            Log in to checkout
                        </Button>
                    )}
                    {isAuthenticated && (
                        <Button id="qsLoginBtn" color="primary" className="btn-margin" onClick={() => clearStorage()}>
                            Place Pizza Order
                        </Button>
                    )}
                </p>
            </main>
        </div>
    )
}
