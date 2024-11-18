import React, { useState } from 'react';
// import Button from '@mui/material/Button';

const Recommend = (props) => {
  const [books, setBooks] = useState('');
  const apiKey = import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY;
  
  const handleGenerateBook = () => {
    const books = props.books.join('; ');
    const prompt = `Generate Google Books you recommend to read after finishing my current list of favorite books: ${books}`;
    
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
          { "role": "user", "content": prompt },
        ],
      })
    })
    .then(response => response.json())
    .then(data => {
      const rawBooks = data.choices[0].message.content;
      setBooks(formatBook(rawBooks));
    })
    .catch(error => {
      console.error('Error:', error);
      setBooks("Sorry, an error occurred while generating the recommendation.");
    });
  };

  const formatBook = (rawBooks) => {
    return rawBooks
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\n/g, '<br />'); // Line breaks
  };

  return (
    <div>
      <button variant='contained' onClick={handleGenerateBook}>Recommend Books</button>
      {books ? (
        <div className='mx-3 border-black border-2 p-4 flex flex-col'>
          <p dangerouslySetInnerHTML={{ __html: books }}></p>
        </div>
      ) : null}
    </div>
  );
};

export default Recommend;
