import { DayOfWeek } from "../constraints/day-of-week"
import { Era } from "../constraints/era"
import { JourneyMoon } from "../constraints/journey-moon"
import { ZodiacYear } from "../constraints/zodia-year"
import { leapMonth, normalMonth } from "../constraints/lunar-month"
import KhmerNewYearHelper from "../helpers/khmer-new-year.helper"
import { NumberUtil } from "./number.util"

export class LunarUtil {
    #dayOfWeek?: string = ''
    #dayOfMonth?: string = ''
    #month?: string = ''
    #zodiacYear?: string = ''
    #era?: string = ''
    #beYear?: string = ''

    constructor(localDate: Date) {
        const helper: KhmerNewYearHelper = new KhmerNewYearHelper(localDate.getFullYear());

        this.#dayOfWeek = DayOfWeek[localDate.getDay().toString()] ?? ''
        const dayAndMonth: number[] = LunarUtil.mapSolarYearToLunarYear(localDate, helper);

        this.#dayOfMonth = LunarUtil.getLunarDayOfMonth(dayAndMonth[0]);
        this.#month = LunarUtil.getLunarMonth(dayAndMonth[1], dayAndMonth[3] === 1);
        this.#zodiacYear = LunarUtil.findZodiacYear(helper.getNewYearDay(), dayAndMonth);
        this.#era = LunarUtil.findEra(helper.getLeungsakDay(), dayAndMonth);
        this.#beYear = new NumberUtil(LunarUtil.findBeYear(dayAndMonth).toString()).toKhmer();
    }

    private static findZodiacYear(newYearDay: number[], currentDate: number[]): string {
        const index: number = (currentDate[2] + 9) % 12;
        return (currentDate[0] >= newYearDay[0] && currentDate[1] >= newYearDay[1]) || currentDate[1] > newYearDay[1] ?
            ZodiacYear[index] : ZodiacYear[index - 1];
    }

    private static findBeYear(currentDate: number[]): number {
        return currentDate[2] + (currentDate[1] > 6 || (currentDate[1] === 6 && currentDate[0] >= 16) ? 544 : 543);
    }

    private static findEra(leungSak: number[], currentDate: number[]): string {
        return currentDate[1] > leungSak[1] || (currentDate[0] >= leungSak[0] && currentDate[1] === leungSak[1]) ?
            Era[(currentDate[2] + 2) % 10] : Era[(currentDate[2] + 1) % 10];
    }

    private static getLunarMonth(month: number, isLeapYear: boolean): string {
        if (isLeapYear) {
            return leapMonth[month === 14 ? 0 : month - 1];
        }
        return normalMonth[month === 13 ? 0 : month - 1];
    }

    private static getDayInMonth(month: number, helper: KhmerNewYearHelper): number {
        if (helper.isAthikmeas() && month >= 8) {
            if (month === 8 || month === 9) return 30;
            else month -= 1;
        } else {
            if (helper.isChes30Days() && month === 7) return 30;
        }
        return month % 2 === 0 ? 30 : 29;
    }

    private static getDayInYear(helper: KhmerNewYearHelper): number {
        return helper.isAthikmeas() ? 384 : helper.isChes30Days() ? 355 : 354;
    }

    private static getLunarDayOfMonth(day: number): string {
        const t: number = day % 15 === 0 ? 15 : day % 15;
        return `${new NumberUtil(t.toString()).toKhmer()} ${day > 15 ? JourneyMoon.WANING : JourneyMoon.WAXING}`;
    }

    private static mapSolarYearToLunarYear(epochEst: Date, helper: KhmerNewYearHelper): number[] {
        const epoch: Date = new Date(2014, 0, 1);// ត្រូវតែ ១កើត ខែបុស្ស, 1900, 1938, 1957, 2014, 2033, 2071, 2090
        let tmp_d: number;
        let tmp_m: number = 0;

        if (epochEst >= epoch) {
            tmp_d = Math.floor((epochEst.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            let tmp_y: number = epoch.getFullYear();
            let totalDayYear: number = this.getDayInYear(new KhmerNewYearHelper(tmp_y));
            while (tmp_d > totalDayYear) {
                tmp_y++;
                tmp_d -= totalDayYear;
                totalDayYear = this.getDayInYear(new KhmerNewYearHelper(tmp_y));    
            }
            const epochHelper: KhmerNewYearHelper = new KhmerNewYearHelper(tmp_y);
            for (let m = 2; m <= 14; m++) {
                tmp_m = m;
                const daysOfMonth: number = LunarUtil.getDayInMonth(tmp_m, epochHelper);
                if (tmp_d <= daysOfMonth) {
                    break;
                } else {
                    tmp_d -= daysOfMonth;
                }
            }
            return [(tmp_d), tmp_m === 14 ? 1 : tmp_m, tmp_m === 14 ? tmp_y + 1 : tmp_y, epochHelper.isAthikmeas() ? 1 : 0];
        } else {
            tmp_d = Math.floor((epoch.getTime() - epochEst.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            let tmp_y: number = epoch.getFullYear() - 1;
            let totalDayYear: number = this.getDayInYear(new KhmerNewYearHelper(tmp_y));

            while (Math.abs(tmp_d) > totalDayYear) {
                tmp_y--;
                tmp_d += totalDayYear;
                totalDayYear = this.getDayInYear(new KhmerNewYearHelper(tmp_y));
            }

            const epochHelper: KhmerNewYearHelper = new KhmerNewYearHelper(tmp_y);
            tmp_m = epochHelper.isAthikmeas() ? 14 : 13;

            while (tmp_m >= 2) {
                const daysOfMonth: number = this.getDayInMonth(tmp_m, epochHelper);
                tmp_d += daysOfMonth;

                if (tmp_d > 0) {
                    break;
                }
                tmp_m--;
            }
            return [(tmp_d), tmp_m, tmp_y, epochHelper.isAthikmeas() ? 1 : 0];
        }
    }

    public toString(): string {
        return `ថ្ងៃ${this.#dayOfWeek} ${this.#dayOfMonth} ខែ${this.#month} ឆ្នាំ${this.#zodiacYear} ${this.#era} ព.ស.${this.#beYear}`
    }

    public getDayOfWeek(): string {
        return this.#dayOfWeek!
    }

    public getDayOfMonth(): string {
        return this.#dayOfMonth!
    }

    public getMonth(): string {
        return this.#month!
    }

    public getZodiacYear(): string {
        return this.#zodiacYear!
    }

    public getEra(): string {
        return this.#era!
    }

    public getBeYear(): string {
        return this.#beYear!
    }
}
