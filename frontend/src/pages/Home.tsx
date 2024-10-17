import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header section with title on the left and links on the right */}
      <header
        style={{
          width: '100%',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          borderBottom: '2px solid #ccc', // Added border line to separate header
        }}
      >
        <h2 style={{ color: '#2c3e50', marginLeft: '20px' }}>Fractal Algorithm's</h2>
        <nav style={{ marginRight: '50px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Home
          </Link>
          <Link to="/search" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Search
          </Link>
          <Link to="/sort" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Sort
          </Link>
          <Link to="/path-planning" style={{ textDecoration: 'none', color: '#4a4a8c' }}>
            Planning Path
          </Link>
        </nav>
      </header>

      {/* Main content section */}
      <main style={{ textAlign: 'center', marginTop: '120px' }}> {/* Adjusted margin to accommodate the header */}
        <h1
          style={{
            fontSize: '36px',
            color: '#2c3e50',
            marginBottom: '20px',
            letterSpacing: '1px',
          }}
        >
          Algorithm Visualization App
        </h1>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px', // Space between buttons
          }}
        >
          <li>
            <Link
              to="/search"
              style={{
                textDecoration: 'none',
                color: '#3498db',
                fontSize: '22px',
                padding: '10px 20px',
                border: '2px solid #3498db',
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Search Algorithms
            </Link>
          </li>
          <li>
            <Link
              to="/sort"
              style={{
                textDecoration: 'none',
                color: '#3498db',
                fontSize: '22px',
                padding: '10px 20px',
                border: '2px solid #3498db',
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Sort Algorithms
            </Link>
          </li>
          <li>
            <Link
              to="/path-planning"
              style={{
                textDecoration: 'none',
                color: '#3498db',
                fontSize: '22px',
                padding: '10px 20px',
                border: '2px solid #3498db',
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Path Planning (Dijkstra's Algorithm)
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
