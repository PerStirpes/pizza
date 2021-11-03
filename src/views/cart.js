import React, { useState } from "react"
import { getConfig } from "../config"
import { useCartState } from "../utils/use-cart"
import products from "../utils/contentData"
import Table from "../components/Table"
import { Button } from "reactstrap"
import { useAuth0 } from "@auth0/auth0-react"
import Highlight from "../components/Highlight"

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
    const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0()

    const { apiOrigin = "http://localhost:3001", audience } = getConfig()

    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
    })

    const placeOrder = async () => {
        console.log("user", user)
        console.log("user.sub", user.sub)
        if (user.email_verified === true) {
            try {
                const token = await getAccessTokenSilently()

                const response = await fetch(`${apiOrigin}/api/external`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const responseData = await response.json()

                setState({
                    ...state,
                    showResult: true,
                    apiMessage: responseData,
                })
                window.localStorage.clear()
                alert("Order Placed")
                // logout({ returnTo: window.location.origin })
            } catch (error) {
                setState({
                    ...state,
                    error: error.error,
                })
            }
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
    console.log("this is the data", data)

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
                        <Button id="qsLoginBtn" color="primary" className="btn-margin" onClick={placeOrder}>
                            Place Pizza Order
                        </Button>
                    )}
                </p>
            </main>
            <div className="result-block-container">
                {state.showResult && (
                    <div className="result-block" data-testid="api-result">
                        <h6 className="muted">Result</h6>

                        <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
