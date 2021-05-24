import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography, CardContent, Card, CardActions, Button, CircularProgress } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import CreateParent from "./CreateParent"

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
  card: {
    width: "280px",
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
  TableContainer: {
  },
  paper: {
    // Width: "100px",
  },
  mainPaper: {
    display: "flex",
    justifyContent: "space-around",
  },
  CardContent: {
    marginBottom: "-20px"
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

  if (loading) return (
    <div style={{ width: "90vw", height: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress disableShrink />
    </div>
  )
  if (error) return <p>Error :(</p>;

  const { parents } = data
  console.log("data", parents)

  return (
    <div>
      <Container component={Box} m={"auto"}>
        <Box display="flex" justifyContent="center" my={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={`${classes.paper} ${classes.mainPaper}`} component={Box} p={2} m={2}>
              <Typography align="center" variant="h5">All parents</Typography>
              <CreateParent />
            </Paper>
          </Grid>
        </Box>
        <Grid component={Box} container className={classes.containerGrid} spacing={2} mx={5}>
          {parents.map(parent => {
            return <Grid item xs={12} sm={6} md={4} lg={3} key={parent.id} className={classes.GridItem}>
              <Card className={classes.card} elevation={3}>
                <CardContent className={classes.CardContent}>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    ID: {parent.id}</Typography>
                  <Typography style={{ textTransform: "capitalize" }} variant="h5" component="h2">
                    {parent.fatherName}</Typography>
                  <Typography style={{ textTransform: "capitalize" }} className={classes.pos} color="textSecondary">
                    {parent.occupation}</Typography>
                </CardContent>
                <CardActions>
                  <Box mb={1}>
                    <Button onClick={() => history.push(`parents/${parent.id}`)} size="small" variant="outlined" color="primary">Childrens</Button>
                  </Box>
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
