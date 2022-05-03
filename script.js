//VARIABLES 
//buttons
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById('closeBtn');
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const readBtn = document.getElementById('readBtn');

//EVENT LISTENERS
modalBtn.addEventListener('click', openModal);
submitBtn.addEventListener('click', addBookToLibrary);
closeBtn.addEventListener('click', closeModal);

//FUNCTIONS

//1. onload, access local storage
window.onload = function() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (myLibrary === null) {
    myLibrary = [];
  }
  addCards();
};

//2. class
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

//2. constructor
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// };

//3. open form
function openModal() {
  modal.style.display = "block";
};

function closeModal() {
  modal.style.display = "none";
  document.getElementById("addBookForm").reset();
};

//4. add book
function addBookToLibrary(e) { 
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  if (!title || !author || !pages) {
    alert("All fields are required to add a book, please click ADD NEW BOOK to try again.");
    return false;
  } else {
    e.preventDefault();
    //myLibrary
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    //cards
    addCards(newBook);
  }
};

//5. addCards with iteration through myLibrary
function addCards() {
  const library = document.getElementById("library-cards");
  library.innerHTML = ""; //clears library-cards to avoid double
  myLibrary.forEach(element => generateCard(element));
  modal.style.display = "none";
  document.getElementById("addBookForm").reset(); //clears form
}

//6. generateCard
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

//7. delete card
function removeBook(e){
  myLibrary.splice(e.target.getAttribute("data-position"), 1); //remove from array
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); //reset local Storage
  addCards();
};

//8. toggle finished_unfinished
function readBook(e) {
  if (myLibrary[e.target.getAttribute("data-position")].read === true) {
    myLibrary[e.target.getAttribute("data-position")].read = false;
  } else {
    myLibrary[e.target.getAttribute("data-position")].read = true;
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  addCards();
};