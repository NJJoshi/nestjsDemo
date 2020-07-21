import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        console.log(authCredentialsDto);
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin') 
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }
}
