import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import PhoneLogin from "./pages/phoneLogin";
import SignUp from "./pages/signUp";
import Home from "./pages/Home";
import Landing from "./pages/landingPage";
import LoginPassword from "./pages/LoginPassword";
import SignupPassword from "./pages/signupPassword";
import SignupDOB from "./pages/signupDOB";
import SignupTerms from "./pages/signupTerms";
import ContentCreator from "./pages/contentCreator";
import CreatorLogin from "./pages/creatorLogin";
import Subscriptions from "./pages/Subscriptions";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/password" element={<LoginPassword />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/password" element={<SignupPassword />} />
                <Route path="/signup/dob" element={<SignupDOB />} />
                <Route path="/signup/terms" element={<SignupTerms/>}/>
                <Route path="/phonelogin" element={<PhoneLogin />} />
                <Route path="/home" element={<Home />} />   
                <Route path="/contentCreator" element={<ContentCreator/>}/>
                <Route path="/creatorLogin" element={<CreatorLogin />} />
                <Route path="/subscriptions" element={<Subscriptions/>}/>
            </Routes>
        </BrowserRouter>
    );
}
