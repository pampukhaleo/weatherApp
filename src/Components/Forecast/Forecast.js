import React, {useState} from 'react';
import Conditions from "../Conditions";
import s from './Forecast.module.css';
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import {green} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import ConditionsMaterialUI from "../Conditions/Oneday/ConditionsOneDay";
import tempSign from '../../img/temperature.png'

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [responseObj, setResponseObj] = useState({});

    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        setLoading(true);

        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lang=ru&units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "f479a2d97dmsh51c191af476bf54p1366dajsnfc3176b5cdd1"
            }
        }).then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)
                setLoading(false);
                setError(false)
            })
            .catch(err => {
                setError(true)
                setLoading(false);
                console.log(err.message);
            });
    }
    return (
        <div>
            <h3 className={s.title}>pampukha-weather-app</h3>
            <div>
                <ConditionsMaterialUI responseObj={responseObj}
                                      error={error}
                                      loading={loading}/>
            </div>
            <form className={s.form} onSubmit={getForecast}>
                <TextField id="standard-basic"
                           label="Enter City"
                           onChange={(e) => setCity(e.target.value)}
                           maxLength="50"
                           style={{display: "block", margin: "13px auto", width: "194px"}}/>
                <label>
                    <GreenRadio
                        checked={unit === "metric"}
                        onChange={(e) => setUnit(e.target.value)}
                        value="metric"
                        color="default"
                        name="units"
                    />
                    Celcius
                </label>
                <label>
                    <GreenRadio
                        checked={unit === 'imperial'}
                        onChange={(e) => setUnit(e.target.value)}
                        value="imperial"
                        color="default"
                        name="units"
                    />
                    Fahrenheit
                </label>
                <Button type="submit" variant="contained" color="primary" style={{display: "block", margin: "10px auto"}}>
                    Получить результат
                </Button>
            </form>
        </div>
    )
}

export default Forecast