

var swiper = new Swiper (".container", {
  spaceBetween:20,
  loop:true,
  autoplay: {
    delay: 55000,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    568: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    968: {
      slidesPerView: 5,
    },
  },
});


// cart
let cartIcon =document.querySelector('#cart-icon');
let cart =document.querySelector('.cart');
let closeCart =document.querySelector('#close-cart');
let addCart = document.querySelector('.add-cart');
//Open cart
cartIcon.onclick = () => {
  cart.classList.add('active')
};

closeCart.onclick = () => {
  cart.classList.remove('active')
};




//cart working js
if(document.readyState == "loading"){
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

// making function
function ready(){
  //Remove items from cart
  var removeCartButtons =document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for (var i =0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  // quantity changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i =0; i < quantityInputs.length; i++){
    var input =quantityInputs[i];
    input.addEventListener('change', quantityChanges);
  }

  // add to cart 
  var addCart = document.getElementsByClassName('add-cart')
  for (var i =0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // buy button work
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}

//buy button clicked
var buyButtonClicked = () => {
  alert('Your order is placed')
  var cartContent =document.getElementsByClassName('cart-content')[0];
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Remove items from cart
var removeCartItem = (event) => {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal()
}

//quantity changes
var quantityChanges = (event) =>{
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updateTotal();
}

// add to cart
var addCartClicked = (event) => {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
  var price = shopProduct.getElementsByClassName('price')[0].innerText;
  var productDivImg = shopProduct.getElementsByClassName('box-image')[0];
  var productImg = productDivImg.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

var addProductToCart = (title, price, productImg) => {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i =0; i < cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText == title){
      alert('You have already add this product to cart');
      return;
    }
  }
  var cartBoxContent = `
                        <img src="${productImg}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class="bx bxs-trash-alt cart-remove" ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.
    getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
    cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanges);
}



// Update total
var updateTotal = () =>{
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i =0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("PLN", ""))
    var quantity = quantityElement.value
    total = total + (price * quantity);
  }
    // if price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'PLN'+ " " + total;
}

// search 

function handleInput() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim().toLowerCase();
  const resultsDiv = document.getElementById('results');
  const productList = document.getElementById('productList');
  const productListItems = productList.querySelectorAll('.box');
  let found = false;

  if (searchTerm === '') {
      // Hide results div when no search term
      resultsDiv.style.display = 'none';
  } else {
      // Clear previous results
      resultsDiv.innerHTML = '';

      productListItems.forEach(product => {
          const productName = product.getAttribute('data-name').toLowerCase();

          if (productName.includes(searchTerm)) {
              const nameElement = document.createElement('span');
              nameElement.className = 'search-result-name';
              nameElement.textContent = product.getAttribute('data-name');
              nameElement.onclick = () => showDetails(product);
              resultsDiv.appendChild(nameElement);
              resultsDiv.appendChild(document.createElement('br'));
              found = true;
          }
      });

      if (!found) {
          resultsDiv.innerHTML = '<p>No products found.</p>';
      }

      // Show results div
      resultsDiv.style.display = 'block';
  }
}

function showDetails(product) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results
  product.style.display = 'block'; // Show selected product details
  resultsDiv.appendChild(product.cloneNode(true));
}