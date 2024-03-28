import { SolarMonth } from "../constraints/solar-month"
import { NumberUtil } from "./number.util"

export class SolarUtil {
    #day?: string
    #month?: string
    #year?: string
    
    constructor(localDate: Date){
        this.#month = SolarMonth[localDate.getMonth().toString()] ?? ''
        this.#day = new NumberUtil(String(localDate.getDate())).toKhmer()
        this.#year = new NumberUtil(String(localDate.getFullYear())).toKhmer()
    }

    public toString(): string {
        return `ថ្ងៃទី${this.#day} ខែ${this.#month} ឆ្នាំ${this.#year}`;
    }
    public getDay(): string {
        return this.#day!;
    }

    public getMonth(): string {
        return this.#month!;
    }

    public getYear(): string {
        return this.#year!;
    }
}