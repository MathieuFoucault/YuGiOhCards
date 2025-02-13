import type { RequestHandler } from "express";
import itemRepository from "./itemRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cards = await itemRepository.getAllCards();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    next(error);
  }
};

const getDetails: RequestHandler = async (req, res, next) => {
  try {
    const cardId = Number.parseInt(req.query.cardId as string);
    const cards = await itemRepository.getCardById(cardId);
    res.json(cards);
  } catch (error) {
    console.error("Error fetching card details:", error);
    next(error);
  }
};

export default { browse, getDetails };
