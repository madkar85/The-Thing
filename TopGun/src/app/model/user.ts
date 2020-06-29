import { Address } from './address';

export class User {
    public id: number;
    public socialSecurityNumber: string;
    public name: string;
    public givenName: string;
    public surname: string;
    public email: string;
    public password: string;
    public phoneNumber: string;
    public mobilePhoneNumber: string;
    public agreeMarketing: boolean;
    public subscribeToEmailNotification: boolean;
    public address: Address | null;

}
