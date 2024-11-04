import React from "react";
import { FormControl, Form, Navbar, Nav, Dropdown, Badge, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";

const Header = () => {
    const {state:{cart},
            dispatch, productDispatch
        } = CartState();

    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Container>
            <Navbar.Brand>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Shopping</Link>
            </Navbar.Brand>
                <Form className="d-flex">
                    <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="me-2" 
                        aria-label="Search"
                        onChange = {(e)=>{productDispatch( {
                            type:"FILTER_BY_SEARCH",
                            payload : e.target.value,
                        })}} 
                    />
                </Form>
                <Nav>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge> {cart.length} </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length>0 ? (
                                <>
                                {cart.map((prod)=>(
                                    <span className="cartitem" key={prod.uuid}>
                                        <img
                                        src={prod.image}
                                        className="cartItemImg"
                                        alt={prod.name} />
                                        <div className="cartItemDetail" >
                                            <span>
                                                {prod.name}
                                            </span>
                                            <span>
                                                $ {prod.price.split(".")[0] }
                                            </span>
                                        </div>
                                        <AiFillDelete
                                        fontSize='20px'
                                        style={{cursor:"pointer"}}
                                        onClick={()=> dispatch({
                                            type:"REMOVE_FROM_CART",
                                            payload: prod,
                                        })}/>
                                    </span>
                                ))}
                                <Link to= "/cart">
                                    <Button style={{width:"95%", margin:"0 10px"}}>
                                        Go to Cart
                                    </Button>
                                </Link>
                                </>
                            ):(<span style={{ padding: 10 }}>Cart is Empty!</span>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;