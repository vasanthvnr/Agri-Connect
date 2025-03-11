document.addEventListener("DOMContentLoaded", () => {
    const cartProductsSection = document.getElementById("cart-products");
    const totalAmountDiv = document.getElementById("total-amount");
    const buyNowButton = document.getElementById("buy-now");

    // Load cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render the cart items
    const renderCart = () => {
        cartProductsSection.innerHTML = ""; // Clear previous content
        let totalPrice = 0; // Reset total price

        cart.forEach((product, index) => {
            // Ensure quantity is properly initialized
            if (!product.quantity || isNaN(product.quantity)) {
                product.quantity = 1;
            }

            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <img src="${product.image || 'default-image.jpg'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}/kg</p>
                <div class="quantity-container">
                    <button class="decrease-button" data-index="${index}" data-change="-1">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="increase-button" data-index="${index}" data-change="1">+</button>
                </div>
                <p>Subtotal: ₹<span class="subtotal">${(product.price * product.quantity).toFixed(2)}</span></p>
                <button class="cancel-button" data-index="${index}">Cancel</button>
            `;

            cartProductsSection.appendChild(productDiv);
            totalPrice += product.price * product.quantity; // Calculate total price
        });

        totalAmountDiv.querySelector("h2").textContent = `Total Amount: ₹${totalPrice.toFixed(2)}`; // Update total amount
    };

    // Function to remove a product from the cart
    const removeFromCart = (index) => {
        cart.splice(index, 1); // Remove item from cart array
        updateCart(); // Save changes and re-render cart
        alert("Product successfully removed.");
    };

    // Function to change product quantity
    const changeQuantity = (index, change) => {
        const product = cart[index];
        if (product) {
            product.quantity = Math.max(1, product.quantity + change); // Prevent negative quantities
            updateCart(); // Save changes and re-render cart
        }
    };

    // Function to update localStorage and re-render the cart
    const updateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
        renderCart(); // Re-render cart
    };

    // Buy now functionality
    buyNowButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Purchase successful! Thank you for shopping.");
            cart = []; // Clear the cart
            updateCart(); // Save changes and re-render cart
        }
    });

    // Event delegation for dynamically created elements
    cartProductsSection.addEventListener("click", (event) => {
        const target = event.target;
        const index = parseInt(target.dataset.index, 10);

        if (target.classList.contains("decrease-button")) {
            changeQuantity(index, -1);
        } else if (target.classList.contains("increase-button")) {
            changeQuantity(index, 1);
        } else if (target.classList.contains("cancel-button")) {
            removeFromCart(index);
        }
    });

    // Initial render
    renderCart();
});
