import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import SignInForm from "./_auth/forms/SignInForm";
import Home from "./_root/pages/Home";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import BusinessSignUpForm from "./_auth/forms/BusinessSignUpForm";
import Messages from "./_root/pages/Messages";
import Product from "./_root/pages/Product";

const App = () => {
  const location = useLocation();
  const isPublicRoute = ["/sign-in", "/sign-up", "/business-sign-up"].includes(
    location.pathname
  );

  return (
    <main className={isPublicRoute ? "flex h-screen" : ""}>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/business-sign-up" element={<BusinessSignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
