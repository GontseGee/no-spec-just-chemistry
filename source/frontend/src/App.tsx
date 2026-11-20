import { useState } from 'react'
import './App.css'
import Journal from './pages/journal.tsx'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✳</span>
          <span>EON</span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          <a
            className={`nav-item ${currentPage === 'overview' ? 'active' : ''}`}
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setCurrentPage('overview')
            }}
          >
            ⌂ Overview
          </a>

          <a
            className={`nav-item ${currentPage === 'journal' ? 'active' : ''}`}
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setCurrentPage('journal')
            }}
          >
            ▤ Developer Journal
          </a>

          <a className="nav-item" href="#">◇ Projects</a>
          <a className="nav-item" href="#">▧ Knowledge Vault</a>
          <a className="nav-item" href="#">◎ Learning</a>
          <a className="nav-item" href="#">↗ Progress</a>
        </nav>

        <div className="sidebar-bottom">
          <span className="status-dot"></span>
          <span>Building your future</span>
        </div>
      </aside>

      {currentPage === 'journal' ? (
        <Journal />
      ) : (
        <main className="main-content">
          <header className="topbar">
            <span className="breadcrumb">Workspace / Overview</span>
            <div className="profile">G</div>
          </header>

          <section className="welcome">
            <p className="eyebrow">YOUR DEVELOPMENT UNIVERSE</p>
            <h1>Welcome to <span>EON.</span></h1>
            <p>
              Every line of code, every lesson, every breakthrough.
              Your evolution starts here.
            </p>
          </section>

          <section className="stats">
            <article className="stat-card">
              <span>Journal Entries</span>
              <h2>00</h2>
              <small>Your journey, documented.</small>
            </article>

            <article className="stat-card">
              <span>Active Projects</span>
              <h2>00</h2>
              <small>Ideas becoming reality.</small>
            </article>

            <article className="stat-card">
              <span>Learning Goals</span>
              <h2>00</h2>
              <small>Knowledge in progress.</small>
            </article>
          </section>

          <section className="activity-section">
            <div>
              <p className="eyebrow">YOUR SPACE</p>
              <h2>Recent activity</h2>
            </div>

            <div className="empty-state">
              <span className="empty-icon">✧</span>
              <h3>Your story starts here.</h3>
              <p>
                Your journal entries and development milestones
                will appear here as you grow.
              </p>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}

export default App