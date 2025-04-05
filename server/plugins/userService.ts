import { UserService } from "../domain/users/user.service";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const userService = new UserService(event.context.userRepository);
    event.context.userService = userService;
  });
});
