import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Footer from './components/Footer';
import KeyBanner from './components/KeyBanner';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RequireRole from './components/RequireRole';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminMembers from './pages/admin/AdminMembers';
import AdminMovieForm from './pages/admin/AdminMovieForm';
import AdminMovies from './pages/admin/AdminMovies';
import ApiLab from './pages/ApiLab';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    // AuthProvider ครอบทั้งแอป ทุกหน้าข้างในจึงเรียก useAuth() ได้
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <KeyBanner />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
             {/* หลังบ้าน: ครอบทั้งกิ่งด้วย RequireRole ครั้งเดียว หน้าลูกทุกหน้าได้รับการป้องกันหมด */}
            <Route path="/admin" element={<RequireRole role="admin"><AdminLayout /></RequireRole>}>
              <Route index element={<AdminDashboard />} />
              <Route path="movies" element={<AdminMovies />} />
              <Route path="movies/new" element={<AdminMovieForm />} />
              <Route path="movies/:id" element={<AdminMovieForm />} />
              <Route path="members" element={<AdminMembers />} />
            </Route>
            <Route path="/lab" element={<ApiLab />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
