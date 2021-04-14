import React, { useEffect, useState } from 'react';
import SingleManage from '../SingleManage/SingleManage';
import './ManageBook.css';

const ManageBook = () => {
    const [allBook, setAllBook] =useState([])
    useEffect(() => {
        fetch('https://vast-ridge-55791.herokuapp.com/books')
        .then(res => res.json()) 
        .then(data => setAllBook(data))
    },[])
    return (
        <div>
            <table className="table costom-tablee table-borderless">
                <thead>
                    <tr className="table-title">
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allBook.map(book => <SingleManage key={book._id} book={book}></SingleManage>)
                    }
                    
                </tbody>
            </table>
        </div>
    );
};

export default ManageBook;