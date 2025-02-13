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
  const cardId = Number.parseInt(req.query.cardId as string);
  if (Number.isNaN(cardId)) {
    res.status(400).json({ message: "ID de carte invalide." });
  }
  try {
    const cards = await itemRepository.getCardById(cardId);
    res.json(cards);
  } catch (error) {
    console.error("Error fetching card details:", error);
    next(error);
  }
};

const addCard: RequestHandler = async (req, res, next) => {
  try {
    const newCard = {
      image: req.body.image,
      french_name: req.body.french_name,
      english_name: req.body.english_name,
      rarity: req.body.rarity,
      level_rank: req.body.level_rank,
      card_text: req.body.card_text,
      atk: req.body.atk,
      def: req.body.def,
    };
    const insertId = await itemRepository.create(newCard);
    res.status(201).json({ insertId });
  } catch (error) {
    console.error("Error adding card:", error);
    next(error);
  }
};

const deleteCard: RequestHandler = async (req, res, next) => {
  const cardId = Number.parseInt(req.params.id);
  try {
    await itemRepository.delete(cardId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting card:", error);
    next(error);
  }
};

export default { browse, getDetails, addCard, deleteCard };
