export class Sun {
    private _reasey: number;
    private _angsar: number;
    private _libda: number;

    public get reasey(): number {
        return this._reasey;
    }
    public set reasey(value: number) {
        this._reasey = value;
    }
  
    public get angsar(): number {
        return this._angsar;
    }
    public set angsar(value: number) {
        this._angsar = value;
    }
  
    public get libda(): number {
        return this._libda;
    }
    public set libda(value: number) {
        this._libda = value;
    }

    constructor(reasey: number = 0, angsar: number = 0, libda: number = 0) {
        this._reasey = reasey;
        this._angsar = angsar;
        this._libda = libda;
    }
}