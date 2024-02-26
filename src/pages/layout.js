
import React from 'react';
import { useHistory } from 'react-router-dom';
import DropdownComponent from './dropDown';

const Layout = ({ children }) => {
  const history = useHistory()
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <header className="text-light" style={{ backgroundColor: '#E7D3EE', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <img src="/shopping_logo (2).png" alt="Logo" />
        </div>

        <div className='px-3 d-flex align-items-center' style={{ color: '#9e0ca6' }}>
          <div className='mx-2' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/lehenga')}>Lehenga</div>
          <div className='mx-2' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/ethnic')}>Ethnic</div>
          <div className='mx-2' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/gown')}>Gown</div>
          <div className='mx-2' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/tradition')}>Tradition</div>
        </div>

        <div className='px-3 d-flex align-items-center'>
          <span className='mx-3' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/home')}>Home</span>
          <span className='mx-2 mb-4' style={{ margin: 'auto', cursor: 'pointer' }}>
            <img src={'https://tse3.mm.bing.net/th?id=OIP.BkoXurD30qD41Q4pDKvDAAHaGH&pid=Api&P=0&h=180'} className="card-img-top rounded-circle mt-2" alt={'jeans'} style={{ width: '50px', height: '50px' }} />
          </span>
          <span style={{ margin: 'auto' }}>keerthi</span>
          <span style={{ margin: 'auto' }}><DropdownComponent /></span>
        </div>
      </header>

      <div className="flex-grow-1 d-flex">

        <nav className=" col-md-2  sidebar" style={{ backgroundColor: '#C5A6C7' }}>
          {/* Sidebar Content */}
          <ul className="nav flex-column">
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/trending')} >
                Trending
              </div>
            </li>
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/cart')}>
                Cart
              </div>
            </li>
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/updateProfile')}>
                Update Profile
              </div>
            </li>
          </ul>
        </nav>

        <main className="col-md-10 ml-sm-auto">
          {/* Main Content */}
          {children}
        </main>

      </div>

      <footer className="text-dark p-3 text-center" style={{ backgroundColor: '#E7D3EE', fontWeight: 'bold' }}>
        {/* Footer Content */}
        <p>&copy; 2024 shopping_Site | All rights reserved</p>
        <p>Contact: shopping@example.com</p>
      </footer>
    </div>
  );
};

export default Layout;