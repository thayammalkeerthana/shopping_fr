import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartDetails } from '../redux/action'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const CartDetail = () => {
  const getCartData = useSelector(state => state.cartDetail)
  const dispatch = useDispatch()
  const params = useParams()
  
  useEffect(() => {
    dispatch(getCartDetails(params.id))
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left side - Product Image */}
        <div className="col-md-6 p-2">
          <img
            src={getCartData[0]?.carturl}
            alt="Product"
            style={{ width: '100%', height: '80%' }}
          />
        </div>

        {/* Right side - Product Details */}
        <div className="col-md-6 mt-4">
          <div>
            <h3>{getCartData[0]?.cartname}</h3>
            {/* <p>Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            <p>Price: ${getCartData[0]?.price}</p>
            <p>Quantity: {getCartData[0]?.quantity}</p>

            <button className="btn btn-danger">Remove from Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartDetail

