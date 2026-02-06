// Retrieve cart from local storage
function getCart() {
  return JSON.parse(localStorage.getItem("ekahlipi_cart")) || [];
}

// Save cart to local storage
function saveCart(cart) {
  localStorage.setItem("ekahlipi_cart", JSON.stringify(cart));
}// Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));

    let cart = getCart();

    // Check if item already in cart
    const exists = cart.find(item => item.id === id);
    if (!exists) {
      const cover = btn.getAttribute("data-cover");
const summary = btn.getAttribute("data-summary");

cart.push({id, name, price, cover, summary});
      saveCart(cart);
      renderCart();
    } else {
      alert("Item is already in the cart!");
    }
  });
});function renderCart() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalP = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";

  if(cart.length === 0){
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalP.textContent = "";
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
  <div>
    <strong>${item.name}</strong><br>
    <img src="${item.cover}" alt="${item.name}" style="height:80px; margin:5px 0; border-radius:6px;">
    <p style="margin: 4px 0; font-size: 0.9rem; color: #555;">${item.summary}</p>
    <span>₹${item.price}</span>
  </div>
  <button class="remove-item-btn" data-id="${item.id}">Remove</button>
`;
    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalP.innerHTML = `Subtotal: ₹${subtotal.toFixed(2)}`;

  // Attach remove functionality
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.getAttribute("data-id"));
    });
  });
}

// Remove from cart function
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

// Render cart on page load
renderCart();
