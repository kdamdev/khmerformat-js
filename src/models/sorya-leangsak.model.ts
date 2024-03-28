export class SoryaLeangsak {
    private _lesserEra: number;
    private _harkun: number;
    private _kromathopol: number;
    private _avaman: number;
    private _bodethey: number;

    constructor() {
        this._lesserEra = 0;
        this._harkun = 0;
        this._kromathopol = 0;
        this._avaman = 0;
        this._bodethey = 0;
    }

    public get lesserEra(): number {
        return this._lesserEra;
    }
    public set lesserEra(value: number) {
        this._lesserEra = value;
    }
    public get harkun(): number {
        return this._harkun;
    }
    public set harkun(value: number) {
        this._harkun = value;
    }
    public get kromathopol(): number {
        return this._kromathopol;
    }
    public set kromathopol(value: number) {
        this._kromathopol = value;
    }
    public get avaman(): number {
        return this._avaman;
    }
    public set avaman(value: number) {
        this._avaman = value;
    }
    public get bodethey(): number {
        return this._bodethey;
    }
    public set bodethey(value: number) {
        this._bodethey = value;
    }
}