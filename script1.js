// Function to fetch data from the API
async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching data:', error.message);
      return null;
    }
  }
  
  // Function to render product cards
  function renderProducts(products) {
    const productCardsContainer = document.querySelector('.product-cards');
    productCardsContainer.innerHTML = '';
    products.forEach(product => {
      const card = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            ${product.compare_at_price ? `<p class="product-compare-price">$${product.compare_at_price}</p>` : ''}
            ${product.badge_text ? `<span class="product-badge">${product.badge_text}</span>` : ''}
          </div>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      `;
      productCardsContainer.innerHTML += card;
    });
  }
  
  document.addEventListener("DOMContentLoaded", async function () {
    // Fetch data from the API
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    const data = await fetchData(apiUrl);
  
    // If data is null or categories array doesn't exist, show error
    if (!data || !data.categories || !Array.isArray(data.categories)) {
      console.log('Invalid API data format');
      return;
    }
  
    // Function to render products based on the selected category
    function renderProductsByCategory(category) {
      // Find the category in the API data
      const categoryData = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
  
      // If category data is found, render the products
      if (categoryData) {
        renderProducts(categoryData.category_products);
      } else {
        const productCardsContainer = document.querySelector('.product-cards');
        productCardsContainer.innerHTML = '<p>No products found</p>';
      }
    }
  
    // Select the first tab by default and render its products
    const defaultTab = document.querySelector('.tab');
    defaultTab.classList.add('active');
    renderProductsByCategory(defaultTab.textContent.trim());
  
    // Event listener for tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', async function () {
        // Remove active class from all tabs
        tabs.forEach(tab => {
          tab.classList.remove('active');
        });
  
        // Add active class to the clicked tab
        this.classList.add('active');
  
        // Get the category name
        const category = this.textContent.trim();
  
        // Render products based on the selected category
        renderProductsByCategory(category);
      });
    });
  
    // Event listener for "Add to Cart" buttons
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart')) {
        const productTitle = event.target.parentElement.querySelector('.product-title').textContent;
        alert(`Added "${productTitle}" to cart! (This is a placeholder action)`);
      }
    });
  });
  