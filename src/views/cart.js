import React, { useState } from "react"
import { useCartState } from "../utils/use-cart"
import products from "../utils/contentData"
import Table from "../components/Table"
import { Button, Row } from "reactstrap"
import { useAuth0 } from "@auth0/auth0-react"
import Highlight from "../components/Highlight"
// import { useHistory } from "react-router-dom"

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

export default function Cart() {
    const { cartItems } = useCartState()
    const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0()

    const domain = "https://dev-9z9cjf70.auth0.com/api/v2/"
    // let history = useHistory()

    // // Call in the click handler
    // function handleClick() {
    //     history.push("/profile")
    //     window.localStorage.clear()
    // }

    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
        data: {},
        order: "",
    })

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

    const placeOrder = async () => {
        if (user?.email_verified === true && user.email_verified !== undefined) {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: domain,
                    scope: "read:current_user read:users update:users read:users_app_metadata update:users_app_metadata create:users_app_metadata",
                })
                const userDetailsByIdUrl = `${domain}users/${user.sub}`

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                const { user_metadata } = await metadataResponse.json()
                const { orders } = user_metadata
                console.log("user metadata", user_metadata)
                console.log("ORDERS", orders)

                const pizzaOrder = {
                    user_metadata: {
                        orders: {
                            orderTimeStamp: new Date(),
                            data,
                            orders,
                        },
                    },
                }

                const requestOptions = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(pizzaOrder),
                }

                const orderingPizza = await fetch(`${domain}users/${user.sub}`, requestOptions)
                const responseDataorderingPizza = await orderingPizza.json()
                setState({
                    ...state,
                    showResult: true,
                    apiMessage: responseDataorderingPizza,
                })
                window.localStorage.clear()
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
                <Row>
                    {state.showResult && (
                        <div className="result-block" data-testid="api-result">
                            <h6 className="muted">Result</h6>

                            <Highlight>
                                {" "}
                                <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
                            </Highlight>
                        </div>
                    )}
                </Row>
            </div>
        </div>
    )
}
