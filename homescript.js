// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "images/products/headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/products/smartwatch.jpg",
        description: "Feature-rich smartwatch with health monitoring."
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "images/products/tshirt.jpg",
        description: "Comfortable cotton t-shirt available in multiple colors."
    },
    {
        id: 4,
        title: "Running Shoes",
        price: 89.99,
        category: "clothing",
        image: "images/products/shoes.jpg",
        description: "Lightweight running shoes with cushioned soles."
    },
    {
        id: 5,
        title: "Non-Stick Cookware Set",
        price: 129.99,
        category: "home",
        image: "images/products/cookware.jpg",
        description: "10-piece non-stick cookware set for your kitchen."
    },
    {
        id: 6,
        title: "Blender",
        price: 49.99,
        category: "home",
        image: "images/products/blender.jpg",
        description: "High-power blender for smoothies and food preparation."
    },
    {
        id: 7,
        title: "Bestselling Novel",
        price: 14.99,
        category: "books",
        image: "images/products/book1.jpg",
        description: "The latest bestselling novel from a popular author."
    },
    {
        id: 8,
        title: "Programming Guide",
        price: 39.99,
        category: "books",
        image: "images/products/book2.jpg",
        description: "Comprehensive guide to modern web development."
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});

// Display products
function displayProducts(productsToDisplay) {
    productContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    showAddedToCartMessage(product.title);
}

// Update cart count in navbar
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Show cart modal
function showCart() {
    cartModal.style.display = 'block';
    renderCartItems();
}

// Close cart modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Render cart items in modal
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
            <span class="remove-item" onclick="removeFromCart(${item.id})">&times;</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Remove item if quantity reaches 0
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCartCount();
        renderCartItems();
        saveCartToLocalStorage();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show "added to cart" message
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'notification';
    message.textContent = `${productName} added to cart!`;
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = '#2ecc71';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '4px';
    message.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    message.style.zIndex = '1000';
    message.style.animation = 'fadeIn 0.3s';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);

// Make cart link in navbar open the modal
document.querySelector('.cart').addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
});