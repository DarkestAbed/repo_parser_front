const ul = document.getElementById("repo-list");
const btnFetch = document.getElementById("fetch-btn");
const list = document.createDocumentFragment();
const urlGet = "http://127.0.0.1:8000/get-local-repos/";

function getAllRepoData() {
    fetch(urlGet)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            let repos = data;
            repos.map(function(repo) {
                let div = document.createElement("div");
                let name = document.createElement("h2");
                let description = document.createElement("p");
                let createdAt = document.createElement("span");
                let updatedAt = document.createElement("span");
                let homepage = document.createElement("span");
                let repoURL = document.createElement("span");
                let languages = document.createElement("span");
                let topics = document.createElement("small");

                div.className = "item"
                name.innerHTML = `Repo: ${repo.name}`;
                description.innerHTML = `${repo.description}`;
                createdAt.innerHTML = `Creado: ${repo.created_at}<br>`;
                updatedAt.innerHTML = `Último push: ${repo.pushed_at}<br>`;
                if (repo.homepage !== null) {
                    homepage.innerHTML = `🏠: <a href="${repo.homepage}" target="_blank">${repo.homepage}</a><br>`;
                };
                if (repo.url !== null) {
                    const urlDisplay = `https://github.com/${repo.url}`
                    repoURL.innerHTML = `GitHub URL: <a href="${urlDisplay}" target="_blank">${urlDisplay}</a><br>`;
                };
                if (repo.language !== null) {
                    languages.innerHTML = `⚙️: ${repo.language}<br>`;
                };
                if (repo.topics !== "") {
                    topics.innerHTML = `Temas: ${repo.topics}`;
                };


                div.appendChild(name);
                div.appendChild(description);
                div.appendChild(createdAt);
                div.appendChild(updatedAt);
                div.appendChild(repoURL);
                if (repo.homepage !== null) {
                    div.appendChild(homepage);
                };
                if (repo.language !== null) {
                    div.appendChild(languages);
                };
                if (repo.topics !== "") {
                    div.appendChild(topics);
                };
                list.appendChild(div);
            });
            ul.appendChild(list);
        })
        .catch(function(error) {
            console.log(error);
        });
};

function cleanUp(root) {
    while(root.firstChild ){
        root.removeChild( root.firstChild );
    };
};

btnFetch.addEventListener("click", () => {
    try {
        cleanUp(ul);
        getAllRepoData()
    } catch (error) {
        console.log(error);
    }
});

window.onload = function () {
    getAllRepoData();
};
