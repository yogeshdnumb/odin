const home = document.querySelector("#main");
const menu = document.querySelector("#menu");
const booking = document.querySelector("#booking");
const home_link = document.querySelector("#home-link");
const menu_link = document.querySelector("#menu-link");
const booking_link = document.querySelector("#booking-link");
const book_btn = document.querySelector("#book");

const links = [home_link, menu_link, booking_link];
const pages = [home, menu, booking];

function rm_underline() {
    links.forEach((link) => {
        // link.style.textDecoration = "none";
        link.classList.remove("selected");
    });
}
function clear_page() {
    pages.forEach((page) => {
        page.classList.remove("shown");
    });
}
links.forEach((link) => {
    link.addEventListener("click", (e) => {
        rm_underline();
        e.currentTarget.classList.add("selected");
        console.log(e.currentTarget.id);
        clear_page();
        switch (e.currentTarget.id) {
            case "home-link":
                home.classList.add("shown");
                break;
            case "menu-link":
                menu.classList.add("shown");
                break;
            case "booking-link":
                booking.classList.add("shown");
                break;
        }
    });
});
book_btn.addEventListener("click", () => {
    rm_underline();
    clear_page();
    booking.classList.add("shown");
    booking_link.classList.add("selected");
});
home.classList.add("shown");
home_link.classList.add("selected");
