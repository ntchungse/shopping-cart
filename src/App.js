import React, { useState } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Product from "./Components/Product/Product";
import data from "./data.json";

import "./App.css";
import Filter from "./Components/Filter/Filter";
import Cart from "./Components/Cart/Cart";


function App() {
  const [list, setList] = useState({
    products: data.products,
    sort: "",
    size: "",
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  });

  const handleOrder = (order) => {
    alert(`Customer name: ${order.name} and email: ${order.email}`);
  }
  const handleAdd = (p) => {
    const cart = list.cart.slice();
    let alreadyInCart = false;
    cart.forEach(item => {
      if(item._id === p._id){
        item.count++;
        alreadyInCart = true
      }
    });
    if(!alreadyInCart){
      cart.push({...p, count: 1});
    }
    setList({...list, cart: cart});
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  const handleRemove = (p) => {
    const cart = list.cart.slice();
    setList({...list ,cart:cart.filter( item => item._id !== p._id)})
    localStorage.setItem("cart", JSON.stringify(cart.filter( item => item._id !== p._id)))
  }
  const filterProducts = (e) => {
    let size = e.target.value;
    let products = data.products.filter(
      (product) => product.availableSizes.indexOf(size) >= 0
    );
    if (size === "") {
      setList({ ...list ,size: size, products: data.products });
    } else {
      setList({
        ...list,
        size: size,
        products: products,
      });
      console.log(list)
    }
  };
  const sortProducts = (e) => {
    let sort = e.target.value;
    setList({
      ...list,
      sort: sort,
      products: list.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    });
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="main">
          <Filter
            count={list.products.length}
            size={list.size}
            sort={list.sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
          />
          <Product addToCart={handleAdd} product={list.products} />
        </div>

        <div className="shoppingCart">
          <Cart cart={list.cart} creatOrder={handleOrder} removeItem={handleRemove}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
