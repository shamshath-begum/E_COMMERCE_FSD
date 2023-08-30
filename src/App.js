import store from './store/store';
 import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import Menu from './page/Menu';
import Login from './page/Login';
import NewProduct from './page/NewProduct';
import SignUp from './page/SignUp';
import Cart from './page/Cart';
import Success from './page/Success';
import Cancel from './page/Cancel';
export const url="https://e-com-p065.onrender.com/"

 

function App() {
  return <>
   <Provider store={store}>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/home'element={<Home/>}/>
    <Route path='/about'element={<About/>}/>
    <Route path='/contact'element={<Contact/>}/>
    <Route path='/menu/:filterby'element={<Menu/>}/>
    <Route path='/login'element={<Login/>}/>
    <Route path='/signup'element={<SignUp/>}/>
    <Route path='/newproduct'element={<NewProduct/>}/>
    <Route path='/cart'element={<Cart/>}/>
    <Route path='/success'element={<Success/>}/>
    <Route path='/cancel'element={<Cancel/>}/>
    <Route path='*'element={<Navigate to={'/home'}/>}/>
    
  </Routes>
  </BrowserRouter>
   </Provider> 
  </>
}

export default App;
