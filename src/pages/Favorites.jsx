import React from "react";
import Card from '../components/Card';
import AppContext from "../context";
import "./../index.scss"; 

function Favorites() {
  const {favorites, onAddToFavorite}= React.useContext(AppContext);
  return (
    <div className="content favorites">
      <div className="d-block align-center justify-between mb-40">
        <h1>{favorites.length > 0 ? `Отложенные `: "Здесь пока что пусто :("}</h1>
        <p className="opacity-6">{favorites.length > 0 ? ` `: "Пора это исправлять!"}</p>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;