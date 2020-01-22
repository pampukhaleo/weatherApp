import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import tempSign from '../img/temperature.png'

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
        fontSize: 16,
    },
    pos: {
        marginTop: 12,
        fontWeight: 700
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    if (props.responseObj.main === undefined) {
        return null
    }
    let main = props.responseObj.main
    let mainArray = Object.values(main)
    let imgSign = <img src={tempSign} alt="no" style={{width: "10px", position: "absolute"}}/>
    return (
        <div>
            {props.error &&
            <small style={{color: "red", fontWeight: "bold"}}>SOME ERROR! TRY ENTER VALID CITY NAME</small>}
            {props.loading && <div>Loading...</div>}
            {props.responseObj.cod === 200 &&
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.responseObj.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {bull} Сейчас {Math.round(mainArray[0])}{imgSign} {bull} <br/>
                        {bull} Feels like {Math.round(mainArray[1])}{imgSign} {bull}
                    </Typography>
                    <Typography variant="body3" component="p" className={classes.pos}>
                        {(props.responseObj.weather[0].description).toUpperCase()}
                    </Typography>
                </CardContent>
            </Card>
            }
        </div>
    )
}