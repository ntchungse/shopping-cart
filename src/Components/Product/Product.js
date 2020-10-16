import React, { useState } from "react";
import "./Product.css";
import formatCurrency from "../../util";
import { Zoom, Fade } from "react-reveal";
import Modal from "react-modal";

function Product({ product, addToCart }) {
  const [modal, setModal] = useState(null);
  const openModal = (p) => {
    setModal(p);
  };
  const closeModal = () => {
    setModal(null);
  };
  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {product.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className="product__price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {modal && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close__modal" onClick={closeModal}>x</button>
            <div className="product__details">
              <img src={modal.image} alt={modal.title} />
              <div className="product__detailsDescription">
              <p><strong>{modal.title}</strong></p>
              <p>{modal.description}</p>
              <p>
                Available size: {
                  modal.availableSizes.map( x => (
                    <span>{" "} <button className="button">{x}</button></span>
                  ))
                }
              </p>
              <div className="product__price">
                <div>{formatCurrency(modal.price)}</div>
                <button className="button primary" onClick={() => {
                  addToCart(modal);
                  closeModal()
                }}>
                  Add to cart
                </button>
              </div>
              </div>
              
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}

export default Product;
