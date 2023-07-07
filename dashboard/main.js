// fetch("https://api.github.com/users/yogeshdcool/repos")
fetch("./repos.json")
    .then((res) => res.json())
    .then((data) => {
        // console.log(typeof data);
        data.forEach((el) => {
            // console.log(el.name);
            make_card(el.name, el.description);
        });
        // console.log(data.data);
    });
// const content = document.querySelector("#content");
function make_card(title_txt, description_txt) {
    const card = document.createElement("div");
    card.classList.add("card");
    content.appendChild(card);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = title_txt;
    card.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = description_txt;
    card.appendChild(description);

    const card_footer = document.createElement("div");
    card_footer.classList.add("card-footer");
    card_footer.innerHTML = `<i class="fa-solid fa-star"></i
                        ><i class="fa-brands solid fa-github"></i>
                        <i class="fa-solid fa-clipboard"></i>
 `;
    card.appendChild(card_footer);
}
