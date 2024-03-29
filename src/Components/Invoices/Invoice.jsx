import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import "./invoices.css";
import baseUrl from '../../api';

const Invoice = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get(`${baseUrl}/checkout/getall`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                setInvoices(response.data);
                console.log('Invoices:', response.data)
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div className="invoices-container">
            <h2>Invoices</h2>
            <div className="invoice-list">
                {invoices.map((invoice, index) => (
                    <Link key={index} to={`/test/${invoice._id}`} className="invoice-item"> {/* Link wraps around each invoice item */}
                        <p>Invoice ID: {invoice._id}</p>
                        <p>Total Price: {invoice.totalPrice}</p>
                        {/* Render other invoice details */}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Invoice;
