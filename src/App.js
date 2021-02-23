import React from 'react'
import './App.css';
//import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Card, Typography, CardContent, CardActions, CardHeader, IconButton } from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    flex: 1,
    justifyContent: 'center'
  },
  cardContainer: {
    textAlign: 'left'
  },
  nameTitle: {
    fontWeight: 'bold',
  },

});


function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <h1>People Management Tool</h1>
      <Box>
        <Card >
          <CardHeader
            title="João Miguel"
            subheader="Front-end Developer"

            action={
              <IconButton aria-label="Delete">
                <Edit />
                <Delete />
              </IconButton>
            }
          />

          <CardContent>
            <Typography className={classes.teamName} variant="body2">Email: joaomiguel@mail.com</Typography>
            <Typography className={classes.teamName} variant="body2">Start Date: 02/2021</Typography>
          </CardContent>
          <CardActions>

          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
