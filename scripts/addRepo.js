const btn = document.querySelector("#add-btn");
const form = document.querySelector("#add-repo");
const url = form.querySelector("#url-input");
const textInput = document.querySelector("#url-input");

function getURL(url) {
    try {
        const newURL = new URL(url);
        console.log("URL es valida");
        console.log("GitHub repo path:", newURL.pathname.substring(1));
    } catch (error) {
        console.log(error); // => TypeError
        alert("La URL no es un repo de GitHub válido");
    }
};

function sendData() {
    const urlValue = url.value
    if (urlValue === "") {
        alert("El campo está vacío");
    } else {
        getURL(urlValue);
    };
};

function reset(item) {
    item.value = "";
}

btn.addEventListener("click", () => {
    sendData();
    reset(textInput);
});
