document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById('uploadForm');
    const nameInput = document.getElementById('name');
    const nameError = document.createElement('small');
    nameError.style.color = 'red';
    nameError.style.display = 'none';
    nameInput.insertAdjacentElement('afterend', nameError);

    // Add real-time validation for the product name
    nameInput.addEventListener('input', function () {
        const nameValue = nameInput.value.trim();
        if (/^[A-Za-z\s]+$/.test(nameValue)) {
            nameError.textContent = '';
            nameError.style.display = 'none';
        } else {
            nameError.textContent = 'Product name can only contain alphabets.';
            nameError.style.display = 'block';
        }
    });

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').files[0];

        // Validate product name
        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert('Please enter a valid product name with alphabets only.');
            return;
        }

        // Validate price to ensure it's a positive number with decimals
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price (greater than 0) with decimal points if applicable.');
            return;
        }

        // Validate all required fields
        if (!name || !image) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        // Format the price to 2 decimal places
        const formattedPrice = price.toFixed(2);

        // Read the image file
        const reader = new FileReader();
        reader.onloadend = function () {
            const product = {
                name: name,
                price: parseFloat(formattedPrice), // Store the price with two decimals
                image: reader.result // Store the image as a Base64 string
            };

            // Retrieve and update the product list in localStorage
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            alert('Product uploaded successfully!');
            uploadForm.reset(); // Clear the form
        };

        reader.readAsDataURL(image); // Read the image file
    });
});
