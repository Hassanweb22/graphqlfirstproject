import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function Data() {
    const classes = useStyles();

    const CHILDS_QUERY = gql`
  {
    childs{
      name
      fname
      age
        parents {
          fatherName
          occupation
        }
    }
  }
  `
    const { loading, error, data } = useQuery(CHILDS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { childs } = data

    console.log("data", childs)

    return (
        <TableContainer >
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Fathers's Name</StyledTableCell>
                        <StyledTableCell>Age</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {childs.map(child => {
                        return <StyledTableRow >
                            <StyledTableCell component="th" scope="row">{child.name}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{child.fname}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{child.age}</StyledTableCell>
                        </StyledTableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Data
