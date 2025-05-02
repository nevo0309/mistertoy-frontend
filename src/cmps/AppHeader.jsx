import { Sidebar } from './SideBar'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-left">
        <Sidebar />
      </div>
      <div className="header-center">
        <div className="logo">LUXE TOYS</div>
      </div>
    </header>
  )
}
