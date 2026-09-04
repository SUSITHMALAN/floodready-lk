import { useState } from 'react'

function ReportFormPage() {
  const [district, setDistrict] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!district || !description || !severity) {
      setMessage('Please fill in all fields.')
      return
    }

    setMessage('Report submitted successfully.')

    setDistrict('')
    setDescription('')
    setSeverity('')
  }

  return (
    <div>
      <h1>Report a Flood</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="district">District</label>

          <input
            id="district"
            type="text"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            placeholder="Enter your district"
          />
        </div>

        <div>
          <label htmlFor="severity">Severity</label>

          <select
            id="severity"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
          >
            <option value="">Select severity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the situation"
          />
        </div>

        <button type="submit">
          Submit Report
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default ReportFormPage