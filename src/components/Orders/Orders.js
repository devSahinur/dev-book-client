import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MoonLoader from "react-spinners/MoonLoader";
import { UserContext } from '../../App';
import OrderList from '../OrderList/OrderList';

const loaderStyle = `
  display: block;
  margin: auto;
`;

const Orders = () => {
    const { loggedInUser } = useContext(UserContext);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://electro-server.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(response => {
                setOrderDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [loggedInUser.email])

    const { _id, orderTime } = orderDetails.length && orderDetails[0];
    const totalPrice = orderDetails.length && orderDetails.reduce((total, order) => total + Number(order.product?.price), 0);

    return (
        <Container>
            {loading ? <MoonLoader loading={loading} css={loaderStyle} size={60} /> : (
                orderDetails.length ?
                    <>
                        <h1 className="text-center" style={{ fontSize: '2rem' }}>Thanks for your order</h1>
                        <h6 className="text-center mb-5">Your Order is being processed</h6>
                        <h5>Order List</h5>
                        <Row>
                            {
                                orderDetails.map(order => <OrderList key={order._Id} order={order} />)
                            }
                        </Row>
                        <hr />
                        <h5>Order Details</h5>
                        <Row>
                            <Col xs={6}>
                                <ul type="none" style={{ fontWeight: "600" }}>
                                    <li>Order number:</li>
                                    <li>Order date:</li>
                                    <li>Price:</li>
                                    <li>Shipping:</li>
                                    <li>Total Price:</li>
                                </ul>
                            </Col>
                            <Col xs={6}>
                                <ul type="none">
                                    <li>#{_id?.slice(0, 8)}</li>
                                    <li>{(new Date(orderTime).toDateString('dd/MM/yyyy'))}</li>
                                    <li>${totalPrice}</li>
                                    <li>$30</li>
                                    <li>${30 + totalPrice}</li>
                                </ul>
                            </Col>
                        </Row>
                        <hr />
                    </> : (
                        <>
                            <h1 className="text-center" style={{ fontSize: '2rem' }}>You haven't ordered anything yet!</h1>
                        </>
                    )
            )}
        </Container>
    );
};

export default Orders;