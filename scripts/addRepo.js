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
        console.log(urlPOST);
        // Process to send XHR
        console.log("Sending data");
        const XHR = new XMLHttpRequest();
        const urlEncodedDataPairs = [];
        // Turn the data object into an array of URL-encoded key/value pairs.
        for (const [name, value] of Object.entries(data)) {
            urlEncodedDataPairs.push(
                `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
            );
        }
        // Combine the pairs into a single string and replace all %-encoded spaces to
        // the '+' character; matches the behavior of browser form submissions.
        const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
        // Define what happens on successful data submission
        XHR.addEventListener("load", (event) => {
            alert("Yeah! Data sent and response loaded.");
        });
        // Define what happens in case of an error
        XHR.addEventListener("error", (event) => {
            alert("Oops! Something went wrong.");
        });
        // Set up our request
        XHR.open("POST", urlPOST);
        // Add the required HTTP header for form data POST requests
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader('Access-Control-Allow-Origin', '*');
        // Finally, send our data.
        XHR.send(urlEncodedData);
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
