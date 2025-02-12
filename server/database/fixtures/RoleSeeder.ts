import AbstractSeeder from "./AbstractSeeder";

class RoleSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "role", truncate: true });
  }

  async run() {
    const roles = ["User", "Admin"];
    for (let i = 0; i < roles.length; i++) {
      const fakeRole = {
        name: roles[i],
      };

      this.insert(fakeRole);
    }
  }
}

export default RoleSeeder;
