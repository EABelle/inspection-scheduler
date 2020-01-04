import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchCalendar } from '../actions/calendar';
import { setEnableProp, setDisableProp, restoreCustomDate } from '../api/inspector';

const styles = {
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
    width: 300,
  },
};
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date(Date.now());
    this.state = {
      open: false,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      onlyAvailableInspectors: true,
    };
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(minDate.getDate() + 5);
    maxDate.setHours(0, 0, 0, 0);

    this.minDate = minDate;
    this.maxDate = maxDate;

    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.fetchCalendar = this.fetchCalendar.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
  }

  componentDidMount() {
    this.props.fetchCalendar({ onlyAvailableInspectors: true });
  }

  handleChangeDate(event, date) {
    this.setState({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleToggle() {
    this.setState({ onlyAvailableInspectors: !this.state.onlyAvailableInspectors }, () => {
      this.fetchCalendar();
    });
  }

  fetchCalendar() {
    this.props.fetchCalendar({ onlyAvailableInspectors: this.state.onlyAvailableInspectors });
  }

  async enable(inspectorId, isSet) {
    const { day, month, year } = this.state;
    const date = [day, month, year].join('|');
    if (isSet) {
      await restoreCustomDate(inspectorId, date);
    } else {
      await setEnableProp(inspectorId, date);
    }
    await this.fetchCalendar()
  }

  async disable(inspectorId, isSet) {
    const { day, month, year } = this.state;
    const date = [day, month, year].join('|');
    if (isSet) {
      await restoreCustomDate(inspectorId, date);
    } else {
      await setDisableProp(inspectorId, date);
    }
    await this.fetchCalendar();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onClick={this.handleClose}
      />,
    ];

    const { day, month, year } = this.state;
    const formattedDate = day && month && year ? `${day}|${month}|${year}` : null;
    const availableInspectors = formattedDate && this.props.calendar[formattedDate]
      ? this.props.calendar[formattedDate]
      : [];

    const availableInspectorsArray = Object.keys(availableInspectors).map((inspector) => ({
      id: inspector, ...availableInspectors[inspector],
    }));

    return (
      <div style={{ textAlign: 'left', padding: 16 }}>

        <DatePicker
          floatingLabelText="Date"
          autoOk
          minDate={this.minDate}
          maxDate={this.maxDate}
          onChange={this.handleChangeDate}
          style={styles.datePicker}
          defaultDate={this.minDate}
        />

        <Toggle
          label="Only available inspectors"
          defaultToggled
          onToggle={this.handleToggle}
          style={styles.toggle}
          labelPosition="right"
          labelStyle={styles.toggleLabel}
        />

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Inspections left</TableHeaderColumn>
              <TableHeaderColumn>Enable</TableHeaderColumn>
              <TableHeaderColumn>Disable</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {formattedDate && this.props.calendar[formattedDate]
              ? availableInspectorsArray.map(({
                id, fullName, daysUnlimited, daysNotAble, maximumPerDay,
              }) => (
                <TableRow key={id}>
                  <TableRowColumn>
                    {fullName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {!daysUnlimited && !daysNotAble ? maximumPerDay : null}
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label={daysUnlimited ? 'Habilitado' : 'Habilitar'}
                      primary={daysUnlimited}
                      onClick={() => this.enable(id, daysUnlimited)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label={daysNotAble ? 'Inhabilitado' : 'Inhabilitar'}
                      primary={daysNotAble}
                      onClick={() => this.disable(id, daysNotAble)}
                    />
                  </TableRowColumn>
                </TableRow>
              )) : null}
          </TableBody>
        </Table>
        <Dialog
          title="Inspector:"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            Dialog
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  calendar: state.calendar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCalendar: (filters) => {
    dispatch(fetchCalendar(filters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
