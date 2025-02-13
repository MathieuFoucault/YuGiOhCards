import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AddCardFormProps = {
  onClose: () => void;
};

const AddCardForm = ({ onClose }: AddCardFormProps) => {
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
      onClose();
      navigate("/cards");
    } else {
      console.error("Erreur lors de l'ajout de la carte");
    }
  };

  const formFields = [
    { name: "image", type: "text", placeholder: "Image URL" },
    { name: "french_name", type: "text", placeholder: "Nom français" },
    { name: "english_name", type: "text", placeholder: "Nom anglais" },
    { name: "rarity", type: "text", placeholder: "Rareté" },
    { name: "level_rank", type: "number", placeholder: "Niveau de classement" },
    { name: "card_text", type: "textarea", placeholder: "Texte de la carte" },
    { name: "atk", type: "number", placeholder: "ATK" },
    { name: "def", type: "number", placeholder: "DEF" },
  ];

  const renderFormFields = () => {
    return formFields.map((field) => {
      if (field.type === "textarea") {
        return (
          <textarea
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
        );
      }
      return (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name as keyof typeof formData]}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
        />
      );
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <section className="py-4 m-10 rounded-md mt-20 bg-gray-800 w-10/12">
        <article className="max-w-md mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mt-4 mb-5">
              Ajouter une carte
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
            <button
              type="submit"
              className="bg-yellow-500 text-black rounded-md p-2 w-full"
            >
              Ajouter
            </button>
          </form>
        </article>
      </section>
    </section>
  );
};

export default AddCardForm;
