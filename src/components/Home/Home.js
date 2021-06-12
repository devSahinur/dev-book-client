import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import HashLoader from "react-spinners/HashLoader";
import Footer from '../Footer/Footer';
import Product from '../Product/Product';

const loaderStyle = `
  display: block;
  margin: auto;
`;

const Home = () => {
    const { register, handleSubmit } = useForm();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://dev-books-server.herokuapp.com/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const onSubmit = data => {
        setLoading(true);
        axios.get(`https://dev-books-server.herokuapp.com/search?keyword=${data.keyword}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container>
            <form className="search-box" onSubmit={handleSubmit(onSubmit)}>
                <input name="keyword" type="text" ref={register} className="search-input" placeholder="Search" />
                <button className="search-btn btn-grad">Search</button>
            </form>
            <HashLoader loading={loading} css={loaderStyle} color={"#4A75E6"} size={115} />
            <Row xs={1} md={2} lg={3} className="g-4 my-5">
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </Row>
            {!loading && <Footer />}
        </Container>
    );
};

export default Home;

