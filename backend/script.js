import express from "express";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { int, varchar, mysqlTable } from "drizzle-orm/mysql-core";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

// Setup MySQL connection using mysql2
const connection = await mysql.createConnection({
  host: "localhost",
  user: "Praisejah",
  password: "password",
  database: "library_db",
});

// Initialize Drizzle ORM with the connection
const db = drizzle(connection);

// Schema definition
const book = mysqlTable("book", {
  book_id: int("book_id").primaryKey().autoincrement().notNull(),
  title: varchar("title", { length: 45 }).notNull(),
  descption: varchar("descption", { length: 255 }).notNull(),
  cover_image: varchar("cover_image", { length: 25 }),
  price: int("price").notNull(),
});

app.use(express.json());
app.use(cors());

// Basic root endpoint
app.get("/", (req, res) => {
  res.json("this is the backend");
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const result = await db.select().from(book);
    if (!Array.isArray(result)) {
      return res.status(500).json({ error: "Unexpected data format" });
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a book
app.post("/books", async (req, res) => {
  try {
    await db
      .insert(book)
      .values({
        title: req.body.title,
        descption: req.body.descption,
        price: req.body.price,
        cover_image: req.body.cover_image,
      })
      .$returningId();
    return res.json("Book has been created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a book by id
app.delete("/books/:book_id", async (req, res) => {
  const bookId = req.params.book_id;
  try {
    await db.delete(book).where(eq(book.book_id, bookId));
    return res.json("Book has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update a book by id using Drizzle ORM
app.put("/books/:book_id", async (req, res) => {
  const bookId = req.params.book_id;
  try {
    await db
      .update(book)
      .set({
        title: req.body.title,
        descption: req.body.descption,
        price: req.body.price,
        cover_image: req.body.cover_image,
      })
      .where(eq(book.book_id, bookId));
    return res.json("Book has been updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Start the server
app.listen(8080, () => {
  console.log("connected to backend");
});
