import React, { useEffect, useState } from "react";
import {Button, Col, Form, ListGroup, Image, Row} from 'react-bootstrap';
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
    const {state:{cart}, dispatch } = CartState();

    const [total, setTotal] = useState();

    useEffect(() => {
      setTotal(cart.reduce((accum,current)=>(accum+Number(current.price))*current.qty,0));
    }, [cart]);
    
    return <div className="home">
        <div className="productContainer">
            <ListGroup>
                {
                cart.map(prod=> (
                    <ListGroup.Item key = {prod.uuid}>
                        <Row>
                        <Col md={2}><Image src = {prod.image} alt={prod.name} fluid rounded /> </Col>
                            <Col md={2}><span> {prod.name} </span> </Col>
                            <Col md={2}><span> $ {prod.price} </span> </Col>
                            <Col md={3}><Rating rating={prod.ratings}/> </Col>
                            <Col md={1}> 
                                <Form.Control as="select" value = {prod.qty} 
                                    onChange={(e)=> dispatch({
                                            type:"CHANGE_QTY",
                                            payload: {
                                                uuid: prod.uuid,
                                                qty: e.target.value,
                                            },
                                        })}>
                                {[...Array(prod.inStock).keys()].map((x)=>(
                                    <option key = {x+1}>
                                        {x+1}
                                    </option>
                                )
                            )}
                                </Form.Control> 
                            </Col>
                            <Col md={1} >
                            <AiFillDelete
                                        fontSize='20px'
                                        style={{cursor:"pointer"}}
                                        onClick={()=> dispatch({
                                            type:"REMOVE_FROM_CART",
                                            payload: prod,
                                        })}/>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )) }
            </ListGroup>
        </div>
        <div className="filters summary">
            <span className="title">
                    Subtotal ({cart.length}) items
            </span>
            <span style = {{fontWeight:700, fontSize:20}} >
                    Total $ {total}
            </span>
            <Button type="button" disabled={cart.length===0} >
                    Go to Checkout
            </Button>

        </div>
    </div>
};

export default Cart ;