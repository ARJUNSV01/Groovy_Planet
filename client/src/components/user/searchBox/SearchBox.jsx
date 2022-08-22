import React, { useState ,useEffect} from "react";
import "./searchBox.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import {serverURL} from '../../../serverURL.js'
import {Link, useNavigate} from 'react-router-dom'

// import CloseIcon from "@material-ui/icons/Close";

// function SearchBar({ placeholder, data }) {
//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");

//   const handleFilter = (event) => {
    // const searchWord = event.target.value;
    // setWordEntered(searchWord);
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

//     if (searchWord === "") {
//       setFilteredData([]);
//     } else {
//       setFilteredData(newFilter);
//     }
//   };

//   const clearInput = () => {
//     setFilteredData([]);
//     setWordEntered("");
//   };

//   return (
// <div className="search">
//   <div className="searchInputs">
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={wordEntered}
//       onChange={handleFilter}
//     />
//     <div className="searchIcon">
//       {filteredData.length === 0 ? (
//         <SearchIcon />
//       ) : (
//         <CloseIcon id="clearBtn" onClick={clearInput} />
//       )}
//     </div>
//   </div>
//   {filteredData.length != 0 && (
//     <div className="dataResult">
//       {filteredData.slice(0, 15).map((value, key) => {
//         return (
//           <a className="dataItem" href={value.link} target="_blank">
//             <p>{value.title} </p>
//           </a>
//         );
//       })}
//     </div>
//   )}
// </div>
//   );
// }

// export default SearchBar;



const SearchBox = ({ placeholder, data }) => {
  const[destinations,setDestinations] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate()
 
  const handleFilter =async (event) =>{
    const searchWord = event.target.value;
    setWordEntered(searchWord);
   
    const newFilter =destinations.filter((value,key) => {
    
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    searchWord === "" ? setFilteredData([]) : setFilteredData(newFilter)
    
  }
  const handleSearch = (value) =>{
    console.log(value,'ki');
    navigate(`search/?destination=${value}`)
  }
  
  const clearInput = () => {
      setFilteredData([]);
       setWordEntered("");
       };
    
    useEffect(() => {
      (async function fetchData(){
      const {data} = await axios.get(`${serverURL}/user/destinations/`)
       setDestinations(data.data)
       console.log(data.data);
      })()
    
    }, [])
    
  return (
    <div className="searchHomePage">
      {/* <div className="searchBody">      <div class="search-box">
    <button class="btn-search"><i class="fas fa-search"></i></button>
    <input type="text" class="input-search"placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
    {wordEntered.length === 0 ? <SearchIcon/>:<CloseIcon id="closeButton" onClick={clearInput}/>} 
  </div> */}
  {/* </div> */}

       <div className="searchInputs ">
        <input type="text" placeholder={placeholder} className="text-white" value={wordEntered} onChange={handleFilter}/>
        <div className="searchIcon ">
          {wordEntered.length === 0 ? <SearchIcon/>:<CloseIcon id="closeButton" onClick={clearInput}/>}
         
        </div>
      </div> 


      {filteredData.length !== 0 && <div className="dataResult">
        {filteredData.map((value,key)=>{
          return (
            // <h5 id="searchResultItems" style={{textDecoration:'none',cursor:'pointer'}} className="dataItemHomeSearch" onClick={()=>{
            //   console.log('clicked');
            
            //   handleSearch(value._id)
            // }}>
            // <p>{value.name}</p>
            // </h5>
           
            <Link  to = "/search" state={{_id:value._id ,place:value.name}} id="searchResultItems" style={{textDecoration:'none',cursor:'pointer'}} className="dataItemHomeSearch"><p>{value.name}</p></Link>
          )
        })}
      </div>}
    </div>
  );
};

export default SearchBox;
