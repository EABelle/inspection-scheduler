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
import Chip from 'material-ui/Chip';
import { uniq } from 'lodash';
import { fetchInspectors } from '../actions/inspectors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function getDay(index) {
  switch (index) {
    case 0:
      return 'Do';
    case 1:
      return 'Lu';
    case 2:
      return 'Ma';
    case 3:
      return 'Mi';
    case 4:
      return 'Ju';
    case 5:
      return 'Vi';
    case 6:
      return 'Sa';
    default:
      return index;
  }
}

class Inspectors extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      selectedInspector: null,
    };
  }

  componentDidMount() {
    this.props.fetchInspectors();
  }

  getDateDetail(inspector) {
    return <span onClick={() => this.handleOpen(inspector)}>ver detalle</span>;
  }

  handleOpen(selectedInspector) {
    this.setState({ open: true, selectedInspector });
  }

  handleClose() {
    this.setState({ open: false, selectedInspector: null });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cerrar"
        primary
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nombre y Apellido</TableHeaderColumn>
              <TableHeaderColumn>Días</TableHeaderColumn>
              <TableHeaderColumn>Máximo por día</TableHeaderColumn>
              <TableHeaderColumn>Acciones</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.inspectors.map((inspector, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  {inspector.nombre_apellido}
                </TableRowColumn>
                <TableRowColumn>
                  {`${inspector.horarios.map(({ dia }) => getDay(dia)).join(', ')} `}
                </TableRowColumn>
                <TableRowColumn>
                  {inspector.maximo}
                  {' inspections'}
                </TableRowColumn>
                <TableRowColumn>
                  {this.getDateDetail(inspector)}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title={`Inspector: ${this.state.selectedInspector ? this.state.selectedInspector.nombre_apellido : null}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          { !this.state.selectedInspector ? null : (
            <div>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Día</TableHeaderColumn>
                    <TableHeaderColumn>Horario</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.selectedInspector.horarios.map(({ dia, rango }) => (
                    <TableRow key={dia}>
                      <TableRowColumn>
                        {this.getDay(dia)}
                      </TableRowColumn>
                      <TableRowColumn>
                        {`de ${rango.inicio} a ${rango.fin} hs`}
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h3>Localidades</h3>
              <div style={styles.chipsWrapper}>
                {
                                    uniq(this.state.selectedInspector.localidades).sort().map((localidad) => (
                                      <Chip
                                        key={localidad}
                                        style={styles.chip}
                                        onRequestDelete={() => {}}
                                      >
                                        {localidad}
                                      </Chip>
                                    ))
                                }
              </div>
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  inspectors: state.inspectors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInspectors: () => {
    dispatch(fetchInspectors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspectors);
