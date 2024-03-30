import React from "react";
import Card from "../../components/Card";
import axios from "axios";
import styles from "./Cabinets.module.scss";
import { CardModal } from "../../components/CardModal/CardModal";
import AppContext from "../../context";

export default function AdminCabinet(){
  const {addNewItems} = React.useContext(AppContext);
  const [allUsers, setAllUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [nameCart, setNameCart] = React.useState('');
  const [descCart, setDescCart] = React.useState('');
  const [priceCart, setPriceCart] = React.useState();
  const [imageCart, setImageCart] = React.useState('');

  React.useEffect(() => {
      const fetchOrders = async () => {
        try {
          const { data: ordersData } = await axios.get('http://localhost:3001/orders');
          const orderItems = await Promise.all(
            ordersData.map(async (order) => {
              const products = await Promise.all(
                order.productIds.map(async (productId) => {
                  const { data: productData } = await axios.get(`http://localhost:3001/items/${productId}`);
                  return productData;
                })
                );
              return {
                id: order.id,
                items: products,
                user: order.user
              };
            })
            );
          setAllUsers(orderItems);
          setIsLoading(false);
        } catch (error) {
          alert("Ошибка, повторите попытку позже");
          console.log(error);
        }
      };
  
      fetchOrders();
      }, []);

    const fileRef = React.createRef();

    const nameFile = (e) => {
      let file = fileRef.current.value;
      let nameOfFile = file.slice(12);
      setImageCart(nameOfFile);
    }

    const item = {
      name: nameCart,
      desc: descCart,
      price: Number(priceCart),
      imageUrl: `./../images/items/${imageCart}`
    }
    

    const newItemsData = async (e) => {
      try{
        e.preventDefault();
        if(!item.name || !item.desc || !item.price){
          alert('Значения пусты!');
        } else{
          addNewItems(item);
        }
      } catch (error){
        alert('Error! uncorrect post request');
        console.log(error);
      }
    }


    return(
        <>
        <div className={styles.main}>
            <div className={styles.allorders}>
                <h1>Все заказы</h1>

                {
                    allUsers.length > 0 ? 
                    <>
                    <div className="orders-container">
                    {allUsers.map((order) => (
                        <div key={order.id} className="order-card">
                            <h2>Заказ #DM{order.id}</h2>
                            <h3>Пользователь: {order.user}</h3>
                            <div className="order-items-container">
                            {order.items.map((item, index) => (
                            <Card
                                key={index}
                                loading={isLoading}
                                {...item}
                            />
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                    </> : 
                    <>
                    <div className="order_empty">
                    <h1>У вас еще нет заказов :(</h1>
                    </div>
                    </>
                }
            </div>
            <div className={styles.down}>
                <div onClick={() => setModalIsOpen(true)} className={styles.button}>
                    <h1>Выложить новый товар</h1>
                </div>
            </div>
        </div>
        <CardModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        >
          <form onSubmit={newItemsData}>
            <h2>Создание нового товара</h2>
            <input className={styles.newItems} placeholder="Название" type="text" value={nameCart} onChange={(e) => setNameCart(e.target.value)}/>
            <textarea className={styles.newItems} placeholder="Описание" value={descCart} onChange={(e) => setDescCart(e.target.value)}></textarea>
            <input className={styles.newItems} placeholder="Цена" type="number" value={priceCart} onChange={(e) => setPriceCart(e.target.value)}/>
            <input className={styles.newItemsFile} type="file" onChange={nameFile} ref={fileRef}/>
            <button className={styles.newItemsButton} type="submit">Отправить</button>
          </form>
        </CardModal>
        
        </>
    )
};