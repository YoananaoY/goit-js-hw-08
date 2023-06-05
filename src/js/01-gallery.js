// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryList = document.querySelector('.gallery');

function createGalleryItem(item) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = item.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.setAttribute('data-source', item.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

galleryItems.forEach((item) => {
  const galleryItem = createGalleryItem(item);
  galleryList.appendChild(galleryItem);
});
console.log(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'data',
  fadeSpeed: 400,
  history: true,
});

galleryList.addEventListener('click', (event) => {
  event.preventDefault();
  lightbox.open();
});

// Nasłuchiwanie klawisza ESC
document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape' && lightbox.isVisible()) {
    lightbox.close();
  }
});