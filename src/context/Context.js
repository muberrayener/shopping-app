import React, { useContext,useReducer } from "react";
import { createContext } from "react";
import { faker } from '@faker-js/faker';
import {cartReducer, productReducer} from './Reducers';

const Cart =createContext();
faker.seed(42);
const Context = ({children}) => {
    const products = Array(20).fill().map(()=> ({
        uuid: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.avatar(),
        inStock: faker.helpers.arrayElement([0,1,3,4,7,9]),
        fastDelivery: faker.datatype.boolean(),
        ratings : faker.helpers.arrayElement([1,2,3,4,5])
    }))

    const[state,dispatch] = useReducer(cartReducer, {
        products:products, cart:[]
    });

    const[productState, productDispatch] = useReducer(productReducer, {
        byStock:false, byRating:0, search:"", byFastDelivery:false,
    });

    return <Cart.Provider value= {{state, dispatch, productState ,productDispatch}}> {children} </Cart.Provider>;
};

export const CartState = () => {

    return useContext(Cart);
};

export default Context;