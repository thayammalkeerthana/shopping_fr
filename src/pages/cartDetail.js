import React from 'react'

const CartDetail=()=>{
    return(
        <div className="container-fluid">
        <div className="row">
          {/* Left side - Product Image */}
          <div className="col-md-6 p-2">
            <img
              src="./shoooping_home_page_img_2.png" 
              alt="Product"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
  
          {/* Right side - Product Details */}
          <div className="col-md-6 mt-4">
            <div>
              <h3>Product Name</h3>
              <p>Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Price: $19.99</p>
              <p>Quantity: 1</p>

              <button className="btn btn-danger">Remove from Cart</button>
            </div>
          </div>
        </div>
      </div>
    )
}
export default CartDetail

