import React, { Component } from "react"

import { Row, Col } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import products from "../utils/contentData"
// import products from "../products.json"

class Content extends Component {
    render() {
        return (
            <div className="next-steps my-5">
                <h2 className="my-5 text-center">Hungry for a Jumbo Slice</h2>
                <Row className="d-flex justify-content-between">
                    {products.map((product, i) => {
                        const { link, title, image, description, price } = product
                        return (
                            <Col key={i} md={5} className="mb-4">
                                <h6 className="mb-3">
                                    <img src={image} />
                                    <a href={link}>
                                        <FontAwesomeIcon icon="link" className="mr-2" />
                                        {title}
                                    </a>
                                    {price}
                                </h6>
                                <p>{description}</p>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}

export default Content
