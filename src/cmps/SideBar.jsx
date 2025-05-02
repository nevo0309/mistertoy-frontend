import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Handle clicks outside of the sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden' // disable scroll
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = '' // restore scroll
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = '' // clean up
    }
  }, [isMenuOpen])

  return (
    <div className="side-bar">
      {isMenuOpen && <div className="sidebar-backdrop" onClick={() => setIsMenuOpen(false)} />}

      <button
        className="sidebar-toggle"
        ref={buttonRef}
        onClick={e => {
          e.stopPropagation()
          setIsMenuOpen(prev => !prev)
        }}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className={`sidebar ${isHovered || isMenuOpen ? 'open' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={menuRef}
      >
        <nav className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Navigation</h3>

            <Link
              to="/"
              className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sidebar-icon">
                <i className="fas fa-home"></i>
              </span>
              <span className="sidebar-text">Home</span>
            </Link>

            <Link
              to="/toy"
              className={`sidebar-item ${location.pathname === '/toy' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sidebar-icon">
                <i className="fas fa-gamepad"></i>
              </span>
              <span className="sidebar-text">Toys</span>
            </Link>

            <Link
              to="/about"
              className={`sidebar-item ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sidebar-icon">
                <i className="fas fa-info-circle"></i>
              </span>
              <span className="sidebar-text">About</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
