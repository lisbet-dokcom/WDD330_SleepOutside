import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tent");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

productList.init();