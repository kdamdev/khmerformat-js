import { solarDate } from  '../src/main'

test('Test solar date in khmer :: ', () => {
    var date = solarDate(new Date(2024, 3 , 13))
    expect(date.toString()).toBe("ថ្ងៃទី១៣ ខែមេសា ឆ្នាំ២០២៤");
});