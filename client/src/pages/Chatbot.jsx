import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

export default function Chatbot({ myPrompt, initialMessage }) {
  const openRouterApiKey = import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY;

  const [messages, setMessages] = useState([
    { role: 'system', content: myPrompt },
    {
      role: 'assistant',
      content: initialMessage || "Hey there! I'm your BookMate. How can I help you choose your next great read?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openRouterApiKey,
    dangerouslyAllowBrowser: true
  });

  const systemPrompt = `
    You are a book consultant with extensive knowledge of various genres, authors, and styles.
    You assist users in selecting books based on their preferences, provide detailed recommendations,
    and share insights into genres or authors they might like. Always be polite, clear, and concise in your responses.
  `;

  const formatData = (rawData) => {
    return rawData
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold formatting
      .replace(/\n/g, '<br />'); // Line breaks
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
  
    setIsLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
  
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...messages, { role: 'user', content: message }],
        model: "meta-llama/llama-3.1-8b-instruct:free",
        stream: true,
      });
  
      let result = '';
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          result += content;
          setMessages((messages) => {
            const lastMessage = messages[messages.length - 1];
            const otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: result },
            ];
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "Oops! Something went wrong! Please try again later.",
        },
      ]);
    }
  
    setIsLoading(false);
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
      <h2>Book Consultant</h2>
      <br />
      <Stack
        direction="column"
        width="80%"
        height="700px"
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
                  bgcolor: message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                  color: message.role === 'assistant' ? 'white' : 'black',
                  borderRadius: 1,
                  p: 2,
                  maxWidth: '75%',
                  wordBreak: 'break-word', // Use wordBreak here
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
            sx={{ bgcolor: isLoading ? 'grey' : 'primary.main' }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
