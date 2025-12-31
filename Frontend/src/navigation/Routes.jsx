
import AboutPage from "../container/common/AboutPage";
import ContactPage from "../container/common/ContactPage";
import Feedback from "../components/forms/Feedback";
import HomePage from "../container/common/HomePage";
import NotFoundPage from "../container/common/NotFoundPage";
import CitizenDashboard from "../container/citizen/CitizenDashboard";
import PickupHistoryPage from "../container/citizen/PickupHistoryPage";
import AssignedPickupsPage from "../container/agent/AssignedPickupsPage";
import ProfileForm from "../components/forms/ProfileForm";
import ProfilePage from "../container/citizen/ProfilePage";
import RewardsPage from "../container/citizen/RewardsPage";
import SchedulePickupPage from "../container/citizen/SchedulePickupPage";
import SegregationScorePage from "../container/citizen/SegregationScorePage";
import LoginPage from "../container/auth/LoginPage";
import AgentDashboard from "../container/agent/AgentDashboard";
import UploadProofPage from "../container/agent/UploadProofPage";
import AdminDashboard from "../container/admin/AdminDashboard";
import AssigAgentsPage from "../container/admin/AssigAgentsPage";
import FeedbackReportsPage from "../container/admin/FeedbackReportsPage";
import PickupStatsPage from "../container/admin/PickupStatsPage";
import PickupCard from "../components/dashboard/PickupCard";
import RewardBadges from "../components/dashboard/RewardBadges";
import ScoreProgressBar from "../components/dashboard/ScoreProgressBar";
import PickupForm from "../components/forms/PickupForm";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Registeration from "../container/auth/Registeration";
import ScheduleStatusPage from "../container/citizen/schdulestatuspage";

const ROUTES={

  About:{
    name:"/about",
    Component:<AboutPage/>
  },
  Contact:{
    name:'/contact',
    Component:<ContactPage/>
  },
  ScheduleStatusPage:{
    name:'/schedulestatus',
    Component:<ScheduleStatusPage/>
  },
  Feedback:{
    name:"/feedback",
    Component:<Feedback/>
  },
  Home:{
    name:"/",
    Component:<HomePage/>
  },
  Notfound:{
    name:"/notfound",
    Component:<NotFoundPage/>
  },
  CitizenDashboard:{
    name:"/citizendashboard",
    Component:<CitizenDashboard/>
  },
  PickuphistoryPage:{
    name:"/pickuphistory",
    Component:<PickupHistoryPage/>
  },
  ProfilePage:{
    name:"/profile",
    Component:<ProfilePage/>
  },
  RewardsPage:{
    name:"/reward",
    Component:<RewardsPage/>
  },
  SchedulePickupPage:{
    name:"/schedulepickup",
    Component:<SchedulePickupPage/>
  },
  SegregationScorePage:{
    name:"/segregation",
    Component:<SegregationScorePage/>
  },
  LoginPage:{
    name:"/login",
    Component:<LoginPage/>
  },
  Registeration:{
    name:"/registeration",
    Component:<Registeration/>
  },
  AgentDashboard:{
    name:"/agentdashboard",
    Component:<AgentDashboard/>
  },
  AssignedPickupsPage:{
    name:"/assignpickup",
    Component:<AssignedPickupsPage/>
  },
  UploadProofPage:{
    name:"/uploadproof",
    Component:<UploadProofPage/>
  },
  AdminDashboard:{
    name:"/admindashboard",
    Component:<AdminDashboard/>
  },
  AssigAgentsPage:{
    name:"/assignagent",
    Component:<AssigAgentsPage/>
  },
  FeedbackReportsPage:{
    name:"/feedback",
    Component:<FeedbackReportsPage/>
  },
  PickupStatsPage:{
    name:"/pickupstats",
    Component:<PickupStatsPage/>
  },
  PickupCard:{
    name:"/pickupcard",
    Component:<PickupCard/>
  },
  RewardBadges:{
    name:"/rewardbadge",
    Component:<RewardBadges/>
  },
  ScoreProgressBar:{
    name:"/scoreprogress",
    Component:<ScoreProgressBar/>
  },

  PickupForm:{
    name:"/pickupform",
    Component:<PickupForm/>
  },
  ProfileForm:{
    name:"/profileform",
    Component:<ProfileForm/>
  },
  Footer:{
    name:"/footer",
    Component:<Footer/>
  },
  Navbar:{
    name:"/navbar",
    Component:< Navbar/>
  },
  Sidebar:{
    name:"/sidebar",
    Component:<Sidebar/>
  },
}
export default ROUTES