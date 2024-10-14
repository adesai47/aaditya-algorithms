import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Algorithm Visualization App</h1>
      <nav>
        <ul>
          <li><Link href="/search">Search Algorithms</Link></li>
          <li><Link href="/sort">Sort Algorithms</Link></li>
          <li><Link href="/path-planning">Path Planning Algorithms</Link></li>
        </ul>
      </nav>
    </div>
  );
}
