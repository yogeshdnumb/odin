const main = document.querySelector("#main");
const add_btn = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const submit = document.querySelector("#submit");
const close_btn = document.querySelector(".fa-xmark");

const form = document.querySelector("form");
const title = form.querySelector("#title");
const author = form.querySelector("#author");
const pages = form.querySelector("#pages");
const pages_completed = form.querySelector("#completed-pages");
const status = form.querySelector("#status");
const cover = form.querySelector("#cover");

class Book {
    constructor(title, author, pages, status, cover) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = Book.prototype.count;
        this.cover = cover;
    }
}
function make_book(book) {
    const book_container = document.createElement("div");
    const id = document.createElement("span");
    const title = document.createElement("span");
    const author = document.createElement("span");
    const pages = document.createElement("span");
    const status = document.createElement("select");
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");

    opt1.text = "Unfinished";
    opt2.text = "Read";

    status.add(opt1);
    status.add(opt2);

    status.value = book.status;

    const cover = document.createElement("div");
    cover.classList.add("cover");
    if (book.cover != "") cover.style.backgroundImage = `url("${book.cover}")`;

    book_container.className = "book-container";
    id.className = "id";
    cover.className = "cover";
    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    status.className = "status";

    id.textContent = book.id;
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    // status.textContent = book.status;

    // book_container.appendChild(id);
    book_container.appendChild(cover);
    book_container.appendChild(title);
    book_container.appendChild(author);
    book_container.appendChild(pages);
    book_container.appendChild(status);

    const tools = document.createElement("div");
    tools.className = "tools";
    tools.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    tools.querySelector(".fa-trash").addEventListener("click", (e) => {
        // main.removeChild(current_container);
        book_container.classList.add("deleted");
    });

    book_container.addEventListener("transitionend", () => {
        main.removeChild(book_container);
    });

    book_container.appendChild(tools);
    main.appendChild(book_container);

    // book_container.querySelectorAll("span").forEach((element) => {
    //     element.setAttribute("contenteditable", "");
    // });
}

submit.addEventListener("click", () => {
    if (form.querySelector("input#title").value != "") {
        make_book(
            new Book(
                title.value,
                author.value,
                pages.value,
                status.value,
                cover.value
            )
        );
        form.reset();
        dialog.close();
    }
});

add_btn.addEventListener("click", () => {
    dialog.showModal();
});

close_btn.addEventListener("click", () => {
    dialog.close();
});

make_book(
    new Book(
        "Hyperion",
        "Dan Simmons",
        "482",
        "Read",
        "https://upload.wikimedia.org/wikipedia/en/7/73/Hyperion_cover.jpg"
    )
);

make_book(
    new Book(
        "1894",
        "Geroge Orwell",
        "328",
        "Read",
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg"
    )
);

make_book(
    new Book(
        "The prince Of milk",
        "Exurb1a",
        "352",
        "Unfinished",
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1487525243i/34340074.jpg"
    )
);

make_book(
    new Book(
        "Metamorphosis",
        "Franz Kafka",
        "114",
        "Unfinished",
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Franz_Kafka_Die_Verwandlung_1916_Orig.-Pappband.jpg"
    )
);
