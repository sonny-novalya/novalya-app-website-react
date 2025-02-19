import withSidebarLayout from "../common/sidebar/withSidebarLayout";
import Dashboard from "./dashboard/dashboard";
import Affiliate from "./affiliate/Affiliate";

const DashboardPage = withSidebarLayout(Dashboard);
const AffiliatePage = withSidebarLayout(Affiliate);

export { DashboardPage , AffiliatePage}