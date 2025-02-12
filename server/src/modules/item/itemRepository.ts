import db from "../../../database/client";

const itemRepository = {
  getAllCards: async () => {
    const [rows] = await db.query("SELECT * FROM card");
    return rows;
  },
};

export default itemRepository;
