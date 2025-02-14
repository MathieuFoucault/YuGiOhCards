import { useForm } from "react-hook-form";

import type { UserFormData } from "../../lib/userForm.definitions";

type UserFormRegisterType = {
  onSubmit: (data: UserFormData) => void;
};

function UserFormRegister({ onSubmit }: UserFormRegisterType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormData>();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 w-96 max-w-lg p-8 rounded-lg shadow-lg bg-gray-800"
      >
        <section className="mb-3">
          <label
            htmlFor="lastName"
            className="block text-sm  text-white font-semibold"
          >
            Nom :
            <input
              placeholder="Nom de famille"
              {...register("lastname", {
                required: "Le champ est requis",
                minLength: {
                  value: 2,
                  message: "Le champ doit au moins contenir 2 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le champ ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="text"
              id="lastName"
              className="mt-2 p-2 block w-full rounded-md text-black border-gray-300 h-7"
            />
            {typeof errors.lastname?.message === "string" && (
              <span className="text-red-300">{errors.lastname.message}</span>
            )}
          </label>
        </section>
        <section className="mb-3">
          <label
            htmlFor="firstName"
            className="block text-sm  text-white font-semibold"
          >
            Prénom :
            <input
              placeholder="Prénom"
              {...register("firstname", {
                required: "Le champ est requis",
                minLength: {
                  value: 2,
                  message: "Le champ doit au moins contenir 2 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le champ ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="text"
              id="firstName"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.firstname?.message === "string" && (
              <span className="text-red-300">{errors.firstname.message}</span>
            )}
          </label>
        </section>
        <section className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm  text-white font-semibold"
          >
            Adresse Mail :
            <input
              placeholder="pierre.martin@gmail.com"
              {...register("email", {
                required: "Le champ est requis",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Adresse email invalide",
                },
              })}
              className="mt-2  p-2 block w-full rounded-md  text-black border-gray-300 h-7"
              type="email"
              id="email"
            />
            {typeof errors.email?.message === "string" && (
              <span className="text-red-300">{errors.email.message}</span>
            )}
          </label>
        </section>

        <section className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm  text-white font-semibold"
          >
            Mot de passe :
            <input
              placeholder="••••••••••••"
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
                  message:
                    "Le mot de passe doit contenir au moins 12 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le mot de passe ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="password"
              id="password"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.password?.message === "string" && (
              <span className="text-red-300">{errors.password.message}</span>
            )}
          </label>
        </section>
        <section className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm  text-white font-semibold"
          >
            Confirmez votre mot de passe :
            <input
              placeholder="••••••••••••"
              {...register("confirmPassword", {
                required: "Le champ est requis",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Les mots de passe ne correspondent pas";
                  }
                },
              })}
              type="password"
              id="confirmPassword"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.confirmPassword?.message === "string" && (
              <span className="text-red-300">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </section>
        <button
          type="submit"
          className="px-4 py-2 rounded mt-5 btn-submit bg-yellow-500 hover:bg-orange-600"
        >
          Créer un compte
        </button>
      </form>
    </>
  );
}

export default UserFormRegister;
