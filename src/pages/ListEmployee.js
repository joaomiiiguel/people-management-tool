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
    paperDelete: {
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
    const [openModalDel, setOpenModalDel] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    useEffect(() => {
        api.get('/nutemployee').then(response => {
            setEmployees(response.data)
        })
    }, [])

    //------------ Modal Delete Employee ---------------//
    //Open Delete Employee Modal
    const handleOpenDelEmployee = (_id) => {
        console.log(_id)
        setOpenModalDel(true);
    };
    //Close Delete Employee Modal
    const handleCloseDelEmployee = () => {
        setOpenModalDel(false);
    };

    //Delete Employee
    async function handleDeleteEmployee(_id) {
        console.log(_id)
        try {
            await api.delete(`/nutemployee/6036e0e213120c03e81c66f1`);
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
            await api.put(`/nutemployee/6036e0e213120c03e81c66f1`);
            setEmployees(employees.filter(employee => employee._id !== _id))
        } catch (err) {
            alert('Erro to edit')
        }
    }
    
    return (
        <div>
            <ul style={{ margin: 0, padding: 0 }}>
                {employees.reverse().map(employee => (
                    <Paper elevation={3} className={classes.cardContainer} key={employee._id}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography variant="h6">
                                    {employee.name}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <IconButton color="primary" aria-label="edit people" component="span" onClick={() => handleOpenEditEmployee(employee._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete people" component="span" onClick={() => handleOpenDelEmployee(employee._id)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Typography className={classes.textSecondary} variant="body2"><strong>Team:</strong> {employee.teamSelect}</Typography>
                        <Typography className={classes.textSecondary} variant="body2"><strong>Email:</strong> {employee.email}</Typography>
                        <Typography className={classes.textSecondary} variant="body2"><strong>Start Date:</strong> {employee.startDate}</Typography>
                    </Paper>


                ))}
            </ul>

            <Modal
                open={openModalDel}
                onClose={handleCloseDelEmployee}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paperDelete}>
                    <Grid className={classes.headerForm}>
                        <Typography variant="h5">
                            Delete this Employee?
                </Typography>
                    </Grid>

                    <Grid container item xs={12} className={classes.AddButtons}>
                        <Button variant="contained" color="secondary" size="large" onClick={handleDeleteEmployee}>Confirm</Button>
                        <Button variant="contained" size="large" onClick={handleCloseDelEmployee}>Cancel</Button>
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
