import { API_ENDPOINT } from "./index.js";

export const addNewProduct = async (newDescription, newImg_path, newPrice, newName, newSize, newType, newGenre) => {
    console.log("1");
    try {
    const response = await fetch(`${API_ENDPOINT}/products`, {
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

export const getProduct = async (newDescription, newImg_path, newPrice, newName, newSize, newType, newGenre) => {
    try {
    const response = await fetch(`http://localhost:4001/products`);
    const allProduct = await response.json();
    console.log(allProduct.data[1].price);
} catch (err) {
    console.log(err)
}
};