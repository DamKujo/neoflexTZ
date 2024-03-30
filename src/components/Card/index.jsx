import React, {useState} from 'react';
import ContentLoader from "react-content-loader";
import { CardModal } from '../CardModal/CardModal';
import styles from './Card.module.scss';
import AppContext from "../../context";



function Card({
  id,
  name,
  imageUrl,
  desc,
  totalPrice,
  price,
  rate,
  count,
  onFavorite,
  onPlus,
  favorited = false,
  loading= false
}) {
  const {isItemAdded, isLoggedIn} =React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  
  

  const onClickPlus = () => {
    isLoggedIn ? onPlus({ id,name, imageUrl, price, totalPrice, count }) : alert('Чтобы добавить товар в корзину, авторизируйтесь на сайте.');
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <>
    <div className={styles.card} >
      {
        loading ? <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
          <rect x="0" y="160" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="185" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
    </ContentLoader> : <>
    <div className={styles.favorite} onClick={onClickFavorite} >
      <img src={isFavorite ? './../images/heart-like.svg' : './../images/heart-unlike.svg'} alt="Unliked" />
    </div>
    <img width={219} height={237} src={imageUrl} className={styles.image} alt="Phones" />
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <h5 className={styles.title}>{name}</h5>
        <h5>⭐ <span className='ml-10 rate'>{rate}</span></h5>
         <button className={styles.btn} type='button' onClick={() => setModalIsOpen(true)}>Подробнее</button>
      </div>
      <div className='d-flex flex-column'>
        <span className={styles.price}>{price} ₽</span>
        <span className={styles.lastprice}>{price} ₽</span>
        <button className={styles.buy} type='button' onClick={onClickPlus}>Купить</button>
      </div>
    </div>
    </>
      }
    </div>
    <CardModal
    isOpen={modalIsOpen}
    onClose={() => setModalIsOpen(false)}
    >
      <h3>{name}</h3>
      <img width={200} height={250} src={imageUrl}/>
      <p className='block_desc'>{desc}</p>
      <div className='d-flex justify-between align-center'> 
        <b>{price} ₽</b>
        <div className="block_btn" onClick={onClickFavorite} >
          <img className="favotite_btn" src={isFavorite ? './../images/heart-like.svg' : './../images/heart-unlike.svg'} alt="Unliked" />
        </div>
        <img
            className="cart_btn"
            onClick={onClickPlus}
            src={isItemAdded(id) ? './../images/btn-checked.svg' : './../images/btn-plus.svg'}
            alt="Plus"
            />
      </div>
    </CardModal>
    
    </>
    
    );
}
export default Card;


