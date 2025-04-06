import type { OdooData } from "~/server/domain/users/user.data";
import { User } from "~/server/domain/users/user.model";
import type { UserRepository } from "~/server/domain/users/user.repository";

export class UserOdooRepo implements UserRepository {
  constructor(private odooClient: { searchRead: (model: string, domain: unknown[], fields: string[]) => Promise<OdooData[]> }) {}

  async findAll(): Promise<User[]> {
    try {
      if (!this.odooClient || typeof (this.odooClient).searchRead !== "function") {
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
      // Fallback to mock data in case of error
      const MockResponse: OdooData[] = [
        {
          id: 1,
          name: "Salah",
          email: "sallah.mouradi19@gmail.com",
          phone: "123456789",
          username: "salah",
          password: "salah",
          active: true,
        },
      ];

      return MockResponse.map((data: OdooData) => {
        return User.fromOdooData(data);
      });
    }
  }
}
