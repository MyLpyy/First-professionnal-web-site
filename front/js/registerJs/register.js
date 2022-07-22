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

const registerNewCustomer = async () => {
    const registerButton = document.querySelector("#registerButton");
    registerButton.addEventListener("click", async () => {
        try {
            const customer = getCustomerData();
            const customerExiste = await getExistingCustomer();

            if (!customerExiste) {
                if (customer.password === customer.passwordConfirme) {
                    if (!customer.firstname.match(/([^a-zA-Z- éèâà])/) && !customer.lastname.match(/([^a-zA-Z- ])/)) {
                        if (customer.email.match(/\S+@\S+\.\S+/)) {
                            const response = await fetch(`${API_ENDPOINT}/customers/add`, {
                                method: "POST",
                                body: JSON.stringify({
                                    "firstname": customer.firstname,
                                    "lastname": customer.lastname,
                                    "phone_number": customer.phone_number,
                                    "email": customer.email,
                                    "password": customer.password
                                }),
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