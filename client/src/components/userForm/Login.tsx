import { useForm } from "react-hook-form";
import type { UserFormData } from "../../lib/userForm.definitions";

type UserLoginType = {
  onSubmit: (data: UserFormData) => void;
};

function Login({ onSubmit }: UserLoginType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-6">
        <label htmlFor="email">
          <input
            {...register("email", {
              required: "Le champ est requis",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Adresse email invalide",
              },
            })}
            type="email"
            id="email"
            placeholder="Adresse mail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-center placeholder-gray-400 italic"
          />
          {typeof errors.email?.message === "string" && (
            <span className="text-red-300">{errors.email.message}</span>
          )}
        </label>
      </section>
      <section className="mt-4">
        <label htmlFor="password">
          <input
            {...register("password", {
              required: "Le champ est requis",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s:])[^\s]{12,30}$/,
                message:
                  "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
              },
              minLength: {
                value: 12,
                message: "Le mot de passe doit contenir au moins 12 caractères",
              },
              maxLength: {
                value: 30,
                message:
                  "Le mot de passe ne peut pas contenir plus de 30 caractères",
              },
            })}
            type="password"
            id="password"
            placeholder="Mot de passe"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  text-center placeholder-gray-400 italic"
          />
          {typeof errors.password?.message === "string" && (
            <span className="text-red-300">{errors.password.message}</span>
          )}
        </label>
      </section>
      <section className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Valider
        </button>
      </section>
    </form>
  );
}

export default Login;
