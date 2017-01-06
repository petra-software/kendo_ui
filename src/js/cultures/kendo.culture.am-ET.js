/** 
 * Kendo UI v2016.3.1306 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2017 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (typeof define === 'function' && define.amd) {
        define(["kendo.core"], f);
    } else {
        f();
    }
}(function(){
(function( window, undefined ) {
    kendo.cultures["am-ET"] = {
        name: "am-ET",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Ethiopian Birr",
                abbr: "ETB",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "ETB"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesAbbr: ["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesShort: ["እሑ","ሰኞ","ማክ","ረቡ","ሐሙ","ዓር","ቅዳ"]
                },
                months: {
                    names: ["ጥር","የካቲት","መጋቢት","ሚያዚያ","ግንቦት","ሰኔ","ሐምሌ","ነሐሴ","መስከረም","ጥቅምት","ህዳር","ታህሳስ"],
                    namesAbbr: ["ጥር","የካ.","መጋ.","ሚያ.","ግን.","ሰኔ","ሐም.","ነሐ.","መስ.","ጥቅ.","ህዳ.","ታህ."]
                },
                AM: ["ጧት","ጧት","ጧት"],
                PM: ["ከሰዓት በኋላ","ከሰዓት በኋላ","ከሰዓት በኋላ"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd '፣' MMMM d 'ቀን' yyyy",
                    F: "dddd '፣' MMMM d 'ቀን' yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "MMMM d' ቀን'",
                    M: "MMMM d' ቀን'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));