import { useState } from 'react'
import TopicSelector from './components/TopicSelector'
import FlashCard from './components/FlashCard'
import './App.css'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCards, setShowCards] = useState(false)

  const generateFlashcards = async (topic, numCards) => {
    setLoading(true)
    setError(null)
    setShowCards(false)

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

    console.log('API Key present:', !!apiKey)
    console.log('API Key starts with:', apiKey?.substring(0, 10))

    if (!apiKey) {
      setError('API key not configured. Please set VITE_OPENROUTER_API_KEY in environment variables.')
      setLoading(false)
      return
    }

    try {
      console.log('Making request to OpenRouter API...')

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin || 'http://localhost:5173',
          'X-Title': 'Microsoft Fabric Flashcards'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct',
          messages: [{
            role: 'user',
            content: `Generate ${numCards} flashcard-style questions and answers about the following topic or content:

${topic}

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
- If the input is a long text, extract key concepts and create questions about them
- Use varied question formats (what, how, when, why, explain)
- Return ONLY the JSON array, no other text or explanation`
          }]
        })
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        let errorMessage = 'Failed to generate flashcards'

        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error?.message || errorData.message || errorMessage
        } catch (e) {
          errorMessage = errorText || errorMessage
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('API Response:', data)

      // Handle both OpenAI and Anthropic response formats
      let content
      if (data.choices) {
        // OpenAI format
        content = data.choices[0].message.content
      } else if (data.content) {
        // Anthropic format
        content = data.content[0].text
      } else {
        throw new Error('Unexpected API response format')
      }

      console.log('Content:', content)

      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Failed to parse AI response')
      }

      const flashcards = JSON.parse(jsonMatch[0])
      setFlashcards(flashcards)
      setCurrentIndex(0)
      setShowCards(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleReset = () => {
    setShowCards(false)
    setFlashcards([])
    setCurrentIndex(0)
    setError(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Flashcards</h1>
        <p>Generate flashcards from any topic or content</p>
      </header>

      {!showCards && !loading && (
        <TopicSelector
          onGenerate={generateFlashcards}
          error={error}
        />
      )}

      {loading && (
        <div className="loading">
          Generating flashcards with AI...
        </div>
      )}

      {showCards && flashcards.length > 0 && (
        <>
          <FlashCard
            card={flashcards[currentIndex]}
            currentIndex={currentIndex}
            total={flashcards.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
          <button className="btn reset-btn" onClick={handleReset}>
            Generate New Set
          </button>
        </>
      )}
    </div>
  )
}

export default App
