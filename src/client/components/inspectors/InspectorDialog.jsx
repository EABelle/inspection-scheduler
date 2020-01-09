import {
    Button,
    Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {uniq} from "lodash";
import React from "react";
import {getDayAbbreviation} from "../../utils";

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export const makeInspectorDialogState = () => {
    const [ open, setOpen ] = React.useState(false);
    const [ selectedInspector, selectInspector ] = React.useState(null);
    const handleOpen = selectedInspector => {
        setOpen(true);
        selectInspector(selectedInspector);
    };
    const handleClose = () => {
        setOpen(false);
        selectInspector(null);
    };
    const InspectorDetailButton = ({inspector}) => <Button color="primary" onClick={() => handleOpen(inspector)}>View details</Button>;
    return {open, selectedInspector, handleClose, InspectorDetailButton };
};

export const InspectorDialog = React.memo(({selectedInspector, handleClose, open}) => (
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
                                                {getDayAbbreviation(day)}
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
        <DialogActions>
            <Button color="primary" onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
));
