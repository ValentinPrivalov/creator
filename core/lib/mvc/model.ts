import {IMvcEntity, MvcEntity} from "./mvc-entity";

export class AbstractModel extends MvcEntity implements IAbstractModel {
    public VO: any;

    public setVO(vo: any): void {
        this.VO = vo;
    }

    public getVO(): any {
        return this.VO;
    }
}

export interface IAbstractModel extends IMvcEntity {
    VO: any;

    setVO(vo: any): void;

    getVO(): any;
}
