import AbstractSeeder from "./AbstractSeeder";

class CardSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "card", truncate: true });
  }

  async run() {
    const cardImages = [
      {
        image:
          "https://dracobalt.fr/wp-content/uploads/2021/08/Grand-Dragon-DOr-SDRL-FR001.jpg",
        french_name: "Grand Dragon d'Or",
        english_name: "Golden Dragon",
        rarity: "Ultra Rare",
        level_rank: 4,
        card_text:
          "Une fois par tour, cette carte en Position de Défense face recto ne peut pas être détruite au combat.",
        atk: 1800,
        def: 1500,
      },
    ];

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
