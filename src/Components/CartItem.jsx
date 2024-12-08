import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
const CartItem = ({ item, incrementItem, decrementItem, deleteItem }) => (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
            <img
                src={item.url}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
            />
            <div>
                <h3 className="text-lg font-inter  font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <button
                onClick={() => decrementItem(item.id)}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                <FaMinus />
            </button>
            <span className="text-lg font-semibold">{item.quantity}</span>
            <button
                onClick={() => incrementItem(item.id)}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                <FaPlus />
            </button>
            <p className="text-lg font-semibold text-orange-600">
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
                onClick={() => deleteItem(item.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                <FaTrash />
            </button>
        </div>
    </div>
);

export default CartItem;