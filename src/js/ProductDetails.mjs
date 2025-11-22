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
    document.querySelector("#add-to-Cart")
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
      {
        style: 'currency', currency: 'EUR',
      }).format(Number(product.FinalPrice) * 0.85);
    document.getElementById("#p-price").textContent = `${euroPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#add-to-cart").dataset.id = product.Id;

    // document.querySelector(".discount").textContent = `There is a ${discountPercentate}% OFF on this product`;
    // document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    // document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
    // document.querySelector(".product-detail__add").dataset.id = product.Id;

  }
};

// document.querySelector("h2").textContent = product.Brand.Name;
//     document.querySelector("h3").textContent = product.NameWithoutBrand;

//     const productImage = document.getElementById("img");
//     if (productImage) {
//       productImage.src = product.Image.PrimaryExtraLarge;
//       productImage.alt = product.NameWithoutBrand;
//     }
//     document.querySelector(".product-card__price").textContent = `$${product.FinalPrice}`;

//     const finalPrice = product.FinalPrice;
//     const suggesstedPrice = product.SuggestedRetailPrice;

//     const discountAmount = suggesstedPrice - finalPrice;
//     const discountPercentate = Math.round(
//       ((discountAmount / suggesstedPrice) * 100)
//     )