const API_ENDPOINT = "http://82.66.182.120:4001";
const search = new URLSearchParams(window.location.search);
const id = search.get("id");

const renderProduct = async (product_id) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/products/getById?id=${product_id}`);
        const res = await response.json();
        const product = res[0];
        const productImg = document.querySelector(".productImg");
            productImg.innerHTML = `<img src="${product.img_path}" alt="${product.name}">`;
        const productName = document.querySelector(".productName");
            productName.innerHTML = product.name;
        const productType = document.querySelector(".productType");
            productType.innerHTML = product.type
        const productGenre = document.querySelector(".productGenre");
            productGenre.innerHTML = product.genre;
        const productDesc = document.querySelector(".productDesc");
            productDesc.innerHTML = product.description;
        const productSize = document.querySelector(".productSize");
            productSize.innerHTML = product.size;
        const productPrice = document.querySelector(".price");
            productPrice.innerHTML = product.price;
    } catch (err) {
        console.log(err);
    }
}
renderProduct(id);