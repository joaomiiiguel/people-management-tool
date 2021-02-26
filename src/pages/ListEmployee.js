import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Grid, Typography, Paper, IconButton, Divider, Button, Modal } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import EditEmployee from './EditEmployee';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        textAlign: 'left',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    headerForm: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    textSecondary: {
        fontSize: 16,
        marginTop: 5
    },
    paper: {
        position: 'absolute',
        width: '50%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    AddButtons: {
        flex: 1,
        justifyContent: 'space-around',
        marginBottom: 10
    },
    buttonName: {
        fontSize: 18
    }
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




function ListEmployee(props) {
    const classes = useStyles();
    const [employees, setEmployees] = useState([])
    const [openModalView, setOpenModalView] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    useEffect(() => {
        api.get('/nutemployee').then(response => {
            setEmployees(response.data)
        })
    }, [])


    //Delete Employee
    async function handleDeleteEmployee(_id) {
        console.log(_id)
        try {
            await api.delete(`/nutemployee/${_id}`);
            setEmployees(employees.filter(employee => employee._id !== _id))
        } catch (err) {
            alert('Erro to delete')
        }
    }


    //------------ Modal Edit Employee ---------------//
    //Open Edit Employee Modal
    const handleOpenEditEmployee = (_id) => {
        console.log(_id)

        setOpenModalEdit(true);
    };
    //Close Edit Employee Modal
    const handleCloseEditEmployee = () => {
        setOpenModalEdit(false);
    };

    //Edit Employee
    async function handleEditEmployee(_id) {
        console.log(_id)
        try {
            await api.put(`/nutemployee/` + _id);
        } catch (err) {
            alert('Erro to edit')
        }
    }

    //------------ Modal View Employee ---------------//
    //Open View Employee Modal
    const handleOpenViewEmployee = (_id) => {
        console.log(_id)

        setOpenModalView(true);
    };
    //Close View Employee Modal
    const handleCloseViewEmployee = () => {
        setOpenModalView(false);
    };

    //View Employee
    async function handleViewEmployee(_id) {
        console.log(_id)
        try {
            await api.get(`/nutemployee/${_id}`);
            setEmployees(employees.filter(employee => employee._id === _id))
        } catch (err) {
            alert('Erro to View')
        }
    }


    return (
        <div>
            <ul style={{ margin: 0, padding: 0 }}>
                {employees.map(employee => (
                    <Paper elevation={3} className={classes.cardContainer} key={employee._id}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography variant="h6">
                                    <Button fullWidth size="small" className={classes.buttonName} onClick={() => handleOpenViewEmployee(employee._id)}>{employee.name}</Button>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <IconButton color="primary" aria-label="edit people" component="span" onClick={() => handleOpenEditEmployee(employee._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete people" component="span" onClick={() => handleDeleteEmployee(employee._id)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Typography className={classes.textSecondary} variant="body2"><strong>Team:</strong> {employee.team}</Typography>
                        <Typography className={classes.textSecondary} variant="body2"><strong>Email:</strong> {employee.email}</Typography>
                        <Typography className={classes.textSecondary} variant="body2"><strong>Start Date:</strong> {employee.bir}</Typography>
                    </Paper>


                ))}
            </ul>


            <Modal
                open={openModalView}
                onClose={handleCloseViewEmployee}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <Grid className={classes.headerForm}>
                        <Typography variant="h6">
                            View Employee
                </Typography>
                    </Grid>
                    <Grid container spacing={3} key={employees._id}>
                        <Grid item xs={12}>
                            <Typography>Name: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>E-mail: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>CPF: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Team: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Gender: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Birthday: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Start Date: {employees.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth size="large" onClick={handleCloseViewEmployee}>Close</Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
            <Modal
                open={openModalEdit}
                onClose={handleCloseEditEmployee}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <EditEmployee />
            </Modal>
        </div>




    )
}

export default ListEmployee
