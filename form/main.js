const password_input = document.querySelector("#password");
const re_pass = document.querySelector("#re-pass");
const pass_match = document.querySelector("#pass-match");
const validations = document.querySelectorAll(".validation");
const chars = document.querySelector("#chars");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const nums = document.querySelector("#nums");
const spcl = document.querySelector("#spcl");

const ORANGE = "#fcb31c";
const RED = "#f84202";

console.log(password_input);

password_input.addEventListener("input", validate);
re_pass.addEventListener("input", same_check);

function validate(e) {
    check(chars, /.[6,]/);
    check(upper, /[A-Z]/);
    check(lower, /[a-z]/);
    check(nums, /\d/);
    check(spcl, /[^\w\s\d]/);
}

function check(element, pattern) {
    console.log(password_input.value.length);
    if (
        password_input.value.match(pattern, 0) ||
        password_input.value.length >= 6
    ) {
        element.style.color = ORANGE;
        element.firstElementChild.classList.add("visible");
        console.log(element.firstElementChild.classList);
    } else {
        element.style.color = RED;
        element.firstElementChild.classList.remove("visible");
    }
}

function same_check() {
    if (password_input.value === re_pass.value) {
        re_pass.lastElementChild.classList.add("invisible");
    } else {
        re_pass.lastElementChild.classList.remove("invisible");
    }
}
