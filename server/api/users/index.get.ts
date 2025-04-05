import type { UserService } from "~/server/domain/users/user.service";

import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const userService = event.context.userService as UserService;
  return await userService.findAll();
});
