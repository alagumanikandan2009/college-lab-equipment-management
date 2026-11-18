import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Equipment from './pages/Equipment'
import Availability from './pages/Availability'
import FaultReports from './pages/FaultReports'
import Maintenance from './pages/Maintenance'
import Login from './pages/Login'

type Page = 'dashboard' | 'equipment' | 'availability' | 'faults' | 'maintenance'

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'equipment', label: 'Equipment', icon: '⊞' },
  { id: 'availability', label: 'Availability', icon: '◎' },
  { id: 'faults', label: 'Fault Reports', icon: '⚠' },
  { id: 'maintenance', label: 'Maintenance', icon: '⚙' },
]

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [page, setPage] = useState<Page>('dashboard')

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  const bgPositions: Record<Page, string> = {
    dashboard: '0% 0%',
    equipment: '100% 0%',
    availability: '0% 100%',
    faults: '100% 100%',
    maintenance: '50% 50%',
  }

  return (
    <div 
      className="flex h-screen overflow-hidden font-sans relative bg-slate-900" 
      style={{ 
        fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 bg-black/80 border-r border-gray-800 shadow-lg z-10 backdrop-blur-md"
        style={{ width: 260 }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800 bg-black/50">
          <div className="flex items-center gap-3">
            <img src="/sece_logo.png" alt="Sri Eshwar Logo" className="h-10 w-auto object-contain bg-white p-1 rounded" />
            <div>
              <div className="font-bold text-[14px] text-white leading-tight">
                Sri Eshwar
              </div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                Lab Management
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Applications
          </div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all"
              style={{
                background: page === item.id ? '#1f2937' : 'transparent',
                color: page === item.id ? '#ffffff' : '#9ca3af',
                fontWeight: page === item.id ? 600 : 500,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (page !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = '#374151';
                  (e.currentTarget as HTMLElement).style.color = '#f3f4f6';
                }
              }}
              onMouseLeave={e => {
                if (page !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                }
              }}
            >
              <span className="text-[16px] opacity-80" style={{ color: page === item.id ? '#ffffff' : '#6b7280' }}>
                {item.icon}
              </span>
              {item.label}
              {item.id === 'faults' && <FaultBadge />}
            </button>
          ))}
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-gray-800 bg-black/50">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            <span>⎋</span> Logout
          </button>
          <div className="mt-4 text-center">
            <div className="text-[10px] text-gray-500 font-medium">SRI ESHWAR COLLEGE</div>
            <div className="text-[10px] text-gray-500 mt-0.5">AY 2025–26</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto relative z-10 bg-transparent">
        <div className="h-full p-2">
          <div className="h-full bg-black/80 text-white shadow-xl rounded-xl border border-gray-800 backdrop-blur-md overflow-y-auto overflow-x-hidden">
            {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
            {page === 'equipment' && <Equipment />}
            {page === 'availability' && <Availability />}
            {page === 'faults' && <FaultReports />}
            {page === 'maintenance' && <Maintenance />}
          </div>
        </div>
      </main>
    </div>
  )
}

function FaultBadge() {
  return (
    <span
      className="ml-auto flex items-center justify-center rounded-full text-white font-bold shadow-sm"
      style={{
        background: '#ef4444',
        fontSize: 10,
        height: 18,
        minWidth: 18,
        padding: '0 5px'
      }}
    >
      3
    </span>
  )
}
