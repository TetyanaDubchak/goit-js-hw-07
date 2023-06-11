import { galleryItems } from './gallery-items.js';

const galleryListElem = document.querySelector('.gallery');

const markup = galleryItems.map(({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`);

galleryListElem.insertAdjacentHTML('beforeend', markup.join(''));


galleryListElem.addEventListener('click', onGalleryListOpenHandler);

function onGalleryListOpenHandler(event) {
  event.preventDefault();
  const picture = event.target;

  if (!picture.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(`
     <img src="${picture.dataset.source}" width="800" height="600"/>
`, {
    onShow: (instance) => {document.addEventListener('keydown', onGalleryListCloseHandler)},
    onClose: (instance) => { document.removeEventListener('keydown', onGalleryListCloseHandler)}
  })

  instance.show();

  galleryListElem.addEventListener('keydown', onGalleryListCloseHandler);
  
  function onGalleryListCloseHandler(evn) {
    if (evn.code === 'Escape') {
      instance.close()
    }
  }
};



