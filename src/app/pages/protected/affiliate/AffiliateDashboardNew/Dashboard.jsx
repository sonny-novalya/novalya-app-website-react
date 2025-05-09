import AfiliateTopBar from '../../../../components/affilliate/shared/affiliateTopBar'
import Layout from '../../Layout'
import OpenDashboard from './OpenDashboard'

const Dashboard = () => {

    const isMember = true

    if (isMember) return <OpenDashboard />

    return (
        <Layout className="p-6 bg-gray-100 h-screen overflow-auto">
            <AfiliateTopBar />

            <div className="bg-white rounded-[10px] p-[30px_20px] mb-6">
                Premium Dashboard
            </div>
        </Layout>
    )
}

export default Dashboard