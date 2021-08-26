import { TypeOfLike } from "./type-of-like";

export class Like {
    public id: number;
    public UserId: number;
    public ObjectId: number;
    public Type : TypeOfLike;
    public Active : boolean;

    constructor(data: Partial<Like>) {
        Object.assign(this, data);
    }

    public static empty(): Like {
        return new Like({
            id: 0,
            UserId: 0,
            ObjectId: 0,
            Type: 0,
            Active: true,
        });
    }

}
