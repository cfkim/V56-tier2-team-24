import { useEffect, useState } from "react"
import { getStatusList } from "../lib/api"
import type { Patient } from "../types/Patient"
import { LargeSearch } from "../components/search"

export default function Status() {
    const [statusList, setStatusList] = useState([])

    useEffect(() => {
        const fetchStatusList = async () => {
            const result = await getStatusList();
            setStatusList(result.data.statusList);
            console.log(result)
        }

        fetchStatusList();
    }, [])
    return <>
    <div className="flex items-center overflow-x-auto h-screen flex-col gap-6 font-nunito m-10">
        <h1 className="text-3xl font-kaisei">Surgery Status Board</h1>
        To track the progress of the patient, refer to the Patient # given to you at Check-In
        <LargeSearch/>
        
        <div className="bg-accent w-2/3 h-16 mt-3 rounded-lg flex">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-col p-5 justify-center">
                    <p className="text-lg">This page is automatically updated every 20 seconds</p>
                    <p className="text-sm">You can also click on the refresh icon to update manually</p>
                </div>
                <p className="pr-4">
                    refresh icon
                </p>
                
            </div>
        </div>
        <table className="w-3/4 outline outline-gray-200 rounded-lg">
            <thead className="text-left bg-gray-200">
                <tr>
                    <th scope="col" className="py-3 px-9 w-3/4">Patient</th>
                    <th scope="col">Medical Status</th>
                </tr>
            </thead>
            <tbody>
                {statusList.map((patient:Patient) => (
                    <tr className="border-b-1 border-gray-200 last-child:border-bottom:0" key={patient._id}>
                        <td className="px-9 py-4">
                            #{patient.patientID}
                        </td>
                        <td className="py-4">
                            {patient.medicalStatus}
                        </td>
                    </tr>
                    
                ))}
            </tbody>
            
        </table>
        
        
    </div>
    
    </>
} 
