import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import './cart.css'; // Renamed to Cart.css
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state
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

                setCartItems(response.data.cartItems);

                // Calculate total price
                let total = 0;
                response.data.cartItems.forEach(item => {
                    total += item.productId.price * item.quantity;
                });
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const calculateTotalAmount = () => {
        const discount = 0;
        const convenienceFee = 45;
        let total = 0;
        cartItems.forEach(item => {
            total += item.productId.price * item.quantity;
        });
        const totalPriceWithFee = total + convenienceFee - discount;
        return totalPriceWithFee.toFixed(3); // Round to 3 decimal places
    };

    const handleQuantityChange = (index, event) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = parseInt(event.target.value);
        setCartItems(updatedCartItems);

        // Recalculate total price
        let total = 0;
        updatedCartItems.forEach(item => {
            total += item.productId.price * item.quantity;
        });
        setTotalPrice(total);
    };

    return (
        <>
        <Nav/>
            <Header />
            <div className="cart-container">
                <div className="left-cart-container">
                    <h2 className="cart-title">Cart Items</h2>
                    <div className="left-cart">
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <div>
                                        <img src={item.productId.imageUrl} alt="" />
                                    </div>
                                    <div>
                                        <div>{item.productId.name}</div>
                                        <div>Color: {item.productId.color}</div>
                                    </div>
                                    <div>Price: ₹{item.productId.price}</div>
                                    <div className='quantity'>
                                        <div>Quantity</div>
                                        <select value={item.quantity} onChange={(event) => handleQuantityChange(index, event)}>
                                            {Array.from({ length: 8 }, (_, index) => (
                                                <option key={index + 1} value={index + 1} disabled={index + 1 > 8}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='right-cart'>
                    <div className="cart-price">
                        <div>PRICE DETAILS</div>
                        <div>Total MRP: ₹{totalPrice.toFixed(3)}</div> {/* Display total price */}
                        <div>Discount on MRP: ₹{0}</div> {/* Display discount amount */}
                        <div>Convenience Fee: ₹{45}</div> {/* Display convenience fee */}
                        <div>Total Amount: ₹{calculateTotalAmount()}</div> {/* Display total amount */}
                        <Link to={"/checkout"}>
                            PLACE ORDER
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;