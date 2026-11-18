import { useState } from 'react'

type Severity = 'Low' | 'Medium' | 'High' | 'Critical'
type FaultStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed'

interface Fault {
  id: string
  equipment: string
  equipmentId: string
  lab: string
  reportedBy: string
  date: string
  severity: Severity
  status: FaultStatus
  description: string
  resolution?: string
}

const initialFaults: Fault[] = [
  {
    id: 'FR-029',
    equipment: 'Centrifuge',
    equipmentId: 'EQ-002',
    lab: 'Bio Lab 1',
    reportedBy: 'Dr. Ahanu Swiftwind',
    date: '29 Sep 2025',
    severity: 'High',
    status: 'Open',
    description: 'Centrifuge vibrates excessively at speeds above 5000 RPM. Unusual clicking noise observed. Equipment has been taken out of service.',
  },
  {
    id: 'FR-028',
    equipment: 'Rotary Evaporator',
    equipmentId: 'EQ-009',
    lab: 'Chem Lab A',
    reportedBy: 'Anjali Iyer',
    date: '27 Sep 2025',
    severity: 'Medium',
    status: 'In Progress',
    description: 'Vacuum pump seal appears to be degraded. Suction pressure drops to near zero within 10 minutes of operation.',
  },
  {
    id: 'FR-027',
    equipment: 'Lathe Machine',
    equipmentId: 'EQ-005',
    lab: 'Mech Workshop',
    reportedBy: 'Kwame Asante',
    date: '25 Sep 2025',
    severity: 'Low',
    status: 'In Progress',
    description: 'Coolant pump intermittently fails. Machine still operational but coolant flow must be manually monitored.',
  },
  {
    id: 'FR-026',
    equipment: 'PCR Machine',
    equipmentId: 'EQ-004',
    lab: 'Bio Lab 2',
    reportedBy: 'Marcus Elias',
    date: '22 Sep 2025',
    severity: 'Critical',
    status: 'Resolved',
    description: 'Temperature regulation failure causing inconsistent cycling. Risk of sample degradation.',
    resolution: 'Thermocouple replaced and firmware updated. Post-fix verification passed. Returned to service 25 Sep 2025.',
  },
  {
    id: 'FR-025',
    equipment: 'Signal Generator',
    equipmentId: 'EQ-006',
    lab: 'EE Lab 2',
    reportedBy: 'Priya Ramesh',
    date: '18 Sep 2025',
    severity: 'Low',
    status: 'Closed',
    description: 'Display backlight flickering. Functionality unaffected.',
    resolution: 'Display ribbon cable reseated. Issue resolved.',
  },
]

const sevConfig: Record<Severity, { color: string; bg: string }> = {
  Low: { color: '#3fb950', bg: '#3fb95022' },
  Medium: { color: '#d29922', bg: '#d2992222' },
  High: { color: '#f85149', bg: '#f8514922' },
  Critical: { color: '#ff6b6b', bg: '#ff6b6b33' },
}
const statusConfig: Record<FaultStatus, { color: string; bg: string }> = {
  Open: { color: '#f85149', bg: '#f8514922' },
  'In Progress': { color: '#d29922', bg: '#d2992222' },
  Resolved: { color: '#3fb950', bg: '#3fb95022' },
  Closed: { color: '#6e7681', bg: '#6e768122' },
}

interface NewFault {
  equipment: string
  equipmentId: string
  lab: string
  reportedBy: string
  severity: Severity
  description: string
}

export default function FaultReports() {
  const [faults, setFaults] = useState<Fault[]>(initialFaults)
  const [selected, setSelected] = useState<Fault | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<FaultStatus | 'All'>('All')
  const [form, setForm] = useState<NewFault>({
    equipment: '', equipmentId: '', lab: '', reportedBy: '', severity: 'Medium', description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const filtered = faults.filter(f => filterStatus === 'All' || f.status === filterStatus)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newFault: Fault = {
      id: `FR-${(faults.length + 30).toString().padStart(3, '0')}`,
      ...form,
      date: '29 Sep 2025',
      status: 'Open',
    }
    setFaults(prev => [newFault, ...prev])
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ equipment: '', equipmentId: '', lab: '', reportedBy: '', severity: 'Medium', description: '' }) }, 2000)
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', letterSpacing: '0.08em', marginBottom: 6 }}>
            FAULT TRACKING
          </div>
          <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em', margin: 0 }}>
            Fault Reports
          </h1>
          <p style={{ color: '#6e7681', fontSize: 14, marginTop: 4 }}>
            {faults.filter(f => f.status === 'Open').length} open · {faults.filter(f => f.status === 'In Progress').length} in progress
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#f85149',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          + Report Fault
        </button>
      </div>

      {/* New fault form */}
      {showForm && (
        <div className="rounded-lg p-5 mb-6" style={{ background: '#161b22', border: '1px solid #f85149' }}>
          <div style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: 15, color: '#e6edf3', marginBottom: 16 }}>
            New Fault Report
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {[
                { label: 'Equipment Name', key: 'equipment', placeholder: 'e.g. Centrifuge' },
                { label: 'Equipment ID', key: 'equipmentId', placeholder: 'e.g. EQ-002' },
                { label: 'Lab', key: 'lab', placeholder: 'e.g. Bio Lab 1' },
                { label: 'Reported By', key: 'reportedBy', placeholder: 'Full name' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>
                    {f.label.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    required
                    style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, color: '#e6edf3', padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>SEVERITY</label>
              <div className="flex gap-2">
                {(['Low', 'Medium', 'High', 'Critical'] as Severity[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, severity: s }))}
                    style={{
                      background: form.severity === s ? sevConfig[s].bg : '#0d1117',
                      border: `1px solid ${form.severity === s ? sevConfig[s].color : '#30363d'}`,
                      color: form.severity === s ? sevConfig[s].color : '#6e7681',
                      borderRadius: 6,
                      padding: '6px 14px',
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: 'DM Mono, monospace',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', display: 'block', marginBottom: 6 }}>DESCRIPTION</label>
              <textarea
                rows={3}
                required
                placeholder="Describe the fault in detail…"
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, color: '#e6edf3', padding: '8px 12px', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                style={{ background: submitted ? '#3fb950' : '#f85149', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                {submitted ? '✓ Submitted' : 'Submit Report'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ background: '#21262d', color: '#8b949e', border: '1px solid #30363d', borderRadius: 6, padding: '10px 16px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {(['All', 'Open', 'In Progress', 'Resolved', 'Closed'] as (FaultStatus | 'All')[]).map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              background: filterStatus === s ? '#21262d' : 'transparent',
              border: `1px solid ${filterStatus === s ? '#30363d' : 'transparent'}`,
              color: filterStatus === s ? '#e6edf3' : '#6e7681',
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >{s}</button>
        ))}
      </div>

      {/* Fault list */}
      <div className="space-y-3">
        {filtered.map(fault => (
          <div
            key={fault.id}
            onClick={() => setSelected(selected?.id === fault.id ? null : fault)}
            className="rounded-lg cursor-pointer transition-all"
            style={{
              background: '#161b22',
              border: `1px solid ${selected?.id === fault.id ? '#30363d' : '#21262d'}`,
            }}
          >
            <div className="px-5 py-4 flex items-start gap-4">
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', marginTop: 2, width: 52, flexShrink: 0 }}>
                {fault.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#e6edf3', fontFamily: 'Work Sans, sans-serif' }}>{fault.equipment}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681' }}>{fault.equipmentId}</span>
                </div>
                <div style={{ fontSize: 13, color: '#8b949e', marginBottom: 8 }}>
                  <span style={{ color: '#58a6ff' }}>{fault.lab}</span> · Reported by {fault.reportedBy} · {fault.date}
                </div>
                <p style={{ fontSize: 13, color: '#c9d1d9', margin: 0, lineHeight: 1.5 }}>
                  {fault.description}
                </p>
                {selected?.id === fault.id && fault.resolution && (
                  <div className="mt-3 rounded p-3" style={{ background: '#0d1117', border: '1px solid #3fb95044' }}>
                    <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#3fb950', marginBottom: 4 }}>RESOLUTION</div>
                    <p style={{ fontSize: 13, color: '#c9d1d9', margin: 0 }}>{fault.resolution}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <SevBadge sev={fault.severity} />
                <StatBadge status={fault.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SevBadge({ sev }: { sev: Severity }) {
  const cfg = sevConfig[sev]
  return (
    <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 4, padding: '2px 8px', fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
      {sev.toUpperCase()}
    </span>
  )
}

function StatBadge({ status }: { status: FaultStatus }) {
  const cfg = statusConfig[status]
  return (
    <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 4, padding: '2px 8px', fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
      {status.toUpperCase()}
    </span>
  )
}
