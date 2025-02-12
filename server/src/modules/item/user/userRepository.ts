import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
  role_id: number;
};

class UserRepository {
  async create(user: Omit<UserType, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, hashed_password, role_id) VALUES (?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashed_password,
        user.role_id,
      ],
    );
    return result.insertId;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    return rows[0] as UserType;
  }
  async getRoleByLabel(name: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM role WHERE name = ?",
      [name],
    );

    return rows[0];
  }
}

export default new UserRepository();
