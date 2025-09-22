import { Routes } from 'react-router';
import './App.css'

function App(
  
) {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/stats" element={<StatsViewerPage/>} />
      <Route path="/todos" element={<TodoPage />} />
      <Route path="/developer" element={<DeveloperPage/>} />
      <Route path="/resources" element={<ResourcesPage/>} />
    </Routes>
  )
}

export default App
