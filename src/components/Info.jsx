import React from "react";
import { Link } from "react-router-dom";

const Info = ({name, description, image}) => {
    return(
        <div className={"cartEmpty d-flex align-center justify-center flex-column flex"}>
            <img className="mb-20" width={120} src={image} alt="" />
            <h2>{name}</h2>
            <p className="opacity-6">{description}</p>
            <Link to={"/"}>
                <button className="otherbutton">
                    <img src="./../images/cart/arrow.svg" alt="" /> Вернуться назад
                </button>
            </Link>
        </div>
    );
}
export default Info;