import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography, Button } from '@material-ui/core';


const useStyles = makeStyles({
    containerGrid: {
        width: "94%",
        margin: "0 auto"
    },
    GridItem: {
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        marginBottom: "10px"
    }
});

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const initialState = {
        fatherName: "",
        occupation: ""
    }
    const [state, setState] = useState(initialState)
    const classes = useStyles()

    const ADD_MUTATION = gql`
    mutation createParent($fatherName: String!, $occupation: String!) {
        createParent(
            fatherName:  $fatherName,
            occupation: $occupation,
        ){
            id
            fatherName
            occupation
        }
    }
`

    const [createParent] = useMutation(ADD_MUTATION)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("state", state)

        createParent({
            variables: { fatherName: state.fatherName, occupation: state.occupation }
        }).then(data => {
            console.log("data", data)
            setState(initialState)
        }).catch(err => {
            console.log("parent error", err)
        })
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>ADD New</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
                <DialogContent component={Box} p={3} spacing={3}>
                    <Typography component={Box} mb={1} variant="h6">Add Parent</Typography>
                    <TextField type="text" className={classes.inputText} fullWidth label="Name" variant="filled"
                        name="fatherName" value={state.fatherName} onChange={handleChange}
                    />
                    <TextField type="text" className={classes.inputText} fullWidth label="Occupation" variant="filled"
                        name="occupation" value={state.occupation} onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!(state.fatherName && state.occupation)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
