import express from "express";
import mysql from "mysql2/promise";
import cors from 'cors';

const app = express();

const db = await mysql.createConnection({
  host: "localhost",
  user: "Praisejah",
  password: "password",
  database: "library_db",
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_passwordBY 'password';
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("this is the backend");
}),


 
  app.get("/books", async (req,res)=>{
    const q = "SELECT * FROM library_db.book"

    try{
     const [result,info] = await db.query(q)
     return res.json(result);
    }catch (error) {
      res.json(error)
    }
  })

app.post("/books", async (req,res)=> {
  const q = "INSERT INTO book (`title`,`descption`,`cover_image`)VALUES(?)";
  const values = [
    req.body.title,
    req.body.descption,
    req.body.cover_image,
  ];

  try{
    const [result, info] = await db.query(q,[values]);
    return res.json("book has been created successfully");
  }catch (error){
    res.json(error)
  }
})

app.listen(8080, () => {
  console.log("connected to backend");
});
