import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import "./checkout.css"
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const userId = localStorage.getItem('userId');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

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
                const total = response.data.cartItems.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.productId.price * currentItem.quantity;
                }, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handlePlaceOrder = async () => {
        // Logic to place order
    };
    const backToCart = () => {
        navigate("/cart")
    }

    return (
        <div className="checkout-container">

            <button className="backtocart" onClick={backToCart}>Back to cart</button>
            <h2>Checkout</h2>

            <div className="address">
                <h1> 1.Delivery address</h1>

                <div>
                    <textarea
                        className="address-input"
                        placeholder="Enter your address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>
            <div className="payment">
                <h2>2.Payment method</h2>
                <select
                    className="payment-method-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            <div className="cart-items">
                <div>
                    <h1>3.Review items and delivery</h1>
                </div>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.productId.imageUrl} alt="Product" className="product-image" />
                        <div>
                            <p>{item.productId.name}</p>
                            <p>Price: {item.productId.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
                <span> Order Total : ₹3545.00 By placing your order, you agree to Musicart privacy notice and conditions of use.  </span>
            </div>


            <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Total Items: {cartItems.length}</p>
                <p>Total Amount: ₹{totalPrice}</p>
            </div>
            <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default CheckOut;
