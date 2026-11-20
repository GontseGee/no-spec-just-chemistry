import '../App.css'

function Journal() {
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
        <div>
          <p className="eyebrow">YOUR RECORDS</p>
          <h2>Journal Entries</h2>
        </div>

        <div className="empty-state">
          <span className="empty-icon">✧</span>
          <h3>Your journey starts here.</h3>
          <p>
            Your development notes, challenges and lessons
            will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Journal