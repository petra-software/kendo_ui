/** 
 * Kendo UI v2016.3.1103 (http://www.telerik.com/kendo-ui)                                                                                                                                              
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
    kendo.cultures["smn-FI"] = {
        name: "smn-FI",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Euro",
                abbr: "EUR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["pasepeivi","vuossargâ","majebargâ","koskokko","tuorâstâh","vástuppeivi","lávurdâh"],
                    namesAbbr: ["pas","vuo","maj","kos","tuo","vás","láv"],
                    namesShort: ["p","v","m","k","t","v","l"]
                },
                months: {
                    names: ["uđđâivemáánu","kuovâmáánu","njuhčâmáánu","cuáŋuimáánu","vyesimáánu","kesimáánu","syeinimáánu","porgemáánu","čohčâmáánu","roovvâdmáánu","skammâmáánu","juovlâmáánu"],
                    namesAbbr: ["uđiv","kuov","njuh","cuáŋ","vyes","kesi","syei","porg","čohč","roov","skam","juov"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d'. p. 'yyyy",
                    F: "MMMM d'. p. 'yyyy H:mm:ss",
                    g: "d.M.yyyy H:mm",
                    G: "d.M.yyyy H:mm:ss",
                    m: "MMMM d'. p. '",
                    M: "MMMM d'. p. '",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));