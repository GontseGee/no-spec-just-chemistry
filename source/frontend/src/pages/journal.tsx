import { useState } from 'react'
import '../App.css'

function Journal() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="main-content">
      <header className="topbar">
        <span className="breadcrumb">Workspace / Developer Journal</span>
        <div className="profile">G</div>
      </header>

      <section className="welcome">
        <p className="eyebrow">YOUR DEVELOPMENT JOURNEY</p>
        <h1>Developer <span>Journal.</span></h1>
        <p>
          Document your progress, capture your lessons,
          and keep track of every breakthrough.
        </p>
      </section>

      <section className="activity-section">
        <div className="journal-heading">
          <div>
            <p className="eyebrow">YOUR RECORDS</p>
            <h2>Journal Entries</h2>
          </div>

          <button
            className="new-entry-button"
            onClick={() => setShowForm(!showForm)}
          >
            + New Entry
          </button>
        </div>

        {showForm ? (
          <div className="entry-form">
            <h3>Create Journal Entry</h3>

            <label>Entry Title</label>
            <input type="text" placeholder="Enter a title" />

            <label>Entry Type</label>
            <select defaultValue="">
              <option value="" disabled>Select entry type</option>
              <option>Daily Development Log</option>
              <option>Learning Log</option>
              <option>Bug & Debugging Log</option>
              <option>Technical Notes</option>
              <option>Project Update</option>
              <option>Achievement</option>
              <option>Reflection</option>
            </select>

            <label>Description</label>
            <textarea
              placeholder="What did you work on or learn?"
              rows={5}
            />

            <button onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">✧</span>
            <h3>Your journey starts here.</h3>
            <p>
              Your development notes, challenges and lessons
              will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Journal