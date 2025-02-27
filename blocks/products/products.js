export default async function decorate(block) {
  function setupGridLayout() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const mainChildren = Array.from(main.children);
    
    const thumbnailGalleryContainer = mainChildren.find(div => 
      div.querySelector('.products:not(.mainimage):not(.name):not(.size):not(.total):not(.cart):not(.desc):not(.detail)'));
    
    const mainImageContainer = mainChildren.find(div => 
      div.querySelector('.products.mainimage'));
    
    if (thumbnailGalleryContainer) {
      thumbnailGalleryContainer.classList.add('thumbnail-gallery');
    }
    
    if (mainImageContainer) {
      mainImageContainer.classList.add('main-image-container');
    }
    
    const productInfoElements = mainChildren.filter(div => 
      div.querySelector('.products.name') || 
      div.querySelector('.product.color') || 
      div.querySelector('.products.size') || 
      div.querySelector('.products.total') || 
      div.querySelector('.products.cart')
    );
    
    productInfoElements.forEach(el => {
      el.classList.add('product-info');
    });
  }
  
  setupGridLayout();
  
  const sizeContainer = document.querySelector('.products.size');
  if (sizeContainer) {
    let sizeDisplay = document.querySelector('.selected-size-display');
    if (!sizeDisplay) {
      sizeDisplay = document.createElement('div');
      sizeDisplay.className = 'selected-size-display';
      sizeDisplay.textContent = 'Selected Fashion Size: None';
      const optionsDiv = sizeContainer.querySelector('div:last-child');
      optionsDiv.insertAdjacentElement('afterend', sizeDisplay);
    }
    
    const sizeLinks = sizeContainer.querySelectorAll('a');
    sizeLinks.forEach(link => {
      const newLink = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(newLink, link);
      }
      
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        sizeLinks.forEach(sLink => sLink.classList.remove('selected'));
        this.classList.add('selected');
        sizeDisplay.textContent = `Selected Fashion Size: ${this.textContent.trim()}`;
      });
    });
  }
  
  // Color Selector Implementation
const colorContainer = document.querySelector('.product.color');
if (colorContainer) {
  // Create the selected color display only if it doesn't exist
  let colorDisplay = document.querySelector('.selected-color-display');
  if (!colorDisplay) {
    colorDisplay = document.createElement('div');
    colorDisplay.className = 'selected-color-display';
    colorDisplay.textContent = 'Selected Fashion Color: None';
    // Append directly after the color options div
    const optionsDiv = colorContainer.querySelector('div:last-child');
    optionsDiv.insertAdjacentElement('afterend', colorDisplay);
  }

  // Get all anchor tags and set up event listeners
  const colorLinks = colorContainer.querySelectorAll('a');
  colorLinks.forEach(link => {
    // Clear existing listeners
    const newLink = link.cloneNode(true);
    if (link.parentNode) {
      link.parentNode.replaceChild(newLink, link);
    }

    // Generate class name based on color name
    const colorName = newLink.textContent.trim();
    const colorClass = `color-${colorName.toLowerCase().replace(/\s+/g, '-')}`;
    newLink.classList.add(colorClass);

    // Add new event listener
    newLink.addEventListener('click', function(e) {
      e.preventDefault();

      // Remove selected class from all links
      colorLinks.forEach(cLink => {
        cLink.classList.remove('selected');
      });

      // Add selected class to clicked link
      this.classList.add('selected');

      // Update the display with exact text content
      colorDisplay.textContent = `Selected Fashion Color: ${this.textContent.trim()}`;

      // Debug output to console
      console.log("Selected color:", this.textContent.trim());
    });
  });
}
  
 // Quantity Counter Implementation
 const quantityContainer = document.querySelector('.products.total');
 if (quantityContainer && !quantityContainer.querySelector('.quantity-counter')) {
   const quantityDiv = quantityContainer.querySelector('div');
   
   // Create counter container
   const counterContainer = document.createElement('div');
   counterContainer.className = 'quantity-counter';
   
   // Create minus button
   const minusBtn = document.createElement('button');
   minusBtn.className = 'counter-btn minus';
   minusBtn.textContent = '-';
   
   // Create counter display
   const counterValue = document.createElement('span');
   counterValue.className = 'counter-value';
   counterValue.textContent = '1';
   
   // Create plus button
   const plusBtn = document.createElement('button');
   plusBtn.className = 'counter-btn plus';
   plusBtn.textContent = '+';
   
   // Add counter elements to container
   counterContainer.appendChild(minusBtn);
   counterContainer.appendChild(counterValue);
   counterContainer.appendChild(plusBtn);
   
   // Add counter to quantity div
   quantityDiv.appendChild(counterContainer);
   
   // Counter functionality
   let count = 1;
   
   minusBtn.addEventListener('click', function() {
     if (count > 1) {
       count--;
       counterValue.textContent = count;
     }
   });
   
   plusBtn.addEventListener('click', function() {
     count++;
     counterValue.textContent = count;
   });
 }



  // Thumbnail image click handler
  function setupThumbnailClickHandlers() {
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img, .products:not(.mainimage):not(.name):not(.size):not(.total):not(.cart):not(.desc):not(.detail) img');
    const mainImage = document.querySelector('.products.mainimage img');
    
    if (thumbnails.length && mainImage) {
      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          const newSrc = this.src;
          mainImage.src = newSrc;
          
          // Update srcset if needed
          const srcElements = Array.from(mainImage.parentElement.querySelectorAll('source'));
          if (srcElements.length) {
            // Parse the original srcset to get the format pattern
            const originalSrcset = srcElements[0].srcset;
            const format = originalSrcset.split('?')[1]; // Get format parameters
            
            // Update all sources with the new base image path but same format parameters
            srcElements.forEach(source => {
              const basePath = newSrc.split('?')[0];
              source.srcset = `${basePath}?${format}`;
            });
          }
        });
      });
    }
  }
  
  // Call the thumbnail setup function
  setupThumbnailClickHandlers();
}
//   function setupThumbnailClickHandlers() {
//     const thumbnails = document.querySelectorAll('.thumbnail-gallery img, .products:not(.mainimage):not(.name):not(.size):not(.total):not(.cart):not(.desc):not(.detail) img');
//     const mainImage = document.querySelector('.products.mainimage img');
    
//     if (thumbnails.length && mainImage) {
//       thumbnails.forEach(thumbnail => {
//         thumbnail.addEventListener('click', function() {
//           const newSrc = this.src;
//           mainImage.src = newSrc;
//         });
//       });
//     }
//   }
  
//   setupThumbnailClickHandlers();
// }
