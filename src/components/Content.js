import React, { Component } from "react"
import products from "../utils/contentData"
import Button from "./Button"

class Content extends Component {
    render() {
        return (
            <div className="containers">
                <h1 className="title">Pizza 42 POC</h1>
                <p className="description">Hungry for a Jumbo Slice? The Best Jumbo Slice in Your Town!</p>
                <main className="mains">
                    <ul className="grid">
                        {products.map((product, i) => {
                            const { link, title, image, description, price } = product
                            return (
                                <li key={i} className="card">
                                    <a href={link}>
                                        <img src={image} alt={title} />
                                        <br />
                                        <h3> {title}</h3>

                                        <p> {price}</p>
                                    </a>
                                    <p>
                                        <Button />
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
}

export default Content
