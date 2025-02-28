/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const apiUrlAnchor = block.querySelector('a[href*="query-index.json"]');
  if (!apiUrlAnchor) {
    console.error('Could not find anchor tag with API URL');
    return;
  }
  const apiUrl = apiUrlAnchor.href;

  async function fetchData() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

  function getChunkSize() {
    if (window.innerWidth < 600) return 2; 
    if (window.innerWidth <= 1024) return 3; 
    return 3; 
  }

  function createSlide(cardData) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    cardData.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      
      const imageWrapper = document.createElement('a');
      imageWrapper.href = card.path;
      const image = document.createElement('img');
      image.src = card.image;
      image.alt = card.title;
      imageWrapper.appendChild(image);

      const caption = document.createElement('p');
      caption.textContent = card.title;

      const price = document.createElement('p');
      price.textContent = card.price;

      const cardButton = document.createElement('button');
      cardButton.classList.add('card-btn');
      cardButton.textContent = 'ADD TO CART';

      cardElement.append(imageWrapper, caption, price, cardButton);
      slide.appendChild(cardElement);
    });
    return slide;
  }

  function renderCarousel(data) {
    block.innerHTML = ''; 
    const carouselData = data.data.slice(0, 5);
    const chunkSize = getChunkSize();
    const slides = [];
    for (let i = 0; i < carouselData.length; i += chunkSize) {
      slides.push(carouselData.slice(i, i + chunkSize));
    }

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('card-carousel-container');

    const dots = [];
    slides.forEach((cardData, index) => {
      const slideElement = createSlide(cardData);
      carouselContainer.appendChild(slideElement);

      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(index));
      dots.push(dot);
    });

    function showSlide(index) {
      const slideShow = carouselContainer.querySelectorAll('.slide');
      slideShow.forEach((slide, i) => {
        slide.style.display = i === index ? 'flex' : 'none';
        dots[i].classList.toggle('active', i === index);
      });
    }

    showSlide(0); 

    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');
    dots.forEach((dot) => dotsContainer.appendChild(dot));

    block.append(carouselContainer, dotsContainer);
    block.querySelector('.button-container p').innerHTML = `Top Sellers!`;
  }

  const data = await fetchData();
  console.log(data.data.path);
  renderCarousel(data);
  window.addEventListener('resize', () => renderCarousel(data));

}
