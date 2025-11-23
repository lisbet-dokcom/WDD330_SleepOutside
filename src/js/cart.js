import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const items = getLocalStorage("so-cart") || [];
const cartList = document.querySelector(".product-list");

function renderCartContents() {
  if (!cartList) return;
  cartList.innerHTML = items.map(cartItemTemplate).join("");
  // const cartItems = getLocalStorage("so-cart");
  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const qty = item.qty || 1;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
      <div class="wrapper">
        <span class="minus">-</span>
        <span class="num">${qty < 10 ? "0" + qty : qty}</span>
        <span class="plus">+</span>
      </div>
    </div>
  <p class="cart-card__price" data-price="${item.FinalPrice}">$${item.FinalPrice * qty}</p>
</li>`;

  return newItem;
}

document.querySelector(".product-list").innerHTML =
  items.map(cartItemTemplate).join("");


function cartQuantity() {
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  const numElements = document.querySelectorAll(".num");
  const priceElements = document.querySelectorAll(".cart-card__price");

  plusButtons.forEach((plus, index) => {
    plus.addEventListener("click", () => {
      let value = Number(numElements[index].textContent);
      value++;
      numElements[index].textContent = value < 10 ? "0" + value : value;

      items[index].qty = value;
      setLocalStorage("so-cart", items);

      const basePrice = Number(priceElements[index].dataset.price);
      priceElements[index].textContent = `$${(basePrice * value).toFixed(2)}`;
    });
  });

  minusButtons.forEach((minus, index) => {
    minus.addEventListener("click", () => {
      let value = Number(numElements[index].textContent);
      if (value > 1) {
        value--;
        numElements[index].textContent = value < 10 ? "0" + value : value;
      }

      items[index].qty = value;
      setLocalStorage("so-cart", items);

      // Update the price
      const basePrice = Number(priceElements[index].dataset.price);
      priceElements[index].textContent = `$${(basePrice * value).toFixed(2)}`;
    });
  });

}

renderCartContents();
cartQuantity();
loadHeaderFooter();
