/** 
 * Kendo UI v2019.3.1023 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
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
    kendo.cultures["ak-GH"] = {
        name: "ak-GH",
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
                name: "Ghanaian Cedi",
                abbr: "GHS",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "GH₵"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Kwesida","Dwowda","Benada","Wukuda","Yawda","Fida","Memeneda"],
                    namesAbbr: ["Kwe","Dwo","Ben","Wuk","Yaw","Fia","Mem"],
                    namesShort: ["Kwe","Dwo","Ben","Wuk","Yaw","Fia","Mem"]
                },
                months: {
                    names: ["Sanda-Ɔpɛpɔn","Kwakwar-Ɔgyefuo","Ebɔw-Ɔbenem","Ebɔbira-Oforisuo","Esusow Aketseaba-Kɔtɔnimba","Obirade-Ayɛwohomumu","Ayɛwoho-Kitawonsa","Difuu-Ɔsandaa","Fankwa-Ɛbɔ","Ɔbɛsɛ-Ahinime","Ɔberɛfɛw-Obubuo","Mumu-Ɔpɛnimba"],
                    namesAbbr: ["S-Ɔ","K-Ɔ","E-Ɔ","E-O","E-K","O-A","A-K","D-Ɔ","F-Ɛ","Ɔ-A","Ɔ-O","M-Ɔ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, yyyy MMMM dd",
                    F: "dddd, yyyy MMMM dd h:mm:ss tt",
                    g: "yyyy/MM/dd h:mm tt",
                    G: "yyyy/MM/dd h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
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