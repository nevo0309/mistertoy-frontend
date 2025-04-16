import { BrowserRouter as Router } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToyIndex } from './pages/toyIndex'
import { AppHeader } from './cmps/AppHeader'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={ToyIndex} path="/toy" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
