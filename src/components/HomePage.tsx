import React, { useState } from "react";
import { useAuthStore } from "../Backend/store/store";
import NavBar from "./NavBar";
import beachImg from "../assets/beachImg.png";
import { locationSearch } from "../Backend/api/LocationSearch";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [searchInput, setSearchInput] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setResults } = useAuthStore((state) => state.searchResults);

  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!searchInput || !checkInDate || !checkOutDate) {
      setShowAlert(true);
      setAlertMessage("Please enter location and dates before searching.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const data = await locationSearch(searchInput, checkInDate, checkOutDate);
      console.log(data);
  
      setResults(data);
  
      console.log("Updated Store: ", useAuthStore.getState().searchResults);
  
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  
    setIsLoading(false);
  };
  
  

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <NavBar />
      {showAlert && (
        <div className="bg-red-500 text-white text-center py-2">
          {alertMessage}
        </div>
      )}
      {isLoading && (
        <div className="bg-green-500 text-white text-center py-2">
          Finding Your Dream Rentals Now...
        </div>
      )}
      <div 
        className="relative flex-grow bg-cover bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${beachImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute w-full top-[72%] transform -translate-y-1/2 flex flex-col items-center text-white px-4 md:px-0 text-xs sm:text-base">
          <h1 className="text-lg sm:text-2xl">Welcome, {user?.email}</h1>
          <p className="text-green-500 text-xl mb-2 sm:text-2xl sm:mb-4">Click Search to find your next adventure.</p>
          <form onSubmit={handleSearch} className="mb-2 sm:mb-4">
            <p className="text-sm sm:text-lg mb-1 sm:mb-2">Search for the location you want to travel to:</p>
            <div className="flex flex-col">
              <div className="mb-2 sm:mb-4">
                <input
                  type="search"
                  placeholder="Search here"
                  className="border border-gray-400 rounded-lg px-3 py-2 w-full focus:outline-none text-black text-xs sm:text-base"
                  onChange={e => {setSearchInput(e.target.value); setShowAlert(false);}}
                  value={searchInput}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0">
                <div className="flex justify-center mb-2 sm:mb-0">
                  <input
                    type="date"
                    className="border border-gray-400 px-3 py-2 w-full sm:w-64 focus:outline-none text-black text-base sm:text-base"
                    onChange={e => {setCheckInDate(e.target.value); setShowAlert(false);}}
                    value={checkInDate}
                  />
                </div>
                <div className="flex justify-center mb-2 sm:mb-0">
                  <input
                    type="date"
                    className="border border-gray-400 px-3 py-2 w-full sm:w-64 focus:outline-none text-black ml-2 sm:ml-2 text-base sm:text-base"
                    onChange={e => {setCheckOutDate(e.target.value); setShowAlert(false);}}
                    value={checkOutDate}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 w-full sm:w-auto rounded-lg sm:rounded-r-lg ml-2 focus:outline-none hover:bg-blue-600 text-base sm:text-base mx-auto sm:mx-0" // Centered on mobile
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
};

export default HomePage;

