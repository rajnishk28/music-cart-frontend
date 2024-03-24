import React, { useEffect } from 'react'
import "./product.css"
import Nav from '../Nav/Nav'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import baseUrl from "../../api"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [headPhoneType, setHeadPhoneType] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [colorType, setColorType] = useState('');
  const [price, setPrice] = useState('');
  const [sortBy, SetsortBy] = useState('');
  const [search, setSearch] = useState("")
  const [layout, setLayout] = useState('grid');
  const [profileVisible, setProfileVisible] = useState(false);

  const currentPath = window.location.pathname;
  const navigate=useNavigate();


  useEffect(() => {
    axios.get(`${baseUrl}/product/getall?name=${search}&&color=${colorType}&&company=${companyType}&&headphone_type=${headPhoneType}&&sortBy=${sortBy}`).then((res) => {
      setProducts(res.data.products);
      // console.log(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }, [search, colorType, companyType, headPhoneType, sortBy]);

  const toggleLayout = (layoutType) => {
    setLayout(layoutType);
    // console.log(layoutType);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    //  console.log(search)
  }

  const toggleProfile = () => {
    setProfileVisible(!profileVisible);
  };

  const handleNavigate =(id)=>{
    console.log(id);
    navigate(`/product/${id}`)
  }

  return (
    <>
      <Nav />

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
      
      <section>
        <div className='banner'>
          <div className='banner-content'>
            <p>Grab upto 50% off on Selected headphones</p>
            <img className='banner-image' src="src\assets\bannerimg.png" alt="" />
          </div>
        </div>

      </section>
      {/* section 2 starts here */}
      <section>
        <div className='section-2'>
          <div className='search-box'>
            <img src="src\assets\search.png" alt="" />
            <input type="text" placeholder='Search by Product Name' onChange={handleSearch} />
          </div>

          <div className='all-buttons'>
            <div className='button-box' onClick={() => toggleLayout('grid')}>
              <span className='grid-list-button'>
                <img src="src\assets\gridButton.png" />

              </span>
            </div>
            <div className='button-box' onClick={() => toggleLayout('list')}>
              <span className='grid-list-button' >
                <img src="src\assets\listButton.png" />
                {/* list */}
              </span>
            </div>
            <div className='button-box headphone'>
              <select onChange={(e) => { setHeadPhoneType(e.target.value) }}>
                <option value="">Headphone type</option>
                <option value="in-Ear">In-ear headphone</option>
                <option value="On-ear">On-ear headphone</option>
                <option value="Over-ear">Over-ear headphone</option>
              </select>
            </div>
            <div className='button-box comapny'>
              <select onChange={(e) => { setCompanyType(e.target.value) }}>
                <option value="">Company</option>
                <option value="JBL">JBL</option>
                <option value="Apple">Apple</option>
                <option value="Sony">Sony</option>
                <option value="others">Others</option>
                <option value="boult">Boult</option>
                <option value="lg">Lg</option>
              </select>
            </div>
            <div className='button-box color'>
              <select onChange={(e) => { setColorType(e.target.value) }} >
                <option value="">Colour</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="pink">Pink</option>
                <option value="yellow">Yellow</option>
                <option value="white">White</option>
                <option value="brown">Brown</option>
              </select>
            </div>
            <div className='button-box price'>
              <select onChange={(e) => { setPrice(e.target.value) }}>
                <option value="">Price</option>
                <option value="₹0 - ₹1,000">₹0 - ₹1,000</option>
                <option value="₹1,000 - ₹10,000">₹1,000 - ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
              </select>
            </div>
            <div className='button-box'>
              <select onChange={(e) => { SetsortBy(e.target.value) }}>
                <option value="">Sort by : Featured</option>
                <option value="lowestPrice">Price : Lowest</option>
                <option value="highestPrice">Price : Highest</option>
                <option value="aToZ">Name : (A-Z)</option>
                <option value="zToA">Name : (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      {/* section 2 Ends here */}

      <section>

        <div className={` ${layout === 'grid' ? 'grid-view' : 'list-view'}`}>
          {products.map((product) => (
            <div className={`${layout === 'grid' ? 'grid-item' : 'list-item'}`} key={product._id}>
              <img src={product.imageUrl} alt="" onClick={()=>handleNavigate(product._id)} />
              <div>
                {/* <div>
                   <img src="src\assets\cart.png" className='cart-image' />
                   </div> */}
                <p className='list-title'> <strong>{product.name}</strong> </p>
                <p className='list-title'> <strong>{product.company}</strong> </p>
                <span className='list-price'>Price - {product.price}</span>
                <p className='list-category'>{product.color} | {product.headphone_type}</p>

                {layout === 'list' ? <Link to={`/products/${product.id}`} className='view-button'>Details</Link> : null}
              </div>
            </div>
          ))}
        </div>



      </section >
    </>
  )
}

export default Products