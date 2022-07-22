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
                const feedback = document.querySelector("#feedback");
                const overlay = document.querySelector("#menuOverlay");
                overlay.classList.add('active');
                popup.classList.add('active');
                account.setAttribute('href', `./userAccount.html?id=${userId}&menu=1`);
                editProfile.setAttribute('href', `./userAccount.html?id=${userId}&menu=2`);
                feedback.setAttribute('href', `./userAccount.html?id=${userId}&menu=3`);
            } else {
                const popup = document.querySelector("#loginPopup");
                const overlay = document.querySelector("#menuOverlay");
                overlay.classList.add('active');
                popup.classList.add('active');
            }
        } else {
            const popup = document.querySelector("#loginPopup");
            const overlay = document.querySelector("#menuOverlay");
            overlay.classList.add('active');
            popup.classList.add('active');
        }
    } catch (err) {
        console.log(err);
    }
}

const accountMenu = () => {
    const menuButton = document.querySelector("#menuButton");
    const menuOverlay = document.querySelector("#menuOverlay");

    menuButton.addEventListener("click", () => {
        auto_login();
    });

    menuOverlay.addEventListener("click", () => {
        const popup1 = document.querySelector("#loginPopup");
        const popup2 = document.querySelector("#loggedPopup");
        const overlay = document.querySelector("#menuOverlay");
        overlay.classList.remove('active');
        popup1.classList.remove('active');
        popup2.classList.remove('active');
    });
}
accountMenu();

const logout = async (id) => {
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