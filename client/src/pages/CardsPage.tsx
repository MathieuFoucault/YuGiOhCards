import { Link, useLoaderData } from "react-router-dom";

type Card = {
  id: number;
  image: string;
};

const CardsPage = () => {
  const cards: Card[] = useLoaderData() as Card[];

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return null;
  };

  if (!Array.isArray(cards)) {
    return <p>Erreur: les données des cartes ne sont pas disponibles.</p>;
  }

  const isAdmin = () => {
    const role = getCookie("user_role");
    return role === "Admin";
  };

  const handleDelete = async (cardId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/items/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth_token")}`,
        },
      },
    );

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Erreur lors de la suppression de la carte");
    }
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="card bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <Link
                to={`/cards/${card.id}`}
                key={card.id}
                className="card bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={`Carte ${card.id}`}
                  className="w-full h-auto object-cover"
                />
              </Link>
              <div className="p-4">
                {isAdmin() && (
                  <button
                    type="button"
                    onClick={() => handleDelete(card.id)}
                    className="bg-gray-500 hover:bg-red-500 text-white rounded p-2"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Aucune carte à afficher.</p>
        )}
      </div>
      {isAdmin() && (
        <Link
          to="/cards/add"
          className="mt-4 inline-block bg-yellow-500 text-black rounded p-2"
        >
          Ajouter une carte
        </Link>
      )}
    </div>
  );
};

export default CardsPage;
