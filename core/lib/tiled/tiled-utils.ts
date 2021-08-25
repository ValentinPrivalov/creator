import {ITransformedParams, ITile, ITiledEntity, ITiledProperty} from "./tiled-interfaces";

export class TiledUtils {
    static getPropertyValue(obj: ITiledEntity, name: string): any {
        return obj.properties?.find((property: ITiledProperty) =>
            property.name === name)?.value;
    }

    static checkTransformedGID(gid: number, tiles: Array<ITile>): ITransformedParams {
        const FLIPPED_HORIZONTALLY_FLAG: number = 0x80000000;
        const FLIPPED_HORIZONTALLY_ROTATED_INCREASE_FLAG: number = 0x20000000;
        const FLIPPED_HORIZONTALLY_ROTATED_DECREASE_FLAG: number = 0xe0000000;
        const FLIPPED_VERTICALLY_FLAG: number = 0x40000000;
        const FLIPPED_DIAGONALLY_FLAG: number = 0xc0000000;
        const ROTATED_INCREASE_FLAG: number = 0xa0000000;
        const ROTATED_DECREASE_FLAG: number = 0x60000000;
        let scaleX: number = 1;
        let scaleY: number = 1;
        let rotation: number = 0;

        if (gid > tiles.length) {
            let transformedGID: number;

            transformedGID = gid - FLIPPED_HORIZONTALLY_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                scaleX = -1;
            }

            transformedGID = gid - FLIPPED_HORIZONTALLY_ROTATED_INCREASE_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                scaleX = -1;
                rotation = -90;
            }

            transformedGID = gid - FLIPPED_HORIZONTALLY_ROTATED_DECREASE_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                scaleX = -1;
                rotation = 90;
            }

            transformedGID = gid - FLIPPED_VERTICALLY_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                scaleY = -1;
            }

            transformedGID = gid - FLIPPED_DIAGONALLY_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                scaleX = -1;
                scaleY = -1;
            }

            transformedGID = gid - ROTATED_INCREASE_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                rotation = 90;
            }

            transformedGID = gid - ROTATED_DECREASE_FLAG;
            if (transformedGID < tiles.length && transformedGID > 0) {
                gid = transformedGID;
                rotation = -90;
            }
        }

        return {gid, scaleX, scaleY, rotation} as ITransformedParams;
    }
}
