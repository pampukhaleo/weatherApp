import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import s from "./FiveDaysComponent.module.css"
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ConditionsFiveDays from "./ConditionsFiveDays";

//MaterialUI styles
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        fontWeight: 700,
        fontSize: '24px',
    }
}));

const FiveDaysComponent = () => {

    const classes = useStyles();
    //select input open state
    const [open, setOpen] = React.useState(false);
    //setCity with event target val
    const handleChange = event => {
        setCity(event.target.value);
    };
    //city value state
    const [city, setCity] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //submit select input val
    const handleSubmit = () => {
        setOpen(false);
        if(city === '') {
            return null
        }
        return getWeather();
    };
    //loading and error state
    // // let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    //API elemets state
    let [responseObj, setResponseObj] = useState([]);

    function getWeather() {
        setLoading(true);
        //API list elements
        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}&units=metric`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "f479a2d97dmsh51c191af476bf54p1366dajsnfc3176b5cdd1"
            }
        }).then(response => response.json())
            .then(response => {
                setLoading(false);
                return setResponseObj(response.list)
            })
    }
    //filter elements to a new array
    let newElements = responseObj.filter(function (value, index) {
        return (index % 7 == 0);
    } );

    return (
        <div>
            <div>{/*{"5 days weather MaterialUI select input form"}*/}
                <Button className={classes.button} onClick={handleClickOpen}>Get 5 Days weather</Button>
                <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Choose city</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={city}
                                    onChange={handleChange}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Kyiv'}>Киев</MenuItem>
                                    <MenuItem value={'Opole'}>Ополе</MenuItem>
                                    <MenuItem value={'slavske'}>Славское</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/*{"map new array with needed elements"}*/}
            <div  className={s.container}>
                {responseObj.length > 1 &&
                newElements.map(element => {
                    return <div className={s.weatherCard}>
                        <ConditionsFiveDays responseObj={element} city={city}/>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default FiveDaysComponent