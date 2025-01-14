// Product edit form
export default function ProductEditForm() {
  return (
    <form
      className="product-edit-form dark:bg-[#313131] fixed z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80rem] w-full p-32 border rounded-2xl cursor-pointer transition-all duration-300 bg-[#495057ed] text-3xl flex flex-col justify-center items-center gap-12"
      // onSubmit={handleSubmit}
    >
      <button
        className="product-edit-form-close-btn w-10 font-medium absolute top-8 right-8 text-[1.4rem] cursor-pointer transition-all duration-300 bg-[#ec5e2a] px-2 py-1 rounded-lg text-white hover:bg-white hover:text-[#ec5e2a]"
        // onClick={handleCloseForm}
      >
        X
      </button>

      <div className="product-edit-input-wrapper w-full flex gap-16 items-center justify-between">
        <label className="label text-white font-medium" htmlFor="title">
          Title
        </label>
        <input
          // value={title}
          // onChange={(e) => setFormTitle(e.target.value)}
          className="product-edit-form-input dark:bg-[#4a4a4a] w-[40rem] px-8 py-4 rounded-lg border-2 border-[#495057] outline-none transition-all duration-300 text-2xl focus:border-[#ec5e2a]"
          type="text"
          id="title"
          name="title"
        />
      </div>

      <div className="product-edit-input-wrapper w-full flex gap-16 items-center justify-between">
        <label className="label text-white font-medium" htmlFor="stockStatus">
          Availability Status
        </label>
        <select
          // value={availabilitystatus}
          // onChange={(e) => setFormAvailabilityStatus(e.target.value)}
          className="product-edit-form-input dark:bg-[#4a4a4a] w-[40rem] px-8 py-4 rounded-lg border-2 border-[#495057] outline-none transition-all duration-300 text-2xl focus:border-[#ec5e2a]"
          id="stockStatus"
        >
          <option>Low Stock</option>
          <option> In Stock</option>
          <option> Out of Stock</option>
        </select>
      </div>

      <div className="product-edit-input-wrapper w-full flex gap-16 items-center justify-between">
        <label className="label text-white font-medium" htmlFor="stock">
          Stock
        </label>
        <input
          // value={stock}
          // onChange={(e) => setFormStock(Number(e.target.value))}
          className="product-edit-form-input dark:bg-[#4a4a4a] w-[40rem] px-8 py-4 rounded-lg border-2 border-[#495057] outline-none transition-all duration-300 text-2xl focus:border-[#ec5e2a]"
          type="number"
          id="stock"
        />
      </div>

      <div className="product-edit-input-wrapper w-full flex gap-16 items-center justify-between">
        <label className="label text-white font-medium" htmlFor="price">
          Price
        </label>
        <input
          // value={price}
          // onChange={(e) => setFormPrice(Number(e.target.value))}
          className="product-edit-form-input dark:bg-[#4a4a4a] w-[40rem] px-8 py-4 rounded-lg border-2 border-[#495057] outline-none transition-all duration-300 text-2xl focus:border-[#ec5e2a]"
          type="number"
          id="price"
        />
      </div>

      <button
        className="btn product-edit-form-btn w-80 h-16 mt-8"
        type="submit"
      >
        Save Changes
      </button>
    </form>
  );
}
