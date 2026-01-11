import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar';
import FinalFooter from './components/finalfooter';
import AuthPage from './components/AuthPage';
import Home from './pages/Home';
import BlogGrid from './pages/Blog';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import UploadPage from './pages/UploadPage';
import LibraryPage from './pages/LibraryPage';
import SavedBooksPage from './pages/SavedBooksPage';
import FullDictionary from './components/FullDictionary';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';

/* --------- 🔒 Protected Route --------- */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

/* --------- 🧭 Redirect if already logged in --------- */
const AuthWrapper = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />;
};

/* --------- 🔁 Shared Layout --------- */
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <FinalFooter />
  </>
);

/* --------- 🌐 Route Configuration --------- */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogGrid /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'upload', element: <UploadPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'saved-books', element: <SavedBooksPage /> },
      { path: 'dictionary', element: <FullDictionary /> },
      { path: 'contact', element: <Contact /> },
      { path: 'chatbot', element: <Chatbot /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthWrapper />,
  },
]);

/* --------- ⚡ Root App Component --------- */
const App = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Save token and redirect to home
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
      window.location.href = '/'; // ✅ Redirect to homepage after login
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
