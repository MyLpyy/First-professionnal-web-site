const API_ENDPOINT = "http://localhost:4001";

let userToken = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

const getUserToken = async (userId) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${userId}&col=id`);
        const token = await response.json();
        return token[0].token;
    } catch (err) {
        console.log(err);
    }
};

const auto_login = async () => {
    try {
        const DbToken = await getUserToken(userId);
        if (userToken !== null) {
            if (userToken === DbToken) { 
                let container = document.querySelector("#nav_panel");
                container.innerHTML += `
                <a class="logged_button" href="">
                <li>My Account</li>
                </a>`
            } else {
                let container = document.querySelector("#nav_panel");
                container.innerHTML += `
                <a class="logged_button" href="./login.html">
                <li>Login</li>
                </a>`
            }
        } else {
            let container = document.querySelector("#nav_panel");
            container.innerHTML += `
            <a class="logged_button" href="./login.html">
            <li>Login</li>
            </a>`
        }
    } catch (err) {
        console.log(err);
    }
}
auto_login(); 
