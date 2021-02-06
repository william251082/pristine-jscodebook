import express from "express";

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // Make sure the storage file exists
    // If the file does not exist add in a default list of cells

    // Read the file
    // Parse a list of cells out of it
    // Send list of cells back to the browser
  });

  router.post('/cells', async () => {
    // Make sure the file exists
    // if not, create it

    // Take the list of cells from the object
    // serialize them
    // Write the cells into a file
  });

  return router;
};
