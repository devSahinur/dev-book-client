import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './CheckOut.css'

const CheckOut = () => {
    const {checkoutKey} = useParams();
    const [book , setBooks] =useState([])
    const [loggedInUser] =useContext(UserContext);

    const orders = book.find(pd=> pd._id === checkoutKey);

    useEffect(() => {
        fetch('https://vast-ridge-55791.herokuapp.com/books')
        .then(res => res.json()) 
        .then(data => setBooks(data))
    },[])
    const email = loggedInUser.email;
    const handleCheckOutConform =() => {
        const checkOutBook = {email, orders}
        console.log(checkOutBook)
        fetch('https://vast-ridge-55791.herokuapp.com/addOrder',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkOutBook)
        })
        .then(res => {
            console.log('Server side response', res)
            alert('Thanks For Your Order')
        })
    }


    return (
        <div className="container">
            <table className="table costom-table table-borderless">
                <thead>
                    <tr className="table-titles">
                        <th>Book Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orders?.bookName}</td>
                        <td>{1}</td>
                        <td>${orders?.price}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>${orders?.price}</td>
                    </tr>
                        
                </tbody>
            </table>
            <button onClick={handleCheckOutConform} className="CheckOut">CheckOut</button>
        </div>
    );
};

export default CheckOut;