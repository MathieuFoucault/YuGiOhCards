import db from "../../../database/client";
import type { Rows } from "../../../database/client";

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
}

export default new ItemRepository();
