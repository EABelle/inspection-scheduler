import React from 'react';
import { connect } from 'react-redux';
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import { fetchInspectors } from '../../actions/inspectors';
import {InspectorDialog, makeInspectorDialogState} from "./InspectorDialog";
import {getDayAbbreviation} from "../../utils";

const Inspectors = (props) => {

  React.useEffect(props.fetchInspectors, [null]);
  const {open, selectedInspector, handleClose, InspectorDetailButton } = makeInspectorDialogState();

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
                      {`${inspector.times.map(({ day }) => getDayAbbreviation(day)).join(', ')} `}
                    </TableCell>
                    <TableCell>
                      {inspector.maximumPerDay}
                      {' inspections'}
                    </TableCell>
                    <TableCell>
                      <InspectorDetailButton inspector={inspector}/>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <InspectorDialog handleClose={handleClose} selectedInspector={selectedInspector} open={open} />
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Inspectors));
