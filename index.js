// VARIABLES 
// buttons
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById('closeBtn');
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const readBtn = document.getElementById('readBtn');

// EVENT LISTENERS
modalBtn.addEventListener('click', openModal);
submitBtn.addEventListener('click', addBookToLibrary);
closeBtn.addEventListener('click', closeModal);

// FUNCTIONS

// 1. onload, access local storage
window.onload = function() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (myLibrary === null) {
    myLibrary = [];
  }
  addCards();
};

// 2. class
class Book {
  constructor(
    title = "unknown",
    author = "unknown",
    pages = 0,
    read = 0
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
};

// 2. constructor
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// };

// 3. open form
function openModal() {
  modal.style.display = "block";
  showError();
  validate();
};

function validate() {
  const form = document.getElementById('addBookForm');
  const title = document.getElementById("title");
  const titleError = document.getElementById('titleError');

  const author = document.getElementById("author");
  const authorError = document.getElementById('authorError');

  const pages = document.getElementById("pages");
  const pagesError = document.getElementById('pagesError');
  form.addEventListener('input', (event) => {
    if (title.validity.valid) {
      titleError.textContent = '';
      // titleError.className = 'error';
    } else {
      showError();
    }
    if (author.validity.valid) {
      authorError.textContent = '';
      authorError.className = 'error';
    } else {
      showError();
    }
    if (pages.validity.valid) {
      pagesError.textContent = '';
      pagesError.className = 'error';
    } else {
      showError();
    }
  });
};

function showError() {
  const title = document.getElementById("title");
  const titleError = document.getElementById('titleError');
  const author = document.getElementById("author");
  const authorError = document.getElementById('authorError');
  const pages = document.getElementById("pages");
  const pagesError = document.getElementById('pagesError');
  if (title.validity.valueMissing) {
    titleError.textContent = 'You need to enter a title.';
    titleError.className = 'error';
  } 
  if (author.validity.valueMissing) {
    authorError.textContent = 'You need to enter an author.';
    authorError.className = 'error';
  }
  if (pages.validity.valueMissing) {
    pagesError.textContent = 'You need to enter the page total.';
    pagesError.className = 'error';
  } // add typeMismatch check here for number
};

function closeModal() {
  modal.style.display = "none";
  document.getElementById("addBookForm").reset();
};

// 5. add book
function addBookToLibrary(e) { 
  const titleCheck = document.getElementById('title');
  const title = document.getElementById("title").value;
  const authorCheck = document.getElementById('author');
  const author = document.getElementById("author").value;
  const pagesCheck = document.getElementById('pages');
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  
  if (!titleCheck.validity.valid || !authorCheck.validity.valid 
    || !pagesCheck.validity.valid) {
    alert("Please fill out the form before submission.")
    e.preventDefault();
  } else {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    addCards(newBook);
  }
};

// 6. addCards with iteration through myLibrary
function addCards() {
  const library = document.getElementById("library-cards");
  library.innerHTML = ""; //clears library-cards to avoid double
  myLibrary.forEach(element => generateCard(element));
  modal.style.display = "none";
  document.getElementById("addBookForm").reset(); //clears form
}

// 7. generateCard
function generateCard(media) {
  //create elements
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const cardButtons = document.createElement('div');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  //add classes and ids
  card.classList.add("card");
  readBtn.setAttribute('id', 'readBtn');
  readBtn.setAttribute('data-position', `${myLibrary.indexOf(media)}`);
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('data-position', `${myLibrary.indexOf(media)}`);
  cardButtons.setAttribute('id', 'cardButtons');
  //add text
  title.textContent = `Title: ${media.title}`;
  author.textContent = `Author: ${media.author}`;
  pages.textContent = `Page Count: ${media.pages}`;
  deleteBtn.textContent = "Delete from Library";
  if (media.read === true) {
    readBtn.textContent = "Finished";
    readBtn.style.backgroundColor = "rgb(13, 82, 26)";
  } else {
    readBtn.textContent = "Unfinished";
    readBtn.style.backgroundColor = "#6a1a1a";
  }
  //get the div we want to append within
  const library = document.getElementById("library-cards");
  //append
  library.append(card);
  card.append(title);
  card.append(author);
  card.append(pages);
  card.append(cardButtons);
  cardButtons.append(readBtn);
  cardButtons.append(deleteBtn);
  //eventListeners for appended buttons
  deleteBtn.addEventListener('click', removeBook);
  readBtn.addEventListener('click', readBook);
};

// 8. delete card
function removeBook(e){
  myLibrary.splice(e.target.getAttribute("data-position"), 1); //remove from array
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); //reset local Storage
  addCards();
};

// 9. toggle finished_unfinished
function readBook(e) {
  if (myLibrary[e.target.getAttribute("data-position")].read === true) {
    myLibrary[e.target.getAttribute("data-position")].read = false;
  } else {
    myLibrary[e.target.getAttribute("data-position")].read = true;
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  addCards();
};