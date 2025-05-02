import { BrowserRouter as Router } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyIndex } from './pages/toyIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <UserMsg />
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={<Home />} path="/" />
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
