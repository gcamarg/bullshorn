import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Portfolio from "./components/Pages/Portfolio";
import Login from "./components/Login";
import { useContext } from "react";
import { StateContext } from "./Contexts/stateProvider";
import EmailConfirmedPage from "./components/Pages/EmailConfirmation";
import Footer from "./components/Footer";

function PrivateRoute({ children }) {
  const { authenticated } = useContext(StateContext);

  return authenticated ? children : <Navigate to="/login" />;
}

function Router() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: "lightGrey" }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/confirm/:token/"
            element={<EmailConfirmedPage />}
          />
          <Route
            path="/myportfolio"
            element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Router;
