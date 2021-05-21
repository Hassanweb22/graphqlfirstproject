import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

import { Grid, Paper, Box, Typography, TextField, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    grid: {
        marginTop: "15px"
    },
    tableStyle: {
        margin: "0 auto"
    },
    form: {
        margin: "20px auto"
    },
    inputText: {
        marginBottom: "10px"
    }
});

function CreateChild({ fatherName }) {
    const classes = useStyles()
    const initialState = {
        name: "",
        age: ""
    }
    const [state, setState] = useState(initialState)

    const ADD_CHILD_SUBSCRIPTION = gql`
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

    const [createChild] = useMutation(ADD_CHILD_SUBSCRIPTION)

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
                    <Button disabled={!validate()} onClick={handleSubmit} variant="contained" color="primary" type="submit">Submit</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default CreateChild
