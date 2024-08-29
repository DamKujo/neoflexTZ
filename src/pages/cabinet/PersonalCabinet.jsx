import React from "react";
import { Link } from "react-router-dom";
import UserData from "../../components/UserData";
import styles from "./Cabinets.module.scss";

export default function PersonalCabinet(){
    return(
        <>
            
            <div className={styles.main}>
            <div className={styles.personal_data}>
                <h1>Мои данные</h1>
                <UserData />
            </div>
            <div className={styles.personal_orders}>
                <Link to={'/orders'}><h3>Мои заказы</h3>
                <img width={100} height={100} src="./../images/auth/orders.png" alt="Заказы"/>
                </Link>

            </div>
        </div>
        </>
    )
};