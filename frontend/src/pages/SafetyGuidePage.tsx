  import { useState } from 'react'

function SafetyGuidePage() {
  const [activeTab, setActiveTab] = useState('Before')

  const safetyTips = {
    Before: [
      'Keep important documents in a safe place.',
      'Prepare an emergency bag.',
      'Know the safest route to higher ground.',
    ],
    During: [
      'Move to a safe and higher location.',
      'Avoid walking or driving through flood water.',
      'Follow official emergency instructions.',
    ],
    After: [
      'Return home only when authorities say it is safe.',
      'Avoid damaged electrical equipment.',
      'Report any dangerous conditions to authorities.',
    ],
  }

  return (
    <div>
      <h1>Flood Safety Guide</h1>

      <div>
        <button
          type="button"
          onClick={() => setActiveTab('Before')}
        >
          Before
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('During')}
        >
          During
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('After')}
        >
          After
        </button>
      </div>

      <h2>{activeTab}</h2>

      <ul>
        {safetyTips[activeTab as keyof typeof safetyTips].map(
          (tip, index) => (
            <li key={index}>{tip}</li>
          )
        )}
      </ul>
    </div>
  )
}

export default SafetyGuidePage