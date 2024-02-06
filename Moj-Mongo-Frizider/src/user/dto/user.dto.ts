export class CreateUserDto {
    name: string;
    password: string;
    email: string;
    isChef?: boolean;
}

export class LogUserDto {
    email: string;
    password: string;
}

export class UpdateUserDto {
    name?: string;
    password?: string;
    email?: string;
}
