import { useLoaderData, useNavigate } from "react-router-dom";
import type { CardDetail } from "../lib/cardDetail.definition";

const CardDetailPage = () => {
  const card: CardDetail = useLoaderData() as CardDetail;
  const navigate = useNavigate();

  const cardDetails = [
    ["Rareté", card.rarity],
    ["Niveau", card.level_rank],
    ["Description", card.card_text],
    ["ATK", card.atk],
    ["DEF", card.def],
  ];

  const renderedDetails = cardDetails.map(([label, value]) => (
    <p key={card.image} className="mb-2">
      <strong>{label} :</strong> {value}
    </p>
  ));

  return (
    <div className="flex flex-col md:flex-row bg-gray-800 p-2 h-auto">
      <div className="w-full md:w-1/4 h-5/6 flex justify-center items-center mb-4 md:mb-0 overflow-hidden">
        <img
          src={card.image}
          alt={card.french_name}
          className="h-full w-auto object-contain rounded-lg shadow-lg"
        />
      </div>
      <div className="text-white ml-0 md:ml-4 border border-yellow-500 rounded-lg p-4 flex-1 relative flex flex-col">
        <h2 className="text-2xl font-bold">
          {card.french_name} ({card.english_name})
        </h2>
        <div>{renderedDetails}</div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute bottom-4 right-4 bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded hover:bg-yellow-400"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default CardDetailPage;
