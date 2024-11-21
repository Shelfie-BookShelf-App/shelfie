import React, { useState } from "react";
import GoogleBook from "./GoogleBook";

const Recommend = (props) => {
  const [bookObjects, setBookObjects] = useState([]); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const apiKey = import.meta.env.VITE_API_KEY; 
  const openRouterApiKey = import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY;

  // Step 1: Generate Book Recommendations Based on `userBooks`
  const handleGenerateBook = () => {
    setIsButtonDisabled(true); // Disable button
    setTimeout(() => setIsButtonDisabled(false), 10000); // Re-enable after 10 seconds

    const userBooks = props.books.join("; "); // Convert list of userBooks to a string
    const prompt = `You are tasked to recommend a JSON array of up to 3 Google Books names based on the following list of my favorite books: ${userBooks}. 

IMPORTANT: Only return a JSON array of book names. The response must follow this exact format:
["Book Name 1", "Book Name 2", "Book Name 3"]

Do not include any additional text, explanations, or formatting outside of this JSON array.`;

    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        try {
          const bookNames = JSON.parse(data.choices[0].message.content);
          if (Array.isArray(bookNames)) {
            console.log("Recommended Books:", bookNames);
            fetchBookObjects(bookNames); // Fetch detailed book objects
          } else {
            throw new Error("Response is not a JSON array");
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  // Step 2: Fetch Book Objects Based on AI Recommendations
  const fetchBookObjects = async (bookNames) => {
    const detailedBooks = [];

    for (const bookName of bookNames) {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            bookName
          )}&key=${apiKey}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          detailedBooks.push(data.items[0]); // Take the first result for each book
        }
      } catch (err) {
        console.error(`Failed to fetch details for book: ${bookName}`, err);
      }
    }

    setBookObjects(detailedBooks); // Save detailed book objects
    console.log("Detailed Book Objects:", detailedBooks);
  };

  return (
    <div>
      <ul className="grid grid-cols-4 gap-4">
        {bookObjects.map((book) => (
          <li key={book.id} style={{listStyle: 'None'}}>
            <GoogleBook book={book} api_url={props.api_url}/>
          </li>
        ))}
      </ul>
      <button
        style={{
          backgroundColor: isButtonDisabled ? "gray" : "black",
          color: "white",
          padding: "10px",
          margin: "10px",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
        }}
        onClick={handleGenerateBook}
        disabled={isButtonDisabled} // Disable button if state is true
      >
        {isButtonDisabled ? "Wait 10 seconds..." : "Generate New Recommendations"}
      </button>
    </div>
  );
};

export default Recommend;
