import React, {useState} from "react"
import {FaSearch} from "react-icons/Fa"

function SearchBar() {
    const [barcodeNumber, setBarcodeNumber] = useState('');
    return(
       <div>
           <FaSearch id="search-icon" className="absolute right-10 mt-3 w-5 h-5" />
    <input
        className="w-full p-2 bg-white text-black border-2 border-grey rounded-md"
        type="text"
        placeholder="Enter barcode number"
        value={barcodeNumber}
        onChange={e => setBarcodeNumber(e.target.value)}
    />
       </div>
    )
}

export default SearchBar