import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getAllProducts, getCategoryData, getProductCateory, getRegData } from '../../redux/action';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



const CategoryDress = (props) => {
    const dispatch = useDispatch()
    const productData = useSelector((state) => state.productData)
    const categoryProductData = useSelector((state)=>state.categoryProductData)
    const params = useParams()

    useEffect(() => {
        dispatch(getAllProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(getRegData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        dispatch(getProductCateory(Number(params.id)))
    },[params])
console.log("categoryProductData",categoryProductData);
    const cartFun = (item) => {
        let data = {
            "cartId": item.productid,
            "cartName": item.productname,
            "carturl": item.imageurl,
            "price": item.price.slice(1),
            "quantity": "1"
        }
        dispatch(addCart(data, props))
    }
    
    return (
        <div className="d-flex flex-wrap justify-content-around">
            {categoryProductData.length ? <>
                {categoryProductData?.map((item, inx) => (
                    <div key={inx} className="d-flex flex-wrap ">
                        <div key={item.productid} className="card m-4" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
                            <img src={item.imageurl} className="card-img-top rounded-circle mt-2" alt={'jeans'} style={{ width: '150px', height: '150px', margin: 'auto' }} />
                            <div key={inx} className="card-body text-center">
                                <h5 className="card-title">{item.productname}</h5>
                                <p className="card-text">Amount: {item.price}</p>
                                <button className="btn btn-primary" onClick={() => cartFun(item)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </> :
                <div className='text-center m-4'>
                    <p style={{ fontWeight: 'bold' }}>Products are not available</p>
                </div>
            }
        </div>
    )
}
export default CategoryDress