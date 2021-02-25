import React, { useState } from 'react';
import api from '../services/api'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField, MenuItem } from '@material-ui/core';

//Styles components
const useStyles = makeStyles((theme) => ({
    headerForm: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    cardContainer: {
        textAlign: 'left',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    textSecondary: {
        fontSize: 16,
        marginTop: 5
    },

    paper: {
        position: 'absolute',
        width: '70%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

// Centralizar o Modal
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const team = [
    { value: 'Mobile', label: 'Mobile', },
    { value: 'Front-end', label: 'Front-end', },
    { value: 'Back-end', label: 'Back-end', },
];

const gender = [
    { value: 'Male', label: 'Male', },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
];


function NewEmployee(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openModalEmployee, setOpenModalEmployee] = useState(false);
    //Settings Form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [CPF, setCPF] = useState();
    const [team, setTeam] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [startDate, setStartDate] = useState('');

    const handleChangeTeam = (event) => {
        setTeam(event.target.value);
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };


    //Add Employee
    async function handleRegister(e, _id) {

        const data = ({
            name,
            email,
            CPF,
            team,
            gender,
            birthday,
            startDate
        })

        try {
            const response = await api.post('nutemployee', data)
            alert('Cadastro finalizado')
        } catch (err) {
            alert('Erro no cadastro')
        }
    }
    return (
        <div style={modalStyle} className={classes.paper}>
            <Grid className={classes.headerForm}>
                <Typography variant="h6">
                    New Employee
                </Typography>
            </Grid>
            <form onSubmit={handleRegister}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            variant="outlined"
                            name="Name"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            variant="outlined"
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="idnumber"
                            variant="outlined"
                            name="CPF"
                            label="CPF"
                            type="number"
                            value={CPF}
                            onChange={e => setCPF(e.target.value)}
                            fullWidth
                            autoComplete="cpf"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="team"
                            select
                            label="Team"
                            fullWidth
                            value={team}
                            onChange={handleChangeTeam, e => setTeam(e.target.value)}
                            variant="outlined"
                        >
                            {team.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="gender"
                            required
                            select
                            label="Gender"
                            fullWidth
                            value={gender}
                            onChange={handleChangeGender, e => setGender(e.target.value)}
                            variant="outlined"
                        >
                            {gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="date"
                            required
                            label="Birthday"
                            type="date"
                            variant="outlined"
                            name="Birthday"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="start-date"
                            required
                            name="Start Date"
                            label="Start Date"
                            type="date"
                            variant="outlined"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth size="large" type="submit">Create new employee</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default NewEmployee;