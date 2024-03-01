import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getAllProducts, getRegData, getSearchData } from '../redux/action';

const Trending = (props) => {
    const dispatch = useDispatch();
    const productData = useSelector((state) => state.productData);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getRegData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let data = {
            "searchText": searchTerm
        }
        debounce_Search_Func(data)
        return () => {
            debounce_Search_Func.cancel(); // Cancel the debounce timer
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])


    const cartFun = (item) => {
        let getUserID = localStorage.getItem('userID');
        let data = {
            "cartId": item.productid,
            "cartName": item.productname,
            "carturl": item.imageurl,
            "price": item.price.slice(1),
            "quantity": "1",
            "userid": getUserID,
        };
        dispatch(addCart(data, props));
    };
    const debounce_Search_Func = debounce((data) => dispatch(getSearchData(data)), 2000)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container my-4">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Products..."
                    aria-label="Search Products"
                    aria-describedby="search-icon"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <span className="input-group-text" id="search-icon">
                    <i class="bi bi-search"></i>
                </span>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
                {productData.map((item, index) => (
                    <div key={index} className="card m-4" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
                        <img src={item.imageurl} className="card-img-top rounded-circle mt-2" alt={'jeans'} style={{ width: '150px', height: '150px', margin: 'auto' }} />
                        <div className="card-body text-center">
                            <h5 className="card-title">{item.productname}</h5>
                            <p className="card-text">Amount: {item.price}</p>
                            <button className="btn btn-primary" onClick={() => cartFun(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending;
