import React from "react";
import Card from '../components/Card';
import axios from "axios";
import AppContext from "../context";
import "./../index.scss"; 
export default function Orders() {
  const { onAddToCart, onAddToFavorite, userLive} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
        setOrders(orderItems);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка, повторите попытку позже");
        console.log(error);
      }
    };

    fetchOrders();
    
    }, []);
    

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              {
                order.user === userLive ? 
                <>
                <h2>Заказ #DM{order.id}</h2>
                <div className="order-items-container">
                {order.items.map((item, index) => (
                  <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    loading={isLoading}
                    {...item}
                  />
                ))}
                </div>
                </> : null
                
              }
            </div>
            ))}
        </div>
      
      </div>
    );
}