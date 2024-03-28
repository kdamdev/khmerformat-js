import { SoryaLeangsak } from "../models/sorya-leangsak.model"
import { Sun } from "../models/sun.model"
import { VanabatDay} from "../models/vanabat-day.model"

class KhmerNewYearHelper {
    soryaLeangsak!: SoryaLeangsak;
    year: number;

    constructor(year: number) {
        this.soryaLeangsak = this.getSoryaLeangsakByLesserEra(year + 544 - 1182);
        this.year = year;
    }

    getSoryaLeangsakByLesserEra(lesserEra: number): SoryaLeangsak {
        const soryaLeangsak = new SoryaLeangsak();
        soryaLeangsak.lesserEra = lesserEra
        soryaLeangsak.harkun = Math.floor((292207 * lesserEra + 373) / 800 + 1)
        soryaLeangsak.kromathopol = Math.floor(800 - (292207 * lesserEra + 373) % 800)
        soryaLeangsak.avaman = Math.floor((11 * soryaLeangsak.harkun + 650) % 692)
        soryaLeangsak.bodethey = Math.floor((soryaLeangsak.harkun + ((11 * soryaLeangsak.harkun + 650) / 692)) % 30)
        return soryaLeangsak;
    }

    is366KhmerSolar(kromathopol: number): boolean {
        return kromathopol <= 207;
    }

    isAthikvearak(): boolean {
        const nextAvaman = this.getSoryaLeangsakByLesserEra(this.soryaLeangsak.lesserEra + 1).avaman;
        return (this.is366KhmerSolar(this.soryaLeangsak.kromathopol) && this.soryaLeangsak.avaman < 127) ||
            ((this.soryaLeangsak.avaman !== 137 || nextAvaman !== 0) &&
                this.soryaLeangsak.avaman < 138);
    }

    isAthikmeas(): boolean {
        const nextBodethey = this.getSoryaLeangsakByLesserEra(this.soryaLeangsak.lesserEra + 1).bodethey;
        return (this.soryaLeangsak.bodethey !== 25 || nextBodethey !== 5) && ((this.soryaLeangsak.bodethey > 24 || this.soryaLeangsak.bodethey < 6) ||
            (this.soryaLeangsak.bodethey === 24 && nextBodethey === 6));
    }

    isChes30Days(): boolean {
        if (!this.isAthikmeas()) {
            if (!this.isAthikvearak()) {
                const previousYear = new KhmerNewYearHelper(this.year - 1);
                return previousYear.isAthikmeas() && previousYear.isAthikvearak();
            } else return true;
        } else {
            if (this.isAthikvearak()) return false;
        }
        return false;
    }

    getLeungsakDay(): number[] {
        const oldYear = new KhmerNewYearHelper(this.year - 1);
        let bodethey = this.soryaLeangsak.bodethey;
        if (oldYear.isAthikmeas() && oldYear.isAthikvearak()) {
            bodethey++;
        }
        return [bodethey >= 6 ? bodethey : ++bodethey, bodethey >= 6 ? 5 : 6];
    }

    getAverageOfSun(sotin: number): Sun {
        const sun = new Sun();
        const preKromathopol = this.getSoryaLeangsakByLesserEra(this.soryaLeangsak.lesserEra - 1).kromathopol;
        const tmp = 800 * sotin + preKromathopol;
        sun.reasey = Math.floor(tmp / 24350);
        sun.angsar = Math.floor((tmp % 24350) / 811);
        sun.libda = Math.floor((((tmp % 24350) % 811) / 14) - 3);
        return sun;
    }

    getPressureOfSun(averageSun: Sun): Sun {
        const s1 = new Sun();
        s1.reasey = averageSun.reasey < 2 ? averageSun.reasey + 12 - 2 : averageSun.reasey - 2;
        s1.angsar = averageSun.angsar - 20;
        s1.libda = averageSun.libda;
        //
        const s2 = new Sun();
        switch (s1.reasey) {
            case 0:
            case 1:
            case 2:
                // RS2 = RS1
                Object.assign(s2, s1);
                break;
            case 3:
            case 4:
            case 5:
                // RS2 = R6.A0.L0 - RS1
                s2.reasey = 6 - s1.reasey;
                s2.angsar = -s1.angsar;
                s2.libda = -s1.libda;
                break;
            case 6:
            case 7:
            case 8:
                // RS2 = RS1 - R6.A0.L0
                s2.reasey = s1.reasey - 6;
                s2.angsar = s1.angsar;
                s2.libda = s1.libda;
                break;
            case 9:
            case 10:
            case 11:
                // RS2 =  R11.A29.L60 - RS1
                s2.reasey = 11 - s1.reasey;
                s2.angsar = 29 - s1.angsar;
                s2.libda = 60 - s1.libda;
                break;
            default:
                throw new Error("Invalid R");
        }

        const phol = KhmerNewYearHelper.getPhol(s2);
        let preSun;
        if (s1.reasey >= 6) {
            preSun = new Sun(
                averageSun.reasey + phol.reasey,
                averageSun.angsar + phol.angsar,
                averageSun.libda + phol.libda
            );
        } else {
            preSun = new Sun(
                averageSun.reasey - phol.reasey,
                averageSun.angsar - phol.angsar,
                averageSun.libda - phol.libda
            );
        }
        return KhmerNewYearHelper.convertToReasey(preSun);
    }

    static convertToReasey(sun: Sun): Sun {
        const l = Math.floor(sun.libda / 60);
        const rl = sun.libda % 60;

        const a = Math.floor((sun.angsar + l) / 30);
        const ra = (sun.angsar + l) % 30;

        const r = (sun.reasey + a) % 12;

        return new Sun(r, ra, rl);
    }

    static getKhan(sun: Sun): number {
        return sun.angsar >= 15 ? 2 * sun.reasey + 1 : 2 * sun.reasey;
    }

    static getPouichalip(sun: Sun): number {
        return sun.angsar >= 15 ? 60 * (sun.angsar - 15) + sun.libda : 60 * sun.angsar + sun.libda;
    }

    static getPhol(info: Sun): Sun {
        const k = this.getKhan(info);
        const p = this.getPouichalip(info);
        const chaya = this.getSunChaya(k);
        const q1 = (p * chaya[1]) / 900;
        return new Sun(0, Math.floor((q1 + chaya[2]) / 60), (q1 + chaya[2]) % 60);
    }

    getNumberOfVanabatDay(): VanabatDay {
        const kr = this.getSoryaLeangsakByLesserEra(this.soryaLeangsak.lesserEra - 1).kromathopol;
        const sotin = this.is366KhmerSolar(kr) ?
            [363, 364, 365, 366] :
            [362, 363, 364, 365];
        const vanabatDay = new VanabatDay();
        for (const i of sotin) {
            const pressureOfSun = this.getPressureOfSun(this.getAverageOfSun(i));
            if (pressureOfSun.reasey === 0 && pressureOfSun.angsar === 0) {
                vanabatDay.numberOfVanabat = this.is366KhmerSolar(kr) ? 365 - i : 364 - i;
                vanabatDay.pressureOfSun = pressureOfSun;
                break;
            }
        }
        return vanabatDay;
    }

    getKhmerNewYearTime(): number[] {
        const pressureSun = this.getNumberOfVanabatDay().pressureOfSun;
        const duration = 1440 - pressureSun.libda * 24;
        return [Math.floor(duration / 60), duration % 60];
    }

    getNewYearDay(): number[] {
        const leungSak = this.getLeungsakDay();
        for (let i = 1; i <= this.getNumberOfVanabatDay().numberOfVanabat + 1; i++) {
            leungSak[0]--;
            if (leungSak[0] === 0) {
                leungSak[0] = 29; // ដោយយើងដឹងថាខែចេត្រ មាន ២៩ថ្ងៃ
                leungSak[1]--;
            }
        }
        return leungSak;
    }

    private static getSunChaya(khan: number): number[] {
        switch (khan) {
            case 0:
                return [0, 35, 0];
            case 1:
                return [1, 32, 35];
            case 2:
                return [2, 27, 67];
            case 3:
                return [3, 22, 94];
            case 4:
                return [4, 13, 116];
            case 5:
                return [5, 5, 129];
            default:
                return [-1, -1, 134]; // undefined value
        }
    }
}

export default KhmerNewYearHelper;

