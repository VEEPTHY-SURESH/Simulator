import React from "react";
import AllVehicles from "./AllVehicles";
import "./style.css";

function Home(){

    return(
        <>
            <div className="data">
                <div>
                    <AllVehicles />
                </div>
            </div>
        </>
    )
}

export default Home;