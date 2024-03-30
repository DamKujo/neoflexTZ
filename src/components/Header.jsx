import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { useCart } from "../hooks/uscCart";
import AppContext from "../context";
import { useNavigate } from "react-router-dom";
import './../index.scss';

export default function Header(props){
    const {total} = useCart();
    const {isLoggedIn, setIsLoggedIn, userLive, favorites} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.setItem('isLoggedIn', false);
        setIsLoggedIn(false);
        navigate('/login');
    }

    const youIsAdmin = () => {
        if(userLive === 'firstman'){
          navigate('/admin');
        }
        else{
          navigate('/personal');
        }
    }
    
    return(

        <header className="">

            {
                isLoggedIn ? 
                <>
                    <div className="d-flex justify-between align-center pad">
                        
                        <Link to={"/"}>
                            <div className="d-flex alig-center">
                                <div>
                                <h3 className="text-uppercase maintitle">QPICK</h3>
                                </div>
                                
                            </div>
                        </Link>
                        <ul className="d-flex">
                            <li className="mr-20 cu-p">
                                <span>{favorites.length > 0 ? <span className="cartCount">{favorites.length}</span> : null}</span>
                                <Link to={"/favorite"}><img width={20} height={20} src="./../images/heart.svg" alt="Избранное"/></Link>
                            </li>
                            <li className="mr-15 cu-p">
                                <span>{total ? <span className="cartCount">{total}</span> : null}</span>
                                <Link to={"/cart"}><img width={20} height={20} src="./../images/box.svg"/></Link>
                            </li>
                            <li className="mr-15 cu-p">
                                <img onClick={youIsAdmin} width={20} height={20} src="./../images/user.svg" alt="Пользователь"/>
                            </li>
                            <li className="mr-15 cu-p">
                                <img onClick={handleLogOut} width={22} height={22} src="./../images/auth/esclogin.png" alt="Выйти"/>
                            </li>
                        </ul>
                    </div>
                </>
                
            : 
            <>
                <div className="d-flex justify-between align-center pad">
                    <Link to={"/"}>
                    <div className="d-flex alig-center">
                        <div>
                        <h3 className="text-uppercase maintitle">QPICK</h3>
                        </div>
                        
                    </div>
                    </Link>
                        <ul className="d-flex">
                            <li className="mr-20 cu-p">
                                <span>{favorites.length > 0 ? <span className="cartCount">{favorites.length}</span> : null}</span>
                                <Link to={"/favorite"}><img width={20} height={20} src="./../images/heart.svg" alt="Избранное"/></Link>
                            </li>
                            <li className="mr-15 cu-p">
                                <span>{total ? <span className="cartCount">{total}</span> : null}</span>
                                <Link to={"/cart"}><img width={20} height={20} src="./../images/box.svg"/></Link>
                            </li>
                            <li className="mr-15 cu-p">
                                <Link to={"/login"}><img width={20} height={20} src="./../images/auth/logindoor.png" alt="Войти"/></Link>
                            </li>
                        </ul>
                </div>
            </>
            
                
            }
            
      
        </header>
    );
}