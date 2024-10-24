function EditButton({ onEdit, id }) {
    return (
      <button className="btn edit-btn" onClick={onEdit}>
        Edit
      </button>
    );
  }
   
  export default EditButton;