import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import Layout from './layout/layout';
import Entries from './components/entries';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Entries />} />
        </Route>        
      </Routes>
    </Router>
  );
};

export default App;