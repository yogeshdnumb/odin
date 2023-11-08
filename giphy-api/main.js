const img = document.querySelector("img");
const random_btn = document.querySelector("#random-btn");
const search_bar = document.querySelector("#search");

// url = "https://api.giphy.com/v1/gifs/translate/";
async function fetch_gif(term) {
    // fetch(
    //     `https://api.giphy.com/v1/gifs/translate?api_key=Q9QnXVLMrZGrs0JEhGuL1ZjT2JVG224u&s=${term}`,
    //     {
    //         mode: "cors",
    //     }
    // )
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((response) => {
    //         // console.log(response.data.images.fixed_height.mp4);
    //         img.src = response.data.images.fixed_height.url;
    //     });
    let response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=Q9QnXVLMrZGrs0JEhGuL1ZjT2JVG224u&s=${term}`,
        {
            mode: "cors",
        }
    );
    let url = await response.json();

    img.src = url.data.images.fixed_height.url;
}

random_btn.addEventListener("click", () => {
    let term = search_bar.value;
    if (term == "") term = "funny";

    fetch_gif(term);
});

window.addEventListener("DOMContentLoaded", () => {
    fetch_gif("puppy");
});
