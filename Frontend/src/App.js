import logo from './logo.svg';
import './App.css';
import Navigation from './navigation/Navigation';
// App.js (top of file)
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layout/Navbar';
function App() {
  return (
  <div className="App">
     <ToastContainer position="top-center" autoClose={3000} />
    <Navigation/>
  </div>
  );
}

export default App;
