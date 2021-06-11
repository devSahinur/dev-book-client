import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import swal from 'sweetalert';

const AddProduct = ({ editProduct, updateProduct }) => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState("" || editProduct?.productImage);

    const onSubmit = data => {
        const productInfo = {
            productName: data.name,
            price: data.price,
            category: data.category,
            productImage: imageURL
        }
        if (!imageURL) {
            return swal("Image is uploading...", "Please wait some seconds!", "info")
        }
        if (editProduct?._id) {
            return updateProduct(productInfo)
        }
        axios.post('https://electro-server.herokuapp.com/addProduct', productInfo)
            .then(response => response.data && swal("Successfully Added", "Your product is successfully added!", "success"))
            .catch(error => console.log(error));
    }

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '08d5da1c81cc5c52012f0b930505d031');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                setImageURL(response.data.data.display_url);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 mx-md-5 mt-5 bg-white" style={{ borderRadius: "15px" }}>
                    <Form.Row>
                        <Form.Group as={Col} md={6} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Product Name</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                name="name"
                                type="text"
                                defaultValue={editProduct?.productName}
                                ref={register}
                                placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight: "bold" }}>Category</Form.Label>
                            <Form.Control className="shadow-none"
                                name="category"
                                type="text"
                                defaultValue={editProduct?.category}
                                ref={register}
                                placeholder="Enter Category" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight: "bold" }}>Add Price</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                name="price"
                                type="text"
                                defaultValue={editProduct?.price}
                                ref={register}
                                placeholder="Enter Price" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight: "bold" }}>Add Photo</Form.Label>
                            {editProduct?._id ?
                                <Button
                                    as={"label"}
                                    htmlFor="upload"
                                    variant="outline-success"
                                    className="d-block px-2 upload-btn"
                                    style={{ maxWidth: "220px" }}>
                                    <AiOutlineCloudUpload style={{ fontSize: "1.5rem" }} /> Upload New Photo
                                </Button>
                                :
                                <Button
                                    as={"label"}
                                    htmlFor="upload"
                                    variant="outline-info"
                                    className="d-block px-3 upload-btn">
                                    <AiOutlineCloudUpload style={{ fontSize: "1.5rem" }} /> Upload Photo
                                </Button>}
                            <Form.Control
                                hidden="hidden"
                                id="upload"
                                name="photo"
                                type="file"
                                ref={register}
                                onChange={handleImageUpload}
                                placeholder="Upload photo" />
                        </Form.Group>
                    </Form.Row>
                </div>

                <div className="text-right mr-5 mt-4">
                    <Button type="submit" variant={editProduct?._id ? "success" : "info"} className="shadow-none">
                        {editProduct?._id ? "Update" : "Save"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProduct;