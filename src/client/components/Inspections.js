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
import DatePicker from 'material-ui/DatePicker';
import { fetchInspections } from '../actions/inspections';

const styles = {
  datePicker: {
    maxWidth: 300,
  },
};

export class Inspections extends React.Component {
  constructor() {
    super();
    this.state = {
      day: null,
      month: null,
      year: null,
    };
    this.currentDate = new Date();
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.fetchInspections = this.fetchInspections.bind(this);
  }

  componentDidMount() {
    this.setState({
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth() + 1,
      year: this.currentDate.getFullYear(),
    }, () => {
      this.fetchInspections();
    });
  }

  handleChangeDate(event, date) {
    this.setState({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }, () => {
      this.fetchInspections();
    });
  }

  fetchInspections() {
    this.props.fetchInspections({ day: this.state.day, month: this.state.month, year: this.state.year });
  }

  render() {
    return (
      <div style={{ textAlign: 'left', padding: 16 }}>
        <DatePicker
          floatingLabelText="Fecha"
          autoOk
          onChange={this.handleChangeDate}
          style={styles.datePicker}
          defaultDate={this.currentDate}
        />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>id</TableHeaderColumn>
              <TableHeaderColumn>Asegurado</TableHeaderColumn>
              <TableHeaderColumn>Patente</TableHeaderColumn>
              <TableHeaderColumn>Vehículo</TableHeaderColumn>
              <TableHeaderColumn>Dirección</TableHeaderColumn>
              <TableHeaderColumn>Location</TableHeaderColumn>
              <TableHeaderColumn>Horario</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows style={{ cursor: 'pointer' }}>
            {
                  this.props.inspections
                    ? this.props.inspections.map(({
                      _id, owner, vehicle, date,
                    }) => {
                      const hours = (new Date(date)).getHours();
                      return (
                        <TableRow key={_id}>
                          <TableRowColumn>
                            {_id}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${owner.lastName}, ${owner.firstName}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {vehicle.domain}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehicle.brand} ${vehicle.model}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehicle.brand} ${vehicle.model}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehicle.brand} ${vehicle.model}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${hours} to ${hours + 3}`}
                          </TableRowColumn>
                        </TableRow>
                      );
                    })
                    : 'No inspections found'
              }
          </TableBody>
        </Table>
      </div>
    );
  }
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
