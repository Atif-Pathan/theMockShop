import { useRouteError, Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  // This hook provides the error that was thrown.
  const error = useRouteError();

  // Log the error to the console for the developer
  console.error(error);

  let title = 'Oops! Something went wrong';
  let message = 'We encountered an unexpected error. Please try again later.';

  // Check if it's a response error (e.g., 404 Not Found)
  if (error?.status) {
    if (error.status === 404) {
      title = 'Page Not Found';
      message = "The page you're looking for doesn't exist or has been moved.";
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || 'Could not find the requested resource.';
    }
  }

  // Check for specific data loading errors from our loaders
  if (error?.data?.message) {
    message = error.data.message;
  }

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <i
            className="fa-solid fa-triangle-exclamation"
            aria-hidden="true"
          ></i>
        </div>

        <h1 className={styles.errorTitle}>{title}</h1>
        <p className={styles.errorMessage}>{message}</p>

        <Link to="/" className={styles.homeLink}>
          <i
            className={`fa-solid fa-arrow-left ${styles.homeIcon}`}
            aria-hidden="true"
          ></i>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
