// import './style.css'

const ctrlImgs = [
  { src: "/image-product-1.jpg" },
  { src: "/image-product-1-thumbnail.jpg" },
  { src: "/image-product-2-thumbnail.jpg" },
  { src: "/image-product-3-thumbnail.jpg" },
  { src: "/image-product-4-thumbnail.jpg" },
  { src: "/icon-close.svg" },
  { src: "/icon-delete.svg" }
]

const thumbnail = [
  { src: "/image-product-1-thumbnail.jpg" },
  { src: "/image-product-2-thumbnail.jpg" },
  { src: "/image-product-3-thumbnail.jpg" },
  { src: "/image-product-4-thumbnail.jpg" },
]

const controlBtns = [
  { src: "/icon-next.svg" },
  { src: "/icon-previous.svg" }
]

const defaultImage = document.getElementsByClassName('shoe-image')[0] as HTMLImageElement;
const lightboxImage = document.querySelectorAll('.lightbox-img');

lightboxImage.forEach((item) => {
  (item as HTMLImageElement).addEventListener('click', () => {
    lightboxImage.forEach((img) => img.classList.remove('active'))
    item.classList.add('active')
    defaultImage.src = (item as HTMLImageElement).src;

  })
})

if (defaultImage) {
  defaultImage.addEventListener('click', () => {
    const preview: HTMLDivElement = document.createElement('div');
    const closeImg: HTMLImageElement = document.createElement('img');
    const previewImg: HTMLImageElement = document.createElement('img');
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('preview-lightbox')

    function showImage(index: number, targetImg: HTMLImageElement, images: string[]) {
      targetImg.src = images[index];
    }


    const images = Array.from(thumbnail).map(img => img.src);
    let currentIndex = 0;
    thumbnail.forEach((item, index) => {
      const image = document.createElement('img')
      image.addEventListener('click', () => {
        currentIndex = index;
        previewImg.src = images[currentIndex]
      })
      image.classList.add('lightbox-img')
      image.src = item.src;
      thumbnailContainer.append(image)
    })

    preview.classList.add('preview-container');

    //next and previous buttons
    const nextIcon = document.createElement('img');
    nextIcon.classList.add('next-btn')
    const previousIcon = document.createElement('img');
    previousIcon.classList.add('prev-btn')
    nextIcon.src = controlBtns[0].src;
    previousIcon.src = controlBtns[1].src;
    const btns = document.createElement('div');
    btns.classList.add('btns')
    btns.append(nextIcon, previousIcon)

    defaultImage.src = images[currentIndex]

    //go to previous image
    previousIcon.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex, previewImg, images);
    });

    //go to next image
    nextIcon.addEventListener('click', () => {
      currentIndex = (currentIndex + 1 + images.length) % images.length;
      showImage(currentIndex, previewImg, images);
    });

    //preview clicked image
    previewImg.src = defaultImage.src;
    previewImg.style.width = '350px'
    previewImg.style.borderRadius = '10px'

    //close image
    closeImg.src = ctrlImgs[5].src;
    closeImg.style.position = "relative"
    closeImg.classList.add('close-thumbnail')
    // closeImg.style.bottom = "0px"

    //append all images
    preview.append(closeImg);
    preview.append(nextIcon, previousIcon);
    preview.append(previewImg);
    preview.append(thumbnailContainer)
    document.body.append(preview)

    //close preview
    closeImg.addEventListener('click', () => preview.remove());
  })
}

//when next and previous buttons are clicked on mobile, display respective thumbnail images
let currentIndex = 0; // start with first image
const mobileImages = [...thumbnail]; // copy array

const defaultMobileImg = document.getElementsByClassName('mobile-shoe-image')[0] as HTMLImageElement;
defaultMobileImg.src = mobileImages[currentIndex].src;

const next = document.getElementsByClassName('mobile-next-btn')[0] as HTMLDivElement;
next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % mobileImages.length;
  defaultMobileImg.src = mobileImages[currentIndex].src;
});

const prev = document.getElementsByClassName('mobile-prev-btn')[0] as HTMLDivElement;
prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + mobileImages.length) % mobileImages.length;
  defaultMobileImg.src = mobileImages[currentIndex].src;
});


const productName: HTMLParagraphElement = document.createElement('p');
const cartItem = document.createElement('div');
const product = document.createElement('div');
const productImg: HTMLImageElement = document.createElement('img');
const totalPrice: HTMLDivElement = document.createElement('div');
const checkoutbtn = document.getElementsByClassName('checkout-btn')[0]
const productsAdded: HTMLDivElement = document.createElement('div')
productsAdded.classList.add('products-added');

let defaultValue = document.getElementsByClassName('value')[0]

const total: HTMLSpanElement = document.createElement('span');
total.classList.add('display-total')
total.style.fontSize = '16px';
total.style.color = 'hsl(220, 14%, 75%)';

let quantity: HTMLSpanElement = document.createElement('span');
quantity.style.fontSize = '16px';
quantity.style.color = 'hsl(220, 14%, 75%)';
quantity.textContent = defaultValue.textContent;

const price = document.createElement('span');
price.textContent = '$125.00'
// const price = document.getElementsByClassName('price')[0] as HTMLSpanElement;
let priceValue = Number(price.textContent.replace(/[^0-9.]/g, ''));
price.style.fontSize = '16px'
price.style.color = 'hsl(220, 14%, 75%)';


function getTotalPrice(val1: number, val2: number): number {
  const value1 = Number(val1 || 0);
  const value2 = Number(val2 || 0);
  return value1 * value2;
}

const increaseBtn = document.getElementsByClassName('increase-btn')[0];
increaseBtn.addEventListener('click', () => {
  if (defaultValue.textContent) {
    Number(defaultValue.textContent)
    const currentValue: number = Number(defaultValue.textContent)
    const newValue: number = currentValue + 1;
    defaultValue.textContent = newValue.toString();
    quantity.textContent = newValue.toString();
    let quantityValue = Number(quantity.textContent)
    let newTotal = getTotalPrice(priceValue, quantityValue)
    quantity.textContent = quantityValue.toString();
    total.innerHTML = `
  <span class="single-price">$${priceValue.toFixed(2)}</span> 
  x <span class="quantity">${quantityValue}</span> 
  <strong class="total-price">$${newTotal.toFixed(2)}</strong>
`;
  }
}
)

const decreaseBtn = document.getElementsByClassName('decrease-btn')[0]
decreaseBtn.addEventListener('click', () => {
  if (defaultValue.textContent) {
    Number(defaultValue.textContent)
    const currentValue: number = Number(defaultValue.textContent)
    if (currentValue >= 1) {
      const newValue: number = currentValue - 1;
      defaultValue.textContent = newValue.toString();
      quantity.textContent = newValue.toString();
      let quantityValue = Number(quantity.textContent)
      let newTotal = getTotalPrice(priceValue, quantityValue)
      quantity.textContent = quantityValue.toString();
      total.innerHTML = `
  <span class="single-price">$${priceValue.toFixed(2)}</span> 
  x <span class="quantity">${quantityValue}</span> 
  <strong class="total-price">$${newTotal.toFixed(2)}</strong>
`;
    }
  }
})

const cartContainer: HTMLDivElement = document.createElement('div');
const cartIcon = document.getElementsByClassName('cart-icon')[0];
cartContainer.classList.add('cart-container');
const containertitle: HTMLParagraphElement = document.createElement('p')
containertitle.classList.add('cart')
containertitle.textContent = 'Cart'
cartContainer.append(containertitle)


// to check if the cart container is empty
const containerContent = document.createElement('div')
if (productsAdded.children.length === 0) {
  containerContent.textContent = 'Your cart is empty'
  containerContent.classList.add('container-content')
  cartContainer.append(containerContent)
}

cartIcon.addEventListener('click', () => {
  cartContainer.classList.toggle('show');
})

cartIcon.append(cartContainer);
cartContainer.append(productsAdded, checkoutbtn);

const addToCart = Array.from(document.querySelectorAll('.cart-btn'));

let imageAppended: boolean = false; // to track if image has been added to cart container
let deleteProduct: HTMLImageElement
addToCart.forEach(button => {
  button.addEventListener('click', () => {
    // if imageAppended is false, not true
    if (!imageAppended) {
      containerContent.style.display = 'none'; // hide 'your cart is empty'

      // product image
      productImg.src = ctrlImgs[0].src;
      productImg.classList.add('cart-product');
      productImg.style.width = '70px';
      productImg.style.height = '50px';

      //product name
      productName.textContent = 'Fall Limited Edition Sneakers'
      productName.style.fontSize = '13px'
      productName.style.color = 'hsl(220, 14%, 75%)';

      totalPrice.append( total);

      //append name and totalPrice to product to style it
      product.append(productName, totalPrice);
      product.classList.add('product-description');

      if (!deleteProduct) {
        deleteProduct = document.createElement('img');
        deleteProduct.src = ctrlImgs[6].src;
        deleteProduct.addEventListener('click', () => {
          cartItem.remove();
          checkoutbtn.remove();
          imageAppended = false;

          if (productsAdded.children.length === 0) {
            containerContent.style.display = 'block';
          }
        })
      }
      cartItem.classList.add('product-display')
      cartItem.append(productImg, product, deleteProduct);
      productsAdded.append(cartItem);
      imageAppended = true;

      //button to checkout after adding product
      checkoutbtn.classList.add('checkoutbtn');

      const cartData = {
        name: productName.textContent,
        quantity: quantity.textContent,
        total: total.textContent
      };
      localStorage.setItem('cart', JSON.stringify(cartData));

    }
  })
});