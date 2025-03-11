export default function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item.id} className="list-item">
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
}
