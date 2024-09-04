import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Add = ()=>{
    const [book,setBook] = useState({
      title:"",
      descption:"",
      price: null,
      cover_image:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e => {
     e.preventDefault()
     try{
      await axios.post("http://localhost:8080/books",book);
      navigate("/")
     }catch(err){
       console.log(err)
     }
    }
    console.log(book)
  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="descption"
        onChange={handleChange}
        name="descption"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover_image"
        onChange={handleChange}
        name="cover_image"
      />
      <button className="btn" onClick={handleClick}>Add</button>
    </div>
  );
}
export default Add;