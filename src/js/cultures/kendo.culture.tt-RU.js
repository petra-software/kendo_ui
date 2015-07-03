/*
* Kendo UI v2015.2.703 (http://www.telerik.com/kendo-ui)
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
    kendo.cultures["tt-RU"] = {
        name: "tt-RU",
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
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "₽"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["якшәмбе","дүшәмбе","сишәмбе","чәршәмбе","пәнҗешәмбе","җомга","шимбә"],
                    namesAbbr: ["якш.","дүш.","сиш.","чәрш.","пәнҗ.","җом.","шим."],
                    namesShort: ["я","д","с","ч","п","җ","ш"]
                },
                months: {
                    names: ["гыйнвар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
                    namesAbbr: ["гыйн.","фев.","мар.","апр.","май","июнь","июль","авг.","сен.","окт.","нояб.","дек."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dd MMMM yyyy' ел'",
                    F: "dd MMMM yyyy' ел' HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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


return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });