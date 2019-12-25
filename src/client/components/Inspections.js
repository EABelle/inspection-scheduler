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
              <TableHeaderColumn>Localidad</TableHeaderColumn>
              <TableHeaderColumn>Horario</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows style={{ cursor: 'pointer' }}>
            {
                  this.props.inspections
                    ? this.props.inspections.map(({
                      _id, titular, vehiculo, fecha,
                    }) => {
                      const hours = (new Date(fecha)).getHours();
                      console.log(titular);
                      return (
                        <TableRow key={_id}>
                          <TableRowColumn>
                            {_id}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${titular.apellido}, ${titular.nombre}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {vehiculo.dominio}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehiculo.marca} ${vehiculo.modelo}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehiculo.marca} ${vehiculo.modelo}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${vehiculo.marca} ${vehiculo.modelo}`}
                          </TableRowColumn>
                          <TableRowColumn>
                            {`${hours} a ${hours + 3}`}
                          </TableRowColumn>
                        </TableRow>
                      );
                    })
                    : 'No se encontraron inspecciones'
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
