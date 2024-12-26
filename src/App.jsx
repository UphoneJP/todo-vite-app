import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/index';
import Help from './pages/Help';
import Todo from './pages/Todo';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="/todo/:userid" element={<Todo />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App
