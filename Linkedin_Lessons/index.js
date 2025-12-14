// React 16.x code​​​​​​‌‌‌​‌‌​​‌​​​​​‌‌‌‌‌​‌‌‌​‌ below
import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

// Challenge Component
export function BookList() {
    const [query, setQuery] = useState("");

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h2>Filter Books</h2>
            <input
                type="text"
                placeholder="Search for a book..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {filteredBooks.length > 0 ? (
                <ul>
                    {filteredBooks.map(book => (
                        <li key={book.id}>{book.title} - {book.author}</li>
                    ))}
                </ul>
            ):(
                <p>No books match your search.</p>
            )}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BookList />
        </div>
    );
}

export const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas" },
    { id: 3, title: "You Don't Know JS", author: "Kyle Simpson" },
    { id: 4, title: "JavaScript from Beginner to Professional", author: "Maaike van Putten, Laurence Svekis, Rob Percival" },
    { id: 5, title: "Design Patterns", author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides" }
];

/* Ignore and do not change the code below */
export function Preview() {
    return <App />;
}
export default App;

const GlobalStyle = createGlobalStyle`
  input {
    padding: 5px;
    margin-bottom: 10px;
    display: block;
    width: 50%;
  }
`;

/* Ignore and do not change the code above */

import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

// Challenge Component
export function BookList() {
    const [page, setPage] = useState(1);
    const booksPerPage = 5;
    const totalPages = Math.ceil(books.length / booksPerPage);
    
    // modify this constant to only display 5 books at a time
    const displayedBooks = books.slice((page - 1) *  booksPerPage, page * booksPerPage);

    return (
        <div>
            <h2>Paginated Book List</h2>
            <ul>
                {displayedBooks.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
            {/* Implement the click functionality for the buttons for going through the pages */}
            <button 
             onClick={()=> setPage(page - 1)}
             disabled={page === 1}>Previous</button>
            <button 
             onClick={()=> setPage(page + 1)}
             disabled={page === totalPages}>Next</button>
        </div>
    );
}

// Don't modify this code
export const books1 = Array.from({ length: 11 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}` }));

function App() {
    return (
        <div className="App">
            <BookList />
        </div>
    );
}


import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

// Challenge Component
export function BookList() {
    const [sortType, setSortType] = useState("title");

    const sortedBooks = [...books].sort((a, b) => {
        { /* Expand method to sort by title */}
        if (sortType === "price") {
            return a.price - b.price;
        } else if(sortType === "title") {
            return a.title.localeCompare(b.title);
        } else{
            return b.rating - a.rating;
        }
    });

    return (
        <div>
            <h2>Sorted Books</h2>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="" defaultValue>Select a sorting option</option>
                <option value="title">Sort by title</option>
                <option value="price">Sort by price</option>
                <option value="rating">Sort by rating</option>
            </select>
            <ul>
                {sortedBooks.map((book) => (
                    <li key={book.id}>{book.title} - ${book.price} - {book.rating}⭐</li>
                ))}
            </ul>
        </div>
    );
}

export const books2 = [
    { id: 1, title: "JavaScript from Beginner to Professional", price: 30, rating: 4.7 },
    { id: 2, title: "You Don't Know JS", price: 30, rating: 4.9 },
    { id: 3, title: "Clean Code", price: 35, rating: 4.8 }
];

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BookList />
        </div>
    );
}