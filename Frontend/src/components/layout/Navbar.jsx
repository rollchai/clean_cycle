import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ROUTES from '../../navigation/Routes';
import { User, Menu } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState({ id: null, role: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser({ id: userObj.id, role: userObj.role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTES.LoginPage.name);
  };

  const commonLinks = (
    <>
      <li><Link to={ROUTES.Home.name} className="hover:text-green-200">Home</Link></li>
      <li><Link to={ROUTES.Feedback.name} className="hover:text-green-200">Feedback</Link></li>
      <li><Link to={ROUTES.Contact.name} className="hover:text-green-200">Contact</Link></li>
      <li><Link to={ROUTES.About.name} className="hover:text-green-200">About</Link></li>
      <li>
        <Link to={ROUTES.ProfilePage.name} className="flex items-center space-x-1 hover:text-green-200">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </Link>
      </li>
    </>
  );

  const renderLinks = () => {
    if (user.role === 'admin') {
      return (
        <>
          {commonLinks}
          <li><Link to={ROUTES.AdminDashboard.name} className="hover:text-green-200">Admin Dashboard</Link></li>
          <li><Link to={ROUTES.FeedbackReportsPage.name} className="hover:text-green-200">Feedback Report</Link></li>
          <li><Link to={ROUTES.AssigAgentsPage.name} className="hover:text-green-200">Assigned Pickup</Link></li>
          <li>
            {token ? (
              <button
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate(ROUTES.LoginPage.name)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
              >
                Login
              </button>
            )}
          </li>
        </>
      );
    }

    if (user.role === 'citizen') {
      return (
        <>
          {commonLinks}
          <li><Link to={ROUTES.CitizenDashboard.name} className="hover:text-green-200">Citizen Dashboard</Link></li>
          <li><Link to={ROUTES.PickuphistoryPage.name} className="hover:text-green-200">Pickup History</Link></li>
          <li><Link to={ROUTES.RewardsPage.name} className="hover:text-green-200">Rewards</Link></li>
          <li><Link to={ROUTES.SchedulePickupPage.name} className="hover:text-green-200">Schedule Pickup</Link></li>
          <li><Link to={ROUTES.ScheduleStatusPage.name} className="hover:text-green-200">Schedule Status</Link></li>
          <li>
            {token ? (
              <button
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate(ROUTES.LoginPage.name)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
              >
                Login
              </button>
            )}
          </li>
        </>
      );
    }

    // Agent or unknown
    return (
      <>
        {commonLinks}
        <li><Link to={ROUTES.AgentDashboard.name} className="hover:text-green-200">Agent Dashboard</Link></li>
        <li><Link to={ROUTES.RewardsPage.name} className="hover:text-green-200">Rewards</Link></li>
        <li>
          {token ? (
            <button
              className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate(ROUTES.LoginPage.name)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition ring-1 ring-gray-300 shadow-sm"
            >
              Login
            </button>
          )}
        </li>
      </>
    );
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">CleanCycle</div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 items-center">
          {renderLinks()}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col space-y-3">
          {renderLinks()}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
