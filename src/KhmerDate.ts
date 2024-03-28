import { LunarUtil } from "./utils/lunar.util";
import { SolarUtil }from "./utils/solar.util";

export class KhmerDate {

    public static solarDate(date: Date): SolarUtil 
    public static solarDate(date: string, formatter: string): SolarUtil 
    public static solarDate(date: Date | string, formatter?: string): SolarUtil {
        const zoneId = 'Asia/Phnom_Penh';
        const localDate = typeof date === 'string' ? KhmerDate.parseDate(date, formatter) : date;
        const formattedDate  = new Date(localDate.toLocaleString('en-US', { timeZone: zoneId }))
        return new SolarUtil(formattedDate);
    }

    public static lunarDate(date: Date): LunarUtil
    public static lunarDate(date: string, formatter: string): LunarUtil
    public static lunarDate(date: Date | string, formatter?: string): LunarUtil {
        const zoneId = 'Asia/Phnom_Penh';
        const localDate = typeof date === 'string' ? KhmerDate.parseDate(date, formatter) : date;
        const formattedDate  = new Date(localDate.toLocaleString('en-US', { timeZone: zoneId }))
        return new LunarUtil(formattedDate);
    }

    static parseDate(dateString: string, format?: string) {
        const regex = /YYYY|MM|DD/gi;
        const formatParts = format!.match(regex);
        if (!formatParts) {
            throw new Error('Invalid date format');
        }

        const dateValues: {[x: string]: any} = {};
        let match;
        let index = 0;

        while ((match = regex.exec(format!)) !== null) {
            const formatPart = match[0].toUpperCase();
            const length = formatPart.length;
            dateValues[formatPart] = parseInt(dateString.slice(index, index + length), 10);
            index += length + 1;
        }

        const year = dateValues['YYYY'];
        const month = dateValues['MM'] - 1;
        const day = dateValues['DD'];

        return new Date(year, month, day);
    }
}