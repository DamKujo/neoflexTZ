import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import AppContext from "../../../context";


function LoginPage() {
  const {usersLogIn} = React.useContext(AppContext);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const userData = {
    login,
    password
  }
  
    const handleLogIn = async (e) => {
      try {
        e.preventDefault();
        usersLogIn(userData);
      } catch (error) {
        alert("Login failed. Please try again.");
        console.log(error);
      }
    };
  
    return (
        <div className="main">
            <div className="main_titles">
                <h1>Авторизация</h1>
                <h3>Чтобы продолжить работу на сайте, введите ваш логин и пароль</h3>
            </div>
            <div className="main_form">
                <form onSubmit={handleLogIn}>
                    <input placeholder="Login" type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <input placeholder="Password" type="password" value={password} required minLength={5} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit"><span className="paw">Войти </span></button>
                    <p>Оу, вы еще не создали аккаунт? <Link to={ '/register'}><b>Регистрация</b></Link></p>
                </form>
            </div>
        </div> 
    );
  }
  
export default LoginPage;





// const LoginPage = ({props}) => {

//     const [login, setLogin] = React.useState('');
//     const [password, setPassword] = React.useState('');
    

//     const handleLogIn = (e) => {
//         e.preventDefault();
//         props.setIsLoggedIn(true);
//         props.history.push('/');
//     }

    
//     return(
//         <div className="main">
//             <div className="main_titles">
//                 <h1>Авторизация</h1>
//                 <h3>Чтобы продолжить работу на сайте, введите ваш логин и пароль</h3>
//             </div>
//             <div className="main_form">
//                 <form onSubmit={handleLogIn}>
//                     <input placeholder="Login" type="text" onChange={(e) => setLogin(e.target.value)}/>
//                     <input placeholder="Password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
//                     <button type="submit"><span className="cat-paw">Войти <img width={20} src="./../images/cat-paw.png"/></span></button>
//                     <p>Оу, вы еще не создали аккаунт? <Link to={ '/register'}><b>Регистрация</b></Link></p>
//                 </form>
//             </div>
//         </div>         
//     );
// };

// export default LoginPage;