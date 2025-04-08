import Layout from "../Layout"
import ConnectionSteps from "./ConnectionSteps"
import VideoSection from "./VideoSection"

const NewDashboard = () => {
    return (
        <Layout>
            <h3 className="text-lg font-bold mb-5">Dashboard</h3>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <VideoSection />
                <ConnectionSteps />
            </div>
        </Layout>
    )
}

export default NewDashboard
