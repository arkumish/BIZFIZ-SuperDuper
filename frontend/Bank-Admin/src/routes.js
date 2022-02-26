import AllRequestPage from "./page/AllRequestPage";
import LandingPage from "./page/LandingPage";
import ReportPage from "./page/ReportPage";


export const mainRoute = [
    {
        path: "/",
        exact: true,
        component: LandingPage
    },
    {
        path: "/all-report",
        exact: true,
        component:AllRequestPage
    },
    {
        path: "/report/:reportId",
        exact: true,
        component: ReportPage
    },
   
   
]

