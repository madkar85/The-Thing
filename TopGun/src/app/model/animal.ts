export class Animal {

    public id: number;
    public dateOfBirth: Date;
    public type: string;
    public name: string;
    public breed: string;
    public gender: string;
    public size: string;
    public description: string;
    public photo: string|any ;
    public ownerId: number;
    public ownerSocialSecurityNumber: string;
    public certificate: string|any ;

    constructor(data: Partial<Animal>) {
        Object.assign(this, data);
    }

    public static empty(): Animal {
        return new Animal({
            id: 0,
            dateOfBirth: new Date(),
            type: '',
            name: '',
            breed: '',
            gender: '',
            size: '',
            description: '',
            photo: null,
            ownerId: 0,
            ownerSocialSecurityNumber: '',
            certificate: null,
        });
    }

}
