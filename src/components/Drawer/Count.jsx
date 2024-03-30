import React, { useContext } from "react";
import styles from "./Drawer.module.scss";
import AppContext from "../../context";
import axios from "axios";

export default function Count({change, id, increase, decrease}){
    const {onRemoveItem, countTotalResult} = useContext(AppContext);
    const [result, setResult] = React.useState(0);
    
    // const itemsResult = {
    //     count,
    //     id,
    //     totalPrice: price * count
    // }
    // console.log(itemsResult)

    return(
        <>
            <div className="d-flex justify-between">
                <form>
                    <button type="button" onClick={() => {decrease(id)}} className={styles.sign}><img src="./../images/cart/minus.svg"/></button>
                    <input className={styles.count} type="number" min='1' max='100' value={change}/>
                    <button type="button" onClick={() => {increase(id)}} className={styles.sign}><img src="./../images/cart/plus.svg"/></button>
                </form>
                
            </div>
        </>
    )
};