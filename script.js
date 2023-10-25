const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const repo_card = document.getElementById('repo');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);

        returnUserCard(data);
        getRepos(username);
        console.log(data);
    } catch (err) {
        if(err.response.status == 404){
            returnErrorCard("No profile found with the given name");
        }
        console.log(err)
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');

        addToCard(data);
    } catch (error) {
        returnErrorCard("Error: no repos found");
    }
}

function returnUserCard(user) {
    const ID = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : '';
    const userCard = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>

            <div class="user-info">
                <h2>${ID}</h2>
                ${userBio}
                <ul>
                    <li>${user.followers} <strong>followers</strong></li>
                    <li>${user.following} <strong>following</strong></li>
                    <li>${user.public_repos} <strong>public repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = userCard;
}

function returnErrorCard(error) {
    const errorCard = `
        <div class="card">
            <h1>${error}</h1>
        </div>
    `;
    main.innerHTML = errorCard;
}

function returnRepoCard(repo) {
    console.log("pressed");
    console.log(repo);
    const repoCard = `
        <div class="card">
            <div>
                <img class="repo_img" id="repo_img_id">
            </div>
            
            <div class="repo-info">
                <h2>${repo.name}</h2>
                <p class="repodesc">${repo.description}</p>
                <ul>
                    <li>${repo.forks} <strong>forks</strong></li>
                    <li>${repo.stargazers_count} <strong>stars</strong></li>
                    <li>${repo.watchers} <strong>watchers</strong></li>
                </ul>
                <span id="languages-span"></span>
                <div id="languages"></div>
            </div>
        </div>
    `;
    repo_card.innerHTML = repoCard;
}

function addToCard(repos) {
    let card = document.getElementById("repos");
    repos
        .slice(0, 5)
        .forEach(elem => {
            let link = document.createElement("a");
            link.classList.add("repo");
            link.href = "#projectCard";
            link.innerText = elem.name;
            card.appendChild(link);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                returnRepoCard(elem);
                addImgToCard(elem);
            })
        })
}

async function addImgToCard(repo){
    let span_id = document.getElementById("languages-span");
    let langs_id = document.getElementById("languages");
    const repo_langs = repo.languages_url;
    try {
        const { data } = await axios(repo_langs);
        langs_id.textContent = "Languages: " + Object.keys(data).join(", ");
        span_id.innerHTML = createSpan(data);
        console.log("done");
    } catch (error) {
        console.log("Error in language fetch: " + error);
    }
}

function createSpan(data) {
    const returnSpan = document.createElement("span");

    con
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);
        search.value = '';
    }
})

