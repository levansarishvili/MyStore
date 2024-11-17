interface Props {
  onDelete: () => void;
}

export default function DeleteButton({ onDelete }: Props) {
  return (
    <button
      className="delete-btn flex items-center justify-center bg-red-700 text-white text-xl px-4 rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-gray-950 hover:shadow-lg"
      onClick={onDelete}
    >
      Delete
    </button>
  );
}
