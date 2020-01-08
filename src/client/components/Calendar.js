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
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import {InspectorDialog, makeInspectorDialogState} from "./inspectors/InspectorDialog";

const useStyles = makeStyles(() => ({
  calendar: {
    padding: 16,
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 12
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
    marginLeft: 24,
    marginRight: 16
  },
  status: {
    width: 130,
    backgroundColor: 'green'
  },
  statusContainer: {
    width: 137,
    height: 32,
    borderRadius: 6,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enabled: {
    backgroundColor: '#d8efe0',
    color: '#179ea4',
  },
  disabled: {
    backgroundColor: '#fcd9da',
    color: '#f03d44',
  }
}));

function getMinAndMaxDate() {
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 5);
  maxDate.setHours(0, 0, 0, 0);
  return [minDate, maxDate];
}

const Calendar = (props) => {
  const classes = useStyles();
  const date = new Date(Date.now());
  const [ day, setDay ] = useState(date.getDate());
  const [ month, setMonth ] = useState(date.getMonth() + 1);
  const [ year, setYear] = useState(date.getFullYear());
  const [ onlyAvailableInspectors, setOnlyAvailableInspectors ] = useState(false);

  const [ minDate, maxDate ] = getMinAndMaxDate();

  const fetchCalendar = () => {
    props.fetchCalendar({ onlyAvailableInspectors });
  };
  React.useEffect(fetchCalendar, [onlyAvailableInspectors]);
  const {open, selectedInspector, handleClose, InspectorDetailButton } = makeInspectorDialogState();

  const handleDateChange = (date) => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    selectDate(date);
  };

  const handleToggle = () => {
    setOnlyAvailableInspectors(!onlyAvailableInspectors);
  };

  const handleStatusChange = async (inspectorId, action, daysNotAble, daysUnlimited) => {
    const date = [day, month, year].join('|');
    if (daysNotAble || daysUnlimited) {
      await restoreCustomDate(inspectorId, date);
    }
    await restoreCustomDate(inspectorId, date);
    if (action === 'DISABLED') {
      await setDisableProp(inspectorId, date);
    }
    if (action === 'ENABLED') {
      await setEnableProp(inspectorId, date);
    }
    fetchCalendar();
  };

    const formattedDate = day && month && year ? `${day}|${month}|${year}` : null;
    const availableInspectors = formattedDate && props.calendar[formattedDate]
      ? props.calendar[formattedDate]
      : [];

    const availableInspectorsArray = Object.keys(availableInspectors).map((inspector) => ({
      id: inspector, ...availableInspectors[inspector],
    }));

    const [selectedDate, selectDate] = React.useState(minDate);

    const getStatus = inspector => {
      if (inspector.daysNotAble) {
        return 'DISABLED';
      }
      if (inspector.daysUnlimited) {
        return 'ENABLED';
      }
      return 'COUNT';
    };

    const getStatusLabel = inspector => {
      const disabled = inspector.daysNotAble || !inspector.maximumPerDay;
      return (<div className={`${classes.statusContainer} ${disabled ? classes.disabled : classes.enabled}`}>{
          disabled
            ? <div className={classes.disabled}>Disabled</div>
            : <div>Enabled</div>
      }</div>)
    };

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
            <label className={classes.toggleLabel}>Only available inspectors:</label>
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
                  <TableCell>Status</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>View details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody displayRowCheckbox={false}>
                {formattedDate && props.calendar[formattedDate]
                    ? availableInspectorsArray
                        .map(inspector => (
                        <TableRow key={inspector.id}>
                          <TableCell>
                            {inspector.fullName}
                          </TableCell>
                          <TableCell>
                            {!inspector.daysUnlimited && !inspector.daysNotAble ? inspector.maximumPerDay : '-'}
                          </TableCell>
                          <TableCell>
                            {getStatusLabel(inspector)}
                          </TableCell>
                          <TableCell>
                            <ToggleButtonGroup
                                size="small"
                                exclusive
                                value={getStatus(inspector)}
                                onChange={(_event, value) =>
                                    handleStatusChange(inspector.id, value, inspector.daysNotAble, inspector.daysUnlimited)
                                }
                            >
                              <ToggleButton key={`${inspector.id}_count`} value='COUNT'>Yes</ToggleButton>
                              <ToggleButton key={`${inspector.id}_enable`} value='ENABLED'>No</ToggleButton>
                              <ToggleButton key={`${inspector.id}_disable`} value='DISABLED'>Disable</ToggleButton>
                            </ToggleButtonGroup>
                          </TableCell>
                          <TableCell>
                            <InspectorDetailButton inspector={inspector} />
                          </TableCell>
                        </TableRow>
                    )) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <InspectorDialog handleClose={handleClose} selectedInspector={selectedInspector} open={open} />
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
