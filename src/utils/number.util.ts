import { KhmerNumber } from "../constraints/khmer-number";
import { OneDigit,TwoDigit,ThreeDigit, Sign, FourDigit } from "../constraints/khmer-number-text";

export class NumberUtil {
    #value: string

    constructor(value: string) {
        this.#value = value
    }
    public toKhmer(): string;
    public toKhmer(comma: boolean): string;
    public toKhmer(comma?: boolean): string {
        let parts = this.#value.split('.');
        if (comma) {
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return parts.join('.').split('').map(x =>
            x === '.' || x === ',' || x === '-' ? x : KhmerNumber[x]
        ).join('');
    }

    public toKhmerText(): string {
        const value = this.#value.split('.');
        let num = Number(value[0]);
        let fractionalWord = '';
        if (value.length === 2) {
            fractionalWord = Sign[0] + value[1].split('').map(m => OneDigit[m]).join('');
        }

        if (num === 0) {
            return OneDigit[0];
        }

        let i = 0;
        let words = '';

        while (num > 0) {
            if (num % 1000 !== 0) {
                words = NumberUtil.helper(num % 1000) + (FourDigit[i] ?? "") + words;
            }
            num = Math.floor(num / 1000);
            i++;
        }
        return words + fractionalWord;
    }

    private static helper(number: number): string {
        if (number == 0) {
            return "";
        } else if (number < 10) {
            return OneDigit[number];
        } else if (number < 100) {
            return TwoDigit[(number / 10) | 0] + this.helper(number % 10);
        } else {
            return OneDigit[(number / 100) | 0] + ThreeDigit[0] + this.helper(number % 100);
        }
    }
}