import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;