const API_ENDPOINT = "http://localhost:4001";

const getUserLogin = () => {
    const form = document.querySelector(".LoginForm");
    return form;
};

const logVerification = async (email) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${email.username.value}&col=email`);
        const userData = await response.json();
        return userData[0];
    } catch (err) {
        console.log(err);
    }
};

const logUser = async () => {
    const logButton = document.getElementById("loginButton");
    logButton.addEventListener("click", async () => {
        try {
            const dbData = await logVerification(getUserLogin());
            const formData = getUserLogin();
            if (dbData.password === formData.password.value) {
                console.log("login correct");
            } else {
                console.log("login incorrect");
            }
        } catch (err) {
            console.log(err);
        }
    });
}
logUser();