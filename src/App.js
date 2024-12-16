import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import ContactPage from './Pages/ContactPage';
import Properties from './Pages/Properties';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import OTP from './Pages/Otp';
import ResetPassword from './Pages/ResetPassword';
import UserProfileUpdate from './Pages/UserProfileUpdate';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Allusers from './Pages/Allusers';
import AddAdminPropert from './Pages/AddAdminPropert';
import AddProperty from './Pages/AddProperty';
import AllProperties from './Pages/AllProperties';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';
import UserProperties from './Pages/UserProperties';
import PropertyDetails from './Pages/PropertyDetails';
import AddUserVehicle from './Pages/AddUserVehicle';
import AddAdminVehicle from './Pages/AddAdminVehicle';
import Vehicles from './Pages/Vehicles';
import VehicleDetails from './Pages/VehicleDetails';
import UserVehicles from './Pages/UserVehicles';
import AdminAllVehicles from './Pages/AdminAllVehicles';
import NotificationList from './components/NotificationList';
import AdminNotificationsDetails from './components/AdminNotificationsDetails';
import AdminNotificationsDetailsVehicle from './components/AdminNotificationsdDetailsVehicle';
import NotificationListUser from './components/NotificationListUser';
import UserNotificationVehicle from './components/UserNotifficationVehicle';
import UserNotificationsProperty from './components/UserNotificationProperty';
import PostAd from './components/PostAd';
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/notificationlist" element={<NotificationList />} />
          <Route path="/usernotificationlist" element={<NotificationListUser />} />

          
        
          

          <Route path="/otp" element={<OTP />} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfileUpdate /></ProtectedRoute>} />
          <Route path="/addproperty" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
          <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/userproperties" element={<ProtectedRoute><UserProperties /></ProtectedRoute>} />
          <Route path="/postad" element={<ProtectedRoute><PostAd /></ProtectedRoute>} />
         

          <Route path="/adduservehicle" element={<ProtectedRoute><AddUserVehicle /></ProtectedRoute>} />
          <Route path="/uservehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>} />
          <Route path="/usernotificationvehicle/:id" element={<ProtectedRoute><UserNotificationVehicle /></ProtectedRoute>} />
          <Route path="/usernotificationproperty/:id" element={<ProtectedRoute><UserNotificationsProperty /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/adminnotificationsdetailsvehicle/:id"
            element={
              <AdminRoute>
                <AdminNotificationsDetailsVehicle />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/adminnotificationsdetails/:id"
            element={
              <AdminRoute>
                <AdminNotificationsDetails />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/adminallvehicles"
            element={
              <AdminRoute>
                <AdminAllVehicles />
              </AdminRoute>
            }
          >
          </Route>

          <Route
            path="/addadminvehicle"
            element={
              <AdminRoute>
                <AddAdminVehicle />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/allusers"
            element={
              <AdminRoute>
                <Allusers />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/addadminproperty"
            element={
              <AdminRoute>
                <AddAdminPropert />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/allproperties"
            element={
              <AdminRoute>
                <AllProperties />
              </AdminRoute>
            }
          >
          </Route>
          <Route
            path="/admindashboard"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />


        </Routes>

        <Footer />
      </>
    </Router>
  );
}

export default App;
