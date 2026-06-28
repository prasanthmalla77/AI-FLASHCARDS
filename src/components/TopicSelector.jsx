import { useState } from 'react'
import './TopicSelector.css'

function TopicSelector({ onGenerate, error }) {
  const [topic, setTopic] = useState('')
  const [numCards, setNumCards] = useState(10)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!topic.trim()) {
      return
    }
    onGenerate(topic, numCards)
  }

  return (
    <div className="topic-selector">
      <h3>Setup Your Flashcards</h3>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="topic">Enter Your Topic or Content:</label>
          <textarea
            id="topic"
            rows="5"
            placeholder="E.g., 'Microsoft Fabric Lakehouse' or paste your study notes, article, or any content here..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <small className="input-hint">
            Enter a topic name or paste text content - AI will generate flashcards to help you learn
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="numCards">Number of Questions (5-20):</label>
          <input
            type="number"
            id="numCards"
            min="5"
            max="20"
            value={numCards}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (value >= 5 && value <= 20) {
                setNumCards(value)
              }
            }}
            required
          />
          <small className="input-hint">
            Choose between 5 and 20 questions
          </small>
        </div>

        <button type="submit" className="btn">
          Generate Flashcards
        </button>

        <div className="hint">
          Powered by AI via OpenRouter
        </div>
      </form>
    </div>
  )
}

export default TopicSelector
