/* const API_ENDPOINT = "http://82.66.182.120:4001"; */
const API_ENDPOINT = "http://localhost:4001";

const getCustomerData = () => {

    const form = document.querySelector(".registrationForm");

    const customer = {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        phone_number: form.phoneNumber.value,
        email: form.email.value,
        password: form.password.value,
        passwordConfirme: form.passwordConfirme.value
    }

    return customer;
};

const getExistingCustomer = async () => {
    try {
        const customerEmail = getCustomerData();

        const response = await fetch(`${API_ENDPOINT}/customers/getByValues?value=${customerEmail.email}&col=email`);
        const customer = await response.json();

        if (typeof customer[0] !== 'undefined') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};

const renderCustomerData = () => {

    const customer = getCustomerData();
    const data = {};

    for (const [key, value] of Object.entries(customer)) {
        if (value !== '' && key !== 'passwordConfirme') {
            data[key] = value;
        }
    }

    return data;
}

const registerNewCustomer = async () => {
    const registerButton = document.querySelector("#registerButton");
    registerButton.addEventListener("click", async () => {
        try {
            const customerBody = renderCustomerData();
            const customerForm = getCustomerData();
            const customerExiste = await getExistingCustomer();

            if (!customerExiste) {
                if (customerForm.password === customerForm.passwordConfirme) {
                    if (!customerForm.firstname.match(/([^a-zA-Z- éèâà])/) && !customerForm.lastname.match(/([^a-zA-Z- ])/)) {
                        if (customerForm.email.match(/\S+@\S+\.\S+/)) {
                            const response = await fetch(`${API_ENDPOINT}/customers/add`, {
                                method: "POST",
                                body: JSON.stringify(customerBody),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                
                            window.location.replace("./index.html");
                
                            const res = await response.json();
                            console.log(res);
                            return res;
                        } else {
                            window.alert("Email invalide !");
                        }
                
                    } else {
                        window.alert("Veuillez renseigner un nom et prenom valide");
                    }
                } else {
                    window.alert("Les mot de passe ne sont pas identique");
                }
            } else {
                window.alert("L'email renseigner est déjà utilisée");
            }

        } catch (err) {
            console.log(err);
        }
    });
}
registerNewCustomer();