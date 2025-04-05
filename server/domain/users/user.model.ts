import type { OdooData } from "./user.data";

export class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    active: boolean;
    create_date: Date;
    write_date: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        phone: string,
        username: string,
        password: string,
        active: boolean,
        create_date: Date,
        write_date: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.password = password;
        this.active = active;
        this.create_date = create_date;
        this.write_date = write_date;
    }
    static fromOdooData(data: OdooData): User {
        return new User(
            data.id,
            data.name,
            data.email,
            data.phone,
            data.username,
            data.password,
            data.active,
            new Date(data.create_date ? data.create_date : Date.now()),
            new Date(data.write_date ? data.write_date : Date.now())
        );
    }
    toOdooData(): OdooData {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            username: this.username,
            password: this.password,
            active: this.active,
            create_date: this.create_date,
            write_date: this.write_date
        };
    }
}