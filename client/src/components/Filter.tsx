import clsx from "clsx";

export default function FilterSheet({isOpen, setIsOpen, setSelectedStatus, selectedStatus}:{ isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; setSelectedStatus: React.Dispatch<React.SetStateAction<string>>; selectedStatus: string }) {
    if (isOpen) {
        return (
            <div className="fixed bottom-0 h-2/3 left-0 right-0 bg-white p-4 rounded-t-lg shadow-lg z-110">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
                            <p>Filter</p>
                        </div>
                        
                        <button className="flex justify-center items-center" onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" 
                            width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                        
                    </div>

                    <div className="flex flex-col gap-2 items-start mt-10">
                        <button onClick={() => {if(selectedStatus !== "All") {setSelectedStatus("All")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "All" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            All
                        </button>
                        <button onClick={() => {if(selectedStatus !== "checked-in") {setSelectedStatus("checked-in")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "checked-in" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Checked-in
                        </button>
                        <button onClick={() => {if(selectedStatus !== "pre-procedure") {setSelectedStatus("pre-procedure")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "pre-procedure" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Pre procedure
                        </button>
                        <button onClick={() => {if(selectedStatus !== "in-progress") {setSelectedStatus("in-progress")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "in-progress" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            In Progress
                        </button>
                        <button onClick={() => {if(selectedStatus !== "closing") {setSelectedStatus("closing")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "closing" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Closing
                        </button>
                        <button onClick={() => {if(selectedStatus !== "recovery") {setSelectedStatus("recovery")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "recovery" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Recovery
                        </button>
                        <button onClick={() => {if(selectedStatus !== "complete") {setSelectedStatus("complete")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "complete" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Complete
                        </button>
                        <button onClick={() => {if(selectedStatus !== "dismissal") {setSelectedStatus("dismissal")}; setIsOpen(false)}} className={clsx("h-8 rounded-xl", selectedStatus === "dismissal" ? "outline-primary outline-2 text-primary px-5" : "",)}>
                            Dismissal
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    
}