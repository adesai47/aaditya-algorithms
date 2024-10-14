import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Algorithm Visualization App</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <Link to="/search" style={{ textDecoration: 'none', color: '#3498db' }}>
            Search Algorithms
          </Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link to="/sort" style={{ textDecoration: 'none', color: '#3498db' }}>
            Sort Algorithms
          </Link>
        </li>
      </ul>
    </div>
  );
}
