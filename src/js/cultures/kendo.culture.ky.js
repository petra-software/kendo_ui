/*
* Kendo UI v2015.1.327 (http://www.telerik.com/kendo-ui)
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
    kendo.cultures["ky"] = {
        name: "ky",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
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
                symbol: "сом"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["жекшемби","дүйшөмбү","шейшемби","шаршемби","бейшемби","жума","ишемби"],
                    namesAbbr: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"],
                    namesShort: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"]
                },
                months: {
                    names: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
                    namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d-MMM yy",
                    D: "dd'-'MMMM yyyy'-ж.'",
                    F: "dd'-'MMMM yyyy'-ж.' HH:mm:ss",
                    g: "d-MMM yy HH:mm",
                    G: "d-MMM yy HH:mm:ss",
                    m: "d'-'MMMM",
                    M: "d'-'MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy'-ж.'",
                    Y: "MMMM yyyy'-ж.'"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);


return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });