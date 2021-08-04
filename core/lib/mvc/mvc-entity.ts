export class MvcEntity implements IMvcEntity {
    public NAME: string;

    constructor(name: string) {
        this.NAME = name;
    }

    onRegister(): void {
    }
}

export interface IMvcEntity {
    NAME: string;

    onRegister(): void;
}
