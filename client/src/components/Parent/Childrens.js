import React, { useState, useEffect } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { Grid, Paper, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import NewChild from "./NewChild"
import Subscription from "./Subscription"

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
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    grid: {
        marginTop: "15px"
    },
    tableStyle: {
        margin: "0 auto"
    },
    form: {
        margin: "20px auto",
        display: "flex",
        justifyContent: "center"
    },
    inputText: {
        marginBottom: "10px"
    }
});


function SingleChild() {
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams()

    const CHILDS_QUERY = gql`
         query($id: ID!) {
            SingleParent(id: $id) {
                fatherName
                occupation
                    childs {
                        id
                        name
                        fname
                        age
                    }
            }
    }
    `

    const { loading, error, data } = useQuery(CHILDS_QUERY, {
        variables: {
            id
        }
    });



    if (loading) return (
        <div style={{ width: "90vw", height: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress disableShrink />
        </div>
    )
    if (error) return <p>Error :(</p>;

    let { SingleParent: { childs } } = data
    let { SingleParent: { fatherName } } = data
    console.log("childs", childs)
    console.log("fatherName", fatherName)


    return (
        <>
            <Box display="flex" justifyContent="center" my={1}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className={classes.paper} component={Box} p={2} m={2}>
                        <Typography align="center" variant="h5">Childrens</Typography>
                    </Paper>
                </Grid>
            </Box>

            <Grid container className={classes.grid}>
                <Grid item xs={11} md={6} lg={6} component={Box} className={classes.tableStyle}>
                    {childs.length > 0 ?
                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Fathers's Name</StyledTableCell>
                                        <StyledTableCell>Age</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody style={{ backgroundColor: "white" }}>
                                    {childs.map(child => {
                                        return <StyledTableRow key={child.id}>
                                            <StyledTableCell component="th" scope="row">{child.name}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{child.fname}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{child.age}</StyledTableCell>
                                        </StyledTableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer> : <Typography align="center" variant="h5">No childrens</Typography>}
                </Grid>
            </Grid>

            <Grid container className={classes.form}>
                <NewChild fatherName={fatherName} />
            </Grid>
            <Grid container className={classes.form}>
                <Subscription />
            </Grid>
        </>
    )
}

export default SingleChild
