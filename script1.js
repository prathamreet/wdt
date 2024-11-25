let cart = [];

// Fetch product data from JSON
async function fetchProducts() {
    try {
        const response = await fetch("./data/products.json");
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Dynamically render products in the shop
function renderProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = `
    <h2>Products</h2>
    <div class="product-list">
      ${products
          .map(
              (product) => `
          <div class="product" data-id="${product.id}" data-name="${
                  product.name
              }" data-price="${product.price}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        `
          )
          .join("")}
    </div>
  `;

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".product");
            const id = productElement.dataset.id;
            const name = productElement.dataset.name;
            const price = parseFloat(productElement.dataset.price);

            const existingItem = cart.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });
}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById(
        "total-price"
    ).textContent = `Total: $${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(id) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }

    updateCart();
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
    cart.length = 0;
    updateCart();
});



// Load products on page load
fetchProducts();
