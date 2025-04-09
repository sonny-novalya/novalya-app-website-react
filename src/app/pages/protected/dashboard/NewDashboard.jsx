import Layout from "../Layout"
import ConnectionFirstStep from "./ConnectionFirstStep"
import ConnectionSecondStep from "./ConnectionSecondStep"
import VideoSection from "./VideoSection"

const NewDashboard = () => {
    return (
        <Layout>
            <h3 className="text-lg font-bold mb-5">Hello Anima</h3>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <h2 className="font-medium text-lg">Setup Your Account</h2>
                <div className="flex gap-4">
                    <ConnectionFirstStep />
                    <VideoSection />
                </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <ConnectionSecondStep />
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                <button className="flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Confirm
                </button>
            </div>
        </Layout>
    )
}

export default NewDashboard
