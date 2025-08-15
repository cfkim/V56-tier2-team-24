export function SmallSearch(){
    return <>
        <div className="flex items-center border-b-2 border-gray-200 w-60 p-2">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input type="text" placeholder="Search" className="pl-2 focus:outline-none"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> 
        </div>
    </>
}

export function LargeSearch({handleChange}:{handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return <>
        <div className="flex items-center w-100 flex-row p-2 bg-gray-200 rounded-xl drop-shadow-sm/25">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input type="text" placeholder="Search with Patient Number" className="pl-2 focus:outline-none w-90" onChange={handleChange}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> 
        </div>
      </>
  }

export default function Search() {
  return (
    <>
      <div className="flex w-60 items-center border-b-2 border-gray-200 p-2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search"
          className="pl-2 focus:outline-none"
        />
      </div>
    </>
  );
}
