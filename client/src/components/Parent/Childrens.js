import React, { useState, useEffect } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { Paper, Box, Typography, TextField, CardContent, Card, CardActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
        marginTop: "20px"
    },
    inputText: {
        marginBottom: "10px"
    }
});

const CHILDS_QUERY = gql`
         query($name: String!) {
            SingleParent(fatherName: $name) {
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

function SingleChild() {
    const classes = useStyles();
    const history = useHistory()
    const { fatherName } = useParams()

    const initialState = {
        name: "",
        age: 0
    }
    const [state, setState] = useState(initialState)

    const { loading, error, data } = useQuery(CHILDS_QUERY, {
        variables: {
            name: fatherName
        }
    });


    const ADD_MUTATION = gql`
        mutation createChild($name: String!, $fname: String!, $age: Int!) {
            createChild(
                name:  $name,
                fname: $fname,
                age: $age
            ){
                id
                name
                age
            }
        }
    `

    const [createChild] = useMutation(ADD_MUTATION)



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { SingleParent: { childs } } = data
    console.log("childs", childs)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        createChild({
            variables: { name: state.name, fname: fatherName, age: parseInt(state.age) }
        })
        setState(initialState)
    }

    const validate = () => {
        return (state.age > 0 && state.name) ? true : false
    }

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
                                        return <StyledTableRow >
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
                <Grid item xs={11} md={8} lg={6} component={Box} className={classes.tableStyle}>
                    <Paper component={Box} p={3} spacing={3}>
                        <Typography component={Box} mb={1} variant="h6">Add Child</Typography>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField className={classes.inputText} fullWidth label="Name" variant="filled"
                                name="name" value={state.name} type="text" onChange={handleChange}
                            />
                            <TextField className={classes.inputText} fullWidth label="Age" variant="filled"
                                name="age" value={state.age} type="number" onChange={handleChange}
                            />
                            <Button onClick={handleSubmit} variant="contained" color="primary" type="submit">Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default SingleChild
