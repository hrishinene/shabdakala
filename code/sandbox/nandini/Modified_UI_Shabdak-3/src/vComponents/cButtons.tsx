export const Buttons=()=> {
    return (
        <div className="flex justify-center py-4">
             <div className="flex space-x-6">
            <button className="w-fit-content  h-12 px-5  rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none">
            Shuffle
            </button>
            <button className="w-fit-content  h-12 px-5  rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none">
            Deselect All
            </button>
            <button className="w-fit-content h-12 px-5 rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none">
            Submit
            </button>
        </div>
        </div>
    )
}

