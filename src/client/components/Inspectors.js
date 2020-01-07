import React from 'react';
import { connect } from 'react-redux';
import { Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
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

const Inspectors = (props) => {

  const [ open, setOpen ] = React.useState(false);
  const [ selectedInspector, selectInspector ] = React.useState(null);

  React.useEffect(props.fetchInspectors, [null]);

  const handleOpen = selectedInspector => {
    setOpen(true);
    selectInspector(selectedInspector);
  };

  const getDateDetail = (inspector) => <span onClick={() => handleOpen(inspector)}>view details</span>;

  const handleClose = () => {
    setOpen(false);
    selectInspector(null);
  };

  const Actions = () => [
    <Button
      color="primary"
      onClick={handleClose}
    >Close</Button>,
  ];

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell>Full name</TableCell>
                <TableCell>Working days</TableCell>
                <TableCell>Maximum per day</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {props.inspectors.map((inspector, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {inspector.fullName}
                    </TableCell>
                    <TableCell>
                      {`${inspector.times.map(({ day }) => getDay(day)).join(', ')} `}
                    </TableCell>
                    <TableCell>
                      {inspector.maximumPerDay}
                      {' inspections'}
                    </TableCell>
                    <TableCell>
                      {getDateDetail(inspector)}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{`Inspector: ${selectedInspector ? selectedInspector.fullName : null}`}</DialogTitle>
        <DialogContent>
          { !selectedInspector ? null : (
              <div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                          <TableCell>Día</TableCell>
                          <TableCell>Horario</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody displayRowCheckbox={false}>
                        {selectedInspector.times.map(({ day, range }) => (
                            <TableRow key={day}>
                              <TableCell>
                                {getDay(day)}
                              </TableCell>
                              <TableCell>
                                {`de ${range.start} a ${range.end} hs`}
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <h3>Locations</h3>
                <div style={styles.chipsWrapper}>
                  {
                    uniq(selectedInspector.locations).sort().map((location) => (
                        <Chip
                            key={location}
                            style={styles.chip}
                            label={location}
                            variant="outlined"
                        />
                    ))
                  }
                </div>
              </div>
          )}
        </DialogContent>
        <DialogActions><Actions /></DialogActions>
      </Dialog>
    </div>
  );
};


const mapStateToProps = (state) => ({
  inspectors: state.inspectors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInspectors: () => {
    dispatch(fetchInspectors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspectors);
