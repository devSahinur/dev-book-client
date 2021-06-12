import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import Footer from '../Footer/Footer';
import { UserContext } from '../../App';

const CheckOut = () => {
    const { loggedInUser } = useContext(UserContext);
    const { cart } = useContext(UserContext);

    const handleCheckout = () => {
        const oderDetails = { ...loggedInUser, product: cart, orderTime: new Date() };

        axios.post('https://dev-books-server.herokuapp.com/addOrder', oderDetails)
            .then(response => {
                response.data && swal("Order placed successfully", "Your order placed successfully!", "success");
            })
            .catch(error => console.log(error));
    }

    return (
        <Container>
            <h2>Checkout</h2>
            <div className="shadow px-4 pt-4 my-4" style={{ borderRadius: "15px" }}>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{cart.productName}</td>
                            <td>1</td>
                            <td>${cart.price}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td>${cart.price}</td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
            <div className="text-right">
                <Button onClick={handleCheckout} className="checkout-btn shadow-none">Checkout</Button>
            </div>
            <Footer/>
        </Container>
    );
};

export default CheckOut;