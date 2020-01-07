import React, {useState} from 'react';
import { connect } from 'react-redux';
import { fetchCalendar } from '../actions/calendar';
import { setEnableProp, setDisableProp, restoreCustomDate } from '../api/inspector';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  calendar: {
    padding: 16,
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  toggle: {
    marginBottom: 16,
    maxWidth: 400,
    display: 'inline-block',
    marginLeft: 24,
  },
  datePicker: {
    maxWidth: 300,
    display: 'inline-block',
  },
  toggleLabel: {
    marginRight: 16
  }
}));

const Calendar = (props) => {
  const classes = useStyles();
  const date = new Date(Date.now());
  const [ day, setDay ] = useState(date.getDate());
  const [ month, setMonth ] = useState(date.getMonth() + 1);
  const [ year, setYear] = useState(date.getFullYear());
  const [ onlyAvailableInspectors, setOnlyAvailableInspectors ] = useState(false);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 5);
  maxDate.setHours(0, 0, 0, 0);

  const fetchCalendar = () => {
    props.fetchCalendar({ onlyAvailableInspectors });
  };
  React.useEffect(fetchCalendar, [onlyAvailableInspectors]);

  const handleDateChange = (date) => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    selectDate(date);
  };

  const handleToggle = () => {
    setOnlyAvailableInspectors(!onlyAvailableInspectors);
  };

  const enable = async (inspectorId, isSet) => {
    const date = [day, month, year].join('|');
    if (isSet) {
      await restoreCustomDate(inspectorId, date);
    } else {
      await setEnableProp(inspectorId, date);
    }
    await fetchCalendar();
  };

  const disable = async (inspectorId, isSet) => {
    const date = [day, month, year].join('|');
    if (isSet) {
      await restoreCustomDate(inspectorId, date);
    } else {
      await setDisableProp(inspectorId, date);
    }
    await fetchCalendar();
  };

    const formattedDate = day && month && year ? `${day}|${month}|${year}` : null;
    const availableInspectors = formattedDate && props.calendar[formattedDate]
      ? props.calendar[formattedDate]
      : [];

    const availableInspectorsArray = Object.keys(availableInspectors).map((inspector) => ({
      id: inspector, ...availableInspectors[inspector],
    }));

    const [selectedDate, selectDate] = React.useState(minDate);


    return (
      <div className={classes.calendar}>
        <div className={classes.filters}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                emptyLabel="Date"
                autoOk
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleDateChange}
                className={classes.datePicker}
                value={selectedDate}
                variant="inline"
            />
          </MuiPickersUtilsProvider>

          <div className={classes.toggleContainer}>
            <label className={classes.toggleLabel}>Only available inspectors</label>
            <ToggleButtonGroup exclusive value={onlyAvailableInspectors} onChange={handleToggle}>
              <ToggleButton value={true}>
                YES
              </ToggleButton>
              <ToggleButton value={false}>
                NO
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <Paper className={classes.calendarTableRoot}>
          <TableContainer className={classes.calendarTableContainer}>
            <Table stickyHeader>
              <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Inspections left</TableCell>
                  <TableCell>Enable</TableCell>
                  <TableCell>Disable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody displayRowCheckbox={false}>
                {formattedDate && props.calendar[formattedDate]
                    ? availableInspectorsArray.map(({
                                                      id, fullName, daysUnlimited, daysNotAble, maximumPerDay,
                                                    }) => (
                        <TableRow key={id}>
                          <TableCell>
                            {fullName}
                          </TableCell>
                          <TableCell>
                            {!daysUnlimited && !daysNotAble ? maximumPerDay : null}
                          </TableCell>
                          <TableCell>
                            <Button
                                color={daysUnlimited ? 'primary' : 'default'}
                                onClick={() => enable(id, daysUnlimited)}
                            > {daysUnlimited ? 'Always available' : 'Set as always available'}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                                color={daysNotAble ? 'primary' : 'default'}
                                onClick={() => disable(id, daysNotAble)}
                            > {daysNotAble ? 'Unavailable' : 'Set as unavailable'}
                            </Button>
                          </TableCell>
                        </TableRow>
                    )) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
};


const mapStateToProps = (state) => ({
  calendar: state.calendar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCalendar: (filters) => {
    dispatch(fetchCalendar(filters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
