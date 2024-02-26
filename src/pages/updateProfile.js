import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegData, updateProfile } from '../redux/action';

const UpdateProfile = (props) => {
  const [formData, setFormData] = useState({
    image: '',
    username: '',
    gender: '',
    phoneNo: '',
  });
  const get_Reg_Data = useSelector((state) => state.regData)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRegData())
  }, [])

  useEffect(() => {
    if (FilterRegData) {
      setFormData({
        image: FilterRegData?.imageurl,
        username: FilterRegData?.username,
        gender: FilterRegData?.gender,
        phoneNo: FilterRegData?.phonenumber,
      })
    }
  }, [get_Reg_Data])

  const getUserId = localStorage.getItem('userID')
  const FilterRegData = get_Reg_Data.find((item) => item.userid === getUserId)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userid: FilterRegData.userid,
      username: formData.username,
      password: FilterRegData.password,
      firstname: FilterRegData.firstname,
      email: FilterRegData.email,
      gender: formData.gender,
      phonenumber: formData.phoneNo,
      imageurl: formData.image
    }
    dispatch(updateProfile(data,props))
  };

  return (
    <div className='d-flex justify-content-center my-3'>
      <form onSubmit={handleSubmit} className='p-4' style={{ backgroundColor: '#F5F5F5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', width: '50%' }}>
        <h4 className='text-center'>Update Profile</h4>

        <div className='mb-3'>
          <label htmlFor="formImage" className='form-label'>Profile Image URL</label>
          <input
            type="text"
            className='form-control'
            placeholder="Enter image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="formUsername" className='form-label'>Username</label>
          <input
            type="text"
            className='form-control'
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="formGender" className='form-label'>Gender</label>
          <div className="d-flex">
            <label className='me-3'>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label className='me-3'>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="formPhone" className='form-label text-center'>Phone Number</label>
          <input
            type="text"
            className='form-control'
            placeholder="Enter phone number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <div className='d-flex justify-content-center'>

          <button type="submit" className='btn btn-primary'>Update Profile</button>
        </div>
      </form>
    </div>

  );
};

export default UpdateProfile;
