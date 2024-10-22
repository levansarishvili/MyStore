import "./DeleteButton.css";
export default function DeleteButton({ onDelete, id }) {
  return (
    <button className="btn delete" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}
