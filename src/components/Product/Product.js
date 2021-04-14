import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({book, handleAddProduct}) => {
    return (
        <Col sm={4}>
             <Card className="product-container">
                 <div className="product-img">
                     <Card.Img variant="top" src={book.imageURL} />
                 </div>
                <Card.Body>
                    <Card.Title>{book.bookName}</Card.Title>
                    <Card.Text>By {book.authorName}</Card.Text>
                    <div className="card-bottom">
                        <h2>${book.price}</h2>
                        <Link to={"/product/"+book._id}><button onClick={() => handleAddProduct(book)}>Buy Now</button></Link>
                    </div>
                </Card.Body>
            </Card>
         </Col>
    );
};

export default Product;