import db from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Card = {
  id: number;
  image: string;
  french_name: string;
  english_name: string;
  rarity: string;
  level_rank: number;
  card_text: string;
  atk: number;
  def: number;
};

class ItemRepository {
  async getAllCards(): Promise<Card[]> {
    const [rows] = await db.query<Rows>("SELECT * FROM card");
    return rows as Card[];
  }

  async getCardById(id: number): Promise<Card | undefined> {
    const [rows] = await db.query<Rows>("SELECT * FROM card WHERE id = ?", [
      id,
    ]);
    return rows[0] as Card;
  }

  async create(card: Omit<Card, "id">) {
    const [result] = await db.query<Result>(
      "INSERT INTO card (image, french_name, english_name, rarity, level_rank, card_text, atk, def) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        card.image,
        card.french_name,
        card.english_name,
        card.rarity,
        card.level_rank,
        card.card_text,
        card.atk,
        card.def,
      ],
    );
    return result.insertId;
  }

  async delete(id: number) {
    await db.query("DELETE FROM card WHERE id = ?", [id]);
  }
}

export default new ItemRepository();
