/** 
 * Kendo UI v2016.3.1202 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
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
    kendo.cultures["zu"] = {
        name: "zu",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-%n","%n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$-n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["iSonto","uMsombuluko","uLwesibili","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
                    namesAbbr: ["Son.","Mso.","Bi.","Tha.","Ne.","Hla.","Mgq."],
                    namesShort: ["So","Ms","Bi","Th","Ne","Hl","Mg"]
                },
                months: {
                    names: ["Januwari","Febhuwari","Mashi","Ephreli","Meyi","Juni","Julayi","Agasti","Septemba","Okthoba","Novemba","Disemba"],
                    namesAbbr: ["Jan","Feb","Mas","Eph","Mey","Jun","Jul","Agas","Sep","Okt","Nov","Dis"]
                },
                AM: ["Ntambama","ntambama","NTAMBAMA"],
                PM: ["Ekuseni","ekuseni","EKUSENI"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    g: "dd-MM-yyyy hh:mm tt",
                    G: "dd-MM-yyyy hh:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
}));