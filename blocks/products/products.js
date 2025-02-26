export default async function decorate(block) {
    // Prevent multiple initialization
    if (block.dataset.initialized) return;
    block.dataset.initialized = true;
    
    // Size Selector Implementation
    const sizeContainer = document.querySelector('.products.size');
    if (sizeContainer) {
      const sizesDiv = sizeContainer.querySelector('div:last-child');
      let sizeDisplay = sizesDiv.querySelector('.selected-size-display');

      // Create the selected size display if not exists
      if (!sizeDisplay) {
        sizeDisplay = document.createElement('div');
        sizeDisplay.className = 'selected-size-display';
        sizeDisplay.textContent = 'Selected Fashion Size: None';
        sizesDiv.appendChild(sizeDisplay);
      }

      // Create size buttons container (only if it doesn't exist)
      let sizeButtonsContainer = sizesDiv.querySelector('.size-buttons');
      if (!sizeButtonsContainer) {
        sizeButtonsContainer = document.createElement('div');
        sizeButtonsContainer.className = 'size-buttons';
        
        // Create S, M, L buttons
        const sizes = ['S', 'M', 'L'];
        sizes.forEach(size => {
          const button = document.createElement('button');
          button.className = 'size-button';
          button.textContent = size;
          button.addEventListener('click', function() {
            // Remove selected class from all buttons
            document.querySelectorAll('.size-button').forEach(btn => {
              btn.classList.remove('selected');
            });
            // Add selected class to clicked button
            this.classList.add('selected');
            // Update selected size text
            sizeDisplay.textContent = `Selected Fashion Size: ${size}`;
          });
          sizeButtonsContainer.appendChild(button);
        });
        
        // Add buttons after the size display
        sizesDiv.appendChild(sizeButtonsContainer);
      }
    }
    
    // Quantity Counter Implementation
    const quantityContainer = document.querySelector('.products.total');
    if (quantityContainer && !quantityContainer.querySelector('.quantity-counter')) {
      const quantityDiv = quantityContainer.querySelector('div');
      
      // Create counter container
      const counterContainer = document.createElement('div');
      counterContainer.className = 'quantity-counter';
      
      // Create minus button (circle)
      const minusBtn = document.createElement('button');
      minusBtn.className = 'counter-btn minus';
      minusBtn.textContent = '-';
      
      // Create counter display (rectangle)
      const counterValue = document.createElement('span');
      counterValue.className = 'counter-value';
      counterValue.textContent = '1';
      
      // Create plus button (circle)
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
    
    // Thumbnail image click handler (to change main image)
    const thumbnails = document.querySelectorAll('.products:not(.mainimage):not(.name):not(.size):not(.total):not(.cart):not(.desc):not(.detail) img');
    const mainImage = document.querySelector('.products.mainimage img');
    
    if (thumbnails.length && mainImage) {
      thumbnails.forEach(thumbnail => {
        if (!thumbnail.dataset.initialized) {
          thumbnail.dataset.initialized = true;
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
        }
      });
    }
  }
