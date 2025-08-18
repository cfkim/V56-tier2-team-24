import { useEffect, useRef, useState } from "react"
import { getStatusList } from "../lib/api"
import type { Patient } from "../types/Patient"
import { LargeSearch } from "../components/search"
import clsx from "clsx"

export default function Status() {
    const [, setOriginalList] = useState([]);
    const [statusList, setStatusList] = useState([])
    const searchTermRef = useRef("");
    const [progress, setProgress] = useState(0);
    const [page, setPage] = useState(1);
    const resultsPerPage = 10; // Number of results on each page
    
    // Gets the number of pages of results
    const getNumPages = () => {
        return Math.ceil(statusList.length / resultsPerPage);
    }

    // Function to fetch list of patient and status
    const fetchStatusList = async (term: string = "") => {
        setProgress(0);
        let fakeProgress = 0;
        
        // this "simulates" progress until data is loaded on screen
        const timer = setInterval(() => {
            fakeProgress += Math.random() * 20; // random increments
            setProgress(Math.min(fakeProgress, 90));
        }, 100);

        try{
            const result = await getStatusList();
            const fullList = result.data.statusList; 
            setOriginalList(fullList);
            if(term !== ""){
                const filteredStatusList = fullList.filter((patient: Patient) =>
                    patient.patientID.toString().toLowerCase().includes(term.toLowerCase())
                );
                setStatusList(filteredStatusList);
            }else{
                setStatusList(fullList);
            }
            
        }finally{
            clearInterval(timer);
            setProgress(100); 
            setTimeout(() => setProgress(0), 700);
        }
    }

    useEffect(() => {
        fetchStatusList(searchTermRef.current);

        const intervalId = setInterval(() => {
            fetchStatusList(searchTermRef.current);       
        }, 20000); // Refreshes every 20 seconds

        return () => {
            clearInterval(intervalId);} // Prevents memory leaks after component unmounts
            
        },[])

    // Gets a filtered list based on search
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        searchTermRef.current = value;
        
        // This is refreshes the code first and then does the search
        fetchStatusList(value);
    }

    return <>
    <div id="progress-bar" className={clsx("md:h-2 h-1 bg-primary sticky top-0 z-100", progress === 0 ? "transition-none" : "transition-all")} style={{ width: `${progress}%` }}></div>
    <div className="flex items-center overflow-visible flex-col gap-6 font-nunito m-3 md:m-10">   
        <h1 className="text-xl md:text-3xl font-kaisei">Surgery Status Board</h1>
        <p className="text-center text-sm md:text-lg md:text-left">To track the progress of the patient, refer to the Patient # given to you at Check-In</p>
        <LargeSearch handleChange={handleInputChange}/>
        
        <div className="bg-accent md:w-2/3 md:h-18 md:mt-3 rounded-lg flex">
            <div className="flex w-full flex-row justify-between items-center px-3 py-2">
                <div className="flex flex-col md:p-5 justify-center">
                    <p className="text-xs md:text-xl">This page is automatically updated every 20 seconds</p>
                    <p className="text-[10px] md:text-lg pr-10">You can also click on the refresh icon to update manually</p>
                </div>
                <p className="md:pr-4">
                    <svg 
                        onClick={() => fetchStatusList(searchTermRef.current)}
                        className="hover:cursor-pointer size-5 md:size-8"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 -960 960 960" 
                        fill="#000000">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                    </svg>
                </p>
                
            </div>
        </div>
        <table className="mx-3 md:w-3/4 outline outline-gray-200 rounded-lg overflow-hidden">
            <thead className="text-left bg-gray-200 text-md md:text-2xl">
                <tr>
                    <th scope="col" className="py-3 px-5 md:px-9 w-3/4">Patient</th>
                    <th scope="col">Medical Status</th>
                </tr>
            </thead>
            <tbody>
                {statusList.slice(resultsPerPage * (page-1), resultsPerPage * page).map((patient:Patient) => (
                    <tr className="border-b-1 border-gray-200 last:border-b-0" key={patient._id}>
                        <td className="px-5 md:px-9 py-4 text-md md:text-2xl">
                            #{patient.patientID}
                        </td>
                        <td className="py-2 px-3 md:py-4 whitespace-nowrap ">
                            <div className={clsx("rounded-md md:rounded-xl inline-block px-3 md:px-6 md:py-2 text-center text-white text-md md:text-xl", 
                                patient.medicalStatus == "checked-in" ? "bg-checked-in" : 
                                patient.medicalStatus == "pre-procedure" ? "bg-pre-procedure" : 
                                patient.medicalStatus == "in-progress" ? "bg-in-progress" : 
                                patient.medicalStatus == "closing" ? "bg-closing" : 
                                patient.medicalStatus == "recovery" ? "bg-recovery" : 
                                patient.medicalStatus == "complete" ? "bg-complete" : 
                                patient.medicalStatus == "dismissal" ? "bg-dismissal" : "")}>
                                {patient.medicalStatus}
                            </div>
                            
                        </td>
                    </tr>
                    
                ))}
            </tbody>
            
        </table>
        
        {/* pagination */}
        <div className="flex font-nunito-bold md:mt-5 text-xs md:text-xl">
            {Array.from({length:getNumPages()}, (_, i) => i + 1).map(num => (
                <button key={num} onClick={()=> setPage(num)} className={clsx("px-4 mx-1 py-2 rounded-lg hover:cursor-pointer", page === num ? "bg-accent" : "")}>
                    {num}
                </button>
            ))}
            <button 
                disabled={page >= getNumPages()} 
                onClick={() => setPage(page + 1)} 
                className="flex items-center gap-2 mx-5 disabled:opacity-50 disabled:cursor-default hover:cursor-pointer">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="20px" fill="#000000">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
            </button>
        </div>
    </div>
    
    </>
} 
