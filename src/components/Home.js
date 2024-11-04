import React from 'react';
import {CartState} from '../context/Context'
import {SingleProduct} from './SingleProduct'
import './styles.css'
import Filters from './Filters';

const Home = () => {
    const {state: {products}, productState:{byStock, byRating, sort, byFastDelivery,search}} = CartState();

    const transformProducts = () => {
        let sortedProducts = products;

        if (sort){
            sortedProducts = sortedProducts.sort((a,b)=> (sort==="lowToHigh" ? a.price-b.price : b.price-a.price));
        }

        if (!byStock){
            sortedProducts = sortedProducts.filter((prod)=>prod.inStock);
        }

        if (byFastDelivery){
            sortedProducts = sortedProducts.filter((prod)=>prod.fastDelivery);
        }

        if (byRating){
            sortedProducts = sortedProducts.filter((prod)=>prod.ratings >= byRating);
        }

        if (search){
            const lowercasedSearch = search.toLowerCase(); 
            sortedProducts = sortedProducts.filter(
                (prod) =>prod.name.toLowerCase().includes(lowercasedSearch));
        }

        return sortedProducts;
    }
    
    return  <div className="home">
    <Filters/>
    <div className="productContainer">
    {transformProducts().map((prod)=>{
         return <SingleProduct prod = {prod} key = {prod.uuid} />;
    })};
    </div>
    </div> 
};

export default Home;