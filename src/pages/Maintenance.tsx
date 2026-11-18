import { useState } from 'react'

type MaintStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue'

interface MaintenanceTask {
  id: string
  equipment: string
  equipmentId: string
  lab: string
  technician: string
  scheduledDate: string
  type: string
  status: MaintStatus
  notes?: string
  duration: string
}

const tasks: MaintenanceTask[] = [
  {
    id: 'MT-041',
    equipment: 'Lathe Machine',
    equipmentId: 'EQ-005',
    lab: 'Mech Workshop',
    technician: 'Tech. Sunita Nair',
    scheduledDate: '29 Sep 2025',
    type: 'Preventive',
    status: 'In Progress',
    notes: 'Coolant pump replacement and full lubrication service.',
    duration: '4 hours',
  },
  {
    id: 'MT-040',
    equipment: 'Rotary Evaporator',
    equipmentId: 'EQ-009',
    lab: 'Chem Lab A',
    technician: 'Tech. Raj Pillai',
    scheduledDate: '30 Sep 2025',
    type: 'Corrective',
    status: 'Scheduled',
    notes: 'Vacuum pump seal replacement. Parts ordered, delivery confirmed.',
    duration: '3 hours',
  },
  {
    id: 'MT-039',
    equipment: 'Centrifuge CF-200',
    equipmentId: 'EQ-002',
    lab: 'Bio Lab 1',
    technician: 'Tech. Olumide Bello',
    scheduledDate: '01 Oct 2025',
    type: 'Corrective',
    status: 'Scheduled',
    notes: 'Investigate vibration fault reported FR-029. Rotor inspection required.',
    duration: 'TBD',
  },
  {
    id: 'MT-038',
    equipment: 'Spectrometer SP-3',
    equipmentId: 'EQ-003',
    lab: 'Chem Lab A',
    technician: 'Tech. Raj Pillai',
    scheduledDate: '26 Sep 2025',
    type: 'Preventive',
    status: 'Completed',
    notes: 'Annual calibration and optics cleaning completed successfully.',
    duration: '2 hours',
  },
  {
    id: 'MT-037',
    equipment: 'Electron Microscope',
    equipmentId: 'EQ-011',
    lab: 'Physics Lab',
    technician: 'External — JEOL Service',
    scheduledDate: '15 Sep 2025',
    type: 'Preventive',
    status: 'Completed',
    notes: 'Annual filament replacement and vacuum system service. Manufacturer certified.',
    duration: '6 hours',
  },
  {
    id: 'MT-036',
    equipment: 'Oscilloscope DS1054Z',
    equipmentId: 'EQ-001',
    lab: 'EE Lab 2',
    technician: 'Tech. Sunita Nair',
    scheduledDate: '20 Sep 2025',
    type: 'Preventive',
    status: 'Overdue',
    notes: 'Calibration overdue. Technician rescheduled twice.',
    duration: '1 hour',
  },
]

const statusCfg: Record<MaintStatus, { color: string; bg: string }> = {
  Scheduled: { color: '#58a6ff', bg: '#58a6ff22' },
  'In Progress': { color: '#d29922', bg: '#d2992222' },
  Completed: { color: '#3fb950', bg: '#3fb95022' },
  Overdue: { color: '#f85149', bg: '#f8514922' },
}
const typeCfg: Record<string, { color: string }> = {
  Preventive: { color: '#58a6ff' },
  Corrective: { color: '#f85149' },
}

const upcomingDates = ['29 Sep', '30 Sep', '01 Oct', '02 Oct', '03 Oct']

export default function Maintenance() {
  const [filter, setFilter] = useState<MaintStatus | 'All'>('All')
  const [selected, setSelected] = useState<MaintenanceTask | null>(null)

  const filtered = tasks.filter(t => filter === 'All' || t.status === filter)

  const countByStatus = (s: MaintStatus) => tasks.filter(t => t.status === s).length

  return (
    <div className="p-8">
      <div className="mb-6">
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', letterSpacing: '0.08em', marginBottom: 6 }}>
          SERVICE SCHEDULE
        </div>
        <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em', margin: 0 }}>
          Maintenance
        </h1>
        <p style={{ color: '#6e7681', fontSize: 14, marginTop: 4 }}>Scheduled and ongoing service tasks.</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {(['Scheduled', 'In Progress', 'Completed', 'Overdue'] as MaintStatus[]).map(s => (
          <div
            key={s}
            onClick={() => setFilter(filter === s ? 'All' : s)}
            className="rounded-lg p-4 cursor-pointer transition-all"
            style={{
              background: filter === s ? statusCfg[s].bg : '#161b22',
              border: `1px solid ${filter === s ? statusCfg[s].color + '66' : '#21262d'}`,
            }}
          >
            <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: statusCfg[s].color, marginBottom: 6 }}>
              {s.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, fontSize: 28, color: statusCfg[s].color }}>
              {countByStatus(s)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 260px' }}>
        {/* Task list */}
        <div>
          <div className="flex gap-2 mb-4">
            {(['All', 'Scheduled', 'In Progress', 'Completed', 'Overdue'] as (MaintStatus | 'All')[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  background: filter === s ? '#21262d' : 'transparent',
                  border: `1px solid ${filter === s ? '#30363d' : 'transparent'}`,
                  color: filter === s ? '#e6edf3' : '#6e7681',
                  borderRadius: 6,
                  padding: '5px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >{s}</button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(task => (
              <div
                key={task.id}
                onClick={() => setSelected(selected?.id === task.id ? null : task)}
                className="rounded-lg cursor-pointer"
                style={{ background: '#161b22', border: `1px solid ${selected?.id === task.id ? '#30363d' : '#21262d'}` }}
              >
                <div className="px-5 py-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', marginTop: 2 }}>{task.id}</span>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#e6edf3', fontFamily: 'Work Sans, sans-serif' }}>
                        {task.equipment}
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', fontWeight: 400, marginLeft: 8 }}>{task.equipmentId}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6e7681', marginTop: 2 }}>
                        <span style={{ color: '#58a6ff' }}>{task.lab}</span> · {task.technician}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={task.status} />
                      <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: typeCfg[task.type]?.color || '#6e7681' }}>
                        {task.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div style={{ fontSize: 12, color: '#6e7681' }}>
                      <span style={{ color: '#8b949e' }}>Scheduled:</span>{' '}
                      <span style={{ fontFamily: 'DM Mono, monospace', color: '#c9d1d9' }}>{task.scheduledDate}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6e7681' }}>
                      <span style={{ color: '#8b949e' }}>Duration:</span>{' '}
                      <span style={{ fontFamily: 'DM Mono, monospace', color: '#c9d1d9' }}>{task.duration}</span>
                    </div>
                  </div>

                  {selected?.id === task.id && task.notes && (
                    <div className="mt-3 rounded p-3" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                      <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#6e7681', marginBottom: 4 }}>NOTES</div>
                      <p style={{ fontSize: 13, color: '#c9d1d9', margin: 0 }}>{task.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar sidebar */}
        <div>
          <div className="rounded-lg" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: '#21262d' }}>
              <span style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#e6edf3' }}>
                Upcoming 5 Days
              </span>
            </div>
            <div className="p-4 space-y-2">
              {upcomingDates.map(date => {
                const dayTasks = tasks.filter(t =>
                  t.scheduledDate.includes(date.split(' ')[0]) &&
                  t.scheduledDate.includes(date.split(' ')[1])
                )
                return (
                  <div key={date} className="rounded p-3" style={{ background: '#0d1117', border: '1px solid #21262d' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6e7681', marginBottom: dayTasks.length > 0 ? 6 : 0 }}>
                      {date}
                    </div>
                    {dayTasks.length === 0 ? (
                      <div style={{ fontSize: 11, color: '#30363d', fontFamily: 'DM Mono, monospace' }}>no tasks</div>
                    ) : (
                      dayTasks.map(t => (
                        <div key={t.id} className="flex items-center gap-2 mb-1">
                          <div className="rounded-full shrink-0" style={{ width: 6, height: 6, background: statusCfg[t.status].color }} />
                          <span style={{ fontSize: 12, color: '#c9d1d9', lineHeight: 1.3 }}>{t.equipment}</span>
                        </div>
                      ))
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Technicians */}
          <div className="rounded-lg mt-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: '#21262d' }}>
              <span style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#e6edf3' }}>Technicians</span>
            </div>
            <div className="px-4 py-3 space-y-2">
              {Array.from(new Set(tasks.map(t => t.technician))).map(tech => {
                const count = tasks.filter(t => t.technician === tech && ['Scheduled', 'In Progress'].includes(t.status)).length
                return (
                  <div key={tech} className="flex justify-between items-center">
                    <span style={{ fontSize: 12, color: '#c9d1d9' }}>{tech.replace('Tech. ', '')}</span>
                    {count > 0 && (
                      <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: '#d29922', background: '#d2992222', borderRadius: 4, padding: '1px 6px' }}>
                        {count} active
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: MaintStatus }) {
  const cfg = statusCfg[status]
  return (
    <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 4, padding: '2px 8px', fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
      {status.toUpperCase()}
    </span>
  )
}
