import Link from 'next/link';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <Link href="/">Return to home page</Link>
    </div>
  );
}

export default NotFound;
