import React from "react";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import App from "./App";
import LandingPage from "./components/landingPage";
import AboutPage from "./components/AboutPage";
import HowItWorks from "./components/HowITWorks";
import ContactPage from "./components/ContactPage";
import LoginForm from "./components/forms/LoginForm";
import RegistrationForm from "./components/forms/RegistrationForm";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import AnalysisDashboard from "./components/Dashboard/AnalysisDashboard";
import Profile from "./components/Dashboard/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./components/ErrorPage";
import MedicineOverview from "./components/Dashboard/MedicineOverview";
import DailyMedicine from "./components/Dashboard/DailyMedicine";
import MonthlyMedicine from "./components/Dashboard/MonthlyMedicine";
import YearlyMedicine from "./components/Dashboard/YearlyMedicine";
import ManageFAQs from "./components/Dashboard/ManageFAQs";
import FAQPage from "./components/FAQPage";
import ContactManagement from "./components/Dashboard/ContactManagement";
import UserManagement from "./components/Dashboard/UserManagement";
import AlertManagement from "./components/Dashboard/AlertManagement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about-us", element: <AboutPage /> },
      { path: "how-it-works", element: <HowItWorks /> },
      {path:"faqs", element:<FAQPage/>},
      { path: "contact-us", element: <ContactPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <RegistrationForm /> },
      {
        path: "dashboard",
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "analysis", element: <AnalysisDashboard /> },
              { path: "profile", element: <Profile /> },
              {
                path: "medicine",
                children: [
                  { index: true, element: <MedicineOverview /> },
                  { path: "daily", element: <DailyMedicine /> },
                  { path: "monthly", element: <MonthlyMedicine /> },
                  { path: "yearly", element: <YearlyMedicine /> },
                ],
              },
              {
                path:"manage-faqs",
              element:<ManageFAQs/>
              },
              {
path:"contact-management",
element:<ContactManagement/>
              },{
                path:"user-management",
                element:<UserManagement/>
              },
              {
                path:"alert-management",
                element:<AlertManagement/>
              }
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
