import React, { useEffect } from 'react'
import "./product.css"
import Nav from '../Nav/Nav'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [headPhoneType, setHeadPhoneType] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [colorType, setColorType] = useState('');
  const [price, setPrice] = useState('');
  const [sortByPrice, SetsortByPrice] = useState('');
  const [layout, setLayout] = useState('grid');

  const currentPath = window.location.pathname;


  useEffect(() => {
    axios.get('https://fakestoreapi.com/products',).then((res) => {
      setProducts(res.data);
      // console.log(res.data);
    }).catch((err) => {
      console.log(err)
    });
  })

  // console.log(headPhoneType, companyType, colorType, price, sortByPrice);
  const toggleLayout = (layoutType) => {
    setLayout(layoutType);
    console.log(layoutType);
  };


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
            <div><a href="/cart">View Cart</a></div>
            <div> name</div>
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
            <input type="text" placeholder='Search by Product Name' />
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
            <div className='button-box'>
              <select onChange={(e) => { setHeadPhoneType(e.target.value) }}>
                <option value="">Headphone type</option>
                <option value="In-ear headphone">In-ear headphone</option>
                <option value="On-ear headphone">On-ear headphone</option>
                <option value="Over-ear headphone">Over-ear headphone</option>
              </select>
            </div>
            <div className='button-box'>
              <select onChange={(e) => { setCompanyType(e.target.value) }}>
                <option value="">Company</option>
                <option value="JBL">JBL</option>
                <option value="Apple">Apple</option>
                <option value="Sony">Sony</option>
              </select>
            </div>
            <div className='button-box'>
              <select onChange={(e) => { setColorType(e.target.value) }} >
                <option value="">Colour</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
              </select>
            </div>
            <div className='button-box'>
              <select onChange={(e) => { setPrice(e.target.value) }}>
                <option value="">Price</option>
                <option value="₹0 - ₹1,000">₹0 - ₹1,000</option>
                <option value="₹1,000 - ₹10,000">₹1,000 - ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
              </select>
            </div>
            <div className='button-box'>
              <select onChange={(e) => { SetsortByPrice(e.target.value) }}>
                <option value="">Sort by : Featured</option>
                <option value="Price : Lowest">Price : Lowest</option>
                <option value="Price : Highest">Price : Highest</option>
                <option value="A-Z">Name : (A-Z)</option>
                <option value="Z-A">Name : (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      {/* section 2 Ends here */}

      <section>
       
        <div className={` ${layout === 'grid' ? 'grid-view' : 'list-view'}`}>
          {products.map((product) => (
            <div className={`${layout === 'grid' ? 'grid-item' : 'list-item'}`} key={product.id}>
              <img src={product.image} alt="" />
              <div>
                {/* <div>
                   <img src="src\assets\cart.png" className='cart-image' />
                   </div> */}
                <p className='list-title'> <strong>{product.title}</strong> </p>
                <span className='list-price'>Price - {product.price}</span>
                <p className='list-category'>{product.category}</p>
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