import './App.css';
import LoginForm from './pages/loginform';
import RegisterForm from './pages/registerform';
import Home from './pages/home'
import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import Layout from './pages/layout';
import Trending from './pages/trending';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout_details';
import UpdateProfile from './pages/updateProfile';
import CartDetail from './pages/cartDetail';
import CategoryDress from './pages/Dress/categoryDress';

function App() {
  const getAuthToken=localStorage.getItem('AuthToken')
  const isAuthenticated = getAuthToken?.length ? true: false;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Layout>
        <PrivateRoute exact path="/home" component={Home} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/trending" component={Trending} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/cart" component={CartPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/checkout" component={CheckoutPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/updateProfile' component={UpdateProfile} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/category/:id' component={CategoryDress} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/cartDetail/:id' component={CartDetail} isAuthenticated={isAuthenticated}/>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;



