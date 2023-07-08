const content = document.querySelector("#content");
const statsbar = document.querySelector("#statsbar");
const search = document.querySelector("header input");
var stars = 0;
search.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        main(event.target.value);
    }
});

function main(username) {
    stars = 0;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((data) => {
            content.innerHTML = "";
            data.forEach((el) => {
                make_card(
                    el.name,
                    el.description,
                    el.stargazers_count,
                    username
                );
            });
        });
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => make_stats(data, username));
}

function make_card(title_txt, description_txt, star_count, username) {
    const card = document.createElement("div");
    card.classList.add("card");
    content.appendChild(card);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = title_txt;
    card.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("description");
    if (description_txt == null) {
        description.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 480 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#593281}</style><path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"/></svg>`;
    } else {
        description.textContent = description_txt;
    }
    card.appendChild(description);

    const card_footer = document.createElement("div");
    stars += star_count;
    card_footer.classList.add("card-footer");
    card_footer.innerHTML = `<div><i class="fa-solid fa-star"><span>${star_count}</span></div></i
                        ><i class="fa-brands solid fa-github"></i>
                        <i class="fa-solid fa-clipboard"></i>
 `;
    card_footer.querySelector(".fa-github").addEventListener("click", (e) => {
        window.location.href = `https://github.com/${username}/${title_txt}`;
    });
    card.appendChild(card_footer);
}

function make_stats(data, username) {
    document.documentElement.style.setProperty(
        "--avatar-img",
        `url("${data.avatar_url}")`
    );
    document.querySelector("#statsbar #username").textContent = username;
    document.querySelector("#stats #repos").textContent = data.public_repos;
    document.querySelector("#stats #stars").textContent = stars;
    document.querySelector("#stats #followers").textContent = data.followers;
    document.querySelector("#stats #following").textContent = data.following;
}

document.querySelector("#themes").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("dark");
});

main("theodinproject");
