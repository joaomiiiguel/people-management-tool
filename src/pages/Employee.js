import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Button, Modal } from '@material-ui/core';
import { Queue } from '@material-ui/icons';


import NewEmployee from '../pages/NewEmployee';
import ListEmployee from '../pages/ListEmployee';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F2F4F4',
        height: '100%'
    },
    header: {
        width: '100%',
        minHeight: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    AddButtons: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
}))



function Employee() {
    const classes = useStyles();
    const [openModalEmployee, setOpenModalEmployee] = useState(false)
    

    //Modal New Employee
    //Open New Employee Modal
    const handleOpenEmployee = () => {
        setOpenModalEmployee(true);
    };
    //Close New Employee Modal
    const handleCloseEmployee = () => {
        setOpenModalEmployee(false);
    };


    return (
        <Container className={classes.root}>
            {/** Header */}
            <Box className={classes.header}>
                <Typography variant="h5">
                    People Management Tool
                </Typography>
            </Box>
            {/** Employee Div */}
            <Grid item xs={12} id="Container-Employee">
                <Grid container className={classes.AddButtons}>
                    <Typography variant="h6">
                        Employees
                    </Typography>
                    <Button startIcon={<Queue />} onClick={handleOpenEmployee}>ADD Employee</Button>

                    {/** Modal cadastro People*/}
                    <Modal
                        open={openModalEmployee}
                        onClose={handleCloseEmployee}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <NewEmployee/>
                    </Modal>
                </Grid>

                <ListEmployee/>

            </Grid>
        </Container>
    );
}

export default Employee;