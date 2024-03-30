import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/registr';
import { useNavigate } from 'react-router-dom';
import PersonalCabinet from './pages/cabinet/PersonalCabinet';
import AdminCabinet from './pages/cabinet/AdminCabinet';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn') === "true");
  const [users, setUsers] = React.useState([]);
  const [userLive, setUserLive] = React.useState(localStorage.getItem('userLive'));
  

  React.useEffect(() => {
  async function fetchData(){
    try {
      setIsLoading(true);
      
      const cartResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites');
      const itemsResponse = await axios.get('http://localhost:3001/items');
      const usersResponse = await axios.get('http://localhost:3001/users');
      

      setIsLoading(false);
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      alert("Ошибка, повторите позже");
      console.log(error);
    }
  }
    fetchData();
    }, []);


  const usersLogIn = async (obj) => {
    try{
      if(users.find((item) => item.login === obj.login)){
        if(users.find((item) => item.password === obj.password)){
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', true);
          setUserLive(obj.login);
          localStorage.setItem('userLive', obj.login);
          navigate('/');
        }else{
          setIsLoggedIn(false);
          alert('Неверный пароль!');
        }
        if(obj.login === 'firstman'){
          if(users.find((item) => item.password === obj.password)){
            navigate('/admin')
          }
          else{
            setIsLoggedIn(false);
            alert('Неверный пароль!');
          }
        }
      }
      else {
        setIsLoggedIn(false);
        alert('Такого пользователя не существует, перейдите в раздел регистрации.')
      } 
    } catch (error){
      alert('Ошибка авторизации');
      console.log(error);
    }
  };

  const usersRegIn = async (obj) => {
    try{
      if(users.find((item) => item.login === obj.login)){
        alert('Пользователь с таким логином уже зарегестрирован');
      }
      else if(users.find((item) => item.email === obj.email)){
        alert('Пользователь с таким email уже зарегистрирован.');
      }
      else{
        axios.post(`http://localhost:3001/users`, obj);
        localStorage.setItem('isLoggedIn', true);
        setUserLive(obj.login);
        localStorage.setItem('userLive', obj.login);
        setIsLoggedIn(true);
        navigate('/');
        alert(`Добро пожаловать, ${obj.firstName} ${obj.lastName}`);
      }
    }catch(error) {
      alert('Ошибка регистрации, повторите позже!');
      console.log(error);
    }
  }

  const addNewItems = async (obj) => {
    try{
      if(items.find((item) => item.desc === obj.desc)){
        alert('Ошибка добавления товара! Такой товар уже есть')
      } else {
        axios.post('http://localhost:3001/items', obj);
        setItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert('error with app function');
      console.log(error);
    }
  }

  const onAddToCart = (obj) => {
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))){
      axios.delete(`http://localhost:3001/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
    }
    else{
      axios.post('http://localhost:3001/cart', obj);
      setCartItems((prev) => [...prev, obj]);
      console.log(cartItems)
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`http://localhost:3001/favorites/${obj.id}`);
    } else {
      const { data } = await axios.post('http://localhost:3001/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
  };

  const onSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
  return cartItems.some(obj => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartItems, onAddToCart, isLoggedIn, setIsLoggedIn, usersLogIn, usersRegIn, userLive, users, addNewItems, onRemoveItem}}>
      <div className="wrapper clear">
      <Header />
      <Routes>
        <Route path="/" element={<Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchInput={onSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />} />
        
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />}/>
        <Route exact path='/personal' element={<PersonalCabinet 
        />}/>
        <Route exact path='/admin' element={<AdminCabinet />}/>
        <Route path="/favorite" element={<Favorites />} />
        <Route path='/cart' element={<Drawer items={cartItems} onRemove={onRemoveItem} />}/>        
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer/>
      </div>
    </AppContext.Provider>
    );
}
export default App;