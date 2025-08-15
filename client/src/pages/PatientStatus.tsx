import { useEffect, useRef, useState } from "react"
import { getStatusList } from "../lib/api"
import type { Patient } from "../types/Patient"
import { LargeSearch } from "../components/search"
import clsx from "clsx"

export default function Status() {
    const [originalList, setOriginalList] = useState([]);
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
        // This is code for searching based purely on recently fetched data
        // if (value === "") {
        //     // If the search term is empty, gets the full status list
        //     getStatusList().then(result => {
        //         setStatusList(result.data.statusList);
        //     });
        // } else {
        //     // Gets the list filtered by search term
        //     const filteredStatusList = statusList.filter((patient: Patient) =>
        //         patient.patientID.toString().toLowerCase().includes(value.toLowerCase())
        //     );
        //     setStatusList(filteredStatusList);
        // }

        // This is refreshes the code first and then does the search
        fetchStatusList(value);
    }

    return <>
    <div id="progress-bar" className={clsx("h-2 bg-primary sticky top-0 z-100", progress === 0 ? "transition-none" : "transition-all")} style={{ width: `${progress}%` }}></div>
    <div className="flex items-center overflow-x-auto h-screen flex-col gap-6 font-nunito m-10">   
        <h1 className="text-3xl font-kaisei">Surgery Status Board</h1>
        To track the progress of the patient, refer to the Patient # given to you at Check-In
        <LargeSearch handleChange={handleInputChange}/>
        
        <div className="bg-accent w-2/3 h-16 mt-3 rounded-lg flex">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-col p-5 justify-center">
                    <p className="text-lg">This page is automatically updated every 20 seconds</p>
                    <p className="text-sm">You can also click on the refresh icon to update manually</p>
                </div>
                <p className="pr-4">
                <svg 
                    onClick={() => fetchStatusList(searchTermRef.current)}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" 
                    height="26px" viewBox="0 -960 960 960" 
                    width="26px" fill="#000000">
                        <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                </svg>
                </p>
                
            </div>
        </div>
        <table className="w-3/4 outline outline-gray-200 rounded-lg">
            <thead className="text-left bg-gray-200 text-2xl">
                <tr>
                    <th scope="col" className="py-3 px-9 w-3/4">Patient</th>
                    <th scope="col">Medical Status</th>
                </tr>
            </thead>
            <tbody>
                {statusList.slice(resultsPerPage * (page-1), resultsPerPage * page).map((patient:Patient) => (
                    <tr className="border-b-1 border-gray-200 last-child:border-bottom:0" key={patient._id}>
                        <td className="px-9 py-4 text-2xl">
                            #{patient.patientID}
                        </td>
                        <td className="py-4">
                            <div className={clsx("rounded-xl inline-block px-6 py-2 text-center text-white text-xl", 
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
        <div className="flex sticky bottom-0 font-nunito-bold mt-auto">
            {Array.from({length:getNumPages()}, (_, i) => i + 1).map(num => (
                <button key={num} onClick={()=> setPage(num)} className={clsx("px-4 mx-1 py-2 rounded-lg text-xl hover:cursor-pointer", page === num ? "bg-accent" : "")}>
                    {num}
                </button>
            ))}
            <button 
                disabled={page >= getNumPages()} 
                onClick={() => setPage(page + 1)} 
                className="flex items-center gap-2 mx-5 text-xl disabled:opacity-50 disabled:cursor-default hover:cursor-pointer">
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
