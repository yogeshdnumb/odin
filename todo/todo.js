export class Todo {
    constructor(title, due_date, priority, isChecked = false) {
        this.title = title;
        this.due_date = due_date;
        this.priority = priority;
        this.isChecked = isChecked;
    }
}
