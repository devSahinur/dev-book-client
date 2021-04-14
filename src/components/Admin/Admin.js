import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ManageBook from '../ManageBook/ManageBook';
import './Admin.css'

const Admin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [post, setPost] = useState(false);

      const onSubmit = data => {
          const eventData = {
              bookName: data.bookName,
              authorName: data.authorName,
              price: data.price,
              imageURL: imageURL
          };
          const url =`https://vast-ridge-55791.herokuapp.com/addBook`;
          console.log(eventData);
          fetch(url,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(eventData)
          })
          .then(res => console.log('Server side response', res))
      };

      
      // This Code image link generator Start
      const handleImageUpload = event => {
        // console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '701a71fc100ddc2599c9438b268fee30')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // This Code image link generator

    return (
        <div className="container">
              <div className="toggle-btn-menu mx-auto">
                  {post ? <button onClick={() => setPost(!post)}>Add Book Post</button> : <button onClick={() => setPost(!post)}>Manage books</button>}
                </div>
            {
                post ? <ManageBook></ManageBook> : <form className="form-admin"  onSubmit={handleSubmit(onSubmit)} >
    
                <h1 className="addTitle mx-auto"><strong>Dev Book</strong> Post</h1>
                <div className="form-group">
                  <label for="title">Book <span>Name</span></label>
                  <input type="text" placeholder="Enter Book Name" {...register("bookName")} name="bookName" id="title" className="form-controll"/>
                </div>
                <div className="form-group">
                  <label for="caption">Author <span>Name</span></label>
                  <input type="text" placeholder="Enter Author Name" {...register("authorName")} name="authorName" id="caption" className="form-controll"/>
                </div>
                <div className="form-group">
                  <label for="caption">Book <span>Price</span></label>
                  <input type="number" placeholder="Enter Price" {...register("price")} name="price" id="caption" className="form-controll"/>
                </div>
                <div className="form-group">
                      <label for="images">Book <span>images</span></label>
                      <input className="form-controll" name="img" type="file" onChange={handleImageUpload} />
                </div>
                <div className="post-btn form-group">
                  <button type="submit">Post</button>
                </div>
                
              </form>

            }
        </div>
    );
};

export default Admin;