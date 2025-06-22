import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h1>WELCOME TO THE HOMEPAGE!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A commodi,
        quasi distinctio nulla fugiat vero ducimus quae facilis harum adipisci
        ut officia facere alias impedit, vitae, nesciunt nihil accusamus
        reprehenderit?
      </p>
      <Link to="/shop">
        <button>Shop now!</button>
      </Link>
    </>
  );
}
