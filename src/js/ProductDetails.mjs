import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Get product data
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render HTML
    this.renderProductDetails();

    // 3. Attach event listener
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("img");
    if (productImage) {
      productImage.src = product.Image;
      productImage.alt = product.NameWithoutBrand;
    }

    document.querySelector(".product-card__price").textContent = product.FinalPrice;
    document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector(".product-detail__add").dataset.id = product.Id;
  }
};


