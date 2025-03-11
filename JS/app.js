document.addEventListener("DOMContentLoaded", function () {
  const farmProductsSection = document.getElementById('farm-products');
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Function to render products
  function renderProducts() {
      farmProductsSection.innerHTML = ""; // Clear the section
      if (products.length === 0) {
          farmProductsSection.innerHTML = "<p>No products available. Please upload some!</p>";
          return;
      }
      products.forEach((product, index) => {
          const productDiv = document.createElement('div');
          productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>₹${product.price}/kg</p>
              <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
              <button onclick="removeProduct(${index})" style="background-color: red; color: white;">Remove</button>
          `;
          farmProductsSection.appendChild(productDiv);
      });
  }

  // Function to add a product to the cart
  window.addToCart = function (productName, productPrice, productImage) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name: productName, price: productPrice, image: productImage });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${productName} added to cart!`);
  };

  // Function to remove a product from the home page
  window.removeProduct = function (index) {
      if (confirm("Are you sure you want to remove this product?")) {
          products.splice(index, 1); // Remove the product from the array
          localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
          renderProducts(); // Re-render the products
          alert("Product removed successfully!");
      }
  };

  // Initial render of products
  renderProducts();
});
