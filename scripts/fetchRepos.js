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
                let description = document.createElement("p");
                let createdAt = document.createElement("p");
                let updatedAt = document.createElement("p");
                let homepage = document.createElement("p");
                let languages = document.createElement("p");
                let topics = document.createElement("small");

                name.innerHTML = `${repo.name}`;
                description.innerHTML = `${repo.description}`;
                createdAt.innerHTML = `${repo.created_at}`;
                updatedAt.innerHTML = `${repo.updated_at}`;
                homepage.innerHTML = `${repo.homepage}`;
                languages.innerHTML = `${repo.language}`;
                topics.innerHTML = `${repo.topics}`;

                li.appendChild(name);
                li.appendChild(description);
                li.appendChild(createdAt);
                li.appendChild(updatedAt);
                if (homepage.innerHTML !== "null") {
                    li.appendChild(homepage);
                };
                if (languages.innerHTML !== "null") {
                    li.appendChild(languages);
                };
                if (!topics.innerHTML !== "null") {
                    li.appendChild(topics);
                };
                list.appendChild(li)
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
