import type { Request, Response } from "express";
import itemRepository from "./itemRepository";

const itemActions = {
  browse: async (req: Request, res: Response) => {
    try {
      const cards = await itemRepository.getAllCards();
      res.json(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default itemActions;
