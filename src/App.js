import React, { useState, useEffect } from 'react'
import './App.css';
import api from './services/api'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Paper, IconButton, Divider, Button, Modal, TextField, MenuItem} from '@material-ui/core';
import { Delete, Edit, Queue } from '@material-ui/icons';
import Notification from './components/Notification'

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
  {
    value: 'Mobile',
    label: 'Mobile',
  },
  {
    value: 'Frontend',
    label: 'Front-end',
  },
  {
    value: 'Backend',
    label: 'Back-end',
  },
];

const gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

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
  AddButtons: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10
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
  selectField: {
    width: '100%',
  },


}));

function App() {

  //Settings State
  const classes = useStyles();
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employees, setEmployees] = useState([])
  const [modalStyle] = React.useState(getModalStyle);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState();
  const [teamSelect, setTeamSelect] = useState('');
  const [genderSelect, setGenderSelect] = useState('');
  const [birthday, setBirthday] = useState('');
  const [startDate, setStartDate] = useState('');

  const [notify, setNotify] = useState({isOpen:false, message: '', type:''});

  //Call to API
  useEffect(() => {
    api.get('nutemployee').then(response => {
      setEmployees(response.data)
    })
  }, [])


  const handleChangeTeam = (event) => {
    setTeamSelect(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGenderSelect(event.target.value);
  };
  //Open New Employee Modal
  const handleOpenEmployee = () => {
    setOpenEmployee(true);
  };
  //Close New Employee Modal
  const handleCloseEmployee = () => {
    setOpenEmployee(false);
  };

  //Open Edit Employee Modal
  const handleOpenEditEmployee = () => {
    setOpenEmployee(true);
  };
  //Close Edit Employee Modal
  const handleCloseEditEmployee = () => {
    setOpenEmployee(false);
  };


  //Add Employee
  async function handleRegister(e, _id) {
    e.preventDefault();

    const data = ({
      name,
      email,
      CPF,
      teamSelect,
      genderSelect,
      birthday,
      startDate
    })

    try {
      const response = await api.post('nutemployee', data)
      alert('Cadastro finalizado')
      setOpenEmployee(false);
    } catch (err) {
      alert('Erro no cadastro')
    }
  }

  async function handleEditEmployee(e, _id) {
    const data = ({
      name,
      email,
      CPF,
      teamSelect,
      genderSelect,
      birthday,
      startDate
    })

    try {
      const response = await api.patch(`nutemployee/${_id}`, data)
      alert('Cadastro finalizado')
      setOpenEmployee(false);
    } catch (err) {
      alert('Erro no cadastro')
    }
  }

  //Delete Employee
  async function handleDeleteEmployee(_id) {
    try {
      await api.delete(`nutemployee/${_id}`);
      setEmployees(employees.filter(employee => employee._id !== _id))
    } catch (err) {
      alert('Erro to delete')
    }
  }


  //Modal Content - New Employee
  const bodyNewEmployee = (
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
              value={teamSelect}
              onChange={handleChangeTeam, e => setTeamSelect(e.target.value)}
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
              value={genderSelect}
              onChange={handleChangeGender, e => setGenderSelect(e.target.value)}

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

  //Modal Content - Edit Employee
  const bodyEditEmployee = (
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
              value={teamSelect}
              onChange={handleChangeTeam, e => setTeamSelect(e.target.value)}
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
              value={genderSelect}
              onChange={handleChangeGender, e => setGenderSelect(e.target.value)}

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


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  const rows = []
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
        </Grid>
        {/** Card de cada Employee*/}
        
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
                  <IconButton color="primary" aria-label="edit people" component="span" onClick={handleOpenEditEmployee}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete people" component="span" onClick={() => { if (window.confirm('Delete the item?')) { handleDeleteEmployee(employee._id) } }} >
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
      </Grid>
      <Notification 
            notify={notify}
            setNotify={setNotify}
      />

      {/** Modal cadastro People*/}
      <Modal
        open={openEmployee}
        onClose={handleCloseEmployee}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {bodyNewEmployee}
      </Modal>
    </Container>
  );
}

export default App;
