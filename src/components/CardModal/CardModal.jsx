import React from "react";
import "./CardModal.css";

export const CardModal = ({isOpen, onClose, children}) => {
    return(
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-wrapper">
                        <div className="modal-content">
                            <img onClick={() => onClose()} className="modal-close" src="./../images/cart/close.svg" alt="close modal window" />
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
} 