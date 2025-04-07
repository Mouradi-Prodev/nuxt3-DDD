
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const userService = event.context.userService;
  if (!userService) {
    throw new Error("UserService not found in context");
  }
  return await userService.findAll();
});
