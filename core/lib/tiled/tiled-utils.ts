import {ITransformedParams, ITile, ITiledEntity, ITiledProperty} from "./tiled-interfaces";

export class TiledUtils {
    static getPropertyValue(obj: ITiledEntity, name: string): any {
        return obj.properties?.find((property: ITiledProperty) =>
            property.name === name)?.value;
    }

    static getTransformedData(gid: number, tiles: Array<ITile>): ITransformedParams {
        const FLIPPED_HORIZONTALLY_FLAG: number = 0x80000000;
        const FLIPPED_HORIZONTALLY_ROTATED_INCREASE_FLAG: number = 0x20000000;
        const FLIPPED_HORIZONTALLY_ROTATED_DECREASE_FLAG: number = 0xe0000000;
        const FLIPPED_VERTICALLY_FLAG: number = 0x40000000;
        const FLIPPED_DIAGONALLY_FLAG: number = 0xc0000000;
        const ROTATED_INCREASE_FLAG: number = 0xa0000000;
        const ROTATED_DECREASE_FLAG: number = 0x60000000;
        let tile: ITile = null;
        let offsetX: number = 0;
        let offsetY: number = 0;
        let scaleX: number = 1;
        let scaleY: number = 1;
        let rotation: number = 0;

        function isTransformed(transformedGID: number): boolean {
            const transformed: boolean = transformedGID < tiles.length && transformedGID > 0;
            if (transformed) {
                gid = transformedGID;
                tile = tiles.find((tile: ITile) => tile.id === gid - 1);
            }
            return transformed;
        }

        if (gid > tiles.length) {
            if (isTransformed(gid - FLIPPED_HORIZONTALLY_FLAG)) {
                scaleX = -1;
                offsetX = tile.imagewidth;
            }

            if (isTransformed(gid - FLIPPED_HORIZONTALLY_ROTATED_INCREASE_FLAG)) {
                scaleX = -1;
                rotation = -90;
                offsetY = tile.imageheight - tile.imagewidth;
            }

            if (isTransformed(gid - FLIPPED_HORIZONTALLY_ROTATED_DECREASE_FLAG)) {
                scaleX = -1;
                rotation = 90;
                offsetX = tile.imageheight;
                offsetY = tile.imageheight;
            }

            if (isTransformed(gid - FLIPPED_VERTICALLY_FLAG)) {
                scaleY = -1;
                offsetY = tile.imageheight;
            }

            if (isTransformed(gid - FLIPPED_DIAGONALLY_FLAG)) {
                scaleX = -1;
                scaleY = -1;
                offsetX = tile.imagewidth;
                offsetY = tile.imageheight;
            }

            if (isTransformed(gid - ROTATED_INCREASE_FLAG)) {
                rotation = 90;
                offsetX = tile.imageheight;
                offsetY = tile.imageheight - tile.imagewidth;
            }

            if (isTransformed(gid - ROTATED_DECREASE_FLAG)) {
                rotation = -90;
                offsetY = tile.imageheight;
            }
        }

        return {gid, offsetX, offsetY, scaleX, scaleY, rotation} as ITransformedParams;
    }
}
