/* const API_ENDPOINT = "http://82.66.182.120:4001"; */
const API_ENDPOINT = "http://localhost:4001";
const search = new URLSearchParams(window.location.search);
const id = search.get("id");
const menu = search.get("menu");

const accountButtonMenu = (userId) => {

    const information = document.querySelector("#informationButton");
    const edit = document.querySelectorAll("#editButton");
    const history = document.querySelector("#historyButton");
    const feedback = document.querySelector("#feedbackButton");
    const logoutMenu = document.querySelector("#logoutMenuButton");

    information.addEventListener("click", () => {
        window.location.replace(`./userAccount.html?id=${userId}&menu=1`);
    });
    edit.forEach(button =>{
        button.addEventListener("click", () => {
            window.location.replace(`./userAccount.html?id=${userId}&menu=2`);
        });
    });
    history.addEventListener("click", () => {
        window.location.replace(`./userAccount.html?id=${userId}&menu=3`);
    });
    feedback.addEventListener("click", () => {
        window.location.replace(`./userAccount.html?id=${userId}&menu=4`);
    });
    logoutMenu.addEventListener("click", () => {
        logout(userId);
    });

}
accountButtonMenu(id);

const accountMenu = (menuId) => {

    const information = document.querySelector(".accountInformationData");
    const edit = document.querySelector(".editAccountData");
    const history = document.querySelector(".orderHistoryData");
    const feedback = document.querySelector(".feedBackData");

    switch (menuId) {

        case "1": information.classList.add('active');
            break;
        
        case "2": edit.classList.add('active');
            break;
        
        case "3": history.classList.add('active');
            break;
        
        case "4": feedback.classList.add('active');
            break;

        default: {
            console.log("Error Whith Account Menu");
            window.alert("Error with Account Menu")
            window.location.replace("./index.html");
        }

    }
}
accountMenu(menu);

const accountInformation = async (id) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${id}&col=id`);
        const res = await response.json();
        const customerInfo = res[0];
        const firstname = document.querySelector('.firstname');
            firstname.innerHTML = customerInfo.firstname;
        const lastname = document.querySelector('.lastname');
            lastname.innerHTML = customerInfo.lastname;
        const phoneNumber = document.querySelector('.phoneNumber');
            phoneNumber.innerHTML = `0${customerInfo.phone_number}`;
        const email = document.querySelector('.email');
            email.innerHTML = customerInfo.email;
    } catch (err) {
        console.log(err);
    }
}
accountInformation(id);

const getEditForm = () => {
    
    const form = document.querySelector(".editForm");

    const editData = {
        phone_number: form.phoneNumber.value,
        email: form.email.value,
        currentPassword: form.password.value,
        password: form.newPassword.value,
        passwordConfirme: form.newPasswordConfirme.value
    }

    return editData;
}

const renderEditData = () => {

    const customer = getEditForm();
    const data = {};

    for (const [key, value] of Object.entries(customer)) {
        if (value !== '' && key !== 'passwordConfirme' && key !== 'currentPassword') {
            data[key] = value;
        }
    }

    return data;
}

const getPasswordConfirmation = async (id) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${id}&col=id`);
        const password = await response.json();
        const passwordForm = getEditForm();

        if (password[0].password === passwordForm.currentPassword) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

const editAccount = async (userId) => {
    const editButton = document.querySelector('#editConfirmeButton');
    editButton.addEventListener("click", async () => {
        try {
            const editForm = getEditForm();
            const EditData = renderEditData();
            const passwordConfirmation = await getPasswordConfirmation(userId);
            const editedPopup = document.querySelector('.editPopup');
            const overlay = document.querySelector('#overlay');

            if (passwordConfirmation) {
                if (editForm.password === editForm.passwordConfirme) {
                    for (const [key, value] of Object.entries(EditData)) {
                        const response = await fetch(`${API_ENDPOINT}/customers/update`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                "id": userId,
                                "updateCol": key,
                                "value": `"${value}"`
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const res = await response.json();
                        console.log(res);
                    }
                    editedPopup.classList.add('active');
                    overlay.classList.add('active');

                } else {
                    window.alert('Les mots de passe ne correspondent pas !');
                }
            } else {
                window.alert('Mot de passe incorrect !');
            }
        } catch (err) {
            console.log(err);
        }
    });
}
editAccount(id);

const editPopup = () => {
    const editedButton = document.querySelector('#editedButton');
    const editedPopup = document.querySelector('.editPopup');
    const overlay = document.querySelector('#overlay');
    editedButton.addEventListener("click", () => {
        editedPopup.classList.remove('active');
        overlay.classList.remove('active');
    });
    overlay.addEventListener("click", () => {
        editedPopup.classList.remove('active');
        overlay.classList.remove('active');
    });
}
editPopup();

const orderHistory = async () => {

}
orderHistory();

const feedBack = async () => {

}
feedBack();

const logout = async (id) => {

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

};