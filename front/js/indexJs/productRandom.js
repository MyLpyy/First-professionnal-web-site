/* const API_ENDPOINT = "http://82.66.182.120:4001"; */
const API_ENDPOINT = "http://localhost:4001";


const renderProduct = async () => {
    try {
        const response = await fetch(`${API_ENDPOINT}/products/randomProducts`);
        const product = await response.json();

        let container = document.querySelector("#randomItems");
        product.forEach (element => {
            let content = `
            <a href="./product.html?id=${element.id}">
                <article>
                    <img src="${element.img_path}" alt="${element.name}">
                    <h3 class="productName">${element.name}</h3>
                    <h4 class="productPrice">${element.price} €</h4>
                    <p class="productDescription">${element.description}</p>
                </article>
            </a>
            `
            container.innerHTML += content;
        });

    } catch (err) {
        console.log(err);
    }
}
renderProduct();