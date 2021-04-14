import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import './SingleOrder.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

const SingleOrder = (order) => {
    const {bookName, imageURL, price, authorName}= order.order.orders;
    const classes = useStyles();

    const deleteProduct = (id) => {
        fetch(`https://vast-ridge-55791.herokuapp.com/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            alert('deleted successfully')
        })
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={imageURL} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        {bookName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        by {authorName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography onClick={() =>deleteProduct(order.order._id)} variant="body2" style={{ cursor: 'pointer' }}>
                            Delete
                        </Typography>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">${price}</Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default SingleOrder;