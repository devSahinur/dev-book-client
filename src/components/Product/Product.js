import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './Product.css';

const Product = ({book}) => {
console.log(book);
    return (
        <Col sm={4}>
             <Card className="product-container">
                 <div className="product-img">
                     <Card.Img variant="top" src={book.imageURL} />
                 </div>
                <Card.Body>
                    <Card.Title>{book.bookName}</Card.Title>
                    <Card.Text>{book.authorName}</Card.Text>
                    <div className="card-bottom">
                        <h2>${book.price}</h2>
                        <button>Buy Now</button>
                    </div>
                </Card.Body>
            </Card>
         </Col>
    );
};

export default Product;