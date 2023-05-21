import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signin() {
        return {
            status: 200,
            message: "Login successfull"
        };
    }
}
