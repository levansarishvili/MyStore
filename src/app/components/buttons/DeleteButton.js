import "./DeleteButton.css";
export default function DeleteButton({ onDelete }) {
  return (
    <button className="btn delete" onClick={onDelete}>
      Delete
    </button>
  );
}
