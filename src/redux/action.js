import axios from 'axios';
import * as types from './actionType'

let getUserID = localStorage.getItem('userID')

export const register=(data,props)=>async(dispatch)=>{
  dispatch({ type: types.REGISTER_USER_DATA_REQUEST });
  await axios.post('http://localhost:8000/users/register', data)
  .then((response) => {
     dispatch({ type: types.REGISTER_USER_DATA_SUCCESS,payload: response})
     alert('Registered Successfully');
     props.history.push('/')
  })
  .catch(error => {
    dispatch({ type: types.REGISTER_USER_DATA_FAILURE });
    alert(error.response.data.message);
  });
}

export const login=(data,props)=>async(dispatch)=>{
  dispatch({ type: types.REGISTER_USER_DATA_REQUEST });
  await axios.post('http://localhost:8000/users/login', data)
  .then((response) => {
     localStorage.setItem('AuthToken',response.data.data.authToken)
     localStorage.setItem('userID',response.data.data.userid)
     dispatch({ type: types.REGISTER_USER_DATA_SUCCESS,payload: response});
     props.history.push('/home')
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.REGISTER_USER_DATA_FAILURE });
  });
}

export const getRegData=()=>async(dispatch)=>{
  dispatch({ type: types.GET_REG_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/users/getData',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_REG_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_REG_DATA_FAILURE });
      });
}

export const getAllProducts=()=>async(dispatch)=>{
  dispatch({ type: types.GET_USER_PRODUCT_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/product/getAllProduct',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_USER_PRODUCT_SUCCESS,payload:response});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_USER_PRODUCT_FAILURE });
      });
}

export const addCart=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.ADD_CART_DATA_REQUEST });
  await axios.post('http://localhost:8000/cart/addCart', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
     dispatch({ type: types.ADD_CART_DATA_SUCCESS,payload: response});
     if(props?.history?.location?.pathname==='/cart'){
      dispatch(getCartData(getUserID))
     }else{
      props.history.push('/cart')
     }
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.ADD_CART_DATA_FAILURE });
  });
}

export const decCart=(data)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.DELETE_CART_DATA_REQUEST });
  await axios.post('http://localhost:8000/cart/decCart', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
     dispatch({ type: types.DELETE_CART_DATA_SUCCESS,payload: response});
      dispatch(getCartData(getUserID))
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.DELETE_CART_DATA_FAILURE });
  });
}

export const getCartData=(data)=>async(dispatch)=>{
  dispatch({ type: types.GET_CART_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get(`http://localhost:8000/cart/getCartData/${data}`,{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_CART_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_CART_DATA_FAILURE });
      });
}

export const DeleteCartData = (data) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  axios.delete(`http://localhost:8000/cart/deleteCartData/${data}`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        dispatch(getCartData(getUserID))
      }
    })
    .catch((err)=>{
      console.log("err",err)
    });
}

export const DeleteCartAllData = (data,props) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  axios.delete(`http://localhost:8000/cart/deleteCartAllData/${data}`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        props.history.push('/trending')
      }
    })
    .catch((err)=>{
      console.log("err",err)
    });
}

export const updateProfile=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  await axios.put(`http://localhost:8000/users/updateRegData`, data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then(response => {
    console.log('PUT request successful. Response:', response);  
    alert('your Profile was updated successfully!');
    props.history.push('/trending')

  })
  .catch(error => {
    console.error('Error making PUT request:', error.response ? error.response.data : error.message);
  });
}

export const getCategoryData=()=>async(dispatch)=>{
  dispatch({ type: types.GET_CATEGORY_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/category/getCategoryData',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_CATEGORY_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_CATEGORY_DATA_FAILURE });
      });
}

export const getSearchData=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.SEARCH_DATA_REQUEST });
  await axios.post('http://localhost:8000/product/getSearchProduct', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
    console.log("response",response);
     dispatch({ type: types.SEARCH_DATA_SUCCESS,payload: response.data.data});
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.SEARCH_DATA_FAILURE });
  });
}

export const getCartDetails = (data) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.GET_CART_DETAIL_REQUEST});
  axios.get(`http://localhost:8000/cart/getCartDetail/${data}`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        dispatch({ type: types.GET_CART_DETAIL_SUCCESS,payload:response.data.data});
      }
    })
    .catch((err)=>{
      console.log("err",err)
      dispatch({ type: types.GET_CART_DETAIL_FAILURE});
    });
}

export const getProductCateory = (data) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.GET_CATEGORY_DETAIL_REQUEST});
  axios.get(`http://localhost:8000/product/getCategoryProduct/${data}`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        dispatch({ type: types.GET_CATEGORY_DETAIL_SUCCESS,payload:response.data.data});
      }
    })
    .catch((err)=>{
      console.log("err",err)
      dispatch({ type: types.GET_CATEGORY_DETAIL_FAILURE});
    });
}