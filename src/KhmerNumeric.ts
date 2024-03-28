import { NumberUtil } from "./utils/number.util"

export class KhmerNumeric {
    public static numeric(number: string): NumberUtil {
        return new NumberUtil(number);
    }
}