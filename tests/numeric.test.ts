import { numeric } from '../src/main'
test('Test latin to khmer number:: ', () => {
    var num = numeric("123456789")
    expect(num.toKhmer()).toBe("១២៣៤៥៦៧៨៩");
});

test('Test latin to khmer number with commas:: ', () => {
    var num = numeric("123456789")
    expect(num.toKhmer(true)).toBe("១២៣,៤៥៦,៧៨៩");
});

test('Test latin to khmer number with commas:: ', () => {
    var num = numeric("123456789")
    expect(num.toKhmerText()).toBe("មួយរយម្ភៃបីលានបួនរយហាសិបប្រាំមួយពាន់ប្រាំពីររយប៉ែតសិបប្រាំបួន");
});