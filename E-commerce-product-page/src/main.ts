// import './style.css'

const ctrlImgs = [
  { src: "./src/assets/image-product-1.jpg" },
  { src: "./src/assets/image-product-1-thumbnail.jpg" },
  { src: "./src/assets/image-product-2-thumbnail.jpg" },
  { src: "./src/assets/image-product-3-thumbnail.jpg" },
  { src: "./src/assets/image-product-4-thumbnail.jpg" },
  { src: "./src/assets/icon-close.svg" }
]

const defaultImage = document.getElementsByClassName('shoe-image')[0] as HTMLImageElement;
const lightboxImage = document.querySelectorAll('.lightbox-img-1');

lightboxImage.forEach((item) => {
  (item as HTMLImageElement).addEventListener('click', () => {
    lightboxImage.forEach((img) => img.classList.remove('active'))
    item.classList.add('active')
    defaultImage.src = (item as HTMLImageElement).src;

  })
})

if (defaultImage) {

  defaultImage.addEventListener('click', () => {
    console.log('fghhhh');

    const preview: HTMLDivElement = document.createElement('div');
    preview.classList.add('preview-container');
    const closeImg: HTMLImageElement = document.createElement('img');
    closeImg.src = ctrlImgs[5].src;
    closeImg.style.position = "relative"
    closeImg.style.bottom = "0px"
    // closeImg.style.left = "0px"
    const previewImg: HTMLImageElement = document.createElement('img')
    previewImg.src = ctrlImgs[0].src;
    previewImg.style.width = '350px'
    previewImg.style.borderRadius = '10px'
    const previewLightbox: HTMLImageElement = document.createElement('img')
    previewLightbox.src = ctrlImgs[4].src
    // previewLightbox
    preview.append(closeImg)
    preview.append(previewImg)
    preview.append(previewLightbox)
    document.body.append(preview)
    closeImg.addEventListener('click', () => preview.remove());
  })
}


let defaultValue = document.getElementsByClassName('value')[0]

const increaseBtn = document.getElementsByClassName('increase-btn')[0];
increaseBtn.addEventListener('click', () => {
  if (defaultValue.textContent) {
    Number(defaultValue.textContent)
    const currentValue: number = Number(defaultValue.textContent)
    const newValue: number = currentValue + 1;
    defaultValue.textContent = newValue.toString();
  }
}
)

const decreaseBtn = document.getElementsByClassName('decrease-btn')[0]
decreaseBtn.addEventListener('click', () => {
  if (defaultValue.textContent) {
    Number(defaultValue.textContent)
    const currentValue: number = Number(defaultValue.textContent)
    const newValue: number = currentValue - 1;
    defaultValue.textContent = newValue.toString();
  }
})

const cartContainer: HTMLDivElement = document.createElement('div');
const cartIcon = document.getElementsByClassName('cart-icon')[0];
cartContainer.classList.add('cart-container');
const containertitle: HTMLParagraphElement = document.createElement('p')
containertitle.classList.add('cart')
containertitle.textContent = 'Cart'

cartContainer.append(containertitle)
const containerContent = document.createElement('div')
containerContent.textContent = 'Your cart is empty'
containerContent.classList.add('container-content')
cartContainer.append(containerContent)

cartIcon.addEventListener('click', () => {
  cartContainer.classList.toggle('show');
})

const addToCart = document.getElementsByClassName('cart-btn')[0];


addToCart.addEventListener('click', () => {
  const productImg = document.createElement('img')
  productImg.src = ctrlImgs[0].src
  productImg.classList.add('cart-product')
  productImg.style.width = '50px'
  cartContainer.append(productImg)
})
cartIcon.append(cartContainer);