/*
* Kendo UI v2015.2.803 (http://www.telerik.com/kendo-ui)
* Copyright 2015 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
(function(f, define){
    define([], f);
})(function(){

(function( window, undefined ) {
    var kendo = window.kendo || (window.kendo = { cultures: {} });
    kendo.cultures["tn-BW"] = {
        name: "tn-BW",
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
                pattern: ["$-n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "P"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sontaga","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Matlhatso"],
                    namesAbbr: ["Sont.","Mos.","Lab.","Labr.","Labn.","Labt.","Matlh."],
                    namesShort: ["So","Ms","Lb","Lr","Ln","Lt","Ma"]
                },
                months: {
                    names: ["Ferikgong","Tlhakole","Mopitlwe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole"],
                    namesAbbr: ["Fer.","Tlh.","Mop.","Mor.","Motsh.","Seet.","Phk.","Pht.","Lwetse.","Diph.","Ngwn.","Sed."]
                },
                AM: ["Moso","moso","MOSO"],
                PM: ["Maitseboa","maitseboa","MAITSEBOA"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    g: "dd/MM/yy hh:mm tt",
                    G: "dd/MM/yy hh:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
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


return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });