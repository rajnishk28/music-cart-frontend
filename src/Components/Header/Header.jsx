import React, { useEffect ,useState} from 'react'
import "./header.css"

const Header = () => {
    const [profileVisible, setProfileVisible] = useState(false);
    const currentPath = window.location.pathname;

    const toggleProfile = () => {
        setProfileVisible(!profileVisible);
    };
    return (
        <div>
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
                            <a href="/cart">View Cart</a>
                        </div>

                        <div className={`profile ${profileVisible ? 'active' : ''}`} onClick={toggleProfile}>
                            Name
                            <div className="hoverbox">
                                <div className="content">
                                    <div>Rajnish Kumar</div>
                                    <div>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    )
}

export default Header