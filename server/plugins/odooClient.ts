export class OdooClient {
  async searchRead(model: string, _domain: unknown[], _fields: string[]) {
    console.log(`Mock OdooClient: Fetching ${model} }`);

    if (model === "res.users") {
      return [
        {
          id: 1,
          name: "Salah",
          email: "sallah.mouradi19@gmail.com",
          phone: "123456789",
          username: "salah",
          password: "salah",
          active: true,
          create_date: "2023-01-01",
          write_date: "2023-01-01",
        },
        {
          id: 2,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "987654321",
          username: "john",
          password: "password",
          active: true,
          create_date: "2023-02-15",
          write_date: "2023-02-15",
        },
      ];
    }
    return [];
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    event.context.odooClient = new OdooClient();
  });
});
