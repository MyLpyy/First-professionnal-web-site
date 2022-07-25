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

}
accountInformation(id);

const editAccount = async () => {

}
editAccount();

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