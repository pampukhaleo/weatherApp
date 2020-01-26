import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import tempSign from "../../../img/temperature.png";

//MaterialUI styles
const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 300,
        margin: "15px auto"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.6)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginTop: 12,
        fontWeight: 700
    },
});

const ConditionsFiveDays = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    let imgSign = <img src={tempSign} alt="no" style={{width: "10px", position: "absolute"}}/>
    //MaterialUI card
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.city}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.responseObj.dt_txt}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {bull} now is {Math.round(props.responseObj.main.temp)}{imgSign} C{bull} <br/>
                        {bull} Feels like {Math.round(props.responseObj.main.feels_like)}{imgSign} C{bull}
                    </Typography>
                    <Typography variant="body3" component="p" className={classes.pos}>
                        {(props.responseObj.weather[0].description).toUpperCase()}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ConditionsFiveDays