const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function changeStatus(index) {
  const currentStatus = myLibrary[index].status;
  const newStatus = currentStatus === 'read' ? 'not-read': 'read';
  myLibrary[index].status = newStatus;
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  myLibrary.forEach(function (book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement('p');
    status.textContent = `Status: ${book.status}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
      removeBook(index);
      displayBooks();
    });

    const statusButton = document.createElement('button');
    statusButton.textContent = 'Status change';
    statusButton.classList.add('status-button');
    statusButton.addEventListener('click', function () {
      changeStatus(index);
      displayBooks();
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(statusButton);

    bookList.appendChild(bookCard);
  });
}

const newBookButton = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');

newBookButton.addEventListener('click', function () {
  newBookForm.classList.toggle('hidden');
});

newBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const status = document.querySelector('input[name="status"]:checked').value;
  addBookToLibrary(title, author, pages, status);
  displayBooks();
  newBookForm.classList.add('hidden');
  newBookForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 320, "not-read");
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, "read");
displayBooks();