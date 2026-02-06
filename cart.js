// cart.js

// Retrieve cart from local storage
function getCart() {
  return JSON.parse(localStorage.getItem("ekahlipi_cart")) || [];
}

// Save cart to local storage
function saveCart(cart) {
  localStorage.setItem("ekahlipi_cart", JSON.stringify(cart));
}

// Show notification
function showNotification(msg) {
  const notif = document.createElement("div");
  notif.textContent = msg;
  notif.style.position = "fixed";
  notif.style.bottom = "20px";
  notif.style.right = "20px";
  notif.style.background = "#3b2a1a"; // dark coffee color
  notif.style.color = "#efe1c6";
  notif.style.padding = "12px 20px";
  notif.style.borderRadius = "6px";
  notif.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  notif.style.zIndex = "1000";
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000); // disappears after 2 seconds
}

// Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    const cover = btn.getAttribute("data-cover");
    const summary = btn.getAttribute("data-summary");

    let cart = getCart();

    // Check if item already in cart
    const exists = cart.find(item => item.id === id);
    if (!exists) {
      cart.push({ id, name, price, cover, summary });
      saveCart(cart);
      renderCart();
      showNotification("Item added to cart!"); // Show message
    } else {
      showNotification("Item is already in the cart!");
    }
  });
});

// Render cart
function renderCart() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById("cart-items");
  const subtotalP = document.getElementById("cart-subtotal");

  cartItemsDiv.innerHTML = "";

  if(cart.length === 0){
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    subtotalP.textContent = "";
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.style.display = "flex";
    itemDiv.style.justifyContent = "space-between";
    itemDiv.style.alignItems = "center";
    itemDiv.style.padding = "10px 0";
    itemDiv.style.borderBottom = "1px solid #d6c2a8";

    itemDiv.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <img src="${item.cover}" alt="${item.name}" style="height:80px; margin:5px 0; border-radius:6px;"><br>
        <p style="margin:4px 0; font-size:0.9rem; color:#555;">${item.summary}</p>
        <span>₹${item.price}</span>
      </div>
      <button class="remove-item-btn" data-id="${item.id}" style="background:#ff7f7f; border:none; color:white; padding:4px 10px; border-radius:6px; cursor:pointer;">Remove</button>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  subtotalP.textContent = `Subtotal: ₹${subtotal.toFixed(2)}`;
  attachRemoveButtons();
}

// Remove from cart
function attachRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      let cart = getCart();
      cart = cart.filter(item => item.id !== btn.getAttribute("data-id"));
      saveCart(cart);
      renderCart();
      showNotification("Item removed from cart!");
    });
  });
}

// Proceed to Payment button
document.getElementById("proceed-payment-btn").addEventListener("click", () => {
  const cart = getCart();
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout-ekahlipi.html";
});

// Render cart on page load
renderCart();
