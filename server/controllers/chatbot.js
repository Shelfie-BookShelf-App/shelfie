const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const getChatResponse = async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      model: 'meta-llama/llama-3.1-8b-instruct:free',
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
};

module.exports = { getChatResponse };
