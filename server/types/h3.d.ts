import type { UserRepository } from "../domain/users/user.repository";
import type { UserService } from "../domain/users/user.service";
import type { OdooClient } from "../plugins/odooClient";

declare module 'h3' {
    interface H3EventContext {
        odooClient: OdooClient;
        userRepository: UserRepository;
        userService: UserService;
    }
}

export {};