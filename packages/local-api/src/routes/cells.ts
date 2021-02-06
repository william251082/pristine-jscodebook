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
    try {
      // Read the file
      const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Add code to create a file and add default cells
      } else {
        throw err;
      }
    }

    // If read throws an error
    // Inspect the error, see if it says that the file doesn't exists

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
