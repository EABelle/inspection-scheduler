import React, {useState} from 'react';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import { fetchInspections } from '../actions/inspections';

const useStyles = makeStyles(() => ({
  inspections: {
    padding: 16,
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 12
  },
  datePicker: {
    maxWidth: 300,
    display: 'inline-block',
  },
}));

export const Inspections = (props) => {
  const classes = useStyles();
  const date = new Date(Date.now());
  const [ day, setDay ] = useState(date.getDate());
  const [ month, setMonth ] = useState(date.getMonth() + 1);
  const [ year, setYear] = useState(date.getFullYear());
  const [selectedDate, selectDate] = React.useState(date);

  const fetchInspections = () => {
    props.fetchInspections({ day, month, year });
  };

  React.useEffect(fetchInspections, [null]);

  const handleDateChange = (date) => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    selectDate(date);
    fetchInspections();
  };

    return (
      <div className={classes.inspections}>
        <div className={classes.filters}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                emptyLabel="Date"
                autoOk
                onChange={handleDateChange}
                className={classes.datePicker}
                value={selectedDate}
                variant="inline"
            />
          </MuiPickersUtilsProvider>
        </div>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableCell>Owner</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Time range</TableCell>
                </TableRow>
              </TableHead>
              <TableBody displayRowCheckbox={false} stripedRows style={{ cursor: 'pointer' }}>
                {
                  props.inspections
                      ? props.inspections.map(({
                                                      _id, owner, vehicle, date,
                                                    }) => {
                        const hours = (new Date(date)).getHours();
                        return (
                            <TableRow key={_id}>
                              <TableCell>
                                {`${owner.lastName}, ${owner.firstName}`}
                              </TableCell>
                              <TableCell>
                                {vehicle.domain}
                              </TableCell>
                              <TableCell>
                                {`${vehicle.brand} ${vehicle.model}`}
                              </TableCell>
                              <TableCell>
                                {`${vehicle.brand} ${vehicle.model}`}
                              </TableCell>
                              <TableCell>
                                {`${vehicle.brand} ${vehicle.model}`}
                              </TableCell>
                              <TableCell>
                                {`${hours} to ${hours + 3}`}
                              </TableCell>
                            </TableRow>
                        );
                      })
                      : 'No inspections found'
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
}

const mapStateToProps = (state) => ({
  inspections: state.inspections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInspections: (date) => {
    dispatch(fetchInspections(date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspections);
