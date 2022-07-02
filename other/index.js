const API_ENDPOINT = "http://localhost:4001";

let product = {
    description: "t",
    img_path: "/test.png",
    price: 390.90,
    name: "max",
    size: "SMALL",
    type: "sneackers",
    genre: "t"
}

const addNewProduct = async (newDescription, newImg_path, newPrice, newName, newSize, newType, newGenre) => {
    console.log("1");
    try {
    const response = await fetch(`${API_ENDPOINT}/products/add`, {
        method: "POST",
        body: JSON.stringify({
            description: newDescription,
            img_path: newImg_path,
            price: newPrice,
            name: newName,
            size: newSize,
            type: newType,
            genre: newGenre
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const newProduct = await response.json();
    console.log(newProduct);
    return newProduct;
} catch (err) {
    console.log(err)
}
};

const getProduct = async () => {
    try {
    const response = await fetch(`${API_ENDPOINT}/products/get`);
    const allProduct = await response.json();
    console.log(allProduct[0]);
} catch (err) {
    console.log(err)
}
};

function addProduct() {
    const addBtn = document.getElementById("addProduct");
    addBtn.addEventListener("click", function () {
         getProduct();
        /*addNewProduct(product.description, product.img_path, product.price, product.name, product.size, product.type, product.genre);*/
    });
} addProduct();