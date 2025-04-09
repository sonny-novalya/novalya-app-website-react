import { useState } from 'react'
import { GreenCheckRoundedIcon } from '../../common/icons/icons'

const ConnectionFirstStep = () => {
    const [isExtInstalled, setIsExtInstalled] = useState(false)

    return (
            <div className="flex flex-col w-full gap-4 border border-[#DADADA] rounded-md p-5 ">
                <div className="flex items-center space-x-2 ">
                    {
                        isExtInstalled
                            ? <GreenCheckRoundedIcon />
                            : <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                    }
                    <h2 className="font-medium text-lg">Step 1: Install Chrome Extension</h2>
                </div>
                <p className='text-[#000407] text-sm'>
                        Connect your Instagram account to manage direct messages, comments, and follower insights.
                    </p>
                    <button className="flex justify-center items-center w-full mx-auto py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 text-center">
                        Install Extension
                    </button>
            </div>
    )
}

export default ConnectionFirstStep