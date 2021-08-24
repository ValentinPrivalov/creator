import {ITiledEntity, ITiledProperty} from "./tiled-interfaces";

export class TiledUtils {
    static getPropertyValue(obj: ITiledEntity, name: string): any {
        return obj.properties?.find((property: ITiledProperty) =>
            property.name === name)?.value;
    }
}
