import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Admin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);

      const onSubmit = data => {
          const eventData = {
              bookName: data.bookName,
              authorName: data.authorName,
              price: data.price,
              imageURL: imageURL
          };
          const url =`http://localhost:5000/addBook`;
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
        console.log(event.target.files[0])
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
            <h2>this is admin page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <input name="bookName" type="text" placeholder="Enter Book Name" {...register("bookName")} />
            <br/>
            <input name="authorName" type="text" placeholder="Enter Author Name" {...register("authorName")} />
            <br/>
            <input name="price" type="number" placeholder="Enter Price" {...register("price")} />
            <br/>
            <input name="img" type="file" onChange={handleImageUpload} />
            <br/>
            <input type="submit" />
            </form>
        </div>
    );
};

export default Admin;