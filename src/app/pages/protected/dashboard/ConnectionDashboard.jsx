import ConnectionFirstStep from "./ConnectionFirstStep"
import ConnectionSecondStep from "./ConnectionSecondStep"
import VideoSection from "./VideoSection"

const ConnectionDashboard = () => {

    return (
        <>
            <h3 className="text-lg font-bold mb-5">Hello Anima</h3>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <h2 className="font-medium text-lg">Setup Your Account</h2>
                <div className="flex gap-4 h-80">
                    <ConnectionFirstStep />
                    <VideoSection />
                </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <ConnectionSecondStep />
            </div>
        </>
    )
}

export default ConnectionDashboard
