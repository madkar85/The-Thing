export class UploadFile {

    public id: string;
    public animalId: string;
    public name: string;
    public url: any;

    constructor(data: Partial<UploadFile>) {
        Object.assign(this, data);
    }

    public static empty(): UploadFile {
        return new UploadFile({
            id: '',
            name: '',
            animalId: '',
            url: null,
        });
    }

}