import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';
import * as ReactBootStrap from 'react-bootstrap';
import { UserContext } from '../../App';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loggedInUser, setLoggedInUser] =useContext(UserContext)

    console.log(books)

    useEffect(() => {
        fetch('https://vast-ridge-55791.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBooks(data))
    },[])

    const handleAddProduct = (product) =>{
        setLoggedInUser(product)
        console.log(product);
    }

    return (
        <div className="container">
            <Container>
                <Row>
                {
                    books.map(book => <Product 
                        key={book._id}
                        handleAddProduct = {handleAddProduct}
                        book={book}
                        ></Product>)
                }
                </Row>
            </Container>
            {
                <ReactBootStrap.Spinner animation="border" />
            }
        </div>
    );
};

export default Home;