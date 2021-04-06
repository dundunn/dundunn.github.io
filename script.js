'use strict';

// Library logic
let myLibrary = [];
if (typeof localStorage.myLibrary === 'string') myLibrary = JSON.parse(localStorage.myLibrary);

class Book {
    constructor(
        title = null,
        author = null,
        pages = null,
        readStatus = null
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    storeLocally(myLibrary);
    listBooks(myLibrary);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    storeLocally(myLibrary);
    listBooks(myLibrary);
}

function toggleReadState(index) {
    if (myLibrary[index].readStatus) myLibrary[index].readStatus = false;
    else myLibrary[index].readStatus = true;
    storeLocally(myLibrary);
    listBooks(myLibrary)
}

function storeLocally(library){
    localStorage.setItem("myLibrary", JSON.stringify(library));
}

// DOM manipulation
let libraryContent = document.getElementById('library-content');
let library = document.getElementById('library');
let popup = document.getElementById('popup');
let bookForm = document.getElementById('book-form');

library.addEventListener('click', libraryClick);

function libraryClick(e) {
    if (e.target.classList.contains('read-status')) {
        let i = e.target.dataset.bookIndex;
        toggleReadState(i);
    } else if (e.target.classList.contains('remove-book')) {
        removeBook(e.target.dataset.bookIndex);
    } else if (e.target.classList.contains('new-book')) {
        togglePopup();
    } else if (e.target.classList.contains('submit-books')) {
        let title, author, numberOfPages, readStatus;
        for (let i of e.target.parentElement) {
            if (i.name === 'title') title = i.value;
            if (i.name === 'author') author = i.value;
            if (i.name === 'number-of-pages') numberOfPages = i.value;
            if (i.id === 'read-status') readStatus = i.checked;
        }
        let newBook = new Book(title, author, numberOfPages, readStatus);
        addBookToLibrary(newBook);
        togglePopup();
        listBooks(myLibrary);
    }
}

function togglePopup() {
    if (!popup.classList.contains('popup-active')) {
        popup.classList += ' popup-active';
    } else {
        popup.classList.remove('popup-active');
    }
}

function listBooks(library) {
    let bookList = '';
    for (let i in library) {
        bookList += `<tr>
                            <td>${library[i].title}</td>
                            <td>${library[i].pages}</td>
                            <td data-book-index="${[i]}" class="read-status ${library[i].readStatus ? 'text-success">Read</td>' : 'text-danger">Not read</td>'}
                            <td data-book-index="${[i]}" class="remove-book bg-danger ">Remove</td>
                         </tr>`;
    }
    libraryContent.innerHTML = bookList;

}

listBooks(myLibrary);