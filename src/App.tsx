import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { BrowsePage } from './pages/BrowsePage'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { RegisterPage } from './pages/RegisterPage'
import { SellPage } from './pages/SellPage'
import { SellerProfilePage } from './pages/SellerProfilePage'
import { SellerDashboardPage } from './pages/SellerDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/dashboard" element={<SellerDashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/seller/:id" element={<SellerProfilePage />} />
              <Route path="/search" element={<Navigate to="/browse" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
