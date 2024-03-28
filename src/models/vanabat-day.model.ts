import { Sun } from "./sun.model";

export class VanabatDay {
    private _numberOfVanabat: number;
    private _pressureOfSun: Sun;

    public get numberOfVanabat(): number {
        return this._numberOfVanabat;
    }
    public set numberOfVanabat(value: number) {
        this._numberOfVanabat = value;
    }
    
    public get pressureOfSun(): Sun {
        return this._pressureOfSun;
    }
    public set pressureOfSun(value: Sun) {
        this._pressureOfSun = value;
    }

    constructor() {
        this._numberOfVanabat = 0;
        this._pressureOfSun = new Sun();
    }
}