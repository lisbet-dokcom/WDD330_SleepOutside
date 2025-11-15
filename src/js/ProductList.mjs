import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2>${product.Brand.Name}</h2>
        </a>
    </li>`;
}

//  <h3>${product.Name}</h3><p>${product.FianlPrice}</p>

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        // const html = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", html.join(""));
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    };
}

