import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const SingleManage = (book) => {
    const {authorName, bookName, price, _id} = book.book;
    const deleteSinglePost =(id) => {
        fetch(`https://vast-ridge-55791.herokuapp.com/post/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            alert('deleted successfully')
        })

    }
    return (
        <tr>
            <td>{bookName}</td>
            <td>{authorName}</td>
            <td>${price}</td>
            <td><EditIcon /><button onClick={() =>deleteSinglePost(_id)}>< DeleteIcon /></button></td>
        </tr>
    );
};

export default SingleManage;