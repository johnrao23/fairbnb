import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useAuthStore } from "../Backend/store/store";
import { useNavigate } from "react-router-dom";
import sunsetField from "../assets/sunsetField.png"

const Search = () => {
  const user = useAuthStore((state) => state.user);
  const searchResults = useAuthStore((state) => state.searchResults);
  const setSelectedResult = useAuthStore((state) => state.setSelectedResult);
  const navigate = useNavigate();

  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    setHasClicked(true);
  }, []);

  const handleSubmit = (result) => {
    setSelectedResult(result);
    return navigate("/reserve");
  };

  const priceSlash = (result, price) => {
    if (typeof result !== 'number' || typeof price !== 'number') {
      return result;
    }
    return result - (result * (price / 100));
  };
  
  const backgroundImage = !searchResults.results.results.length && hasClicked
  ? `url(${sunsetField})`
  : 'transparent';

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <h1 className="text-center text-2xl font-bold my-4">
        Get ready to live it up for less, {user?.email}
      </h1>
      { !searchResults.results.results.length && hasClicked ? (
        <div className="text-center text-xl font-semibold">
          Come back with some vacation ideas!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.isArray(searchResults.results.results) &&
            searchResults.results.results.map((result) => (
              <div
                key={result.id}
                className="border border-gray-300 rounded-lg p-4 m-2 flex flex-col items-center justify-between space-y-4 h-full"
              >
                <p className="overflow-hidden break-all mb-2 text-center h-12">
                  {result.name}
                </p>
                <img
                  className="rounded-lg mb-2 h-48 w-full object-cover"
                  src={result.images[0]}
                  alt="Result"
                />
                <div className="mb-2 text-center">
                  <p className="text-red-500 line-through">
                    ${result.price.total}
                  </p>
                  <p className="text-green-500">
                    ${priceSlash(result.price.total, 50)}
                  </p>
                </div>
                <button
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 mt-auto"
                  onClick={() => handleSubmit(result)}
                >
                  Reserve
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
