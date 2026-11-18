import { useState } from 'react'

type Status = 'Available' | 'In Use' | 'Maintenance' | 'Faulty' | 'Retired'

interface Equipment {
  id: string
  name: string
  model: string
  lab: string
  category: string
  status: Status
  lastChecked: string
  assignedTo?: string
}

const allEquipment: Equipment[] = [
  { id: 'EQ-001', name: 'Oscilloscope', model: 'DS1054Z', lab: 'EE Lab 2', category: 'Electronics', status: 'In Use', lastChecked: '28 Sep 2025', assignedTo: 'Priya Ramesh' },
  { id: 'EQ-002', name: 'Centrifuge', model: 'CF-200', lab: 'Bio Lab 1', category: 'Biology', status: 'Faulty', lastChecked: '29 Sep 2025' },
  { id: 'EQ-003', name: 'Spectrometer', model: 'SP-3', lab: 'Chem Lab A', category: 'Chemistry', status: 'Available', lastChecked: '29 Sep 2025' },
  { id: 'EQ-004', name: 'PCR Machine', model: 'PCR-7', lab: 'Bio Lab 2', category: 'Biology', status: 'Available', lastChecked: '29 Sep 2025' },
  { id: 'EQ-005', name: 'Lathe Machine', model: 'LM-1', lab: 'Mech Workshop', category: 'Mechanical', status: 'Maintenance', lastChecked: '27 Sep 2025' },
  { id: 'EQ-006', name: 'Signal Generator', model: 'AFG1022', lab: 'EE Lab 2', category: 'Electronics', status: 'Available', lastChecked: '28 Sep 2025' },
  { id: 'EQ-007', name: 'Digital Multimeter', model: 'Fluke 117', lab: 'EE Lab 2', category: 'Electronics', status: 'In Use', lastChecked: '29 Sep 2025', assignedTo: 'Carlos Vega' },
  { id: 'EQ-008', name: 'Autoclave', model: 'AC-15L', lab: 'Bio Lab 1', category: 'Biology', status: 'Available', lastChecked: '28 Sep 2025' },
  { id: 'EQ-009', name: 'Rotary Evaporator', model: 'RE-52A', lab: 'Chem Lab A', category: 'Chemistry', status: 'Maintenance', lastChecked: '25 Sep 2025' },
  { id: 'EQ-010', name: 'Tensile Tester', model: 'TT-5kN', lab: 'Mech Workshop', category: 'Mechanical', status: 'Available', lastChecked: '27 Sep 2025' },
  { id: 'EQ-011', name: 'Microscope (Electron)', model: 'JSM-6010', lab: 'Physics Lab', category: 'Physics', status: 'In Use', lastChecked: '29 Sep 2025', assignedTo: 'Dr. Lena Fischer' },
  { id: 'EQ-012', name: 'pH Meter', model: 'PH-100', lab: 'Chem Lab A', category: 'Chemistry', status: 'Available', lastChecked: '28 Sep 2025' },
  { id: 'EQ-013', name: 'Breadboard Kit', model: 'BB-840', lab: 'EE Lab 2', category: 'Electronics', status: 'Retired', lastChecked: '01 Sep 2025' },
  { id: 'EQ-014', name: 'Gas Chromatograph', model: 'GC-2014', lab: 'Chem Lab A', category: 'Chemistry', status: 'Available', lastChecked: '26 Sep 2025' },
]

const statusConfig: Record<Status, { color: string; bg: string }> = {
  Available: { color: '#3fb950', bg: '#3fb95022' },
  'In Use': { color: '#58a6ff', bg: '#58a6ff22' },
  Maintenance: { color: '#d29922', bg: '#d2992222' },
  Faulty: { color: '#f85149', bg: '#f8514922' },
  Retired: { color: '#6e7681', bg: '#6e768122' },
}

const categories = ['All', 'Electronics', 'Biology', 'Chemistry', 'Mechanical', 'Physics']
const statuses: (Status | 'All')[] = ['All', 'Available', 'In Use', 'Maintenance', 'Faulty', 'Retired']

export default function Equipment() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [selected, setSelected] = useState<Equipment | null>(null)

  const filtered = allEquipment.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.model.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || e.category === category
    const matchStatus = status === 'All' || e.status === status
    return matchSearch && matchCat && matchStatus
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', letterSpacing: '0.08em', marginBottom: 6 }}>
          INVENTORY MANAGEMENT
        </div>
        <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em', margin: 0 }}>
          Equipment Register
        </h1>
        <p style={{ color: '#6e7681', fontSize: 14, marginTop: 4 }}>
          {allEquipment.length} items across all laboratories.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, ID, model…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 6,
            color: '#e6edf3',
            padding: '8px 12px',
            fontSize: 13,
            outline: 'none',
            width: 260,
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 6,
            color: '#8b949e',
            padding: '8px 12px',
            fontSize: 13,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as Status | 'All')}
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 6,
            color: '#8b949e',
            padding: '8px 12px',
            fontSize: 13,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <div style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6e7681', paddingTop: 8 }}>
          {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #21262d' }}>
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#161b22', borderBottom: '1px solid #21262d' }}>
              {['ID', 'Name', 'Model', 'Lab', 'Category', 'Status', 'Last Checked'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontFamily: 'DM Mono, monospace',
                    color: '#6e7681',
                    letterSpacing: '0.06em',
                    fontWeight: 500,
                  }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((eq, i) => (
              <tr
                key={eq.id}
                onClick={() => setSelected(eq === selected ? null : eq)}
                style={{
                  background: selected?.id === eq.id ? '#1c2128' : i % 2 === 0 ? '#0d1117' : '#0d1117',
                  borderBottom: '1px solid #21262d',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (selected?.id !== eq.id) (e.currentTarget as HTMLElement).style.background = '#161b22' }}
                onMouseLeave={e => { if (selected?.id !== eq.id) (e.currentTarget as HTMLElement).style.background = '#0d1117' }}
              >
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#58a6ff' }}>{eq.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#e6edf3', fontWeight: 500 }}>{eq.name}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#8b949e' }}>{eq.model}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#c9d1d9' }}>{eq.lab}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#6e7681' }}>{eq.category}</td>
                <td style={{ padding: '12px 16px' }}>
                  <StatusBadge status={eq.status} />
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6e7681' }}>{eq.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="mt-4 rounded-lg p-5" style={{ background: '#161b22', border: '1px solid #30363d' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', marginBottom: 4 }}>{selected.id}</div>
              <div style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 20, color: '#e6edf3' }}>
                {selected.name} <span style={{ color: '#6e7681', fontWeight: 400, fontSize: 14 }}>{selected.model}</span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{ background: 'none', border: 'none', color: '#6e7681', cursor: 'pointer', fontSize: 18, padding: 4 }}
            >×</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              ['Lab', selected.lab],
              ['Category', selected.category],
              ['Status', null],
              ['Assigned To', selected.assignedTo || '—'],
              ['Last Checked', selected.lastChecked],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', marginBottom: 4 }}>{(k as string).toUpperCase()}</div>
                {k === 'Status'
                  ? <StatusBadge status={selected.status} />
                  : <div style={{ fontSize: 13, color: '#c9d1d9' }}>{v}</div>
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status]
  return (
    <span
      className="rounded px-2 py-0.5 inline-block"
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontSize: 11,
        fontFamily: 'DM Mono, monospace',
        letterSpacing: '0.04em',
      }}
    >
      {status.toUpperCase()}
    </span>
  )
}
