import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import "./cart.css";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get(`${baseUrl}/cart/all/${userId}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                console.log(response.data.cartItems)

                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Cart Items</h2>
            <ul className="cart-list">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <div>
                            <img src={item.productId.imageUrl} alt="" />
                        </div>
                         <div>{item.productId.name}</div> 
                        <div>{item.productId.color}</div> 
                       <div>Quantity: {item.quantity}</div>
                    </li>
                ))}
            </ul>
            <div className='checkout-button'>
                <Link to={"/checkout"}>
                PLACE ORDER
                </Link>
            </div>


        </div>
    );
};

export default Cart;
