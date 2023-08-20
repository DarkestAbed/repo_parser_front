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
                let li = document.createElement("li");
                let name = document.createElement("h2");
                let description = document.createElement("li");
                let createdAt = document.createElement("li");
                let updatedAt = document.createElement("li");
                let homepage = document.createElement("li");
                let repoURL = document.createElement("li");
                let languages = document.createElement("li");
                let topics = document.createElement("small");

                name.innerHTML = `Repo: ${repo.name}`;
                description.innerHTML = `${repo.description}`;
                createdAt.innerHTML = `Creado: ${repo.created_at}`;
                updatedAt.innerHTML = `Último push: ${repo.pushed_at}`;
                if (repo.homepage !== null) {
                    homepage.innerHTML = `🏠: ${repo.homepage}`;
                };
                if (repo.url !== null) {
                    repoURL.innerHTML = `GitHub URL: https://github.com/${repo.url}`;
                };
                if (repo.language !== null) {
                    languages.innerHTML = `⚙️: ${repo.language}`;
                };
                if (repo.topics !== "") {
                    topics.innerHTML = `Temas: ${repo.topics}`;
                };


                li.appendChild(name);
                li.appendChild(description);
                li.appendChild(createdAt);
                li.appendChild(updatedAt);
                li.appendChild(repoURL);
                if (repo.homepage !== null) {
                    li.appendChild(homepage);
                };
                if (repo.language !== null) {
                    li.appendChild(languages);
                };
                if (repo.topics !== "") {
                    li.appendChild(topics);
                };
                list.appendChild(li);
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
