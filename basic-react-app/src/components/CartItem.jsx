// src/components/CartItem.jsx
const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-img" />
      <div className="cart-details">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) => updateQuantity(item.id, e.target.value)}
        />
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
