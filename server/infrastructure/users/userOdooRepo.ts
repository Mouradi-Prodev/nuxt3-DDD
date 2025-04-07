import type { OdooData } from "~/server/domain/users/user.data";
import { User } from "~/server/domain/users/user.model";
import type { UserRepository } from "~/server/domain/users/user.repository";

export class UserOdooRepo implements UserRepository {
  constructor(
    private odooClient: {
      searchRead: (
        model: string,
        domain: unknown[],
        fields: string[]
      ) => Promise<OdooData[]>;
    }
  ) {}

  async findAll(): Promise<User[]> {
    try {
      if (
        !this.odooClient ||
        typeof this.odooClient.searchRead !== "function"
      ) {
        throw new Error("Invalid Odoo client or missing searchRead method");
      }
      const response = await this.odooClient.searchRead(
        "res.users",
        [],
        ["name", "email", "phone", "username", "password", "active"]
      );

      return response.map((data: OdooData) => {
        return User.fromOdooData(data);
      });
    } catch (error) {
      console.error("Error fetching users from Odoo:", error);
      throw new Error("Failed to fetch users from Odoo");
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      if (
        !this.odooClient ||
        typeof this.odooClient.searchRead !== "function"
      ) {
        throw new Error("Invalid Odoo client or missing searchRead method");
      }
      const response = await this.odooClient.searchRead(
        "res.users",
        [["id", "=", id]],
        ["name", "email", "phone", "username", "password", "active"]
      );

      if (response.length === 0) {
        return null;
      }

      return User.fromOdooData(response[0]);
    } catch (error) {
      console.error(`Error fetching user with id ${id} from Odoo:`, error);
      throw new Error(`Failed to fetch user with id ${id} from Odoo`);
    }
  }
}
