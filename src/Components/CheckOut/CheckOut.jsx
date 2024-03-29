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
        try {
            if (!address || !paymentMethod) {
                console.log('Address or payment method not provided');
                return;
            }
            if (cartItems.length === 0) {
                console.log('Cart is empty');
                return;
            }
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const checkoutData = {

                items: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                totalPrice: totalPrice,
                customerName: 'John Doe',
                shippingAddress: address,
                paymentMethod: paymentMethod,
                status: 'Pending'
            };

            const response = await axios.post(`${baseUrl}/checkout/create`, checkoutData, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            console.log('Order placed successfully:', response.data);
            setCartItems([]);
            navigate("/success")

        } catch (error) {
            console.error('Error placing order:', error);

        }
    };


    const backToCart = () => {
        navigate("/cart")
    }

    // State to track which image's additional information is currently displayed
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    return (
        <div className="checkout-container">

            <div className="left-container">
                <h2>Checkout</h2>
                <button className="backtocart" onClick={backToCart}>Back to cart</button>

                <div className="address">
                    <h3>Delivery address</h3>
                    <textarea
                        className="address-input"
                        placeholder="Enter your address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="payment">
                    <h3>Payment method</h3>
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

                    <div className="carthead">
                        <h3>Review items and delivery</h3>
                    </div>

                    {cartItems.map((item, index) => (
                        <>

                            <div key={index}
                                className="product-image-container"
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img src={item.productId.imageUrl} alt="Product" className="product-image" />
                            </div>

                            {selectedImageIndex === index && (
                                <div className="product-info">
                                    <p>{item.productId.name}</p>
                                    <p>Company: {item.productId.company}</p>
                                    <p>Price: {item.productId.price}</p>
                                </div>
                            )}
                        </>
                    ))}
                </div>

                {/* <div>
                    <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
                    <span>Order Total: ₹{totalPrice}. By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                </div> */}

            </div>

            <div className="right-container">
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Total Items: {cartItems.length}</p>
                    <p>Total Amount: ₹{totalPrice}</p>
                </div>
                <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
            </div>

        </div>
    );
};

export default CheckOut;
