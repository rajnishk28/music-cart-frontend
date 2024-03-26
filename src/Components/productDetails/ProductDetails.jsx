import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api';
import "./productdetails.css";
import Header from '../Header/Header';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate=useNavigate();

    const token =localStorage.getItem("token");
    

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/product/getone/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
    }, [id]);

    const addToCart = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                // Handle case when token is not available
                navigate("/login");
                console.error('Token not found');
                return;
            }
            
            // Make API call to add item to cart
            const response = await axios.post(`${baseUrl}/cart/add`, {
                productId: id,
                quantity: 1, 
            }, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            
            // Handle response as needed
            console.log('Item added to cart:', response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
const handleGoBack =()=>{
    navigate("/home")
}
    return (
        <>
            <Nav className="Navbar"/>
            <Header className="Header-container"/>
            <section>

                <button className='back-button' onClick={handleGoBack}>Back to products</button>

                <div className="product-details-container">

                    <div className="product-images-container">
                        <div className="product-img">

                        {product && (
                            <img src={product.imageUrl}  />
                        )}
                        </div>
                        
                    </div>

                    <div className="product-description">
                        {product && (
                            <>
                                <p className="product-title">{product.company} {product.name}</p>
                                <div className="product-rating">
                                    <div className="star-rating">
                                        {[...Array(product.rating)].map((star, index) => (
                                            <span key={index}>★</span>
                                        ))}
                                    </div>
                                </div>

                                <p className="product-price">Price: {product.price}</p>
                                <p className="product-price">{product.color} | {product.headphone_type}</p>
                                <p>{product.description}</p>
                                <p> Available - In stock</p>
                                <p> Brand- {product.company}</p>
                                <div className="action-buttons">
                                    <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
                                    <button className="buy-now-btn">Buy Now</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
