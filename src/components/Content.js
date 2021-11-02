import React, { Component } from "react"

// import { Row, Col } from "reactstrap"

import products from "../utils/contentData"

class Content extends Component {
    render() {
        return (
            <ul>
                <h2 className="title">Hungry for a Jumbo Slice</h2>
                <li className="grid">
                    {products.map((product, i) => {
                        const { link, title, image, description, price } = product
                        return (
                            <li key={i} className="card">
                                <a href={link}>
                                    <img src={image} />
                                    <br />
                                    <h3> {title}</h3>

                                    <p> {price}</p>
                                </a>

                                <p>{description}</p>
                            </li>
                        )
                    })}
                </li>
            </ul>
        )
    }
}

export default Content
