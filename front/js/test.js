import { getProduct, addNewProduct } from "../api/products.js";

let product = {
    description: "t",
    img_path: "/test.png",
    price: 390.90,
    name: "max",
    size: "SMALL",
    type: "sneackers",
    genre: "t"
}

function addProduct() {
    const addBtn = document.getElementById("addProduct");
    addBtn.addEventListener("click", function () {
        getProduct();
        /*addNewProduct(product.description, product.img_path, product.price, product.name, product.size, product.type, product.genre);*/
    });
} addProduct();