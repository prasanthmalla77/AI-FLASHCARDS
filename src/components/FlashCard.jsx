import { useState, useEffect } from 'react'
import './FlashCard.css'

function FlashCard({ card, currentIndex, total, onPrevious, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false)
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setIsFlipped(!isFlipped)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFlipped, onPrevious, onNext])

  return (
    <div className="flashcard-section">
      <div className="navigation">
        <button
          className="nav-btn"
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <div className="card-counter">
          {currentIndex + 1} / {total}
        </div>
        <button
          className="nav-btn"
          onClick={onNext}
          disabled={currentIndex === total - 1}
        >
          Next
        </button>
      </div>

      <div className="flashcard-container">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-face flashcard-front">
            <div className="flashcard-content">
              <div className="card-label">Question</div>
              {card.question}
            </div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="flashcard-content">
              <div className="card-label">Answer</div>
              {card.answer}
            </div>
          </div>
        </div>
      </div>

      <div className="keyboard-hint">
        Click card to flip • Use ← → arrows to navigate • Spacebar to flip
      </div>
    </div>
  )
}

export default FlashCard
