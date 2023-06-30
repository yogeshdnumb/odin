const password_input = document.querySelector("#password");
const re_pass = document.querySelector("#re-pass");
const pass_match = document.querySelector("#pass-match");
const validations = document.querySelectorAll(".validation");
const submit_btn = document.querySelector("button");

const ORANGE = "#fcb31c";
const RED = "#f84202";

password_input.addEventListener("input", validate);
re_pass.addEventListener("input", same_check);
submit_btn.addEventListener("click", submit);

function validate() {
    // main function for validating password
    check("chars", /.{6,}/);
    check("upper", /[A-Z]/);
    check("lower", /[a-z]/);
    check("nums", /\d/);
    check("spcl", /[^\w\s\d]/);
}

function check(field, pattern) {
    // checks is the password satifies all the requirements
    element = document.querySelector("#" + field);
    if (password_input.value.match(pattern, 0)) {
        element.style.color = ORANGE;
        element.firstElementChild.classList.add("visible");
    } else {
        element.style.color = RED;
        element.firstElementChild.classList.remove("visible");
    }
}

function same_check() {
    // checks if both the passwords are same
    if (password_input.value == re_pass.value) {
        pass_match.classList.remove("visible");
        return true;
    } else {
        pass_match.classList.add("visible");
    }
}

function submit() {
    // function for submiting form when button is pressed

    // checks if all the required fields are filled
    var is_ok = true;
    [...document.querySelectorAll("input")].forEach((el) => {
        if (!el.checkValidity()) {
            el.focus();
            is_ok = false;
        }
    });
    if (!is_ok) return;

    // checks if the password satifies the requirements
    if (
        ![...validations].every((el) =>
            el.firstElementChild.classList.contains("visible")
        )
    ) {
        password_input.focus();
        return;
    }

    if (!same_check()) {
        re_pass.focus();
        return;
    }
    document.querySelector("form").submit();
}
