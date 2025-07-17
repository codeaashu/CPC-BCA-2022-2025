import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import CategoryPage from "./Components/Pages/CategoryPage";
import SearchResults from "./Components/Pages/SearchResults";
import CartPage from "./Components/Pages/CartPage";
import CheckoutPage from "./Components/Pages/CheckoutPage";
import AuthPage from "./Components/Pages/AuthPage";
import ProfilePage from "./Components/Pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/haircare"
        element={<CategoryPage categoryName="haircare" theme="hair-theme" />}
      />
      <Route
        path="/babycare"
        element={<CategoryPage categoryName="babycare" theme="baby-theme" />}
      />
      <Route
        path="/skincare"
        element={<CategoryPage categoryName="skincare" theme="skin-theme" />}
      />
      <Route
        path="/ayurveda"
        element={
          <CategoryPage categoryName="ayurveda" theme="ayurveda-theme" />
        }
      />
      <Route
        path="/medicine"
        element={
          <CategoryPage categoryName="medicine" theme="medicine-theme" />
        }
      />
      <Route
        path="/vitamins"
        element={<CategoryPage categoryName="vitamins" theme="vitamin-theme" />}
      />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
