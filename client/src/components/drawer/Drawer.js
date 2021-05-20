import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Typography, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { PhotoCamera, MenuOpen, InboxRounded, MailOutline } from '@material-ui/icons';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    listsize: {
        "& .MuiTypography-displayBlock":{
            textTransform: "capitalize"
        }
    }

});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const history = useHistory()
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={classes.listsize}>
                <ListItem component={Button} onClick={() => history.push("/")}>
                    <ListItemIcon><InboxRounded /> </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem component={Button} onClick={() => history.push("/childs")}>
                    <ListItemIcon><InboxRounded /> </ListItemIcon>
                    <ListItemText primary={"Childs"} />
                </ListItem>
                <ListItem component={Button} onClick={() => history.push("/parents")}>
                    <ListItemIcon><InboxRounded /> </ListItemIcon>
                    <ListItemText primary={"Parents"} />
                </ListItem>
            </List>
            <Divider />

            {/* <List>
                <ListItem button key={'All mail'}>
                    <ListItemIcon> <InboxIcon /></ListItemIcon>
                    <Typography variant="h6" align="center" style={{ margin: "0 auto" }}>All Mail</Typography>
                </ListItem>
            </List> */}
        </div>
    );

    return (
        <React.Fragment key={'left'}>
            <MenuOpen onClick={toggleDrawer('left', true)} />
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </React.Fragment>
    );
}
