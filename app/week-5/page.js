import NewItem from './new-item.js'; // Import the NewItem component

export default function Page() {
  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Week 5 Item Management App</h1>
      <NewItem /> {/* Directly render the NewItem component */}
    </div>
  );
}
