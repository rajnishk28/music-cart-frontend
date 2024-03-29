import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.get(`${baseUrl}/checkout/getone/${id}`, {
          headers: {
            Authorization: `${token}` 
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch invoice details');
        }

        setInvoice(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchInvoice();

    // Cleanup function to cancel any ongoing requests if the component unmounts
    return () => {
      // Cleanup logic if needed
    };
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div>
      <h2>Invoice Details</h2>
      <div>
        <p>Invoice ID: {invoice.id}</p>
        {/* Display other invoice details */}
      </div>
    </div>
  );
}

export default InvoiceDetails;
