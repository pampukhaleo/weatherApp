import React, {useState} from "react";
import s from "../Forecast.module.css";
import ConditionsMaterialUI from "../ConditionsMaterialUI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";
import {green} from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const FiveDaysComponent = () => {
    //
    // let [city, setCity] = useState('Kyiv');
    // let [unit, setUnit] = useState('metric');
    //
    // // let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [responseObj, setResponseObj] = useState({});
    let [daysObj, setDaysObj] = useState({});

    // const uriEncodedCity = encodeURIComponent(city);

    function getWeather(e) {
        e.preventDefault();

        setLoading(true);

        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=kyiv&units=metric&lang=ru", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "f479a2d97dmsh51c191af476bf54p1366dajsnfc3176b5cdd1"
            }
        }).then(response => response.json())
            .then(response => {
                setResponseObj(response)
                setLoading(false);
                // return console.log(response.list)
            })
}
    function getDays() {
        setDaysObj(responseObj.list)
        return console.log(daysObj);
    }
    return (
        <div>
            <Button variant="contained" color="primary"
                    style={{display: "block", margin: "10px auto"}}
                    onClick={getWeather}>
                Get Kyiv 5 Days weather
            </Button>
            {loading && getDays
            }
        </div>
    )
}

export default FiveDaysComponent