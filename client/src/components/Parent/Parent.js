import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography, CardContent, Card, CardActions, Button } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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
  container: {
    // display: "flex",
    // justifyContent: "center"
  },
  TableContainer: {
  },
  paper: {
    Width: "100px",
  }
});

function Childs() {

  const classes = useStyles()
  const history = useHistory()

  const CHILDS_QUERY = gql`
    {
      parents {
        id
        fatherName
        occupation
      }
    }
    `

  const { loading, error, data } = useQuery(CHILDS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { parents } = data
  console.log("data", parents)

  return (
    <div>
      <Container component={Box} my={2}>
        <Box display="flex" justifyContent="center" my={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={classes.paper} component={Box} p={2} m={2}>
              <Typography align="center" variant="h5">All parents</Typography>
            </Paper>
          </Grid>
        </Box>
        <Grid component={Box} container className={classes.container} spacing={2} mx={5}>
          {parents.map(parent => {
            return <Grid item xs={12} sm={6} md={4} lg={3} >
              {/* <Paper elevation={3} className={classes.paper} component={Box} p={2} onClick={() => history.push(`parents/:${parent.name}`)}>
                <Typography variant="subtitle1">{parent.name}</Typography>
              </Paper> */}
              <Card className={classes.card} elevation={3}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    ID: {parent.id}</Typography>
                  <Typography style={{ textTransform: "capitalize" }} variant="h5" component="h2">
                    {parent.fatherName}</Typography>
                  <Typography style={{ textTransform: "capitalize" }} className={classes.pos} color="textSecondary">
                    {parent.occupation}</Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => history.push(`parents/${parent.fatherName}`)} size="small" variant="outlined" color="primary">Childrens</Button>
                </CardActions>
              </Card>
            </Grid>
          })}
        </Grid>
      </Container>
    </div >
  )
}

export default Childs
