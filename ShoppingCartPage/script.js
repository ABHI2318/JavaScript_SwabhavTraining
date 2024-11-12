document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');
  

    const form = document.createElement('form');
    form.className = 'mb-4';
  
    form.innerHTML = `
      <div class="row mb-3">
        <div class="col-12">
          <label for="productSelect" class="form-label">Select Product</label>
          <select id="productSelect" class="form-select">
            <option>Unibic</option>
            <option>Dark Fantancy</option>
            <option>Parle G</option>
          </select>
        </div>
        <div class="col-12">
          <label for="itemCost" class="form-label">Item Cost</label>
          <input type="number" id="itemCost" class="form-control" value=" " >
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <label for="quantitySelect" class="form-label">Select Quantity</label>
          <input type="number" id="quantitySelect" class="form-control" value=" " min="1">
        </div>
        <div class="col-6" >
          <button type="button" id="addToCartBtn" class="btn btn-primary w-100 mt-3">Submit</button>
        </div>
      </div>
    `;
  
    cartContainer.appendChild(form);
  
   
    const table = document.createElement('div');
    table.className = 'table-responsive';
    table.innerHTML = `
      <table class="table">
        <thead class="table-light">
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Sub Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody id="cartItems"></tbody>
      </table>
    `;
  
    cartContainer.appendChild(table);



    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary mt-3';
    cartSummary.id = 'cartSummary';
    cartSummary.textContent = 'Total Cart Value: 0 Rs.';
    cartContainer.appendChild(cartSummary);
  

    const cartItems = document.getElementById('cartItems');
    let totalCartValue = 0;
  
    document.getElementById('addToCartBtn').addEventListener('click', function() {
      const productName = document.getElementById('productSelect').value;
      const itemCost = parseFloat(document.getElementById('itemCost').value);
      const quantity = parseInt(document.getElementById('quantitySelect').value);
      const subTotal = itemCost * quantity;
  
      totalCartValue += subTotal;
      updateCartSummary();
  
    
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${productName}</td>
        <td>
          <div class="input-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="increaseQuantity(this)">+</button>
            <input type="text" class="form-control text-center" value="${quantity}" readonly>
            <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQuantity(this)">-</button>
          </div>
        </td>
        <td>${itemCost}</td>
        <td>${subTotal}</td>
        <td><button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">🗑️</button></td>
      `;
      cartItems.appendChild(row);
    });
  
 
    function updateCartSummary() {
      cartSummary.textContent = `Total Cart Value: ${totalCartValue} Rs.`;
    }

    window.removeItem = function(button) {
      const row = button.closest('tr');
      const subTotal = parseFloat(row.cells[3].textContent);
      totalCartValue -= subTotal;
      updateCartSummary();
      row.remove();
    };
    
    window.increaseQuantity = function(button) {
      const input = button.nextElementSibling;
      const newQuantity = parseInt(input.value) + 1;
      input.value = newQuantity;
      updateRowSubtotal(button, newQuantity);
    };
  
    window.decreaseQuantity = function(button) {
      const input = button.previousElementSibling;
      let newQuantity = parseInt(input.value) - 1;
      if (newQuantity < 1) newQuantity = 1;
      input.value = newQuantity;
      updateRowSubtotal(button, newQuantity);
    };
  
    function updateRowSubtotal(button, newQuantity) {
      const row = button.closest('tr');
      const itemCost = parseFloat(row.cells[2].textContent);
      const oldSubTotal = parseFloat(row.cells[3].textContent);
      const newSubTotal = itemCost * newQuantity;
      totalCartValue = totalCartValue - oldSubTotal + newSubTotal;
      row.cells[3].textContent = newSubTotal.toFixed(2);
      updateCartSummary();
    }
  });
  