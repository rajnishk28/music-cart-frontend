import React, { useEffect ,useState} from 'react'
import { faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./header.css"

const Header = () => {
    const [profileVisible, setProfileVisible] = useState(false);
    const currentPath = window.location.pathname;

    const toggleProfile = () => {
        setProfileVisible(!profileVisible);
    };
    return (
        <div className='header'>
            <section>
                <div className='Head'>
                    <div className='Head-content'>
                        <div>
                            <img src="src/assets/image 4.png" alt="" />
                        </div>
                        <div>Musicart </div>

                        <div className='curentPath'>{`${currentPath}`}</div>
                    </div>

                    <div className="rightHead">
                        <div className='cart-box'>
                            <a href="/cart"> <FontAwesomeIcon icon={faShoppingCart} />View Cart</a>
                        </div>


                    </div>
                </div>

            </section>
        </div>
    )
}

export default Header