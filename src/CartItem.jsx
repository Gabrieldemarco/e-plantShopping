import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Obtener los elementos del carrito desde Redux
  const dispatch = useDispatch();

  // Calcular el monto total para todos los productos en el carrito
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + item.quantity * item.cost, 0);

  // Continuar comprando (prop recibido desde el componente padre)
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Incrementar la cantidad de un artículo
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrementar la cantidad de un artículo
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item); // Eliminar si la cantidad es 0
    }
  };

  // Eliminar un artículo del carrito
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcular el costo total basado en la cantidad de un artículo
  const calculateTotalCost = (item) => item.quantity * item.cost;

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost} per unit</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        <h3>Total Amount: ${calculateTotalAmount()}</h3>
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

