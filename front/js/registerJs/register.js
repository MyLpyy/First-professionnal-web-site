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

const registerNewCustomer = async () => {
    const registerButton = document.querySelector("#registerButton");
    registerButton.addEventListener("click", async () => {
        try {
            const customer = getCustomerData();

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
                        window.alert("Email invalide !")
                    }
    
                } else {
                    window.alert("Veuillez renseigner un nom et prenom valide")
                }
            } else {
                window.alert("Les mot de passe ne sont pas identique")
            }

        } catch (err) {
            console.log(err);
        }
    });
}
registerNewCustomer();






/* if (input.value != document.getElementById('password').value) {
    input.setCustomValidity('Password Must be Matching.');
} else {
    // input is valid -- reset the error message
    input.setCustomValidity('');
} */