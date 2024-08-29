import React from "react";
import axios from "axios";
import AppContext from "../context";
import './../index.scss';

function UserData () {

    const {userLive} = React.useContext(AppContext);
    const [userNow, setUserNow] = React.useState([]);

    React.useEffect(() => {
      let isMounted = true;
      const fetchOrders = async () => {
        try {
          const { data: usersData } = await axios.get('http://localhost:3001/users');
          if(isMounted){
            const usersNeed = usersData.find(({login}) => login === userLive);
            setUserNow(usersNeed);
          }
        } catch (error) {
          alert("Ошибка, повторите попытку позже");
          console.log(error);
        }
      };
  
      fetchOrders();

      return () => {
        isMounted = false;
      }
        
        }, [userLive]);
    

    return(

        <>
            <p className="info">Имя: <span>{userNow.firstName}</span></p>
            <p className="info">Фамилия: <span>{userNow.lastName}</span></p>
            <p className="info">email: <span>{userNow.email}</span></p>
            <p className="info">Логин: <span>{userNow.login}</span></p>
            <p className="info">Пароль: <span>{userNow.password}</span></p>
        </>
    );
}
export default UserData;