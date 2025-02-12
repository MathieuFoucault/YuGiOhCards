import cardImages from "../CardSeederData";
import AbstractSeeder from "./AbstractSeeder";

class CardSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "card", truncate: true });
  }

  async run() {
    for (let i = 0; i < cardImages.length; i += 1) {
      const fakeCard = {
        image: cardImages[i].image,
        french_name: cardImages[i].french_name,
        english_name: cardImages[i].english_name,
        rarity: cardImages[i].rarity,
        level_rank: cardImages[i].level_rank,
        card_text: cardImages[i].card_text,
        atk: cardImages[i].atk,
        def: cardImages[i].def,
      };

      await this.insert(fakeCard);
    }
  }
}

export default CardSeeder;
