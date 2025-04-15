// components/ClothingCard.js
export default function ClothingCard({ item, onDelete }) {
    return (
      <div className="bg-white rounded shadow p-4">
        <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover rounded mb-4" />
        <h3 className="text-xl font-bold">{item.name}</h3>
        <p>{item.description}</p>
        <p className="mt-2 font-semibold">Type: {item.type}</p>
        <p className="mt-2">Tags: {item.tags && item.tags.join(", ")}</p>
        <button onClick={onDelete} className="mt-4 px-3 py-1 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    );
  }
  