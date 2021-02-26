import React from 'react'
import './App.css';
import Employee from './pages/Employee'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Employee />
    </MuiPickersUtilsProvider>
  );
}

export default App;
