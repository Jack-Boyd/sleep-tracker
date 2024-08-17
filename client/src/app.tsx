import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import Layout from './layout/layout';
import Create from './components/create/create';
import Entries from './components/entries/entries';
import TrendChart from './components/trend-chart/trend-chart';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Entries />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:name/:gender" element={<TrendChart />} />
        </Route>        
      </Routes>
    </Router>
  );
};

export default App;