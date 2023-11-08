import { Todo } from "./todo.js";
// import { renderSidebar } from "./dom.js";

let id = 0;
export function newId() {
    return id++;
}

// add given todo to given project
export function addTodo(todo, project) {
    let projects = JSON.parse(localStorage.getItem("projects")) ?? {};
    console.log(todo, project, projects);
    if (projects[project] == undefined) {
        projects[project] = [];
    }
    projects[project].push(todo);

    localStorage.setItem("projects", JSON.stringify(projects));
}
export function deleteProjects(project_name) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    for (const project in projects) {
        if (project == project_name) {
            delete projects[project_name];
        }
    }
    localStorage.setItem("projects", JSON.stringify(projects));
}
// returns todos of project
export function getTodos(project) {
    return JSON.parse(localStorage.getItem("projects"))[project];
}

export function deleteTodo(title, project) {
    let projects = JSON.parse(localStorage.getItem("projects"));

    for (project in projects) {
        for (const todo of projects[project]) {
            // console.log(todo);
            if (todo.title == title) {
                // console.log(todo, project);
                let index = projects[project].indexOf(todo);
                projects[project].splice(index, 1);
                console.log(projects[project]);
            }
        }
    }
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function addProject(name) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    for (const project in projects) {
        if (project == name) return;
    }
    projects[name] = [];
    localStorage.setItem("projects", JSON.stringify(projects));
}
