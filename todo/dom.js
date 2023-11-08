import { add } from "date-fns";
import {
    addTodo,
    newId,
    getTodos,
    deleteTodo,
    addProject,
    deleteProjects,
} from "./storage.js";
import { Todo } from "./todo.js";

let selectedProject = "home";

const main = document.querySelector(".main");
const template = document.querySelector("template");
const create = document.querySelector(".create");
const dialog = document.querySelector("dialog");
const project_input = document.querySelector(".crt-pro input");
const crt_pro_ok = document.querySelector("#ok-btn");
const project_list = document.querySelector("#project-list");
const add_btn = document.querySelector("dialog button");
// addTodo(new Todo("Fap", "03.12.2005", "medium", false), "Dope");
// addTodo(new Todo("Fap", "03.12.2005", "medium", false), "home");

document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    if (localStorage.getItem("projects") == 0) {
        addTodo(Todo("Brush", "2023.10.04"));
    }
});

create.addEventListener("click", () => dialog.showModal());

add_btn.addEventListener("click", (e) => {
    let title = e.target.parentElement.querySelector("input[type=text]").value;
    let due = e.target.parentElement.querySelector("input[type=date]").value;
    let priority = e.target.parentElement.querySelector("select").value;

    addTodo(new Todo(title, due, priority), selectedProject);
    renderTodos(getTodos(selectedProject));
    dialog.close();
    // console.log(title);
});

crt_pro_ok.addEventListener("click", (e) => {
    if (project_input.value == "") return;
    // // console.log(e.target);
    // // console.log(project_input.value);
    // let li = document.createElement("li");
    // let btn = document.createElement("button");
    // let div = document.createElement("div");
    // let span = document.createElement("span");
    // div.appendChild(span);
    // div.appendChild(btn);
    // span.innerText = project_input.value;
    // btn.innerText = "+";
    // span.addEventListener("click", () => {
    //     selectedProject = span.innerText;
    //     renderTodos(getTodos(selectedProject));
    // });
    // btn.addEventListener("click", (e) => {
    //     dialog.showModal();
    //     selectedProject =
    //         e.target.parentElement.querySelector("span").innerText;
    //     // console.log(selectedProject);
    //     renderTodos(getTodos(selectedProject));
    // });

    // // li.innerText = project_input.value;

    // project_list.appendChild(li);
    // li.appendChild(div);

    addProject(project_input.value);
    renderSidebar();
});

// project_list = document.querySelector("#project-list"); // ul
project_list.addEventListener("click", (e) => {
    console.log(e.currentTarget, e.target); // this is printed twice
    if (e.target.tagName == "SPAN") {
        selectedProject = e.target.innerText;
        renderTodos(getTodos(selectedProject));
    }
    if (e.target.tagName == "IMG") {
        deleteProjects(
            e.target.parentElement.parentElement.querySelector("span").innerText
        );
        renderSidebar();
    }
});

export function renderSidebar() {
    project_list.innerHTML = "";
    let projects = JSON.parse(localStorage.getItem("projects"));
    for (const project in projects) {
        let span = document.createElement("span");
        let delBtn = document.createElement("button");
        span.innerText = project;
        delBtn.innerHTML = `
                <img class=del src="./img/delete_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
        `;

        let li = document.createElement("li");

        li.appendChild(span);
        li.appendChild(delBtn);

        project_list.appendChild(li);
    }
}

// creates a div for todo
function createTodoDom(todo) {
    let clonedtemplate = template.content.cloneNode(true);
    // console.log(clonedtemplate);
    clonedtemplate.querySelector(".title").innerText = todo.title;
    clonedtemplate.querySelector(".due").innerText = todo.due_date;
    clonedtemplate.querySelector(".priority").innerText = todo.priority;

    clonedtemplate.querySelector(".delete").addEventListener("click", () => {
        deleteTodo(todo.title, selectedProject);
        renderTodos(getTodos(selectedProject));
    });
    // clonedtemplate["data-value"] = todo.id;
    // clonedtemplate.querySelector(".delete").setAttribute("data-value", todo.id);
    // console.log(todo);
    return clonedtemplate;
}

// createTodoDom();

function renderTodos(todos) {
    if (todos == undefined) {
        todos = [];
    }
    main.innerHTML = "";

    console.log(todos);
    for (const todo of todos) {
        main.appendChild(createTodoDom(todo));
        // console.table(todo);
    }

    // console.log(todos);
}
