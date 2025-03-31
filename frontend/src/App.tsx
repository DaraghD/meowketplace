import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import SignInForm from "./_auth/forms/SignInForm";
import Home from "./_root/pages/Home";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import BusinessSignUpForm from "./_auth/forms/BusinessSignUpForm";
import Messages from "./_root/pages/Messages";
import { AboutUs, Services } from "./_root/pages";
import ProductView from "./_root/pages/ProductView";
import Profile from "@/_root/pages/Profile.tsx";
import ProductListing from "./_root/pages/ProductListing";
import { Toaster } from "./components/ui/sonner";
import Products from "./_root/pages/Search";
import Reports from "./_root/pages/Reports";

const App = () => {
    const location = useLocation();
    const isPublicRoute = [
        "/sign-in",
        "/sign-up",
        "/business-sign-up",
    ].includes(location.pathname);

    return (
        <>
            <main className={isPublicRoute ? "flex h-screen" : ""}>
                <Routes>
                    {/* public routes */}
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/sign-in" element={<SignInForm />} />
                        <Route path="/sign-up" element={<SignUpForm />} />
                        <Route
                            path="/business-sign-up"
                            element={<BusinessSignUpForm />}
                        />
                    </Route>
                    {/* private routes */}
                    <Route element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/messages/:id" element={<Messages />} />
                        <Route path="/product" element={<Navigate to="/search" />} />
                        <Route path="/search" element={<Products />} />
                        <Route
                            path="/product/:id"
                            element={<ProductView />}
                        /> {/* individual product */}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/product-listing" element={<ProductListing />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/reports" element={<Reports />} />
                    </Route>
                </Routes>
            </main>
            <Toaster />
        </>
    );
};

export default App;
