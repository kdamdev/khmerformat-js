import { lunarDate } from  '../src/main'

test('Test LeungSak 2024 :: ', () => {
    var lunar = lunarDate(new Date(2024, 3 , 16))
    expect(lunar.toString()).toBe("ថ្ងៃអង្គារ ៨ កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ព.ស.២៥៦៧");
});

test('Test VanaBat 2024:: ', () => {
    var lunar = lunarDate(new Date(2024, 3 , 15))
    expect(lunar.toString()).toBe("ថ្ងៃចន្ទ ៧ កើត ខែចេត្រ ឆ្នាំរោង បញ្ចស័ក ព.ស.២៥៦៧");
});

test('Test NewYear 2024 :: ', () => {
    var lunar = lunarDate(new Date(2024, 3 , 13))
    expect(lunar.toString()).toBe("ថ្ងៃសៅរ៍ ៥ កើត ខែចេត្រ ឆ្នាំរោង បញ្ចស័ក ព.ស.២៥៦៧");
});
