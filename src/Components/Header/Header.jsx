import React, { useEffect, useState } from 'react'
import { faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import "./header.css"
import baseUrl from '../../api';
import axios from 'axios';

const Header = () => {
    const [profileVisible, setProfileVisible] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    let currentPath = window.location.pathname.split('/')[1];
    const token = localStorage.getItem("token");
   

    const toggleProfile = () => {
        setProfileVisible(!profileVisible);
    };


    useEffect(() => {
        axios.get(`${baseUrl}/cart/count`, {
            headers: {
                Authorization: `${token}`,
            },
        }).then((response) => {
            // console.log(response)
            setCartItemCount(response.data.count);
        })
    }, [cartItemCount]);


    return (
        <div className='header'>
            <section>
                <div className='Head'>
                    <div className='Head-content'>
                        <div>
                            <img src="src/assets/image 4.png" alt="" />
                        </div>
                        <div>Musicart </div>

                        <div className='curentPath'>{`${currentPath}`}
                        
                        {(token && currentPath == "home") ? <Link to={"/invoice"}>invoice</Link> : null}
                        </div>

                        
                    </div>

                    <div className="rightHead">
                        <div className='cart-box'>
                            <a href="/cart"> <FontAwesomeIcon icon={faShoppingCart} />View Cart {cartItemCount}</a>
                        </div>


                    </div>
                </div>

            </section>
        </div>
    )
}

export default Header