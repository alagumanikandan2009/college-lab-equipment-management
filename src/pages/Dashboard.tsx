type Page = 'dashboard' | 'equipment' | 'availability' | 'faults' | 'maintenance'

interface Props {
  onNavigate: (page: Page) => void
}

const stats = [
  { label: 'Total Equipment', value: '142', sub: 'across 8 labs', color: '#0f172a' },
  { label: 'Available Now', value: '89', sub: '62.7% utilization', color: '#047857' },
  { label: 'Under Maintenance', value: '11', sub: '3 scheduled today', color: '#b45309' },
  { label: 'Fault Reports', value: '3', sub: '2 unresolved', color: '#be123c' },
]

const recentActivity = [
  { time: '09:14', action: 'Oscilloscope DS1054Z checked out', user: 'Priya Ramesh', lab: 'EE Lab 2', type: 'checkout' },
  { time: '09:02', action: 'Fault reported: Centrifuge CF-200', user: 'Dr. Ahanu Swiftwind', lab: 'Bio Lab 1', type: 'fault' },
  { time: '08:47', action: 'Maintenance completed: Spectrometer SP-3', user: 'Tech. Olumide Bello', lab: 'Chem Lab A', type: 'done' },
  { time: '08:30', action: 'PCR Machine PCR-7 returned', user: 'Marcus Elias', lab: 'Bio Lab 2', type: 'return' },
  { time: '08:15', action: 'Scheduled: Lathe Machine LM-1 service', user: 'Tech. Sunita Nair', lab: 'Mech Workshop', type: 'scheduled' },
]

const labUtilization = [
  { lab: 'EE Lab 2', used: 14, total: 18 },
  { lab: 'Bio Lab 1', used: 9, total: 12 },
  { lab: 'Chem Lab A', used: 11, total: 15 },
  { lab: 'Mech Workshop', used: 7, total: 20 },
  { lab: 'Physics Lab', used: 6, total: 10 },
]

const typeColors: Record<string, string> = {
  checkout: '#334155',
  fault: '#be123c',
  done: '#047857',
  return: '#047857',
  scheduled: '#d97706',
}

export default function Dashboard({ onNavigate }: Props) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
          OVERVIEW — MONDAY, 29 SEP 2025
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight m-0">
          Lab Equipment Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Real-time status across all department laboratories.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-lg p-6 bg-white shadow-sm border border-gray-200"
          >
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {s.label}
            </div>
            <div className="text-4xl font-bold tracking-tight leading-none mb-2" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs text-gray-500 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 340px' }}>
        {/* Recent Activity */}
        <div className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
            <span className="font-semibold text-gray-900">
              Recent Activity
            </span>
            <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">TODAY</span>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <span className="text-xs font-medium text-gray-400 mt-0.5 flex-shrink-0 w-10">
                  {a.time}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 mb-0.5">{a.action}</div>
                  <div className="text-xs text-gray-500">
                    {a.user} <span className="mx-1.5 text-gray-300">•</span> <span className="text-blue-700 font-medium">{a.lab}</span>
                  </div>
                </div>
                <span
                  className="rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shrink-0"
                  style={{
                    background: typeColors[a.type] + '15',
                    color: typeColors[a.type],
                  }}
                >
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Utilization */}
        <div className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <span className="font-semibold text-gray-900">
              Lab Utilization
            </span>
          </div>
          <div className="px-6 py-5 space-y-6">
            {labUtilization.map(l => {
              const pct = Math.round((l.used / l.total) * 100)
              const barColor = pct > 80 ? '#dc2626' : pct > 60 ? '#d97706' : '#16a34a'
              return (
                <div key={l.lab}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{l.lab}</span>
                    <span className="text-xs font-semibold text-gray-500">
                      {l.used} / {l.total}
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden bg-gray-100 h-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: barColor }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    {pct}% capacity
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick links */}
          <div className="px-6 pb-6 pt-2 space-y-2.5 border-t border-gray-100 mt-2">
            {(['equipment', 'faults', 'maintenance'] as Page[]).map(p => (
              <button
                key={p}
                onClick={() => onNavigate(p)}
                className="w-full text-left rounded-md px-4 py-2.5 transition-colors border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-sm font-medium text-gray-700 shadow-sm"
              >
                → View {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
