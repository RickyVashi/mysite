const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Define a route to get all documents from the collection
router.get('/books', async (req, res) => {
    try {
      // Fetch only the first 20 documents from the collection
      const books = await Book.find().limit(20);
      res.json(books);
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Define a route to handle sorting based on column name and order
router.get('/books/sort/:columnName/:order', async (req, res) => {
  console.log("yes");
  const { columnName, order } = req.params;

  try {
    let sortQuery = {};
    sortQuery[columnName] = order;

    // Find books and sort based on the given column name and order
    const books = await Book.find().collation({ locale: 'en' }).sort(sortQuery).limit(20);
    res.json(books);
  } catch (error) {
    console.error('Error occurred while sorting books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
