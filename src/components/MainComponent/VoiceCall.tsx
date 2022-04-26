import {FC} from 'react'
import {BsEnvelope} from "react-icons/bs"


const VoiceCall:FC = () => {
  return (
	<div className="col-span-1 flex justify-center items-center">
            <div className="h-12 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 rounded-md p-2">
              <div className="h-8 w-10 bg-slate-700 text-slate-100 dark:text-slate-300 flex justify-center items-center text-xl rounded">
                <BsEnvelope />
              </div>
            </div>
          </div>
  )
}

export default VoiceCall