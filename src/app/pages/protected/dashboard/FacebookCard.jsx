import FbImg from "../../../../assets/img/fb-cover.png"
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"

const FacebookCard = () => {
    return (
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
                <img src={FbImg} alt="Cover" className="w-full h-16" />
                <div className="absolute -bottom-14 left-4">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Profile"
                        className="w-20 h-24 object-cover border-4 border-white rounded-sm"
                    />
                </div>
            </div>

            <div className="mt-4 ml-28 flex justify-between items-center ">
                <p className="font-medium">Trendsetting Tornado</p>
                <div className="flex gap-3 mr-3">
                    <button className="text-blue-600">
                        <SyncBlueIcon />
                    </button>
                    <button className="text-red-500">
                        <LinkRedIcon />
                    </button>
                </div>
            </div>

            <div className="mt-6 px-3">
                <p className="font0medium text-lg">Trendsetting</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700 pb-3">
                    <div className="flex-1 text-center">
                        <p className="font-bold">2.5k</p>
                        <p>Followers</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]"/>
                    <div className="flex-1 text-center">
                        <p className="font-bold">100</p>
                        <p>Friends</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]"/>
                    <div className="flex-1 text-center">
                        <p className="font-bold">50</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookCard
