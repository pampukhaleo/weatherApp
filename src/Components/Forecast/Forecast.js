import React from "react";
import OneDayComponent from "../Conditions/Oneday/OneDayComponent";
import FiveDaysComponent from "../Conditions/FiveDays/FiveDaysComponent";

const Forecast = () => {
    return <div>
        <OneDayComponent/>
        <FiveDaysComponent/>
    </div>
}

export default Forecast