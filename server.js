import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API endpoint to generate flashcards
app.post('/api/generate', async (request, response) => {
    const { topic, numCards } = request.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'API key not configured in .env file' });
    }

    try {
        const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Fabric Flashcards Generator'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3.5-sonnet-20241022',
                messages: [{
                    role: 'user',
                    content: `Generate ${numCards} flashcard-style questions and answers about Microsoft Fabric's ${topic}.

Format as a JSON array with this exact structure:
[
  {
    "question": "The question text",
    "answer": "The detailed answer"
  }
]

Requirements:
- Questions should test understanding, not just memorization
- Answers should be clear and concise (2-3 sentences max)
- Cover different aspects of ${topic}
- Use varied question formats (what, how, when, why)
- Return ONLY the JSON array, no other text`
                }]
            })
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await apiResponse.json();
        const content = data.choices[0].message.content;

        // Extract JSON from the response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('Failed to parse AI response');
        }

        const flashcards = JSON.parse(jsonMatch[0]);
        response.json({ flashcards });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend API running at http://localhost:${PORT}`);
    console.log(`📚 React app running at http://localhost:5173`);
    console.log(`🔑 Using API key from .env file`);
});
