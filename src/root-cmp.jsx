import { BrowserRouter as Router } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToyIndex } from './pages/toyIndex'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { About } from './pages/About'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <UserMsg />
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/detail/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
