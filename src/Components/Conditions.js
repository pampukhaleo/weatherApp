import React from 'react';

const Conditions = (props) => {
    // console.log(props);
    return (
        <div>
            {props.error && <small>Please enter a valid city.</small>}
            {props.loading && <div>Loading...</div>}
            {props.responseObj.cod === 200 &&
            <div>
                <p><strong>{props.responseObj.name}</strong></p>
                <p>Сейчас {props.responseObj.main.temp} градусов, ощущается
                    как {props.responseObj.main.feels_like} !</p>
                <p>минимальная температура сегодня {props.responseObj.main.temp_min} градусов,
                    максимальная {props.responseObj.main.temp_max}</p>
                <p>{(props.responseObj.weather[0].description).toUpperCase()}.</p>
                <p></p>
            </div>
            }
        </div>
    )
}
 export default Conditions