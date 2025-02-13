import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    french_name: "",
    english_name: "",
    rarity: "",
    level_rank: 0,
    card_text: "",
    atk: 0,
    def: 0,
  });

  const navigate = useNavigate();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("auth_token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/cards");
    } else {
      console.error("Erreur lors de l'ajout de la carte");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white">
      <h2>Ajouter une carte</h2>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="french_name"
        placeholder="Nom français"
        value={formData.french_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="english_name"
        placeholder="Nom anglais"
        value={formData.english_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rarity"
        placeholder="Rareté"
        value={formData.rarity}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="level_rank"
        placeholder="Niveau de classement"
        value={formData.level_rank}
        onChange={handleChange}
        required
      />
      <textarea
        name="card_text"
        placeholder="Texte de la carte"
        value={formData.card_text}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="atk"
        placeholder="ATK"
        value={formData.atk}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="def"
        placeholder="DEF"
        value={formData.def}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-yellow-500 text-black rounded p-2">
        Ajouter
      </button>
    </form>
  );
};

export default CardForm;
