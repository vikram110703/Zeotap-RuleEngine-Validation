import React from "react";
import CreateRule from "./Pages/Rule_Creation";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  return(
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <nav className="w-full bg-blue-500 p-4 text-white">
          <div className="flex justify-center space-x-4">
            {/* <Link to="/" className="hover:text-gray-200">
              Create Rule
            </Link> */}
            
          </div>
        </nav>
        <div className="w-full max-w-4xl p-8">
          <Routes>
            <Route path="/" element={<CreateRule />} />
            <Route path="/*" element={<CreateRule/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
