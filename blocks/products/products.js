export default async function decorate(block) {
  initProductGallery(block);
  initSizeSelector(block);
  addQuantitySelector(block);
  setupAddToCartButton(block);
  formatDescriptionDetails();
}


function initProductGallery(block) {
  const thumbnailContainer = block.querySelector('.products > div:first-child');
  if (!thumbnailContainer) return;
  
  const thumbnailDivs = thumbnailContainer.querySelectorAll('div');
  const thumbnails = thumbnailContainer.querySelectorAll('img');
  
  const mainImageContainer = block.querySelector('.products > div:nth-child(2)');
  if (!mainImageContainer) return;
  
  const mainImage = mainImageContainer.querySelector('img');
  if (!mainImage) return;
  
 
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
  
 
  thumbnailDivs.forEach((div) => {
    const thumbnail = div.querySelector('img');
    if (!thumbnail) return;
    
    div.addEventListener('click', function() {
      
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      
      
      thumbnail.classList.add('active');
      
     
      mainImage.src = thumbnail.src;
    });
  });
}


function initSizeSelector(block) {
  const sizeContainer = block.querySelector('.products > div:nth-child(3) > div:nth-child(2)');
  if (!sizeContainer) return;
  
  const sizeLinks = sizeContainer.querySelectorAll('a');
  if (sizeLinks.length === 0) return;
  
  t
  const selectedSizeDisplay = document.createElement('p');
  selectedSizeDisplay.className = 'selected-size-display';
  selectedSizeDisplay.textContent = 'Selected size: None';
  sizeContainer.appendChild(selectedSizeDisplay);
  
  sizeLinks.forEach(link => {
  
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      
      sizeLinks.forEach(sizeLink => sizeLink.classList.remove('selected'));
      
      this.classList.add('selected');
      
      
      selectedSizeDisplay.textContent = `Selected size: ${this.textContent}`;
    });
  });
}

n
function addQuantitySelector(block) {
  const quantitySection = block.querySelector('.products > div:nth-child(3) > div:nth-child(3)');
  if (!quantitySection) return;
  

  const quantityControls = document.createElement('div');
  quantityControls.className = 'quantity-controls';
  quantityControls.innerHTML = `
    <div class="quantity-btn decrease">-</div>
    <div class="quantity-display">1</div>
    <div class="quantity-btn increase">+</div>
  `;
  
  
  quantitySection.appendChild(quantityControls);
  

  let quantity = 1;
  const decreaseBtn = quantityControls.querySelector('.decrease');
  const increaseBtn = quantityControls.querySelector('.increase');
  const quantityDisplay = quantityControls.querySelector('.quantity-display');
  
  decreaseBtn.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    quantity++;
    quantityDisplay.textContent = quantity;
  });
}

function setupAddToCartButton(block) {
  const addToCartButton = block.querySelector('.products > div:nth-child(3) > div:nth-child(4) h2');
  if (!addToCartButton) return;
  
  addToCartButton.addEventListener('click', function() {
   
    const selectedSize = block.querySelector('.products > div:nth-child(3) > div:nth-child(2) a.selected');
    const sizeText = selectedSize ? selectedSize.textContent : 'Not selected';
    
    
    const quantityDisplay = block.querySelector('.quantity-display');
    const quantity = quantityDisplay ? quantityDisplay.textContent : '1';
    
   
    const productTitle = block.querySelector('.products > div:nth-child(3) > div:first-child h2');
    const productName = productTitle ? productTitle.textContent : 'Product';
    
    
    alert(`Added to cart: 
           Product: ${productName}
           Size: ${sizeText}
           Quantity: ${quantity}`);
  });
}

function formatDescriptionDetails() {
  const descSection = document.querySelector('.products.desc');
  if (descSection) {
    descSection.classList.add('centered-desc');
  }
}