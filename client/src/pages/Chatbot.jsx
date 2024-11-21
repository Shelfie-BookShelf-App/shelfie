import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

export default function Chatbot({ api_url }) {
  const [savedBooks, setSavedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openRouterApiKey = import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY;

  // Fetch saved books on component mount
  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const res = await fetch(`${api_url}/api/books`, { credentials: 'include' });
        if (!res.ok) {
          throw new Error('Failed to fetch saved books');
        }
        const data = await res.json();
        setSavedBooks(data.books || []);
        let formattedBooks;
        if (!data.books || data.books.length === 0) {
          formattedBooks = ["None"]; // Display "None" if no books are saved
        }
        else {
          formattedBooks = data.books.map((book) => {
          const title = book.title || "Unknown Title";
          const author = book.author || "Unknown Author";
          return `${title} (${author})`;
        });
      }
        setBooks(formattedBooks);
        // Create the initial systemPrompt dynamically
        const systemPrompt = `
          You are a book consultant with extensive knowledge of various genres, authors, and styles.
          The user has shared their favorite books: ${formattedBooks.join("; ")}.
          Based on these preferences, try to answer their questions, such as providing detailed recommendations for other books they might enjoy, and sharing insights into genres or authors they could explore. Do not give irrelevant answers or include repetitive information, especially when they have not asked. 
          Always be polite, clear, and concise in your responses.
        `;
        setMessages([
          { role: 'system', content: systemPrompt },
          {
            role: 'assistant',
            content: "Hey there! I'm your Shelfie. How can I help you with your reading today?",
          },
        ]);
      } catch (error) {
        console.error('Error fetching saved books:', error);
      }
    };

    fetchSavedBooks();
  }, [api_url]);

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openRouterApiKey,
    dangerouslyAllowBrowser: true,
  });

  const formatData = (rawData) => {
    return rawData
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/\n/g, '<br />'); 
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content: message }];

    setMessages(newMessages);
    setMessage('');

    try {
      const response = await fetch(`${api_url}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chatbot response');
      }

      const data = await response.json();

      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Oops! Something went wrong!' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="top"
      alignItems="center"
      bgcolor="background.default"
    >
      <br />
      <Stack
        direction="column"
        width="80%"
        height="450px"
        bgcolor="background.paper"
        border="1px solid"
        borderColor="primary.main"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.slice(1).map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                sx={{
                  bgcolor: message.role === 'assistant' ? '#d3d3d3' : 'black', // Differentiate assistant vs. user
                  color: message.role === 'assistant' ? 'black' : 'white',  // Text color
                  borderRadius: 1,
                  p: 2,
                  maxWidth: '75%',
                  wordBreak: 'break-word', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textAlign: 'left',
                }}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: formatData(message.content),
                  }}
                />
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              input: { color: 'black' },
              label: { color: 'black' },
            }}
            InputProps={{
              style: {
                color: 'black',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            sx={{
              bgcolor: 'black', // Set button background to black
              color: 'white',   // Set button text color to white
              '&:hover': {
                bgcolor: 'darkgray', // Optional: Change hover background color
              },
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
