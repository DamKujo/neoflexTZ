import React, {useContext, useState} from "react";
import Info from "./../Info";
import { useCart } from "../../hooks/uscCart";
import axios from "axios";
import styles from "./Drawer.module.scss";
import AppContext from "../../context";
import Count from "./Count";

export default function Drawer({onRemove, items= []}){
    const {isLoggedIn, userLive} = useContext(AppContext);
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async() => {
        try{
            setIsLoading(true);
            const user = userLive;
            const productIds = cartItems.map((item) => Number(item.id));
            const {data} = await axios.post('http://localhost:3001/orders', {
                productIds,
                user
            });
            console.log(data);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            cartItems.forEach(async (item) => {
                await axios.delete(`http://localhost:3001/cart/${item.id}`);
            });
        }catch(error){
            alert('Не удалось оформить заказ. Повторите попытку позже.')
        }
        setIsLoading(false);
    }

    const increment = async (id) => {
        setCartItems((cart) => {
            return cart.map((product)=> {
                if(product.id === id){
                    return {
                        ...product,
                        count: product.count++,
                        totalPrice: product.price * (product.count - 1)
                    };
                }
                return product;
            })
        })
    }

    const decrement = async (id) => {
        setCartItems((cart) => {
            return cart.map((product)=> {
                if(product.id === id){
                    return {
                        ...product,
                        count: product.count > 0 ? product.count-- : onRemove(product.id),
                        totalPrice: product.price * (product.count + 1)
                    };
                }
                return product;
            })
        })
    }
    

    return(
        <div className={styles.maindrawer} >
        <h2 className="d-flex justify-between mb-30">Корзина</h2>

            {
                isLoggedIn ?
                <>
                    {
                    items.length > 0 ? (
                    <div className={styles.drawer}>
                        <div className={styles.Items}>
                        {
                            items.map((obj) =>(
                                <div key={obj.id} className="cart__item d-flex justify-between align-center mb-20">
                                    <div>
                                        <img width={146} height={136} src={obj.imageUrl}/>
                                        <Count change={obj.count} id={obj.id} increase={increment} decrease={decrement}/>
                                    </div>
                                    
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.name}</p>
                                    </div>
                                    <div>
                                    </div>
                                    <div className="fourblock">
                                        <img onClick={() => onRemove(obj.id)} className="remove__btn" src="./../images/cart/Vector.svg" alt="Remove"/>
                                        <b>{obj.totalPrice} ₽</b>
                                    </div>
                                </div> 
                            ))
                        }
                        </div>

                        <div className="cartTotal">
                            <div className="cartTotalBlock">
                                <ul>
                                    <li> 
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} ₽</b>
                                    </li>
                                </ul>
                            </div>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Перейти к оформлению</button>
                        </div>
                    </div>
                        ): (
                        <Info 
                        name={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} отправлен на сборку. Ваши питомцы будут ждать вас в нашем магазине`: "Добавьте хотя бы один товар, чтобы сделать заказ"}
                        image={isOrderComplete ? "./../images/cart/complete-order.svg": "./../images/cart/empty-cart.svg"}
                    />
                    )

                    }
                </> : 
                <>
                    <Info 
                    name={"Вы не авторизированы"}
                    description={"Чтобы выполнить заказ, необходимо авторизироваться."}
                    image={"./../images/cart/notauth.png"}
                    />
                </>
            }
        </div>
        
    )
}