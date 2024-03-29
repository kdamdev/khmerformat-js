# [khmerformat](https://github.com/kdamdev/khmerformat-js)

[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]

This library is open-source that included some usage in Khmer local

# Build
`Follow this below guide to modify library`

Pre-requires
* Node.js 16 +
* npm
* webpack

How to build
* `npm install && npm run build`

# Usages
## npm
```
npm i @kdamdev/khmerformat
```

````
import { lunarDate, solarDate, numeric } from '@kdamdev/khmerformat';
````

###  Khmer Lunar Date
````
const lunar = lunarDate(new Date(2024, 3, 13));
//or
const lunar = lunarDate('13-04-2024', 'DD-MM-YYYY');

lunar.toString() // ថ្ងៃសៅរ៍ ៥ កើត ខែចេត្រ ឆ្នាំរោង បញ្ចស័ក ព.ស.២៥៦៧
lunar.getDayOfWeek() // សៅរ៍
lunar.getDayOfMonth() // ៥ កើត
lunar.getMonth() // ចេត្រ
lunar.getZodiacYear() // រោង
lunar.getEra() // បញ្ចស័ក
lunar.getBeYear() // ២៥៦៧
````
###  Khmer Solar Date
````
const solar = solarDate(new Date(2024, 3, 13));
//or
const solar = solarDate('13-04-2024', 'DD-MM-YYYY');

solar.toString() // ថ្ងៃទី១៣ ខែមេសា ឆ្នាំ២០២៤
solar.getDay() // ១៣
solar.getMonth() // មេសា
solar.getYear() // ២០២៤
````
###  Khmer Numeric
````
const num = numeric("123456789");
num.toKhmer() // ១២៣៤៥៦៧៨៩
num.toKhmer(true) // ១២៣,៤៥៦,៧៨៩
num.toKhmerText() // មួយរយម្ភៃបីលានបួនរយហាសិបប្រាំមួយពាន់ប្រាំពីររយប៉ែតសិបប្រាំបួន
````
## Browser
````
<script src="khmerformat.min.js"></script>
````

###  Khmer Lunar Date
````
var lunar = kh.lunarDate(new Date(2024, 3, 13));
//or
var lunar = kh.lunarDate('13-04-2024', 'DD-MM-YYYY');

lunar.toString() // ថ្ងៃសៅរ៍ ៥ កើត ខែចេត្រ ឆ្នាំរោង បញ្ចស័ក ព.ស.២៥៦៧
lunar.getDayOfWeek() // សៅរ៍
lunar.getDayOfMonth() // ៥ កើត
lunar.getMonth() // ចេត្រ
lunar.getZodiacYear() // រោង
lunar.getEra() // បញ្ចស័ក
lunar.getBeYear() // ២៥៦៧
````
###  Khmer Solar Date
````
var solar = kh.solarDate(new Date(2024, 3, 13));
//or
var solar = kh.solarDate('13-04-2024', 'DD-MM-YYYY');

solar.toString() // ថ្ងៃទី១៣ ខែមេសា ឆ្នាំ២០២៤
solar.getDay() // ១៣
solar.getMonth() // មេសា
solar.getYear() // ២០២៤
````
###  Khmer Numeric
````
var num = kh.numeric("123456789");
num.toKhmer() // ១២៣៤៥៦៧៨៩
num.toKhmer(true) // ១២៣,៤៥៦,៧៨៩
num.toKhmerText() // មួយរយម្ភៃបីលានបួនរយហាសិបប្រាំមួយពាន់ប្រាំពីររយប៉ែតសិបប្រាំបួន
````
#  Same library
1. [JAVA](https://github.com/kdamdev/khmerformat-java)

# Reference
1. [Khmer New Year Time Calculation](http://www.dahlina.com/education/khmer_new_year_time.html)
2. Choun Nat Dictionary && Khmer Dictionary 2022  
3. [ThmeyThmey](https://thmeythmey.com/?page=detail&id=59282)
4. [wikipedia ចន្ទគតិ](https://km.m.wikipedia.org/wiki/%E1%9E%85%E1%9E%93%E1%9F%92%E1%9E%91%E1%9E%82%E1%9E%8F%E1%9E%B7)
5. [wikipedia](https://km.wikipedia.org/wiki/%E1%9E%A2%E1%9E%B6%E1%9E%9F%E1%9E%B6%E1%9E%8D)
6. [https://btkhmer.com/Cult-Mohasankran-KH.pdf](https://btkhmer.com/Cult-Mohasankran-KH.pdf)


[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/@kdamdev/khmerformat
[npm-version-image]: https://img.shields.io/npm/v/%40kdamdev%2Fkhmerformat
