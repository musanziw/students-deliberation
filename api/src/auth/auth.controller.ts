import {Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    login() {
        return this.authService.signin();
    }

}
