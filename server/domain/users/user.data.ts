export interface OdooData {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    active: boolean;
    create_date?: Date;
    write_date?: Date;
}