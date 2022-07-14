const API_ENDPOINT = "http://localhost:4001";

let userToken = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

const getUserToken = async (userId) => {
    try {
        if (userId !== null) {
            const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${userId}&col=id`);
            const token = await response.json();
            return token[0].token;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
};

const auto_login = async () => {
    try {
        const DbToken = await getUserToken(userId);
        if (userToken !== null) {
            if (userToken === DbToken) {
                const popup = document.querySelector("#loggedPopup");
                const account = document.querySelector("#account");
                const editProfile = document.querySelector("#editProfile");
                popup.classList.add('active');
                account.setAttribute('href', `./userAccount.html?id=${userId}`);
                editProfile.setAttribute('href', `./editAccount.html?id=${userId}`);
            } else {
                const popup = document.querySelector("#loginPopup");
                popup.classList.add('active');
            }
        } else {
            const popup = document.querySelector("#loginPopup");
            popup.classList.add('active');
        }
    } catch (err) {
        console.log(err);
    }
}

const accountMenu = () => {
    const menuButton = document.querySelector("#menuButton");
    menuButton.addEventListener("click", () => {
        auto_login();
    });
}
accountMenu();

const logout = (id) => {
    const logoutButton = document.querySelector("#logoutButton");
    logoutButton.addEventListener("click", async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/customers/setToken`, {
                method: "PUT",
                body: JSON.stringify({
                    "id":  id,
                    "token": null
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
    
            window.location.replace("./index.html");
    
            const res = await response.json();
            console.log(res);
            return res;
        } catch (err) {
            console.log(err);
        }
    });
}
logout(userId);