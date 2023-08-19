const btnPut = document.querySelector("#add-btn");
const form = document.querySelector("#add-repo");
const url = form.querySelector("#url-input");
const textInput = document.querySelector("#url-input");

function getURL(url) {
    try {
        const newURL = new URL(url);
        if (newURL.hostname != "github.com" && newURL.hostname != "www.github.com") {
            alert("La URL entregada no es de GitHub");
            throw new Error("Not a valid GitHub URL");
        };
        if (newURL.pathname.substring(1) === "") {
            alert("La URL entregada no corresponde a un repo de GitHub");
            throw new Error("Not a valid GitHub repo URL");
        };
        if (!newURL.pathname.substring(1).includes("/")) {
            alert("La URL entregada no corresponde a un repo de GitHub");
            throw new Error("Not a valid GitHub repo URL");
        };
        return newURL.pathname.substring(1);
    } catch (error) {
        console.log(error);
    };
};

function sendData(data) {
    const urlValue = url.value
    if (urlValue === "") {
        alert("El campo está vacío");
    } else {
        const repoPath = getURL(urlValue);
        const repoReplaced = repoPath.replace("/", "&sol");
        const urlPOST = `http://127.0.0.1:8000/put-new-repo/${repoReplaced}`;
        // Process to fend fetch
        let request = new Request(urlPOST, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                "Content-Type": "application/json; charset=latin-1",
                'Access-Control-Allow-Origin': '*'
            })
        });
        
        console.log("Sending data");
        const response = fetch(request);
        console.log(response);
        console.log(response.ok);
    };
};

function reset(item) {
    item.value = "";
}

btnPut.addEventListener("click", () => {
    try {
        sendData({test: "ok"});
        reset(textInput);
    } catch (error) {
        console.log(error);
    }
});
