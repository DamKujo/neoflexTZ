import React from "react";
import Card from '../components/Card';
import "./../index.scss"; 


function Home({
  items,
  searchValue,
  setSearchValue,
  onSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
  onShowItem
}) {


const renderItemsWire = ()=>{
  const filtredItems= items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const wireHeadphones = filtredItems.filter((item) => item.categories === 'Наушники');
  ;
  
  return (isLoading ? [...Array(8)] : wireHeadphones).map((item, index) => (
    <Card
      key={index}
      onShowItem={onShowItem}
      onFavorite={(obj) => onAddToFavorite(obj)}
      onPlus={(obj) => onAddToCart(obj)}
      loading={isLoading}
      item={item}
      {...item}
    />
    ));
};

const renderItemsWireless = ()=>{
  const filtredItems= items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const wirelessHeadphones = filtredItems.filter((item) => item.categories === 'Беспроводные наушники');
  ;
  
  return (isLoading ? [...Array(8)] : wirelessHeadphones).map((item, index) => (
    <Card
      key={index}
      onShowItem={onShowItem}
      onFavorite={(obj) => onAddToFavorite(obj)}
      onPlus={(obj) => onAddToCart(obj)}
      loading={isLoading}
      item={item}
      {...item}
    />
    ));
  };

  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="headphones">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Наушники'}</h1>
        <div className="search-block d-flex">
          <img src="./../images/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="./../images/cart/close.svg"
              alt="Clear"
            />
          )}
          <input onChange={onSearchInput} value={searchValue.length >= 10 ? ((e) => e.preventDefault()) : searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">
          {renderItemsWire()
          }
      </div>

      <div className="d-flex align-center justify-between mb-40">
        <h1 className="headphones">{searchValue ? null : 'Беспроводные наушники'}</h1>
      </div>
      <div className="d-flex flex-wrap">
          {renderItemsWireless()
          }
      </div>

    </div>
    );
}

export default Home;

