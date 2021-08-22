export class MapMarker {
    id: number;
    Longitud: number;
    Latitud: number;
    Name: string;
    Description: string;

    constructor(data: Partial<MapMarker>) {
        Object.assign(this, data);
    }

    public static empty(): MapMarker {
        return new MapMarker({
            id: 0,
            Longitud: 0,
            Latitud: 0,
            Name: '',
            Description: '',
        });
    }

}
