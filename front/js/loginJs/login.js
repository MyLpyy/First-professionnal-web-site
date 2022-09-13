const API_ENDPOINT = "http://82.66.182.120:4001";
/* const API_ENDPOINT = "http://localhost:4001"; */

const getUserLogin = () => {
    const form = document.querySelector(".LoginForm");

    return form;
};

const tokenGen = () => {
    const rand1 = Math.random().toString(36).substr(2);
    const rand2 = Math.random().toString(36).substr(2);
    const token = rand1 + rand2;
    return token;
};

const getUserData = async (email) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${email.username.value}&col=email`);
        const userData = await response.json();
        return userData[0];
    } catch (err) {
        console.log(err);
    }
};

const logUser = async (token, id) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/setToken`, {
            method: "PUT",
            body: JSON.stringify({
                "id":  id,
                "token": token
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);

        window.location.replace("./index.html");

        const res = await response.json();
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

const loginVerification = async () => {
    const logButton = document.getElementById("loginButton");
    logButton.addEventListener("click", async () => {
        try {
            const dbData = await getUserData(getUserLogin());
            const formData = getUserLogin();
            if (formData.username.value !== '') {
                if(typeof dbData !== 'undefined') {
                    if (dbData.password === formData.password.value) {
                        const token = tokenGen();
                        logUser(token, dbData.id);
                    } else {
                        const popup = document.querySelector("#popup");
                        const overlay = document.querySelector("#overlay");
                        popup.classList.add('active');
                        overlay.classList.add('active');
                    }
                } else {
                    const popup = document.querySelector("#popup");
                    const overlay = document.querySelector("#overlay");
                    popup.classList.add('active');
                    overlay.classList.add('active');
                }
            } 
        } catch (err) {
            console.log(err);
        }
    });
}
loginVerification();

const popupButton = () => {
    const popup = document.querySelector("#popup");
    const overlay = document.querySelector("#overlay");
    const retryButton = document.querySelector("#retryButton");
    const registerButton = document.querySelectorAll("#registerButton");

    overlay.addEventListener("click", () => {
        popup.classList.remove('active');
        overlay.classList.remove('active');
    });

    registerButton.forEach(button => {
        button.addEventListener("click", () => {
            window.location.replace("./registration.html");
        })
    });

    retryButton.addEventListener("click", () => {
        popup.classList.remove('active');
        overlay.classList.remove('active');
    });

}
popupButton();