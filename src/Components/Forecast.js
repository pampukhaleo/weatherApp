import React, {useState} from 'react';
import Conditions from "./Conditions";
import s from './Forecast.module.css';
import Button from "@material-ui/core/Button";



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
            <h1>pampukha-weather-app</h1>
            <div>
                <Conditions responseObj={responseObj}
                            error={error} //new
                            loading={loading}/>
            </div>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={s.TextInput}
                />
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        className={s.Radio}
                    />
                    Celcius
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        className={s.Radio}
                    />
                    Fahrenheit
                </label>
                <Button type="submit" variant="contained" color="primary" style={{display: "block", margin: "10px auto"}}>
                    Получить результат
                </Button>
            </form>
            {/*<ContainedButtons/>*/}
        </div>
    )
}

export default Forecast