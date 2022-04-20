//PSEUDOCODE
//1. self-invoking function iterates through existing myLibrary loading all existing cards
//2. added card adds another one to function and runs self-invoking again?
//3. delete removes from array and runs through again
//4. read/unread must change the object within array and then run through again
//--NOTE: Re-loading page should not remove existing library (mine currently does)


//VARIABLES 
//library
const myLibrary = [];
//buttons
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const submitBtn = document.getElementById("submitBtn");

//EVENT LISTENERS
modalBtn.addEventListener('click', openModal);
submitBtn.addEventListener('click', addBookToLibrary);

//FUNCTIONS
//iterates through array (self-invoked)
(function() {
  console.log("HELLO WORLD!")
})();
//constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  
  if (!title || !author || !pages) {
    alert("All fields are required to add a book"); //change this to a message on the actual form
  } else {
    e.preventDefault(); //prevents default page refresh when submitted

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addCard(newBook);
    modal.style.display = "none"; //removes form
    document.getElementById("addBookForm").reset(); //clears form
  }

  //function that iterates through myLibrary and posts cards (wes bos?)
};

function openModal(title, author, pages, read) {
  modal.style.display = "block"
};

function addCard(newBook) {
  //need to iterate through library and load them all when the page loads


  //CREATE ELEMENTS
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const cardButtons = document.createElement('div');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  //ADD CLASSES AND IDs
  card.classList.add("card");
  cardButtons.classList.add('cardButtons');
  readBtn.setAttribute('id', 'readBtn');
  deleteBtn.setAttribute('id', 'deleteBtn');
  //ADD TEXT
  title.textContent = `Title: ${newBook.title}`;
  author.textContent = `Author: ${newBook.author}`;
  pages.textContent = `Page Count: ${newBook.pages}`;
  readBtn.textContent = "Completed";
  deleteBtn.textContent = "Delete from Library";
  //GET DIV WE ARE APPENDING CARD TO
  const library = document.getElementById("library-cards");
  //APPEND
  library.append(card);
  card.append(title);
  card.append(author);
  card.append(pages);
  card.append(readBtn);
  card.append(deleteBtn);
};

//TOGGLE COMPLETED AND NOT COMPLETED BUTTON
function read() {

};

//DELETE BOOK FROM LIBRARY
function remove(){

};