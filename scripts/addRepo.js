const btn = document.querySelector("#add-btn");
const form = document.querySelector("#add-repo");

function getURL() {
    let url = form.querySelector("#url-input").value;
    try {
        const newURL = new URL(url);
        console.log("URL es valida");
        console.log("GitHub repo path:", newURL.pathname.substring(1));
    } catch (error) {
        console.log(error); // => TypeError
    }
};

function sendData() {
    // console.log("Testeando el click del botón!");
    // alert("Testeando alertas con click!");
    getURL();
};

btn.addEventListener("click", () => {
    sendData();
});