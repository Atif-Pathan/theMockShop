import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage/CartPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ShopPage from './pages/ShopPage/ShopPage.jsx';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProductsBySlug,
} from './services/productsAPI.js';
import './index.css';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage />, loader: getAllProducts },
      {
        path: 'shop/:productSlug',
        element: <ProductDetailPage />,
        loader: async ({ params }) => {
          const product = getProductBySlug(params.productSlug);
          const relatedProducts = getRelatedProductsBySlug(params.productSlug);

          // Wait for both promises to resolve
          const [productData, relatedProductsData] = await Promise.all([
            product,
            relatedProducts,
          ]);

          return { product: productData, related: relatedProductsData };
        },
      },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
