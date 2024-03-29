import React from "react";
import NavBar from "./NavBar";
import { useAuthStore } from "../Backend/store/store"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import AIButton from "./AskAiButton";

const Reservation = () => {
    const user = useAuthStore((state) => state.user);
    const selectedResult = useAuthStore((state) => state.selectedResult);
    const navigate = useNavigate();

    // If no result has been selected, display a message instead
    if (!selectedResult) {
        return <h1>No reservation selected.</h1>;
    }

    const confirmResult = () => {
        return navigate("/confirmation")
    }

    return (
        <div>
            <NavBar />
                <h1 className="text-center text-2xl font-bold my-4">Great choice {user?.twitterUsername || user?.displayName || user?.email}! Now let's make it official...</h1>
                <div className="border rounded-lg p-4 m-2 flex flex-col items-center justify-between space-y-4 h-full">
                    <h2 className="text-2xl mb-2">{selectedResult.name}</h2>
                    <div className="w-250 h-220 overflow-hidden rounded-lg mb-2">
                        <img className="w-full h-full object-cover" src={selectedResult.images[0]} alt="Result" />
                    </div>
                    <p className="mb-2 text-green-500">${selectedResult.price.total}</p>
                    <p className="mb-2">City: {selectedResult.city}</p>
                    <p className="mb-2">Bedrooms: {selectedResult.bedrooms}</p>
                    <p className="mb-2">Bathrooms: {selectedResult.bathrooms}</p>
                    <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 mt-auto" onClick={() => confirmResult()}>Confirm Reservation</button>
                </div>
            <AIButton />
            <Footer />
        </div>
    );
}

export default Reservation;