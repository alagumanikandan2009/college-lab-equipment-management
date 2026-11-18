import { useState } from 'react'

const labs = ['EE Lab 2', 'Bio Lab 1', 'Chem Lab A', 'Mech Workshop', 'Physics Lab']

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

interface Booking {
  equipment: string
  lab: string
  user: string
  slot: string
  duration: number
}

const bookings: Booking[] = [
  { equipment: 'Oscilloscope DS1054Z', lab: 'EE Lab 2', user: 'Priya Ramesh', slot: '09:00', duration: 2 },
  { equipment: 'Centrifuge CF-200', lab: 'Bio Lab 1', user: '— (FAULT)', slot: '08:00', duration: 10 },
  { equipment: 'PCR Machine PCR-7', lab: 'Bio Lab 2', user: 'Marcus Elias', slot: '11:00', duration: 3 },
  { equipment: 'Lathe Machine LM-1', lab: 'Mech Workshop', user: 'Maintenance', slot: '08:00', duration: 10 },
  { equipment: 'Electron Microscope', lab: 'Physics Lab', user: 'Dr. Lena Fischer', slot: '10:00', duration: 4 },
  { equipment: 'Digital Multimeter', lab: 'EE Lab 2', user: 'Carlos Vega', slot: '10:00', duration: 2 },
  { equipment: 'Gas Chromatograph', lab: 'Chem Lab A', user: 'Anjali Iyer', slot: '14:00', duration: 3 },
]

interface SlotReq {
  equipment: string
  lab: string
  date: string
  slot: string
  duration: string
  user: string
}

export default function Availability() {
  const [selectedLab, setSelectedLab] = useState('All')
  const [form, setForm] = useState<SlotReq>({ equipment: '', lab: labs[0], date: '2025-09-30', slot: '09:00', duration: '1', user: '' })
  const [submitted, setSubmitted] = useState(false)

  const labBookings = bookings.filter(b => selectedLab === 'All' || b.lab === selectedLab)

  const availabilityGrid = labs.map(lab => ({
    lab,
    slots: timeSlots.map(slot => {
      const booking = bookings.find(b => b.lab === lab && b.slot === slot)
      return { slot, booking }
    }),
  }))

  const displayGrid = selectedLab === 'All' ? availabilityGrid : availabilityGrid.filter(r => r.lab === selectedLab)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', letterSpacing: '0.08em', marginBottom: 6 }}>
          SCHEDULE & BOOKING
        </div>
        <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em', margin: 0 }}>
          Equipment Availability
        </h1>
        <p style={{ color: '#6e7681', fontSize: 14, marginTop: 4 }}>Today's schedule — Monday, 29 Sep 2025.</p>
      </div>

      {/* Lab filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['All', ...labs].map(l => (
          <button
            key={l}
            onClick={() => setSelectedLab(l)}
            style={{
              background: selectedLab === l ? '#2f81f7' : '#161b22',
              border: `1px solid ${selectedLab === l ? '#2f81f7' : '#30363d'}`,
              color: selectedLab === l ? '#fff' : '#8b949e',
              borderRadius: 6,
              padding: '6px 14px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Timeline grid */}
      <div className="rounded-lg overflow-hidden mb-8" style={{ border: '1px solid #21262d' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 900, width: '100%' }}>
            <thead>
              <tr style={{ background: '#161b22', borderBottom: '1px solid #21262d' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', width: 160, whiteSpace: 'nowrap' }}>LAB</th>
                {timeSlots.map(t => (
                  <th key={t} style={{ padding: '10px 8px', fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', textAlign: 'center', minWidth: 70 }}>
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayGrid.map((row, ri) => (
                <tr key={row.lab} style={{ borderBottom: '1px solid #21262d', background: ri % 2 === 0 ? '#0d1117' : '#0a0e14' }}>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#c9d1d9', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {row.lab}
                  </td>
                  {row.slots.map(({ slot, booking }) => (
                    <td key={slot} style={{ padding: '6px 4px', textAlign: 'center' }}>
                      <div
                        className="rounded mx-auto flex items-center justify-center"
                        style={{
                          width: 56,
                          height: 32,
                          background: booking
                            ? booking.user.includes('FAULT') ? '#f8514922'
                            : booking.user === 'Maintenance' ? '#d2992222'
                            : '#2f81f722'
                            : '#3fb95022',
                          border: `1px solid ${booking
                            ? booking.user.includes('FAULT') ? '#f85149'
                            : booking.user === 'Maintenance' ? '#d29922'
                            : '#2f81f7'
                            : '#3fb950'}44`,
                          fontSize: 10,
                          fontFamily: 'DM Mono, monospace',
                          color: booking
                            ? booking.user.includes('FAULT') ? '#f85149'
                            : booking.user === 'Maintenance' ? '#d29922'
                            : '#58a6ff'
                            : '#3fb950',
                          cursor: booking ? 'pointer' : 'default',
                          title: booking?.equipment,
                        }}
                        title={booking ? `${booking.equipment} — ${booking.user}` : 'Available'}
                      >
                        {booking
                          ? booking.user.includes('FAULT') ? 'FAULT'
                          : booking.user === 'Maintenance' ? 'MAINT'
                          : 'BUSY'
                          : 'FREE'}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 380px' }}>
        {/* Active bookings list */}
        <div className="rounded-lg" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#21262d' }}>
            <span style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#e6edf3' }}>
              Today's Bookings
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: '#21262d' }}>
            {labBookings.map((b, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 13, color: '#e6edf3', marginBottom: 2, fontWeight: 500 }}>{b.equipment}</div>
                  <div style={{ fontSize: 12, color: '#6e7681' }}>
                    <span style={{ color: '#58a6ff' }}>{b.lab}</span> · {b.user}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#c9d1d9' }}>{b.slot}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681' }}>{b.duration}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book equipment form */}
        <div className="rounded-lg" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#21262d' }}>
            <span style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#e6edf3' }}>
              Reserve Equipment
            </span>
          </div>
          <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
            {[
              { label: 'Equipment Name', key: 'equipment', type: 'text', placeholder: 'e.g. Oscilloscope DS1054Z' },
              { label: 'Your Name', key: 'user', type: 'text', placeholder: 'Full name' },
              { label: 'Date', key: 'date', type: 'date', placeholder: '' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>
                  {f.label.toUpperCase()}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as any)[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required
                  style={{
                    width: '100%',
                    background: '#0d1117',
                    border: '1px solid #30363d',
                    borderRadius: 6,
                    color: '#e6edf3',
                    padding: '8px 12px',
                    fontSize: 13,
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    colorScheme: 'dark',
                  }}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>LAB</label>
                <select value={form.lab} onChange={e => setForm(p => ({ ...p, lab: e.target.value }))} style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, color: '#e6edf3', padding: '8px 10px', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif' }}>
                  {labs.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>SLOT</label>
                <select value={form.slot} onChange={e => setForm(p => ({ ...p, slot: e.target.value }))} style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, color: '#e6edf3', padding: '8px 10px', fontSize: 13, outline: 'none' }}>
                  {timeSlots.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded py-2.5 font-medium transition-all"
              style={{
                background: submitted ? '#3fb950' : '#2f81f7',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
              }}
            >
              {submitted ? '✓ Reserved Successfully' : 'Reserve Slot'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
