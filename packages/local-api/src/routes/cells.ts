import express from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    // Make sure the storage file exists
    // If the file does not exist add in a default list of cells

    // Read the file
    // Parse a list of cells out of it
    // Send list of cells back to the browser
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the object
    // serialize them
    const {cells}: {cells: Cell[]} = req.body;

    // Write the cells into a file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({status: 'ok'});
  });

  return router;
};
