import { UserOdooRepo } from "../infrastructure/users/userOdooRepo";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const userRepository = new UserOdooRepo(event.context.odooClient);
    event.context.userRepository = userRepository;
  });
});
