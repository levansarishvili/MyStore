function EditButton({ onEdit, id }) {
  return (
    <button
      className="edit-btn flex items-center justify-center bg-green-700 text-white text-xl px-4 rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-gray-950 hover:shadow-lg"
      onClick={onEdit}
    >
      Edit
    </button>
  );
}

export default EditButton;
