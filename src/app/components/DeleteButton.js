export default function DeleteButton({ onDelete, id }) {
  return (
    <button className="btn" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}
