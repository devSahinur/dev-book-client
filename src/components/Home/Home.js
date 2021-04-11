import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';

const Home = () => {
    const [books, setBooks] = useState([]);
    console.log(books)

    useEffect(() => {
        fetch('https://vast-ridge-55791.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBooks(data))
    },[])

    return (
        <div className="container">
            <Container>
                <Row>
                {
                    
                    books.map(book => <Product 
                        key={book._id}
                        book={book}
                        ></Product>)
                }
                </Row>
            </Container>
        </div>
    );
};

export default Home;