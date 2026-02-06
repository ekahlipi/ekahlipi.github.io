// ================================
// CART.JS
// ================================

// Retrieve cart from local storage
function getCart() {
  return JSON.parse(localStorage.getItem("ekahlipi_cart")) || [];
}

// Save cart to local storage
function saveCart(cart) {
  localStorage.setItem("ekahlipi_cart", JSON.stringify(cart));
}

// Add "Add to Cart" button functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    const cover = btn.getAttribute("data-cover");
    const summary = btn.getAttribute("data-summary");

    let cart = getCart();

    // Check if item already exists in cart
    const exists = cart.find(item => item.id === id);
    if (exists) {
      alert("Item is already in the cart!");
      return;
    }

    cart.push({ id, name, price, cover, summary });
    saveCart(cart);
    renderCart();
  });
});

// Render cart items on the page
function renderCart() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalP = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalP.textContent = "Subtotal: ₹0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <div class="cart-item-left">
        <img src="${item.cover}" alt="${item.name}">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <p>${item.summary}</p>
        </div>
      </div>
      <div class="cart-item-right">
        <span>₹${item.price}</span>
        <button class="remove-item-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalP.textContent = `Subtotal: ₹${subtotal.toFixed(2)}`;

  // Attach remove functionality to each button
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-id")));
  });
}

// Remove item from cart
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

// Proceed to payment button
const proceedBtn = document.getElementById("proceed-payment-btn");
if (proceedBtn) {
  proceedBtn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Redirect to checkout page
    window.location.href = "checkout-ekahlipi.html";
  });
}

// Render cart on page load
renderCart();
