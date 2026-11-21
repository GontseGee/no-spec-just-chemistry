import { useState } from 'react'
import '../App.css'

type JournalEntry = {
  id: number
  title: string
  type: string
  description: string
  technologies: string[]
  tags: string[]
  project: string
  createdAt: string
}

function Journal() {
  const [showForm, setShowForm] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [tags, setTags] = useState('')
  const [project, setProject] = useState('')

  function resetForm() {
    setTitle('')
    setType('')
    setDescription('')
    setTechnologies('')
    setTags('')
    setProject('')
    setEditingId(null)
    setShowForm(false)
  }
function handleEdit(entry: JournalEntry) {
  setTitle(entry.title)
  setType(entry.type)
  setDescription(entry.description)
  setTechnologies(entry.technologies.join(', '))
  setTags(entry.tags.join(', '))
  setProject(entry.project)

  setEditingId(entry.id)
  setShowForm(true)
}
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newEntry: JournalEntry = {
      id: Date.now(),
      title,
      type,
      description,
      technologies: technologies.split(',').map(item => item.trim()).filter(Boolean),
      tags: tags.split(',').map(item => item.trim()).filter(Boolean),
      project,
      createdAt: new Date().toLocaleString()
    }

    if (editingId !== null) {
  setEntries(previousEntries =>
    previousEntries.map(entry =>
      entry.id === editingId
        ? { ...newEntry, id: editingId }
        : entry
    )
  )
} else {
  setEntries(previousEntries => [newEntry, ...previousEntries])
}
    resetForm()
  }

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
            <h2>Journal Entries ({entries.length})</h2>
          </div>

          <button
            className="new-entry-button"
            onClick={() => setShowForm(true)}
          >
            + New Entry
          </button>
        </div>

        {showForm && (
          <form className="entry-form" onSubmit={handleSave}>
            <h3>Create Journal Entry</h3>

            <label>Entry Title</label>
            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
            />

            <label>Entry Type</label>
            <select
              value={type}
              onChange={event => setType(event.target.value)}
              required
            >
              <option value="">Select entry type</option>
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
              value={description}
              onChange={event => setDescription(event.target.value)}
              required
            />

            <label>Technologies Used</label>
            <input
              type="text"
              placeholder="e.g. React, TypeScript, Docker"
              value={technologies}
              onChange={event => setTechnologies(event.target.value)}
            />

            <label>Tags</label>
            <input
              type="text"
              placeholder="e.g. Frontend, Learning, Debugging"
              value={tags}
              onChange={event => setTags(event.target.value)}
            />

            <label>Associated Project (Optional)</label>
            <select
              value={project}
              onChange={event => setProject(event.target.value)}
            >
              <option value="">No project association</option>
              <option value="EON">EON</option>
            </select>

            <div className="form-actions">
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="new-entry-button">
  {editingId !== null ? 'Save Changes' : 'Save Entry'}
</button>
            </div>
          </form>
        )}

        {entries.length === 0 ? (
          !showForm && (
            <div className="empty-state">
              <span className="empty-icon">✧</span>
              <h3>Your journey starts here.</h3>
              <p>
                Your development notes, challenges and lessons
                will appear here.
              </p>
            </div>
          )
        ) : (
          <div className="journal-entries">
            {entries.map(entry => (
              <article className="entry-form" key={entry.id}>
                <p className="eyebrow">{entry.type}</p>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <small>{entry.createdAt}</small>

                <p><strong>Technologies:</strong> {entry.technologies.join(', ') || 'None'}</p>
                <p><strong>Tags:</strong> {entry.tags.join(', ') || 'None'}</p>
                <p><strong>Project:</strong> {entry.project || 'Not associated'}</p>

                <button
  type="button"
  onClick={() => handleEdit(entry)}
>
  Edit Entry
</button>

                <button
  type="button"
  onClick={() => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this journal entry?'
    )

    if (confirmed) {
      setEntries(previousEntries =>
        previousEntries.filter(item => item.id !== entry.id)
      )
    }
  }}
>
  Delete Entry
</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Journal