import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ChangeUserDto {
    @IsNotEmpty()
    name : string ;
    
    @IsNotEmpty()
    age : number ;
        
    @IsNotEmpty()
    role : "customer" | "admin" ;

    @IsEmail()
    email : string ;

    @MinLength(8)
    password : string ;
}