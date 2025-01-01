
function formatPrice(price) {
    const [integerPart, decimalPart] = price.toFixed(2).split('.');
    return `
        <div class="d-flex align-items-baseline">
            <p class="m-0" style="font-size: 1rem; font-weight: bold;">EGP</p>
            <h1 class="m-0" style="font-size: 2rem; font-weight: bold; margin-left: 5px;">${integerPart}</h1>
            <p class="m-0" style="font-size: 1rem; font-weight: bold; margin-left: 2px;">${decimalPart}</p>
        </div>
    `;
}

const productContainer = document.getElementById('product-container');
const loadingIndicator = document.getElementById('loading');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 1;
const limit = 20; 
let isLoading = false;

async function fetchProducts(page) {
    try {
        isLoading = true;
        loadingIndicator.style.display = 'block';
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page)}`);
        const data = await response.json();
        WriteProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        isLoading = false;
        loadingIndicator.style.display = 'none';
    }
}

function WriteProducts(products) {
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4'; 

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img 
                    src="${product.thumbnail}" 
                    class="card-img-top p-3 lazy-load" 
                    alt="${product.title}" 
                    style="height: 150px; object-fit: contain;" 
                    loading="lazy">

                <div class="card-body">
                    <h5 class="card-title text-truncate">${product.title}</h5>
                    <p class="card-text small text-muted">${product.description.substring(0, 50)}...</p>
                    <div class="d-flex align-items-center mb-2">
                        <span class="text-warning me-2"><i class="bi bi-star-fill"></i> ${product.rating}</span>
                        <span class="text-muted small">(${product.stock} reviews)</span>
                    </div>
                    ${formatPrice(product.price)}
                    <p class="text-muted small">EGP 28.00 delivery Tomorrow, 1 Jan<br>Or fastest delivery Today by 11 PM</p>
                    <p class="text-danger fw-bold small">Only ${product.stock} left in stock - order soon.</p>
                    <button class="btn btn-warning text-dark fw-bold" style= "border-radius: 30px;">Add to cart</button>
                </div>
            </div>  `;
        productContainer.appendChild(col);
    });
}

function loadMoreProducts() {
    if (isLoading) return; 
    currentPage++;
    fetchProducts(currentPage);
}

fetchProducts(currentPage);
