// src/pages/ErrorPage.jsx
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  // This hook provides the error that was thrown.
  const error = useRouteError();

  // Log the error to the console for the developer
  console.error(error);

  let title = 'An error occurred!';
  let message = 'Something went wrong.';

  // Check if it's a response error (e.g., 404 Not Found)
  if (error.status) {
    title = `Error ${error.status}`;
    message = error.statusText || 'Could not find resource or page.';
  }

  // Check for specific data loading errors from our loaders
  if (error.data) {
    message = error.data.message;
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <p>
        Go back to the{' '}
        <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}
