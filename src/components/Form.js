function Form() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <div class="select-wrapper">
          <select>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
        </div>
        <input class="input-price" type="number" placeholder="Price" />
        <input class="input-product" type="text" placeholder="Product Name" />
        <button>Book Order</button>
      </form>
    </div>
  );
}

export default Form;
