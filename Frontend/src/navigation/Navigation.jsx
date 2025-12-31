import React from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import ROUTES from './Routes'
function Navigation() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path={ROUTES.About.name} element={ROUTES.About.Component} />
        <Route path={ROUTES.Contact.name} element={ROUTES.Contact.Component} />
        <Route path={ROUTES.Feedback.name} element={ROUTES.Feedback.Component} />
        <Route path={ROUTES.Home.name} element={ROUTES.Home.Component} />
        <Route path={ROUTES.Notfound.name} element={ROUTES.Notfound.Component} />
        <Route path={ROUTES.CitizenDashboard.name} element={ROUTES.CitizenDashboard.Component} />
        <Route path={ROUTES.PickuphistoryPage.name} element={ROUTES.PickuphistoryPage.Component} />
        <Route path={ROUTES.ProfileForm.name} element={ROUTES.ProfileForm.Component} />
        <Route path={ROUTES.RewardBadges.name} element={ROUTES.RewardBadges.Component} />
        <Route path={ROUTES.SchedulePickupPage.name} element={ROUTES.SchedulePickupPage.Component} />
        <Route path={ROUTES.SegregationScorePage.name} element={ROUTES.SegregationScorePage.Component} />
        <Route path={ROUTES.LoginPage.name} element={ROUTES.LoginPage.Component} />
        <Route path={ROUTES.Registeration.name} element={ROUTES.Registeration.Component} />
        <Route path={ROUTES.AgentDashboard.name} element={ROUTES.AgentDashboard.Component} />
        <Route path={ROUTES.AssignedPickupsPage.name} element={ROUTES.AssignedPickupsPage.Component} />
        <Route path={ROUTES.AssigAgentsPage.name} element={ROUTES.AssigAgentsPage.Component} />
        <Route path={ROUTES.UploadProofPage.name} element={ROUTES.UploadProofPage.Component} />
        <Route path={ROUTES.AdminDashboard.name} element={ROUTES.AdminDashboard.Component} />
        <Route path={ROUTES.FeedbackReportsPage.name} element={ROUTES.FeedbackReportsPage.Component} />
        <Route path={ROUTES.PickupCard.name} element={ROUTES.PickupCard.Component} />
        <Route path={ROUTES.PickupStatsPage.name} element={ROUTES.PickupStatsPage.Component} />
        <Route path={ROUTES.RewardBadges.name} element={ROUTES.RewardBadges.Component} />
        <Route path={ROUTES.ScoreProgressBar.name} element={ROUTES.ScoreProgressBar.Component} />
        <Route path={ROUTES.Feedback.name} element={ROUTES.Feedback.Component} />
        <Route path={ROUTES.PickupForm.name} element={ROUTES.PickupForm.Component} />
        <Route path={ROUTES.Footer.name} element={ROUTES.Footer.Component} />
        <Route path={ROUTES.Navbar.name} element={ROUTES.Navbar.Component} />
        <Route path={ROUTES.Sidebar.name} element={ROUTES.Sidebar.Component} />
        <Route path={ROUTES.ScheduleStatusPage.name} element={ROUTES.ScheduleStatusPage.Component} />
        <Route path={ROUTES.RewardsPage.name} element={ROUTES.RewardsPage.Component} />
        <Route path={ROUTES.ProfilePage.name} element={ROUTES.ProfilePage.Component} />

      </Routes>

      </BrowserRouter>
    </div>
  )
}

export default Navigation