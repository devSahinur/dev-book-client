import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../App';
import SingleOrder from '../SingleOrder/SingleOrder';

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

const Orders = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([])
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    const totalOrders = orders.filter(user => user.email == loggedInUser.email);
    console.log(totalOrders);

    useEffect(() => {
        fetch('https://vast-ridge-55791.herokuapp.com/orders')
        .then(res => res.json()) 
        .then(data => setOrders(data))
    },[])
    return (
        <div>
          {
            totalOrders.map(pd =><SingleOrder key={pd._id} order={pd} ></SingleOrder>)
          }
        </div>
    );
};

export default Orders;