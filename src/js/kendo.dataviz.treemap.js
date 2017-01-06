/** 
 * Kendo UI v2016.3.1306 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2017 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('util/main', ['kendo.core'], f);
}(function () {
    (function () {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend;
        var DEG_TO_RAD = math.PI / 180, MAX_NUM = Number.MAX_VALUE, MIN_NUM = -Number.MAX_VALUE, UNDEFINED = 'undefined';
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        function round(value, precision) {
            var power = pow(precision);
            return math.round(value * power) / power;
        }
        function pow(p) {
            if (p) {
                return math.pow(10, p);
            } else {
                return 1;
            }
        }
        function limitValue(value, min, max) {
            return math.max(math.min(value, max), min);
        }
        function rad(degrees) {
            return degrees * DEG_TO_RAD;
        }
        function deg(radians) {
            return radians / DEG_TO_RAD;
        }
        function isNumber(val) {
            return typeof val === 'number' && !isNaN(val);
        }
        function valueOrDefault(value, defaultValue) {
            return defined(value) ? value : defaultValue;
        }
        function sqr(value) {
            return value * value;
        }
        function objectKey(object) {
            var parts = [];
            for (var key in object) {
                parts.push(key + object[key]);
            }
            return parts.sort().join('');
        }
        function hashKey(str) {
            var hash = 2166136261;
            for (var i = 0; i < str.length; ++i) {
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
                hash ^= str.charCodeAt(i);
            }
            return hash >>> 0;
        }
        function hashObject(object) {
            return hashKey(objectKey(object));
        }
        var now = Date.now;
        if (!now) {
            now = function () {
                return new Date().getTime();
            };
        }
        function arrayLimits(arr) {
            var length = arr.length, i, min = MAX_NUM, max = MIN_NUM;
            for (i = 0; i < length; i++) {
                max = math.max(max, arr[i]);
                min = math.min(min, arr[i]);
            }
            return {
                min: min,
                max: max
            };
        }
        function arrayMin(arr) {
            return arrayLimits(arr).min;
        }
        function arrayMax(arr) {
            return arrayLimits(arr).max;
        }
        function sparseArrayMin(arr) {
            return sparseArrayLimits(arr).min;
        }
        function sparseArrayMax(arr) {
            return sparseArrayLimits(arr).max;
        }
        function sparseArrayLimits(arr) {
            var min = MAX_NUM, max = MIN_NUM;
            for (var i = 0, length = arr.length; i < length; i++) {
                var n = arr[i];
                if (n !== null && isFinite(n)) {
                    min = math.min(min, n);
                    max = math.max(max, n);
                }
            }
            return {
                min: min === MAX_NUM ? undefined : min,
                max: max === MIN_NUM ? undefined : max
            };
        }
        function last(array) {
            if (array) {
                return array[array.length - 1];
            }
        }
        function append(first, second) {
            first.push.apply(first, second);
            return first;
        }
        function renderTemplate(text) {
            return kendo.template(text, {
                useWithBlock: false,
                paramName: 'd'
            });
        }
        function renderAttr(name, value) {
            return defined(value) && value !== null ? ' ' + name + '=\'' + value + '\' ' : '';
        }
        function renderAllAttr(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                output += renderAttr(attrs[i][0], attrs[i][1]);
            }
            return output;
        }
        function renderStyle(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                var value = attrs[i][1];
                if (defined(value)) {
                    output += attrs[i][0] + ':' + value + ';';
                }
            }
            if (output !== '') {
                return output;
            }
        }
        function renderSize(size) {
            if (typeof size !== 'string') {
                size += 'px';
            }
            return size;
        }
        function renderPos(pos) {
            var result = [];
            if (pos) {
                var parts = kendo.toHyphens(pos).split('-');
                for (var i = 0; i < parts.length; i++) {
                    result.push('k-pos-' + parts[i]);
                }
            }
            return result.join(' ');
        }
        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }
        function arabicToRoman(n) {
            var literals = {
                1: 'i',
                10: 'x',
                100: 'c',
                2: 'ii',
                20: 'xx',
                200: 'cc',
                3: 'iii',
                30: 'xxx',
                300: 'ccc',
                4: 'iv',
                40: 'xl',
                400: 'cd',
                5: 'v',
                50: 'l',
                500: 'd',
                6: 'vi',
                60: 'lx',
                600: 'dc',
                7: 'vii',
                70: 'lxx',
                700: 'dcc',
                8: 'viii',
                80: 'lxxx',
                800: 'dccc',
                9: 'ix',
                90: 'xc',
                900: 'cm',
                1000: 'm'
            };
            var values = [
                1000,
                900,
                800,
                700,
                600,
                500,
                400,
                300,
                200,
                100,
                90,
                80,
                70,
                60,
                50,
                40,
                30,
                20,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1
            ];
            var roman = '';
            while (n > 0) {
                if (n < values[0]) {
                    values.shift();
                } else {
                    roman += literals[values[0]];
                    n -= values[0];
                }
            }
            return roman;
        }
        function romanToArabic(r) {
            r = r.toLowerCase();
            var digits = {
                i: 1,
                v: 5,
                x: 10,
                l: 50,
                c: 100,
                d: 500,
                m: 1000
            };
            var value = 0, prev = 0;
            for (var i = 0; i < r.length; ++i) {
                var v = digits[r.charAt(i)];
                if (!v) {
                    return null;
                }
                value += v;
                if (v > prev) {
                    value -= 2 * prev;
                }
                prev = v;
            }
            return value;
        }
        function memoize(f) {
            var cache = Object.create(null);
            return function () {
                var id = '';
                for (var i = arguments.length; --i >= 0;) {
                    id += ':' + arguments[i];
                }
                return id in cache ? cache[id] : cache[id] = f.apply(this, arguments);
            };
        }
        function ucs2decode(string) {
            var output = [], counter = 0, length = string.length, value, extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                    extra = string.charCodeAt(counter++);
                    if ((extra & 64512) == 56320) {
                        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                    } else {
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }
        function ucs2encode(array) {
            return array.map(function (value) {
                var output = '';
                if (value > 65535) {
                    value -= 65536;
                    output += String.fromCharCode(value >>> 10 & 1023 | 55296);
                    value = 56320 | value & 1023;
                }
                output += String.fromCharCode(value);
                return output;
            }).join('');
        }
        function mergeSort(a, cmp) {
            if (a.length < 2) {
                return a.slice();
            }
            function merge(a, b) {
                var r = [], ai = 0, bi = 0, i = 0;
                while (ai < a.length && bi < b.length) {
                    if (cmp(a[ai], b[bi]) <= 0) {
                        r[i++] = a[ai++];
                    } else {
                        r[i++] = b[bi++];
                    }
                }
                if (ai < a.length) {
                    r.push.apply(r, a.slice(ai));
                }
                if (bi < b.length) {
                    r.push.apply(r, b.slice(bi));
                }
                return r;
            }
            return function sort(a) {
                if (a.length <= 1) {
                    return a;
                }
                var m = Math.floor(a.length / 2);
                var left = a.slice(0, m);
                var right = a.slice(m);
                left = sort(left);
                right = sort(right);
                return merge(left, right);
            }(a);
        }
        function isUnicodeLetter(ch) {
            return RX_UNICODE_LETTER.test(ch);
        }
        deepExtend(kendo, {
            util: {
                MAX_NUM: MAX_NUM,
                MIN_NUM: MIN_NUM,
                append: append,
                arrayLimits: arrayLimits,
                arrayMin: arrayMin,
                arrayMax: arrayMax,
                defined: defined,
                deg: deg,
                hashKey: hashKey,
                hashObject: hashObject,
                isNumber: isNumber,
                isTransparent: isTransparent,
                last: last,
                limitValue: limitValue,
                now: now,
                objectKey: objectKey,
                round: round,
                rad: rad,
                renderAttr: renderAttr,
                renderAllAttr: renderAllAttr,
                renderPos: renderPos,
                renderSize: renderSize,
                renderStyle: renderStyle,
                renderTemplate: renderTemplate,
                sparseArrayLimits: sparseArrayLimits,
                sparseArrayMin: sparseArrayMin,
                sparseArrayMax: sparseArrayMax,
                sqr: sqr,
                valueOrDefault: valueOrDefault,
                romanToArabic: romanToArabic,
                arabicToRoman: arabicToRoman,
                memoize: memoize,
                ucs2encode: ucs2encode,
                ucs2decode: ucs2decode,
                mergeSort: mergeSort,
                isUnicodeLetter: isUnicodeLetter
            }
        });
        kendo.drawing.util = kendo.util;
        kendo.dataviz.util = kendo.util;
        var RX_UNICODE_LETTER = new RegExp('[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]');
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/text-metrics', [
        'kendo.core',
        'util/main'
    ], f);
}(function () {
    (function ($) {
        var doc = document, kendo = window.kendo, Class = kendo.Class, util = kendo.util, defined = util.defined;
        var LRUCache = Class.extend({
            init: function (size) {
                this._size = size;
                this._length = 0;
                this._map = {};
            },
            put: function (key, value) {
                var lru = this, map = lru._map, entry = {
                        key: key,
                        value: value
                    };
                map[key] = entry;
                if (!lru._head) {
                    lru._head = lru._tail = entry;
                } else {
                    lru._tail.newer = entry;
                    entry.older = lru._tail;
                    lru._tail = entry;
                }
                if (lru._length >= lru._size) {
                    map[lru._head.key] = null;
                    lru._head = lru._head.newer;
                    lru._head.older = null;
                } else {
                    lru._length++;
                }
            },
            get: function (key) {
                var lru = this, entry = lru._map[key];
                if (entry) {
                    if (entry === lru._head && entry !== lru._tail) {
                        lru._head = entry.newer;
                        lru._head.older = null;
                    }
                    if (entry !== lru._tail) {
                        if (entry.older) {
                            entry.older.newer = entry.newer;
                            entry.newer.older = entry.older;
                        }
                        entry.older = lru._tail;
                        entry.newer = null;
                        lru._tail.newer = entry;
                        lru._tail = entry;
                    }
                    return entry.value;
                }
            }
        });
        var defaultMeasureBox = $('<div style=\'position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;' + 'padding: 0 !important; margin: 0 !important; border: 0 !important;' + 'line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;\' />')[0];
        function zeroSize() {
            return {
                width: 0,
                height: 0,
                baseline: 0
            };
        }
        var TextMetrics = Class.extend({
            init: function (options) {
                this._cache = new LRUCache(1000);
                this._initOptions(options);
            },
            options: { baselineMarkerSize: 1 },
            measure: function (text, style, box) {
                if (!text) {
                    return zeroSize();
                }
                var styleKey = util.objectKey(style), cacheKey = util.hashKey(text + styleKey), cachedResult = this._cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                var size = zeroSize();
                var measureBox = box ? box : defaultMeasureBox;
                var baselineMarker = this._baselineMarker().cloneNode(false);
                for (var key in style) {
                    var value = style[key];
                    if (defined(value)) {
                        measureBox.style[key] = value;
                    }
                }
                $(measureBox).text(text);
                measureBox.appendChild(baselineMarker);
                doc.body.appendChild(measureBox);
                if ((text + '').length) {
                    size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                    size.height = measureBox.offsetHeight;
                    size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
                }
                if (size.width > 0 && size.height > 0) {
                    this._cache.put(cacheKey, size);
                }
                measureBox.parentNode.removeChild(measureBox);
                return size;
            },
            _baselineMarker: function () {
                return $('<div class=\'k-baseline-marker\' ' + 'style=\'display: inline-block; vertical-align: baseline;' + 'width: ' + this.options.baselineMarkerSize + 'px; height: ' + this.options.baselineMarkerSize + 'px;' + 'overflow: hidden;\' />')[0];
            }
        });
        TextMetrics.current = new TextMetrics();
        function measureText(text, style, measureBox) {
            return TextMetrics.current.measure(text, style, measureBox);
        }
        function loadFonts(fonts, callback) {
            var promises = [];
            if (fonts.length > 0 && document.fonts) {
                try {
                    promises = fonts.map(function (font) {
                        return document.fonts.load(font);
                    });
                } catch (e) {
                    kendo.logToConsole(e);
                }
                Promise.all(promises).then(callback, callback);
            } else {
                callback();
            }
        }
        kendo.util.TextMetrics = TextMetrics;
        kendo.util.LRUCache = LRUCache;
        kendo.util.loadFonts = loadFonts;
        kendo.util.measureText = measureText;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/base64', ['util/main'], f);
}(function () {
    (function () {
        var kendo = window.kendo, deepExtend = kendo.deepExtend, fromCharCode = String.fromCharCode;
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        function encodeBase64(input) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = encodeUTF8(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
            }
            return output;
        }
        function encodeUTF8(input) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var c = input.charCodeAt(i);
                if (c < 128) {
                    output += fromCharCode(c);
                } else if (c < 2048) {
                    output += fromCharCode(192 | c >>> 6);
                    output += fromCharCode(128 | c & 63);
                } else if (c < 65536) {
                    output += fromCharCode(224 | c >>> 12);
                    output += fromCharCode(128 | c >>> 6 & 63);
                    output += fromCharCode(128 | c & 63);
                }
            }
            return output;
        }
        deepExtend(kendo.util, {
            encodeBase64: encodeBase64,
            encodeUTF8: encodeUTF8
        });
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('mixins/observers', ['kendo.core'], f);
}(function () {
    (function ($) {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend, inArray = $.inArray;
        var ObserversMixin = {
            observers: function () {
                this._observers = this._observers || [];
                return this._observers;
            },
            addObserver: function (element) {
                if (!this._observers) {
                    this._observers = [element];
                } else {
                    this._observers.push(element);
                }
                return this;
            },
            removeObserver: function (element) {
                var observers = this.observers();
                var index = inArray(element, observers);
                if (index != -1) {
                    observers.splice(index, 1);
                }
                return this;
            },
            trigger: function (methodName, event) {
                var observers = this._observers;
                var observer;
                var idx;
                if (observers && !this._suspended) {
                    for (idx = 0; idx < observers.length; idx++) {
                        observer = observers[idx];
                        if (observer[methodName]) {
                            observer[methodName](event);
                        }
                    }
                }
                return this;
            },
            optionsChange: function (e) {
                e = e || {};
                e.element = this;
                this.trigger('optionsChange', e);
            },
            geometryChange: function () {
                this.trigger('geometryChange', { element: this });
            },
            suspend: function () {
                this._suspended = (this._suspended || 0) + 1;
                return this;
            },
            resume: function () {
                this._suspended = math.max((this._suspended || 0) - 1, 0);
                return this;
            },
            _observerField: function (field, value) {
                if (this[field]) {
                    this[field].removeObserver(this);
                }
                this[field] = value;
                value.addObserver(this);
            }
        };
        deepExtend(kendo, { mixins: { ObserversMixin: ObserversMixin } });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.dataviz.treemap', [
        'kendo.data',
        'kendo.userevents',
        'kendo.dataviz.themes'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.treeMap',
        name: 'TreeMap',
        category: 'dataviz',
        description: 'The Kendo DataViz TreeMap',
        depends: [
            'data',
            'userevents',
            'dataviz.themes'
        ]
    };
    (function ($, undefined) {
        var math = Math, proxy = $.proxy, isArray = $.isArray, kendo = window.kendo, outerHeight = kendo._outerHeight, outerWidth = kendo._outerWidth, Class = kendo.Class, Widget = kendo.ui.Widget, template = kendo.template, deepExtend = kendo.deepExtend, HierarchicalDataSource = kendo.data.HierarchicalDataSource, getter = kendo.getter, dataviz = kendo.dataviz;
        var NS = '.kendoTreeMap', CHANGE = 'change', DATA_BOUND = 'dataBound', ITEM_CREATED = 'itemCreated', MAX_VALUE = Number.MAX_VALUE, MOUSEOVER_NS = 'mouseover' + NS, MOUSELEAVE_NS = 'mouseleave' + NS, UNDEFINED = 'undefined';
        var TreeMap = Widget.extend({
            init: function (element, options) {
                kendo.destroy(element);
                $(element).empty();
                Widget.fn.init.call(this, element, options);
                this.wrapper = this.element;
                this._initTheme(this.options);
                this.element.addClass('k-widget k-treemap');
                this._setLayout();
                this._originalOptions = deepExtend({}, this.options);
                this._initDataSource();
                this._attachEvents();
                kendo.notify(this, dataviz.ui);
            },
            options: {
                name: 'TreeMap',
                theme: 'default',
                autoBind: true,
                textField: 'text',
                valueField: 'value',
                colorField: 'color'
            },
            events: [
                DATA_BOUND,
                ITEM_CREATED
            ],
            _initTheme: function (options) {
                var that = this, themes = dataviz.ui.themes || {}, themeName = ((options || {}).theme || '').toLowerCase(), themeOptions = (themes[themeName] || {}).treeMap;
                that.options = deepExtend({}, themeOptions, options);
            },
            _attachEvents: function () {
                this.element.on(MOUSEOVER_NS, proxy(this._mouseover, this)).on(MOUSELEAVE_NS, proxy(this._mouseleave, this));
                this._resizeHandler = proxy(this.resize, this, false);
                kendo.onResize(this._resizeHandler);
            },
            _setLayout: function () {
                if (this.options.type === 'horizontal') {
                    this._layout = new SliceAndDice(false);
                    this._view = new SliceAndDiceView(this, this.options);
                } else if (this.options.type === 'vertical') {
                    this._layout = new SliceAndDice(true);
                    this._view = new SliceAndDiceView(this, this.options);
                } else {
                    this._layout = new Squarified();
                    this._view = new SquarifiedView(this, this.options);
                }
            },
            _initDataSource: function () {
                var that = this, options = that.options, dataSource = options.dataSource;
                that._dataChangeHandler = proxy(that._onDataChange, that);
                that.dataSource = HierarchicalDataSource.create(dataSource).bind(CHANGE, that._dataChangeHandler);
                if (dataSource) {
                    if (that.options.autoBind) {
                        that.dataSource.fetch();
                    }
                }
            },
            setDataSource: function (dataSource) {
                var that = this;
                that.dataSource.unbind(CHANGE, that._dataChangeHandler);
                that.dataSource = dataSource.bind(CHANGE, that._dataChangeHandler);
                if (dataSource) {
                    if (that.options.autoBind) {
                        that.dataSource.fetch();
                    }
                }
            },
            _onDataChange: function (e) {
                var node = e.node;
                var items = e.items;
                var options = this.options;
                var item, i;
                if (!node) {
                    this._cleanItems();
                    this.element.empty();
                    item = this._wrapItem(items[0]);
                    this._layout.createRoot(item, outerWidth(this.element), outerHeight(this.element), this.options.type === 'vertical');
                    this._view.createRoot(item);
                    this._root = item;
                    this._colorIdx = 0;
                } else {
                    if (items.length) {
                        var root = this._getByUid(node.uid);
                        root.children = [];
                        items = new kendo.data.Query(items)._sortForGrouping(options.valueField, 'desc');
                        for (i = 0; i < items.length; i++) {
                            item = items[i];
                            root.children.push(this._wrapItem(item));
                        }
                        var htmlSize = this._view.htmlSize(root);
                        this._layout.compute(root.children, root.coord, htmlSize);
                        this._setColors(root.children);
                        this._view.render(root);
                    }
                }
                for (i = 0; i < items.length; i++) {
                    items[i].load();
                }
                if (node) {
                    this.trigger(DATA_BOUND, { node: node });
                }
            },
            _cleanItems: function () {
                var that = this;
                that.angular('cleanup', function () {
                    return { elements: that.element.find('.k-leaf div,.k-treemap-title,.k-treemap-title-vertical') };
                });
            },
            _setColors: function (items) {
                var colors = this.options.colors;
                var colorIdx = this._colorIdx;
                var color = colors[colorIdx % colors.length];
                var colorRange, item;
                if (isArray(color)) {
                    colorRange = colorsByLength(color[0], color[1], items.length);
                }
                var leafNodes = false;
                for (var i = 0; i < items.length; i++) {
                    item = items[i];
                    if (!defined(item.color)) {
                        if (colorRange) {
                            item.color = colorRange[i];
                        } else {
                            item.color = color;
                        }
                    }
                    if (!item.dataItem.hasChildren) {
                        leafNodes = true;
                    }
                }
                if (leafNodes) {
                    this._colorIdx++;
                }
            },
            _contentSize: function (root) {
                this.view.renderHeight(root);
            },
            _wrapItem: function (item) {
                var wrap = {};
                if (defined(this.options.valueField)) {
                    wrap.value = getField(this.options.valueField, item);
                }
                if (defined(this.options.colorField)) {
                    wrap.color = getField(this.options.colorField, item);
                }
                if (defined(this.options.textField)) {
                    wrap.text = getField(this.options.textField, item);
                }
                wrap.level = item.level();
                wrap.dataItem = item;
                return wrap;
            },
            _getByUid: function (uid) {
                var items = [this._root];
                var item;
                while (items.length) {
                    item = items.pop();
                    if (item.dataItem.uid === uid) {
                        return item;
                    }
                    if (item.children) {
                        items = items.concat(item.children);
                    }
                }
            },
            dataItem: function (node) {
                var uid = $(node).attr(kendo.attr('uid')), dataSource = this.dataSource;
                return dataSource && dataSource.getByUid(uid);
            },
            findByUid: function (uid) {
                return this.element.find('.k-treemap-tile[' + kendo.attr('uid') + '=\'' + uid + '\']');
            },
            _mouseover: function (e) {
                var target = $(e.target);
                if (target.hasClass('k-leaf')) {
                    this._removeActiveState();
                    target.removeClass('k-state-hover').addClass('k-state-hover');
                }
            },
            _removeActiveState: function () {
                this.element.find('.k-state-hover').removeClass('k-state-hover');
            },
            _mouseleave: function () {
                this._removeActiveState();
            },
            destroy: function () {
                Widget.fn.destroy.call(this);
                this.element.off(NS);
                if (this.dataSource) {
                    this.dataSource.unbind(CHANGE, this._dataChangeHandler);
                }
                this._root = null;
                kendo.unbindResize(this._resizeHandler);
                kendo.destroy(this.element);
            },
            items: function () {
                return $();
            },
            getSize: function () {
                return kendo.dimensions(this.element);
            },
            _resize: function () {
                var root = this._root;
                if (root) {
                    var element = this.element;
                    var rootElement = element.children();
                    root.coord.width = outerWidth(element);
                    root.coord.height = outerHeight(element);
                    rootElement.css({
                        width: root.coord.width,
                        height: root.coord.height
                    });
                    this._resizeItems(root, rootElement);
                }
            },
            _resizeItems: function (root, element) {
                if (root.children && root.children.length) {
                    var elements = element.children('.k-treemap-wrap').children();
                    var child, childElement;
                    this._layout.compute(root.children, root.coord, { text: this._view.titleSize(root, element) });
                    for (var idx = 0; idx < root.children.length; idx++) {
                        child = root.children[idx];
                        childElement = elements.filter('[' + kendo.attr('uid') + '=\'' + child.dataItem.uid + '\']');
                        this._view.setItemSize(child, childElement);
                        this._resizeItems(child, childElement);
                    }
                }
            },
            setOptions: function (options) {
                var dataSource = options.dataSource;
                options.dataSource = undefined;
                this._originalOptions = deepExtend(this._originalOptions, options);
                this.options = deepExtend({}, this._originalOptions);
                this._setLayout();
                this._initTheme(this.options);
                Widget.fn._setEvents.call(this, options);
                if (dataSource) {
                    this.setDataSource(HierarchicalDataSource.create(dataSource));
                }
                if (this.options.autoBind) {
                    this.dataSource.fetch();
                }
            }
        });
        var Squarified = Class.extend({
            createRoot: function (root, width, height) {
                root.coord = {
                    width: width,
                    height: height,
                    top: 0,
                    left: 0
                };
            },
            leaf: function (tree) {
                return !tree.children;
            },
            layoutChildren: function (items, coord) {
                var parentArea = coord.width * coord.height;
                var totalArea = 0, itemsArea = [], i;
                for (i = 0; i < items.length; i++) {
                    itemsArea[i] = parseFloat(items[i].value);
                    totalArea += itemsArea[i];
                }
                for (i = 0; i < itemsArea.length; i++) {
                    items[i].area = parentArea * itemsArea[i] / totalArea;
                }
                var minimumSideValue = this.layoutHorizontal() ? coord.height : coord.width;
                var firstElement = [items[0]];
                var tail = items.slice(1);
                this.squarify(tail, firstElement, minimumSideValue, coord);
            },
            squarify: function (tail, initElement, width, coord) {
                this.computeDim(tail, initElement, width, coord);
            },
            computeDim: function (tail, initElement, width, coord) {
                if (tail.length + initElement.length == 1) {
                    var element = tail.length == 1 ? tail : initElement;
                    this.layoutLast(element, width, coord);
                    return;
                }
                if (tail.length >= 2 && initElement.length === 0) {
                    initElement = [tail[0]];
                    tail = tail.slice(1);
                }
                if (tail.length === 0) {
                    if (initElement.length > 0) {
                        this.layoutRow(initElement, width, coord);
                    }
                    return;
                }
                var firstElement = tail[0];
                if (this.worstAspectRatio(initElement, width) >= this.worstAspectRatio([firstElement].concat(initElement), width)) {
                    this.computeDim(tail.slice(1), initElement.concat([firstElement]), width, coord);
                } else {
                    var newCoords = this.layoutRow(initElement, width, coord);
                    this.computeDim(tail, [], newCoords.dim, newCoords);
                }
            },
            layoutLast: function (items, w, coord) {
                items[0].coord = coord;
            },
            layoutRow: function (items, width, coord) {
                if (this.layoutHorizontal()) {
                    return this.layoutV(items, width, coord);
                } else {
                    return this.layoutH(items, width, coord);
                }
            },
            orientation: 'h',
            layoutVertical: function () {
                return this.orientation === 'v';
            },
            layoutHorizontal: function () {
                return this.orientation === 'h';
            },
            layoutChange: function () {
                this.orientation = this.layoutVertical() ? 'h' : 'v';
            },
            worstAspectRatio: function (items, width) {
                if (!items || items.length === 0) {
                    return MAX_VALUE;
                }
                var areaSum = 0, maxArea = 0, minArea = MAX_VALUE;
                for (var i = 0; i < items.length; i++) {
                    var area = items[i].area;
                    areaSum += area;
                    minArea = minArea < area ? minArea : area;
                    maxArea = maxArea > area ? maxArea : area;
                }
                return math.max(width * width * maxArea / (areaSum * areaSum), areaSum * areaSum / (width * width * minArea));
            },
            compute: function (children, rootCoord, htmlSize) {
                if (!(rootCoord.width >= rootCoord.height && this.layoutHorizontal())) {
                    this.layoutChange();
                }
                if (children && children.length > 0) {
                    var newRootCoord = {
                        width: rootCoord.width,
                        height: rootCoord.height - htmlSize.text,
                        top: 0,
                        left: 0
                    };
                    this.layoutChildren(children, newRootCoord);
                }
            },
            layoutV: function (items, width, coord) {
                var totalArea = this._totalArea(items), top = 0;
                width = round(totalArea / width);
                for (var i = 0; i < items.length; i++) {
                    var height = round(items[i].area / width);
                    items[i].coord = {
                        height: height,
                        width: width,
                        top: coord.top + top,
                        left: coord.left
                    };
                    top += height;
                }
                var ans = {
                    height: coord.height,
                    width: coord.width - width,
                    top: coord.top,
                    left: coord.left + width
                };
                ans.dim = math.min(ans.width, ans.height);
                if (ans.dim != ans.height) {
                    this.layoutChange();
                }
                return ans;
            },
            layoutH: function (items, width, coord) {
                var totalArea = this._totalArea(items);
                var height = round(totalArea / width), top = coord.top, left = 0;
                for (var i = 0; i < items.length; i++) {
                    items[i].coord = {
                        height: height,
                        width: round(items[i].area / height),
                        top: top,
                        left: coord.left + left
                    };
                    left += items[i].coord.width;
                }
                var ans = {
                    height: coord.height - height,
                    width: coord.width,
                    top: coord.top + height,
                    left: coord.left
                };
                ans.dim = math.min(ans.width, ans.height);
                if (ans.dim != ans.width) {
                    this.layoutChange();
                }
                return ans;
            },
            _totalArea: function (items) {
                var total = 0;
                for (var i = 0; i < items.length; i++) {
                    total += items[i].area;
                }
                return total;
            }
        });
        var SquarifiedView = Class.extend({
            init: function (treeMap, options) {
                this.options = deepExtend({}, this.options, options);
                this.treeMap = treeMap;
                this.element = $(treeMap.element);
                this.offset = 0;
            },
            titleSize: function (item, element) {
                var text = element.children('.k-treemap-title');
                return text.height();
            },
            htmlSize: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var htmlSize = { text: 0 };
                if (root.children) {
                    this._clean(rootElement);
                    var text = this._getText(root);
                    if (text) {
                        var title = this._createTitle(root);
                        rootElement.append(title);
                        this._compile(title, root.dataItem);
                        htmlSize.text = title.height();
                    }
                    rootElement.append(this._createWrap());
                    this.offset = (outerWidth(rootElement) - rootElement.innerWidth()) / 2;
                }
                return htmlSize;
            },
            _compile: function (element, dataItem) {
                this.treeMap.angular('compile', function () {
                    return {
                        elements: element,
                        data: [{ dataItem: dataItem }]
                    };
                });
            },
            _getByUid: function (uid) {
                return this.element.find('.k-treemap-tile[' + kendo.attr('uid') + '=\'' + uid + '\']');
            },
            render: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var children = root.children;
                if (children) {
                    var rootWrap = rootElement.find('.k-treemap-wrap');
                    for (var i = 0; i < children.length; i++) {
                        var leaf = children[i];
                        var htmlElement = this._createLeaf(leaf);
                        rootWrap.append(htmlElement);
                        this._compile(htmlElement.children(), leaf.dataItem);
                        this.treeMap.trigger(ITEM_CREATED, { element: htmlElement });
                    }
                }
            },
            createRoot: function (root) {
                var htmlElement = this._createLeaf(root);
                this.element.append(htmlElement);
                this._compile(htmlElement.children(), root.dataItem);
                this.treeMap.trigger(ITEM_CREATED, { element: htmlElement });
            },
            _clean: function (root) {
                this.treeMap.angular('cleanup', function () {
                    return { elements: root.children(':not(.k-treemap-wrap)') };
                });
                root.css('background-color', '');
                root.removeClass('k-leaf');
                root.removeClass('k-inverse');
                root.empty();
            },
            _createLeaf: function (item) {
                return this._createTile(item).css('background-color', item.color).addClass('k-leaf').toggleClass('k-inverse', this._tileColorBrightness(item) > 180).append($('<div></div>').html(this._getText(item)));
            },
            _createTile: function (item) {
                var tile = $('<div class=\'k-treemap-tile\'></div>');
                this.setItemSize(item, tile);
                if (defined(item.dataItem) && defined(item.dataItem.uid)) {
                    tile.attr(kendo.attr('uid'), item.dataItem.uid);
                }
                return tile;
            },
            _itemCoordinates: function (item) {
                var coordinates = {
                    width: item.coord.width,
                    height: item.coord.height,
                    left: item.coord.left,
                    top: item.coord.top
                };
                if (coordinates.left && this.offset) {
                    coordinates.width += this.offset * 2;
                } else {
                    coordinates.width += this.offset;
                }
                if (coordinates.top) {
                    coordinates.height += this.offset * 2;
                } else {
                    coordinates.height += this.offset;
                }
                return coordinates;
            },
            setItemSize: function (item, element) {
                var coordinates = this._itemCoordinates(item);
                element.css({
                    width: coordinates.width,
                    height: coordinates.height,
                    left: coordinates.left,
                    top: coordinates.top
                });
            },
            _getText: function (item) {
                var text = item.text;
                if (this.options.template) {
                    text = this._renderTemplate(item);
                }
                return text;
            },
            _renderTemplate: function (item) {
                var titleTemplate = template(this.options.template);
                return titleTemplate({
                    dataItem: item.dataItem,
                    text: item.text
                });
            },
            _createTitle: function (item) {
                return $('<div class=\'k-treemap-title\'></div>').append($('<div></div>').html(this._getText(item)));
            },
            _createWrap: function () {
                return $('<div class=\'k-treemap-wrap\'></div>');
            },
            _tileColorBrightness: function (item) {
                return colorBrightness(item.color);
            }
        });
        var SliceAndDice = Class.extend({
            createRoot: function (root, width, height, vertical) {
                root.coord = {
                    width: width,
                    height: height,
                    top: 0,
                    left: 0
                };
                root.vertical = vertical;
            },
            init: function (vertical) {
                this.vertical = vertical;
                this.quotient = vertical ? 1 : 0;
            },
            compute: function (children, rootCoord, htmlSize) {
                if (children.length > 0) {
                    var width = rootCoord.width;
                    var height = rootCoord.height;
                    if (this.vertical) {
                        height -= htmlSize.text;
                    } else {
                        width -= htmlSize.text;
                    }
                    var newRootCoord = {
                        width: width,
                        height: height,
                        top: 0,
                        left: 0
                    };
                    this.layoutChildren(children, newRootCoord);
                }
            },
            layoutChildren: function (items, coord) {
                var parentArea = coord.width * coord.height;
                var totalArea = 0;
                var itemsArea = [];
                var i;
                for (i = 0; i < items.length; i++) {
                    var item = items[i];
                    itemsArea[i] = parseFloat(items[i].value);
                    totalArea += itemsArea[i];
                    item.vertical = this.vertical;
                }
                for (i = 0; i < itemsArea.length; i++) {
                    items[i].area = parentArea * itemsArea[i] / totalArea;
                }
                this.sliceAndDice(items, coord);
            },
            sliceAndDice: function (items, coord) {
                var totalArea = this._totalArea(items);
                if (items[0].level % 2 === this.quotient) {
                    this.layoutHorizontal(items, coord, totalArea);
                } else {
                    this.layoutVertical(items, coord, totalArea);
                }
            },
            layoutHorizontal: function (items, coord, totalArea) {
                var left = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var width = item.area / (totalArea / coord.width);
                    item.coord = {
                        height: coord.height,
                        width: width,
                        top: coord.top,
                        left: coord.left + left
                    };
                    left += width;
                }
            },
            layoutVertical: function (items, coord, totalArea) {
                var top = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var height = item.area / (totalArea / coord.height);
                    item.coord = {
                        height: height,
                        width: coord.width,
                        top: coord.top + top,
                        left: coord.left
                    };
                    top += height;
                }
            },
            _totalArea: function (items) {
                var total = 0;
                for (var i = 0; i < items.length; i++) {
                    total += items[i].area;
                }
                return total;
            }
        });
        var SliceAndDiceView = SquarifiedView.extend({
            htmlSize: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var htmlSize = {
                    text: 0,
                    offset: 0
                };
                if (root.children) {
                    this._clean(rootElement);
                    var text = this._getText(root);
                    if (text) {
                        var title = this._createTitle(root);
                        rootElement.append(title);
                        this._compile(title, root.dataItem);
                        if (root.vertical) {
                            htmlSize.text = title.height();
                        } else {
                            htmlSize.text = title.width();
                        }
                    }
                    rootElement.append(this._createWrap());
                    this.offset = (outerWidth(rootElement) - rootElement.innerWidth()) / 2;
                }
                return htmlSize;
            },
            titleSize: function (item, element) {
                var size;
                if (item.vertical) {
                    size = element.children('.k-treemap-title').height();
                } else {
                    size = element.children('.k-treemap-title-vertical').width();
                }
                return size;
            },
            _createTitle: function (item) {
                var title;
                if (item.vertical) {
                    title = $('<div class=\'k-treemap-title\'></div>');
                } else {
                    title = $('<div class=\'k-treemap-title-vertical\'></div>');
                }
                return title.append($('<div></div>').html(this._getText(item)));
            }
        });
        function getField(field, row) {
            if (row === null) {
                return row;
            }
            var get = getter(field, true);
            return get(row);
        }
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        function colorsByLength(min, max, length) {
            var minRGBtoDecimal = rgbToDecimal(min);
            var maxRGBtoDecimal = rgbToDecimal(max);
            var isDarker = colorBrightness(min) - colorBrightness(max) < 0;
            var colors = [];
            colors.push(min);
            for (var i = 0; i < length; i++) {
                var rgbColor = {
                    r: colorByIndex(minRGBtoDecimal.r, maxRGBtoDecimal.r, i, length, isDarker),
                    g: colorByIndex(minRGBtoDecimal.g, maxRGBtoDecimal.g, i, length, isDarker),
                    b: colorByIndex(minRGBtoDecimal.b, maxRGBtoDecimal.b, i, length, isDarker)
                };
                colors.push(buildColorFromRGB(rgbColor));
            }
            colors.push(max);
            return colors;
        }
        function colorByIndex(min, max, index, length, isDarker) {
            var minColor = math.min(math.abs(min), math.abs(max));
            var maxColor = math.max(math.abs(min), math.abs(max));
            var step = (maxColor - minColor) / (length + 1);
            var currentStep = step * (index + 1);
            var color;
            if (isDarker) {
                color = minColor + currentStep;
            } else {
                color = maxColor - currentStep;
            }
            return color;
        }
        function buildColorFromRGB(color) {
            return '#' + decimalToRgb(color.r) + decimalToRgb(color.g) + decimalToRgb(color.b);
        }
        function rgbToDecimal(color) {
            color = color.replace('#', '');
            var rgbColor = colorToRGB(color);
            return {
                r: rgbToHex(rgbColor.r),
                g: rgbToHex(rgbColor.g),
                b: rgbToHex(rgbColor.b)
            };
        }
        function decimalToRgb(number) {
            var result = math.round(number).toString(16).toUpperCase();
            if (result.length === 1) {
                result = '0' + result;
            }
            return result;
        }
        function colorToRGB(color) {
            var colorLength = color.length;
            var rgbColor = {};
            if (colorLength === 3) {
                rgbColor.r = color[0];
                rgbColor.g = color[1];
                rgbColor.b = color[2];
            } else {
                rgbColor.r = color.substring(0, 2);
                rgbColor.g = color.substring(2, 4);
                rgbColor.b = color.substring(4, 6);
            }
            return rgbColor;
        }
        function rgbToHex(rgb) {
            return parseInt(rgb.toString(16), 16);
        }
        function colorBrightness(color) {
            var brightness = 0;
            if (color) {
                color = rgbToDecimal(color);
                brightness = math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
            }
            return brightness;
        }
        function round(value) {
            var power = math.pow(10, 4);
            return math.round(value * power) / power;
        }
        dataviz.ui.plugin(TreeMap);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));