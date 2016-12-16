/** 
 * Kendo UI v2016.3.1216 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
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
    define('kendo.dataviz.gauge', [
        'kendo.dataviz.core',
        'kendo.drawing',
        'kendo.dataviz.themes'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.gauge',
        name: 'Gauge',
        category: 'dataviz',
        description: 'Radial and Linear gauges.',
        depends: [
            'dataviz.core',
            'dataviz.themes'
        ]
    };
    (function ($, undefined) {
        var math = Math, kendo = window.kendo, util = kendo.util, Widget = kendo.ui.Widget, deepExtend = kendo.deepExtend, dataviz = kendo.dataviz, autoMajorUnit = dataviz.autoMajorUnit, ChartElement = dataviz.ChartElement, NumericAxis = dataviz.NumericAxis, Axis = dataviz.Axis, Box2D = dataviz.Box2D, Class = kendo.Class, defined = util.defined, isNumber = util.isNumber, interpolateValue = dataviz.interpolateValue, getSpacing = dataviz.getSpacing, round = dataviz.round, geo = dataviz.geometry, draw = dataviz.drawing, Point = geo.Point, Group = draw.Group, Path = draw.Path, Rect = geo.Rect, Text = draw.Text;
        var ANGULAR_SPEED = 150, LINEAR_SPEED = 250, ARROW = 'arrow', ARROW_POINTER = 'arrowPointer', BAR_POINTER = 'barPointer', BLACK = '#000', CAP_SIZE = 0.05, COORD_PRECISION = dataviz.COORD_PRECISION, MAX_VALUE = Number.MAX_VALUE, MIN_VALUE = -Number.MAX_VALUE, DEFAULT_HEIGHT = 200, DEFAULT_LINE_WIDTH = 0.5, DEFAULT_WIDTH = 200, DEFAULT_MIN_WIDTH = 60, DEFAULT_MIN_HEIGHT = 60, DEFAULT_MARGIN = 5, DEGREE = math.PI / 180, GEO_ARC_ADJUST_ANGLE = 180, INSIDE = 'inside', LINEAR = 'linear', NEEDLE = 'needle', OUTSIDE = 'outside', RADIAL_POINTER = 'radialPointer', X = 'x', Y = 'y';
        var Pointer = Class.extend({
            init: function (scale, options) {
                var pointer = this;
                var scaleOptions = scale.options;
                ChartElement.fn.init.call(pointer, options);
                options = pointer.options;
                options.fill = options.color;
                pointer.scale = scale;
                if (defined(options.value)) {
                    options.value = math.min(math.max(options.value, scaleOptions.min), scaleOptions.max);
                } else {
                    options.value = scaleOptions.min;
                }
            },
            options: { color: BLACK },
            value: function (newValue) {
                var that = this;
                var options = that.options;
                var value = options.value;
                var scaleOptions = that.scale.options;
                if (arguments.length === 0) {
                    return value;
                }
                options._oldValue = options._oldValue !== undefined ? options.value : scaleOptions.min;
                options.value = math.min(math.max(newValue, scaleOptions.min), scaleOptions.max);
                if (that.elements) {
                    that.repaint();
                }
            }
        });
        var RadialPointer = Pointer.extend({
            options: {
                shape: NEEDLE,
                cap: { size: CAP_SIZE },
                arrow: {
                    width: 16,
                    height: 14
                },
                animation: {
                    type: RADIAL_POINTER,
                    duration: ANGULAR_SPEED
                }
            },
            setRadius: function (radius) {
                var that = this;
                if (radius) {
                    that.elements.clear();
                    that.render(that.parent, that.center, radius);
                }
            },
            setAngle: function (angle) {
                this.elements.transform(geo.transform().rotate(angle, this.center));
            },
            repaint: function () {
                var that = this;
                var scale = that.scale;
                var options = that.options;
                var oldAngle = scale.slotAngle(options._oldValue);
                var newAngle = scale.slotAngle(options.value);
                if (options.animation.transitions === false) {
                    that.setAngle(newAngle);
                } else {
                    new RadialPointerAnimation(that.elements, deepExtend(options.animation, {
                        oldAngle: oldAngle,
                        newAngle: newAngle
                    })).play();
                }
            },
            render: function () {
                var that = this;
                var scale = that.scale;
                var center = scale.arc.center;
                var options = that.options;
                var elements = new Group();
                if (options.animation !== false) {
                    deepExtend(options.animation, {
                        startAngle: 0,
                        center: center,
                        reverse: scale.options.reverse
                    });
                }
                if (options.shape === NEEDLE) {
                    elements.append(that._renderNeedle(), that._renderCap());
                } else {
                    elements.append(that._renderArrow());
                }
                that.elements = elements;
                that.setAngle(DEGREE);
                return elements;
            },
            reflow: function (arc) {
                var that = this;
                var center = that.center = arc.center;
                var radius = that.radius = arc.getRadiusX();
                var capSize = that.capSize = Math.round(radius * that.options.cap.size);
                that.bbox = Rect.fromPoints(new Point(center.x - capSize, center.y - capSize), new Point(center.x + capSize, center.y + capSize));
            },
            _renderNeedle: function () {
                var that = this;
                var options = that.options;
                var minorTickSize = that.scale.options.minorTicks.size;
                var center = that.center;
                var needleColor = options.color;
                var needlePath = new Path({
                    fill: { color: needleColor },
                    stroke: {
                        color: needleColor,
                        width: DEFAULT_LINE_WIDTH
                    }
                });
                needlePath.moveTo(center.x + that.radius - minorTickSize, center.y).lineTo(center.x, center.y - that.capSize / 2).lineTo(center.x, center.y + that.capSize / 2).close();
                return needlePath;
            },
            _renderCap: function () {
                var that = this;
                var options = that.options;
                var capColor = options.cap.color || options.color;
                var circle = new geo.Circle(that.center, that.capSize);
                var cap = new draw.Circle(circle, {
                    fill: { color: capColor },
                    stroke: { color: capColor }
                });
                return cap;
            }
        });
        var RadialScale = NumericAxis.extend({
            init: function (options) {
                var scale = this;
                scale.options = deepExtend({}, scale.options, options);
                scale.options.majorUnit = scale.options.majorUnit || autoMajorUnit(scale.options.min, scale.options.max);
                scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
                Axis.fn.init.call(scale, scale.options);
            },
            options: {
                min: 0,
                max: 100,
                majorTicks: {
                    size: 15,
                    align: INSIDE,
                    color: BLACK,
                    width: DEFAULT_LINE_WIDTH,
                    visible: true
                },
                minorTicks: {
                    size: 10,
                    align: INSIDE,
                    color: BLACK,
                    width: DEFAULT_LINE_WIDTH,
                    visible: true
                },
                startAngle: -30,
                endAngle: 210,
                labels: {
                    position: INSIDE,
                    padding: 2
                }
            },
            render: function (center, radius) {
                var that = this;
                var arc = that.renderArc(center, radius);
                that.bbox = arc.bbox();
                that.labelElements = that.renderLabels();
                that.ticks = that.renderTicks();
                that.ranges = that.renderRanges();
            },
            reflow: function (bbox) {
                var that = this;
                var center = bbox.center();
                var radius = math.min(bbox.height(), bbox.width()) / 2;
                if (that.bbox !== undefined) {
                    that.bbox = that.arc.bbox();
                    that.radius(that.arc.getRadiusX());
                    that.repositionRanges();
                    that.renderLabels();
                } else {
                    return that.render(center, radius);
                }
            },
            slotAngle: function (value) {
                var options = this.options;
                var startAngle = options.startAngle;
                var reverse = options.reverse;
                var angle = options.endAngle - startAngle;
                var min = options.min;
                var max = options.max;
                var result;
                if (reverse) {
                    result = options.endAngle - (value - min) / (max - min) * angle;
                } else {
                    result = (value - min) / (max - min) * angle + startAngle;
                }
                return result + GEO_ARC_ADJUST_ANGLE;
            },
            renderLabels: function () {
                var that = this;
                var options = that.options;
                var majorTickSize = options.majorTicks.size;
                var arc = that.arc.clone();
                var radius = arc.getRadiusX();
                var tickAngles = that.tickAngles(arc, options.majorUnit);
                var labels = that.labels;
                var count = labels.length;
                var labelsOptions = options.labels;
                var padding = labelsOptions.padding;
                var rangeDistance = radius * 0.05;
                var rangeSize = options.rangeSize = options.rangeSize || radius * 0.1;
                var ranges = options.ranges || [];
                var halfWidth, halfHeight, labelAngle;
                var angle, label, lp, i, cx, cy, isInside;
                var labelsGroup = new Group();
                var lbl, labelPos, prevLabelPos, labelTransform;
                if (that.options.rangeDistance !== undefined) {
                    rangeDistance = that.options.rangeDistance;
                } else {
                    that.options.rangeDistance = rangeDistance;
                }
                if (labelsOptions.position === INSIDE) {
                    radius -= majorTickSize;
                    if (ranges.length && that.labelElements === undefined) {
                        radius -= rangeSize + rangeDistance;
                    }
                    arc.setRadiusX(radius).setRadiusY(radius);
                }
                for (i = 0; i < count; i++) {
                    label = labels[i];
                    halfWidth = label.box.width() / 2;
                    halfHeight = label.box.height() / 2;
                    angle = tickAngles[i];
                    labelAngle = (angle - GEO_ARC_ADJUST_ANGLE) * DEGREE;
                    isInside = labelsOptions.position === INSIDE;
                    lp = arc.pointAt(angle);
                    cx = lp.x + math.cos(labelAngle) * (halfWidth + padding) * (isInside ? 1 : -1);
                    cy = lp.y + math.sin(labelAngle) * (halfHeight + padding) * (isInside ? 1 : -1);
                    label.reflow(new dataviz.Box2D(cx - halfWidth, cy - halfHeight, cx + halfWidth, cy + halfHeight));
                    labelPos = new Point(label.box.x1, label.box.y1);
                    if (that.labelElements === undefined) {
                        lbl = _buildLabel(label, options.labels);
                        labelsGroup.append(lbl);
                    } else {
                        lbl = that.labelElements.children[i];
                        prevLabelPos = lbl.bbox().origin;
                        labelTransform = lbl.transform() || geo.transform();
                        labelTransform.translate(labelPos.x - prevLabelPos.x, labelPos.y - prevLabelPos.y);
                        lbl.transform(labelTransform);
                    }
                    that.bbox = Rect.union(that.bbox, lbl.bbox());
                }
                return labelsGroup;
            },
            repositionRanges: function () {
                var that = this;
                var ranges = that.ranges.children;
                var rangeSize = that.options.rangeSize;
                var rangeDistance = that.options.rangeDistance;
                var rangeRadius, newRadius;
                if (ranges.length > 0) {
                    rangeRadius = that.getRangeRadius();
                    if (that.options.labels.position === INSIDE) {
                        rangeRadius += rangeSize + rangeDistance;
                    }
                    newRadius = rangeRadius + rangeSize / 2;
                    for (var i = 0; i < ranges.length; i++) {
                        ranges[i]._geometry.setRadiusX(newRadius).setRadiusY(newRadius);
                    }
                    that.bbox = Rect.union(that.bbox, that.ranges.bbox());
                }
            },
            renderRanges: function () {
                var that = this;
                var arc = that.arc;
                var result = new Group();
                var from, to;
                var segments = that.rangeSegments();
                var segmentsCount = segments.length;
                var reverse = that.options.reverse;
                var rangeSize = that.options.rangeSize;
                var rangeDistance = that.options.rangeDistance;
                var segment, rangeRadius, rangeGeom, i;
                if (segmentsCount) {
                    rangeRadius = that.getRangeRadius();
                    that.radius(that.radius() - rangeSize - rangeDistance);
                    for (i = 0; i < segmentsCount; i++) {
                        segment = segments[i];
                        from = that.slotAngle(segment[reverse ? 'to' : 'from']);
                        to = that.slotAngle(segment[!reverse ? 'to' : 'from']);
                        if (to - from !== 0) {
                            rangeGeom = new geo.Arc(arc.center, {
                                radiusX: rangeRadius + rangeSize / 2,
                                radiusY: rangeRadius + rangeSize / 2,
                                startAngle: from,
                                endAngle: to
                            });
                            result.append(new draw.Arc(rangeGeom, {
                                stroke: {
                                    width: rangeSize,
                                    color: segment.color,
                                    opacity: segment.opacity
                                }
                            }));
                        }
                    }
                }
                return result;
            },
            rangeSegments: function () {
                var gauge = this;
                var options = gauge.options;
                var ranges = options.ranges || [];
                var count = ranges.length;
                var range;
                var segmentsCount;
                var defaultColor = options.rangePlaceholderColor;
                var segments = [];
                var segment;
                var min = options.min;
                var max = options.max;
                var i, j;
                function rangeSegment(from, to, color, opacity) {
                    return {
                        from: from,
                        to: to,
                        color: color,
                        opacity: opacity
                    };
                }
                if (count) {
                    segments.push(rangeSegment(min, max, defaultColor));
                    for (i = 0; i < count; i++) {
                        range = getRange(ranges[i], min, max);
                        segmentsCount = segments.length;
                        for (j = 0; j < segmentsCount; j++) {
                            segment = segments[j];
                            if (segment.from <= range.from && range.from <= segment.to) {
                                segments.push(rangeSegment(range.from, range.to, range.color, range.opacity));
                                if (segment.from <= range.to && range.to <= segment.to) {
                                    segments.push(rangeSegment(range.to, segment.to, defaultColor, range.opacity));
                                }
                                segment.to = range.from;
                                break;
                            }
                        }
                    }
                }
                return segments;
            },
            getRangeRadius: function () {
                var that = this;
                var options = that.options;
                var majorTickSize = options.majorTicks.size;
                var rangeSize = options.rangeSize;
                var rangeDistance = options.rangeDistance;
                var arc = that.arc;
                var r;
                if (options.labels.position === OUTSIDE) {
                    r = arc.getRadiusX() - majorTickSize - rangeDistance - rangeSize;
                } else {
                    r = arc.getRadiusX() - rangeSize;
                }
                return r;
            },
            renderArc: function (center, radius) {
                var that = this;
                var options = that.options;
                var arc = that.arc = new geo.Arc(center, {
                    radiusX: radius,
                    radiusY: radius,
                    startAngle: options.startAngle + GEO_ARC_ADJUST_ANGLE,
                    endAngle: options.endAngle + GEO_ARC_ADJUST_ANGLE
                });
                return arc;
            },
            renderTicks: function () {
                var that = this;
                var arc = that.arc;
                var options = that.options;
                var labelsPosition = options.labels.position;
                var allTicks = new Group();
                var majorTickSize = options.majorTicks.size;
                var minorTickSize = options.minorTicks.size;
                var tickArc = arc.clone();
                var radius = tickArc.getRadiusX();
                function drawTicks(arc, tickAngles, unit, tickOptions) {
                    var ticks = new Group(), center = arc.center, radius = arc.getRadiusX(), i, tickStart, tickEnd, visible = tickOptions.visible;
                    if (visible) {
                        for (i = 0; i < tickAngles.length; i++) {
                            tickStart = arc.pointAt(tickAngles[i]);
                            tickEnd = new Point(center.x + radius - tickOptions.size, center.y).rotate(tickAngles[i], center);
                            ticks.append(new Path({
                                stroke: {
                                    color: tickOptions.color,
                                    width: tickOptions.width
                                }
                            }).moveTo(tickStart).lineTo(tickEnd));
                        }
                    }
                    return ticks;
                }
                that.majorTickAngles = that.tickAngles(arc, options.majorUnit);
                that.majorTicks = drawTicks(tickArc, that.majorTickAngles, options.majorUnit, options.majorTicks);
                allTicks.append(that.majorTicks);
                that._tickDifference = majorTickSize - minorTickSize;
                if (labelsPosition === OUTSIDE) {
                    tickArc.setRadiusX(radius - majorTickSize + minorTickSize).setRadiusY(radius - majorTickSize + minorTickSize);
                }
                that.minorTickAngles = that.normalizeTickAngles(that.tickAngles(arc, options.minorUnit));
                that.minorTicks = drawTicks(tickArc, that.minorTickAngles, options.minorUnit, options.minorTicks, options.majorUnit);
                allTicks.append(that.minorTicks);
                return allTicks;
            },
            normalizeTickAngles: function (angles) {
                var that = this;
                var options = that.options;
                var skip = options.majorUnit / options.minorUnit;
                for (var i = angles.length - 1; i >= 0; i--) {
                    if (i % skip === 0) {
                        angles.splice(i, 1);
                    }
                }
                return angles;
            },
            tickAngles: function (ring, stepValue) {
                var scale = this;
                var options = scale.options;
                var reverse = options.reverse;
                var range = options.max - options.min;
                var angle = ring.endAngle - ring.startAngle;
                var pos = ring.startAngle;
                var tickCount = range / stepValue;
                var step = angle / tickCount;
                var positions = [];
                var i;
                if (reverse) {
                    pos += angle;
                    step = -step;
                }
                for (i = 0; i < tickCount; i++) {
                    positions.push(round(pos, COORD_PRECISION));
                    pos += step;
                }
                if (round(pos) <= ring.endAngle) {
                    positions.push(pos);
                }
                return positions;
            },
            radius: function (radius) {
                var that = this;
                if (radius) {
                    that.arc.setRadiusX(radius).setRadiusY(radius);
                    that.repositionTicks(that.majorTicks.children, that.majorTickAngles);
                    that.repositionTicks(that.minorTicks.children, that.minorTickAngles, true);
                } else {
                    return that.arc.getRadiusX();
                }
            },
            repositionTicks: function (ticks, tickAngles, minor) {
                var that = this;
                var diff = minor ? that._tickDifference || 0 : 0;
                var tickArc = that.arc;
                var radius = tickArc.getRadiusX();
                if (minor && that.options.labels.position === OUTSIDE && diff !== 0) {
                    tickArc = that.arc.clone();
                    tickArc.setRadiusX(radius - diff).setRadiusY(radius - diff);
                }
                for (var i = 0; i < ticks.length; i++) {
                    var newPoint = tickArc.pointAt(tickAngles[i]);
                    var segments = ticks[i].segments;
                    var xDiff = newPoint.x - segments[0].anchor().x;
                    var yDiff = newPoint.y - segments[0].anchor().y;
                    ticks[i].transform(new geo.Transformation().translate(xDiff, yDiff));
                }
            }
        });
        var Gauge = Widget.extend({
            init: function (element, userOptions) {
                var gauge = this;
                var options;
                var themeOptions;
                var themeName;
                var themes = dataviz.ui.themes || {};
                var theme;
                kendo.destroy(element);
                $(element).empty();
                Widget.fn.init.call(gauge, element);
                gauge.wrapper = gauge.element;
                gauge._originalOptions = deepExtend({}, userOptions);
                options = deepExtend({}, gauge.options, userOptions);
                themeName = options.theme;
                theme = themes[themeName] || themes[themeName.toLowerCase()];
                themeOptions = themeName && theme ? theme.gauge : {};
                gauge.options = deepExtend({}, themeOptions, options);
                if ($.isArray(options.pointer)) {
                    for (var i = 0; i < options.pointer.length; i++) {
                        gauge.options.pointer[i] = deepExtend({}, themeOptions.pointer, options.pointer[i]);
                    }
                }
                gauge.element.addClass('k-gauge');
                gauge.surface = gauge._createSurface();
                gauge.redraw();
            },
            options: {
                plotArea: {},
                theme: 'default',
                renderAs: '',
                pointer: {},
                scale: {},
                gaugeArea: {}
            },
            destroy: function () {
                this.surface.destroy();
                Widget.fn.destroy.call(this);
            },
            value: function (value) {
                var that = this;
                var pointer = that.pointers[0];
                if (arguments.length === 0) {
                    return pointer.value();
                }
                pointer.value(value);
                that._setValueOptions(value);
            },
            _draw: function () {
                var surface = this.surface;
                surface.clear();
                surface.draw(this._visuals);
            },
            exportVisual: function () {
                return this._visuals;
            },
            allValues: function (values) {
                var that = this;
                var pointers = that.pointers;
                var allValues = [];
                var i;
                if (arguments.length === 0) {
                    for (i = 0; i < pointers.length; i++) {
                        allValues.push(pointers[i].value());
                    }
                    return allValues;
                }
                if ($.isArray(values)) {
                    for (i = 0; i < values.length; i++) {
                        if (isNumber(values[i])) {
                            pointers[i].value(values[i]);
                        }
                    }
                }
                that._setValueOptions(values);
            },
            _setValueOptions: function (values) {
                var pointers = [].concat(this.options.pointer);
                values = [].concat(values);
                for (var i = 0; i < values.length; i++) {
                    pointers[i].value = values[i];
                }
            },
            _resize: function () {
                var that = this;
                var t = that.options.transitions;
                var i;
                that.options.transitions = false;
                for (i = 0; i < that.pointers.length; i++) {
                    that.pointers[i].options.animation.transitions = false;
                }
                that.redraw();
                that.options.transitions = t;
                for (i = 0; i < that.pointers.length; i++) {
                    that.pointers[i].options.animation.transitions = t;
                }
            },
            redraw: function () {
                var that = this;
                var size = deepExtend(that._getSize(), that.options.gaugeArea);
                var wrapper = new Rect([
                    0,
                    0
                ], [
                    size.width,
                    size.height
                ]);
                var bbox;
                that.surface.clear();
                that.gaugeArea = that._createGaugeArea();
                that.surface.element.css({
                    width: size.width,
                    height: size.height
                });
                that._createModel();
                bbox = _unpad(wrapper.bbox(), that._gaugeAreaMargin);
                that.reflow(bbox);
            },
            _createGaugeArea: function () {
                var that = this;
                var options = that.options.gaugeArea;
                var size = that.surface.size();
                var border = options.border || {};
                var areaGeometry = new Rect([
                    0,
                    0
                ], [
                    size.width,
                    size.height
                ]);
                that._gaugeAreaMargin = options.margin || DEFAULT_MARGIN;
                if (border.width > 0) {
                    areaGeometry = _unpad(areaGeometry, border.width);
                }
                var gaugeArea = Path.fromRect(areaGeometry, {
                    stroke: {
                        color: border.width ? border.color : '',
                        width: border.width,
                        dashType: border.dashType,
                        lineJoin: 'round',
                        lineCap: 'round'
                    },
                    fill: { color: options.background }
                });
                return gaugeArea;
            },
            _createSurface: function () {
                var that = this;
                var options = that.options;
                var size = that._getSize();
                size = options.gaugeArea ? deepExtend(size, options.gaugeArea) : size;
                var wrap = $('<div></div>').appendTo(that.element).css({
                    width: size.width,
                    height: size.height
                });
                return new draw.Surface.create(wrap, { type: options.renderAs });
            },
            getSize: function () {
                return this._getSize();
            },
            _getSize: function () {
                var that = this;
                var element = that.element;
                var width = element.width();
                var height = element.height();
                if (!width) {
                    width = DEFAULT_WIDTH;
                }
                if (!height) {
                    height = DEFAULT_HEIGHT;
                }
                return {
                    width: width,
                    height: height
                };
            }
        });
        var RadialGauge = Gauge.extend({
            init: function (element, options) {
                var radialGauge = this;
                Gauge.fn.init.call(radialGauge, element, options);
                kendo.notify(radialGauge, dataviz.ui);
            },
            options: {
                name: 'RadialGauge',
                transitions: true,
                gaugeArea: { background: '' }
            },
            reflow: function (bbox) {
                var that = this;
                var pointers = that.pointers;
                that.scale.reflow(bbox);
                that._initialPlotArea = that.scale.bbox;
                for (var i = 0; i < pointers.length; i++) {
                    pointers[i].reflow(that.scale.arc);
                    that._initialPlotArea = Rect.union(that._initialPlotArea, pointers[i].bbox);
                }
                that.fitScale(bbox);
                that.alignScale(bbox);
                that._buildVisual(that.gaugeArea, pointers, that.scale);
                that._draw();
            },
            _buildVisual: function (gaugeArea, pointers, scale) {
                var visuals = new Group();
                var current;
                visuals.append(gaugeArea);
                visuals.append(scale.ticks);
                visuals.append(scale.ranges);
                for (var i = 0; i < pointers.length; i++) {
                    current = pointers[i];
                    current.render();
                    visuals.append(current.elements);
                    current.value(current.options.value);
                }
                visuals.append(scale.labelElements);
                this._visuals = visuals;
            },
            fitScale: function (bbox) {
                var that = this;
                var scale = that.scale;
                var arc = scale.arc;
                var plotAreaBox = that._initialPlotArea;
                var step = math.abs(that.getDiff(plotAreaBox, bbox));
                var min = round(step, COORD_PRECISION);
                var max = round(-step, COORD_PRECISION);
                var minDiff, midDiff, maxDiff, mid, oldDiff;
                var staleFlag = 0;
                var i = 0;
                while (i++ < 100) {
                    staleFlag = oldDiff === maxDiff ? staleFlag + 1 : 0;
                    if (staleFlag > 5) {
                        break;
                    }
                    if (min != mid) {
                        minDiff = that.getPlotBox(min, bbox, arc);
                        if (0 <= minDiff && minDiff <= 2) {
                            break;
                        }
                    }
                    if (max != mid) {
                        maxDiff = that.getPlotBox(max, bbox, arc);
                        if (0 <= maxDiff && maxDiff <= 2) {
                            break;
                        }
                    }
                    if (minDiff > 0 && maxDiff > 0) {
                        mid = min * 2;
                    } else if (minDiff < 0 && maxDiff < 0) {
                        mid = max * 2;
                    } else {
                        mid = round((min + max) / 2 || 1, COORD_PRECISION);
                    }
                    midDiff = that.getPlotBox(mid, bbox, arc);
                    if (0 <= midDiff && midDiff <= 2) {
                        break;
                    }
                    oldDiff = maxDiff;
                    if (midDiff > 0) {
                        max = mid;
                        maxDiff = midDiff;
                    } else {
                        min = mid;
                        minDiff = midDiff;
                    }
                }
            },
            getPlotBox: function (step, bbox, arc) {
                var that = this;
                var scale = that.scale;
                var pointers = that.pointers;
                var radius = arc.getRadiusX();
                arc = arc.clone();
                arc.setRadiusX(radius + step).setRadiusY(radius + step);
                scale.arc = arc;
                scale.reflow(bbox);
                that.plotBbox = scale.bbox;
                for (var i = 0; i < pointers.length; i++) {
                    pointers[i].reflow(arc);
                    that.plotBbox = Rect.union(that.plotBbox, pointers[i].bbox);
                }
                return that.getDiff(that.plotBbox, bbox);
            },
            getDiff: function (plotBox, box) {
                return math.min(box.width() - plotBox.width(), box.height() - plotBox.height());
            },
            alignScale: function (bbox) {
                var that = this;
                var plotBoxCenter = that.plotBbox.center();
                var boxCenter = bbox.center();
                var paddingX = plotBoxCenter.x - boxCenter.x;
                var paddingY = plotBoxCenter.y - boxCenter.y;
                var scale = that.scale;
                var pointers = that.pointers;
                scale.arc.center.x -= paddingX;
                scale.arc.center.y -= paddingY;
                scale.reflow(bbox);
                for (var i = 0; i < pointers.length; i++) {
                    pointers[i].reflow(scale.arc);
                    that.plotBbox = Rect.union(scale.bbox, pointers[i].bbox);
                }
            },
            _createModel: function () {
                var that = this;
                var options = that.options;
                var pointers = options.pointer;
                var scale = that.scale = new RadialScale(options.scale);
                var current;
                that.pointers = [];
                pointers = $.isArray(pointers) ? pointers : [pointers];
                for (var i = 0; i < pointers.length; i++) {
                    current = new RadialPointer(scale, deepExtend({}, pointers[i], { animation: { transitions: options.transitions } }));
                    that.pointers.push(current);
                }
            }
        });
        var LinearGauge = Gauge.extend({
            init: function (element, options) {
                var linearGauge = this;
                Gauge.fn.init.call(linearGauge, element, options);
                kendo.notify(linearGauge, dataviz.ui);
            },
            options: {
                name: 'LinearGauge',
                transitions: true,
                gaugeArea: { background: '' },
                scale: { vertical: true }
            },
            reflow: function (bbox) {
                var that = this;
                var pointers = that.pointers;
                var bboxX = bbox.origin.x;
                var bboxY = bbox.origin.y;
                var bbox2D = new dataviz.Box2D(bboxX, bboxY, bboxX + bbox.width(), bboxY + bbox.height());
                that.scale.reflow(bbox2D);
                for (var i = 0; i < pointers.length; i++) {
                    pointers[i].reflow();
                }
                that.bbox = that._getBox(bbox2D);
                that._alignElements();
                that._shrinkElements();
                that._buildVisual();
                that._draw();
            },
            _buildVisual: function () {
                var that = this;
                var visuals = new Group();
                var scaleElements = that.scale.render();
                var pointers = that.pointers;
                var current;
                visuals.append(that.gaugeArea);
                visuals.append(scaleElements);
                for (var i = 0; i < pointers.length; i++) {
                    current = pointers[i];
                    visuals.append(current.render());
                    current.value(current.options.value);
                }
                that._visuals = visuals;
            },
            _createModel: function () {
                var that = this;
                var options = that.options;
                var pointers = options.pointer;
                var scale = that.scale = new LinearScale(options.scale);
                var current, currentOptions;
                that.pointers = [];
                pointers = $.isArray(pointers) ? pointers : [pointers];
                for (var i = 0; i < pointers.length; i++) {
                    currentOptions = deepExtend({}, pointers[i], { animation: { transitions: options.transitions } });
                    if (currentOptions.shape === ARROW) {
                        current = new ArrowLinearPointer(scale, currentOptions);
                    } else {
                        current = new BarLinearPointer(scale, currentOptions);
                    }
                    that.pointers.push(current);
                }
            },
            _getSize: function () {
                var gauge = this;
                var element = gauge.element;
                var width = element.width();
                var height = element.height();
                var vertical = gauge.options.scale.vertical;
                if (!width) {
                    width = vertical ? DEFAULT_MIN_WIDTH : DEFAULT_WIDTH;
                }
                if (!height) {
                    height = vertical ? DEFAULT_HEIGHT : DEFAULT_MIN_HEIGHT;
                }
                return {
                    width: width,
                    height: height
                };
            },
            _getBox: function (box) {
                var that = this;
                var scale = that.scale;
                var pointers = that.pointers;
                var boxCenter = box.center();
                var plotAreaBox = pointers[0].box.clone().wrap(scale.box);
                var size;
                for (var i = 0; i < pointers.length; i++) {
                    plotAreaBox.wrap(pointers[i].box.clone());
                }
                if (scale.options.vertical) {
                    size = plotAreaBox.width() / 2;
                    plotAreaBox = new Box2D(boxCenter.x - size, box.y1, boxCenter.x + size, box.y2);
                } else {
                    size = plotAreaBox.height() / 2;
                    plotAreaBox = new Box2D(box.x1, boxCenter.y - size, box.x2, boxCenter.y + size);
                }
                return plotAreaBox;
            },
            _alignElements: function () {
                var that = this;
                var scale = that.scale;
                var pointers = that.pointers;
                var scaleBox = scale.box;
                var box = pointers[0].box.clone().wrap(scale.box);
                var plotAreaBox = that.bbox;
                var diff, i;
                for (i = 0; i < pointers.length; i++) {
                    box.wrap(pointers[i].box.clone());
                }
                if (scale.options.vertical) {
                    diff = plotAreaBox.center().x - box.center().x;
                    scale.reflow(new Box2D(scaleBox.x1 + diff, plotAreaBox.y1, scaleBox.x2 + diff, plotAreaBox.y2));
                } else {
                    diff = plotAreaBox.center().y - box.center().y;
                    scale.reflow(new Box2D(plotAreaBox.x1, scaleBox.y1 + diff, plotAreaBox.x2, scaleBox.y2 + diff));
                }
                for (i = 0; i < pointers.length; i++) {
                    pointers[i].reflow(that.bbox);
                }
            },
            _shrinkElements: function () {
                var that = this;
                var scale = that.scale;
                var pointers = that.pointers;
                var scaleBox = scale.box.clone();
                var pos = scale.options.vertical ? 'y' : 'x';
                var pointerBox = pointers[0].box;
                var i;
                for (i = 0; i < pointers.length; i++) {
                    pointerBox.wrap(pointers[i].box.clone());
                }
                scaleBox[pos + 1] += math.max(scaleBox[pos + 1] - pointerBox[pos + 1], 0);
                scaleBox[pos + 2] -= math.max(pointerBox[pos + 2] - scaleBox[pos + 2], 0);
                scale.reflow(scaleBox);
                for (i = 0; i < pointers.length; i++) {
                    pointers[i].reflow(that.bbox);
                }
            }
        });
        var LinearScale = NumericAxis.extend({
            init: function (options) {
                var scale = this;
                scale.options = deepExtend({}, scale.options, options);
                scale.options = deepExtend({}, scale.options, { labels: { mirror: scale.options.mirror } });
                scale.options.majorUnit = scale.options.majorUnit || autoMajorUnit(scale.options.min, scale.options.max);
                Axis.fn.init.call(scale, scale.options);
                scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
            },
            options: {
                min: 0,
                max: 50,
                majorTicks: {
                    size: 15,
                    align: INSIDE,
                    color: BLACK,
                    width: DEFAULT_LINE_WIDTH,
                    visible: true
                },
                minorTicks: {
                    size: 10,
                    align: INSIDE,
                    color: BLACK,
                    width: DEFAULT_LINE_WIDTH,
                    visible: true
                },
                line: { width: DEFAULT_LINE_WIDTH },
                labels: {
                    position: INSIDE,
                    padding: 2
                },
                mirror: false,
                _alignLines: false
            },
            render: function () {
                var that = this;
                var elements = that.elements = new Group();
                var labels = that.renderLabels();
                var scaleLine = that.renderLine();
                var scaleTicks = that.renderTicks();
                var ranges = that.renderRanges();
                elements.append(scaleLine, labels, scaleTicks, ranges);
                return elements;
            },
            renderRanges: function () {
                var that = this;
                var options = that.options;
                var min = options.min;
                var max = options.max;
                var ranges = options.ranges || [];
                var vertical = options.vertical;
                var mirror = options.labels.mirror;
                var elements = new Group();
                var count = ranges.length;
                var rangeSize = options.rangeSize || options.minorTicks.size / 2;
                var range, slot, slotX, slotY, i;
                if (count) {
                    for (i = 0; i < count; i++) {
                        range = getRange(ranges[i], min, max);
                        slot = that.getSlot(range.from, range.to);
                        slotX = vertical ? that.lineBox() : slot;
                        slotY = vertical ? slot : that.lineBox();
                        if (vertical) {
                            slotX.x1 -= rangeSize * (mirror ? -1 : 1);
                        } else {
                            slotY.y2 += rangeSize * (mirror ? -1 : 1);
                        }
                        elements.append(Path.fromRect(new Rect([
                            slotX.x1,
                            slotY.y1
                        ], [
                            slotX.x2 - slotX.x1,
                            slotY.y2 - slotY.y1
                        ]), {
                            fill: {
                                color: range.color,
                                opacity: range.opacity
                            },
                            stroke: {}
                        }));
                    }
                }
                return elements;
            },
            renderLabels: function () {
                var that = this;
                var options = that.options;
                var labels = that.labels;
                var elements = new Group();
                for (var i = 0; i < labels.length; i++) {
                    elements.append(_buildLabel(labels[i], options.labels));
                }
                return elements;
            },
            renderLine: function () {
                var that = this;
                var options = that.options;
                var line = options.line;
                var lineBox = that.lineBox();
                var linePath;
                var elements = new Group();
                if (line.width > 0 && line.visible) {
                    linePath = new Path({
                        stroke: {
                            color: line.color,
                            dashType: line.dashType,
                            width: line.width
                        }
                    });
                    linePath.moveTo(lineBox.x1, lineBox.y1).lineTo(lineBox.x2, lineBox.y2);
                    elements.append(linePath);
                }
                return elements;
            },
            renderTicks: function () {
                var that = this;
                var ticks = new Group();
                var options = that.options;
                var lineBox = that.lineBox();
                var mirror = options.labels.mirror;
                var majorUnit = options.majorTicks.visible ? options.majorUnit : 0;
                var tickLineOptions = {
                    _alignLines: options._alignLines,
                    vertical: options.vertical
                };
                function render(tickPositions, tickOptions) {
                    var i, count = tickPositions.length;
                    if (tickOptions.visible) {
                        for (i = tickOptions.skip; i < count; i += tickOptions.step) {
                            if (i % tickOptions.skipUnit === 0) {
                                continue;
                            }
                            tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
                            tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
                            tickLineOptions.position = tickPositions[i];
                            ticks.append(that.renderAxisTick(tickLineOptions, tickOptions));
                        }
                    }
                }
                render(that.getMajorTickPositions(), options.majorTicks);
                render(that.getMinorTickPositions(), deepExtend({}, { skipUnit: majorUnit / options.minorUnit }, options.minorTicks));
                return ticks;
            },
            renderAxisTick: function (options, tickOptions) {
                var tickX = options.tickX;
                var tickY = options.tickY;
                var position = options.position;
                var start, end, tickPath;
                if (options.vertical) {
                    start = new Point(tickX, position);
                    end = new Point(tickX + tickOptions.size, position);
                } else {
                    start = new Point(position, tickY);
                    end = new Point(position, tickY + tickOptions.size);
                }
                tickPath = new Path({
                    stroke: {
                        color: tickOptions.color,
                        width: tickOptions.width
                    }
                }).moveTo(start).lineTo(end);
                return tickPath;
            }
        });
        var LinearPointer = Pointer.extend({
            init: function (scale, options) {
                var pointer = this;
                Pointer.fn.init.call(pointer, scale, options);
                pointer.options = deepExtend({ track: { visible: defined(options.track) } }, pointer.options);
            },
            options: {
                shape: BAR_POINTER,
                track: { border: { width: 1 } },
                color: BLACK,
                border: { width: 1 },
                opacity: 1,
                margin: getSpacing(3),
                animation: { type: BAR_POINTER },
                visible: true
            },
            reflow: function () {
                var pointer = this;
                var options = pointer.options;
                var scale = pointer.scale;
                var scaleLine = scale.lineBox();
                var trackSize = options.track.size || options.size;
                var pointerHalfSize = options.size / 2;
                var mirror = scale.options.mirror;
                var margin = getSpacing(options.margin);
                var vertical = scale.options.vertical;
                var space = vertical ? margin[mirror ? 'left' : 'right'] : margin[mirror ? 'bottom' : 'top'];
                var pointerBox, pointerRangeBox, trackBox;
                space = mirror ? -space : space;
                if (vertical) {
                    trackBox = new Box2D(scaleLine.x1 + space, scaleLine.y1, scaleLine.x1 + space, scaleLine.y2);
                    if (mirror) {
                        trackBox.x1 -= trackSize;
                    } else {
                        trackBox.x2 += trackSize;
                    }
                    if (options.shape !== BAR_POINTER) {
                        pointerRangeBox = new Box2D(scaleLine.x2 + space, scaleLine.y1 - pointerHalfSize, scaleLine.x2 + space, scaleLine.y2 + pointerHalfSize);
                        pointerBox = pointerRangeBox;
                    }
                } else {
                    trackBox = new Box2D(scaleLine.x1, scaleLine.y1 - space, scaleLine.x2, scaleLine.y1 - space);
                    if (mirror) {
                        trackBox.y2 += trackSize;
                    } else {
                        trackBox.y1 -= trackSize;
                    }
                    if (options.shape !== BAR_POINTER) {
                        pointerRangeBox = new Box2D(scaleLine.x1 - pointerHalfSize, scaleLine.y1 - space, scaleLine.x2 + pointerHalfSize, scaleLine.y1 - space);
                        pointerBox = pointerRangeBox;
                    }
                }
                pointer.trackBox = trackBox;
                pointer.pointerRangeBox = pointerRangeBox;
                pointer.box = pointerBox || trackBox.clone().pad(options.border.width);
            },
            getElementOptions: function () {
                var options = this.options;
                return {
                    fill: {
                        color: options.color,
                        opacity: options.opacity
                    },
                    stroke: defined(options.border) ? {
                        color: options.border.width ? options.border.color || options.color : '',
                        width: options.border.width,
                        dashType: options.border.dashType,
                        opacity: options.opacity
                    } : null
                };
            },
            _margin: function () {
                var pointer = this;
                var options = pointer.options;
                var scale = pointer.scale;
                var mirror = scale.options.mirror;
                var margin = getSpacing(options.margin);
                var vertical = scale.options.vertical;
                var space = vertical ? margin[mirror ? 'left' : 'right'] : margin[mirror ? 'bottom' : 'top'];
                return space;
            }
        });
        var ArrowLinearPointer = LinearPointer.extend({
            init: function (scale, options) {
                LinearPointer.fn.init.call(this, scale, options);
                if (this.options.size === undefined) {
                    this.options.size = this.scale.options.majorTicks.size * 0.6;
                }
            },
            pointerShape: function () {
                var that = this;
                var options = that.options;
                var scale = that.scale;
                var size = options.size;
                var vertical = scale.options.vertical;
                var halfSize = size / 2;
                var sign = scale.options.mirror ? -1 : 1;
                var reverse = scale.options.reverse;
                var pos, shape;
                if (vertical) {
                    pos = reverse ? 'y2' : 'y1';
                    shape = [
                        new Point(0, 0 - halfSize),
                        new Point(0 - sign * size, 0),
                        new Point(0, 0 + halfSize)
                    ];
                } else {
                    pos = reverse ? 'x1' : 'x2';
                    shape = [
                        new Point(0 - halfSize, 0),
                        new Point(0, 0 + sign * size),
                        new Point(0 + halfSize, 0)
                    ];
                }
                return shape;
            },
            repaint: function () {
                var that = this;
                var scale = that.scale;
                var options = that.options;
                var animation = new ArrowLinearPointerAnimation(that.elements, deepExtend(options.animation, {
                    vertical: scale.options.vertical,
                    mirror: scale.options.mirror,
                    margin: that._margin(options.margin),
                    from: scale.getSlot(options._oldValue),
                    to: scale.getSlot(options.value)
                }));
                if (options.animation.transitions === false) {
                    animation.options.duration = 0;
                }
                animation.setup();
                animation.play();
            },
            render: function () {
                var that = this;
                var options = that.options;
                var elements = new Group();
                var scale = that.scale;
                var elementOptions = that.getElementOptions();
                var shape = that.pointerShape(options.value);
                options.animation.type = ARROW_POINTER;
                elements = new Path({
                    stroke: elementOptions.stroke,
                    fill: elementOptions.fill
                }).moveTo(shape[0]).lineTo(shape[1]).lineTo(shape[2]).close();
                var slot = scale.getSlot(options.value);
                elements.transform(geo.transform().translate(slot.x1, slot.y1));
                that.elements = elements;
                return elements;
            }
        });
        var BarLinearPointer = LinearPointer.extend({
            init: function (scale, options) {
                LinearPointer.fn.init.call(this, scale, options);
                if (this.options.size === undefined) {
                    this.options.size = this.scale.options.majorTicks.size * 0.3;
                }
            },
            pointerShape: function (value) {
                var that = this;
                var options = that.options;
                var scale = that.scale;
                var vertical = scale.options.vertical;
                var mirror = scale.options.mirror;
                var dir = mirror == vertical ? -1 : 1;
                var size = options.size * dir;
                var minSlot = scale.getSlot(scale.options.min);
                var slot = scale.getSlot(value);
                var axis = vertical ? Y : X;
                var sizeAxis = vertical ? X : Y;
                var margin = that._margin() * dir;
                var p1 = new Point();
                p1[axis] = minSlot[axis + '1'];
                p1[sizeAxis] = minSlot[sizeAxis + '1'];
                var p2 = new Point();
                p2[axis] = slot[axis + '1'];
                p2[sizeAxis] = slot[sizeAxis + '1'];
                if (vertical) {
                    p1.translate(margin, 0);
                    p2.translate(margin, 0);
                } else {
                    p1.translate(0, margin);
                    p2.translate(0, margin);
                }
                var p3 = p2.clone();
                var p4 = p1.clone();
                if (vertical) {
                    p3.translate(size, 0);
                    p4.translate(size, 0);
                } else {
                    p3.translate(0, size);
                    p4.translate(0, size);
                }
                return [
                    p1,
                    p2,
                    p3,
                    p4
                ];
            },
            repaint: function () {
                var that = this;
                var scale = that.scale;
                var options = that.options;
                var shape = that.pointerShape(options.value);
                var pointerPath = that.elements.children[0];
                var oldShape = that.pointerShape(options._oldValue);
                pointerPath.moveTo(shape[0]).lineTo(shape[1]).lineTo(shape[2]).lineTo(shape[3]).close();
                var animation = new BarLinearPointerAnimation(pointerPath, deepExtend(options.animation, {
                    reverse: scale.options.reverse,
                    vertical: scale.options.vertical,
                    oldPoints: [
                        oldShape[1],
                        oldShape[2]
                    ],
                    newPoints: [
                        shape[1],
                        shape[2]
                    ]
                }));
                if (options.animation.transitions === false) {
                    animation.options.duration = 0;
                }
                animation.setup();
                animation.play();
            },
            render: function () {
                var that = this;
                var group = new Group();
                var elementOptions = that.getElementOptions();
                var pointer = new Path({
                    stroke: elementOptions.stroke,
                    fill: elementOptions.fill
                });
                group.append(pointer);
                that.elements = group;
                return group;
            }
        });
        var RadialPointerAnimation = draw.Animation.extend({
            init: function (element, options) {
                draw.Animation.fn.init.call(this, element, options);
                options = this.options;
                options.duration = math.max(math.abs(options.newAngle - options.oldAngle) / options.duration * 1000, 1);
            },
            options: {
                easing: LINEAR,
                duration: ANGULAR_SPEED
            },
            step: function (pos) {
                var anim = this;
                var options = anim.options;
                var angle = interpolateValue(options.oldAngle, options.newAngle, pos);
                anim.element.transform(geo.transform().rotate(angle, options.center));
            }
        });
        draw.AnimationFactory.current.register(RADIAL_POINTER, RadialPointerAnimation);
        var ArrowLinearPointerAnimation = draw.Animation.extend({
            options: {
                easing: LINEAR,
                duration: LINEAR_SPEED
            },
            setup: function () {
                var options = this.options;
                var margin = options.margin;
                var from = options.from;
                var to = options.to;
                var axis = options.vertical ? 'x1' : 'y1';
                if (options.mirror == options.vertical) {
                    from[axis] -= margin;
                    to[axis] -= margin;
                } else {
                    from[axis] += margin;
                    to[axis] += margin;
                }
                var fromScale = this.fromScale = new Point(from.x1, from.y1);
                var toScale = this.toScale = new Point(to.x1, to.y1);
                if (options.duration !== 0) {
                    options.duration = math.max(fromScale.distanceTo(toScale) / options.duration * 1000, 1);
                }
            },
            step: function (pos) {
                var translateX = interpolateValue(this.fromScale.x, this.toScale.x, pos);
                var translateY = interpolateValue(this.fromScale.y, this.toScale.y, pos);
                this.element.transform(geo.transform().translate(translateX, translateY));
            }
        });
        draw.AnimationFactory.current.register(ARROW_POINTER, ArrowLinearPointerAnimation);
        var BarLinearPointerAnimation = draw.Animation.extend({
            options: {
                easing: LINEAR,
                speed: LINEAR_SPEED
            },
            setup: function () {
                var options = this.options;
                var newPoints = options.newPoints;
                var oldPoints = options.oldPoints;
                var axis = this.axis = options.vertical ? Y : X;
                var to = this.to = newPoints[0][axis];
                var from = this.from = oldPoints[0][axis];
                if (options.duration !== 0) {
                    options.duration = math.max(math.abs(to - from) / options.speed * 1000, 1);
                }
                this._set(from);
            },
            step: function (pos) {
                var value = interpolateValue(this.from, this.to, pos);
                this._set(value);
            },
            _set: function (value) {
                var setter = 'set' + this.axis.toUpperCase();
                var points = this.options.newPoints;
                points[0][setter](value);
                points[1][setter](value);
            }
        });
        draw.AnimationFactory.current.register(BAR_POINTER, BarLinearPointerAnimation);
        function _buildLabel(label, options) {
            var labelBox = label.box;
            var textBox = label.children[0].box;
            var border = options.border || {};
            var background = options.background || '';
            var elements = new Group();
            var styleBox, styleGeometry, wrapper;
            wrapper = Path.fromRect(new Rect([
                labelBox.x1,
                labelBox.y1
            ], [
                labelBox.width(),
                labelBox.height()
            ]), { stroke: {} });
            var text = new Text(label.text, new Point(textBox.x1, textBox.y1), {
                font: options.font,
                fill: { color: options.color }
            });
            styleGeometry = _pad(text.bbox().clone(), options.padding);
            styleBox = Path.fromRect(styleGeometry, {
                stroke: {
                    color: border.width ? border.color : '',
                    width: border.width,
                    dashType: border.dashType,
                    lineJoin: 'round',
                    lineCap: 'round'
                },
                fill: { color: background }
            });
            elements.append(wrapper);
            elements.append(styleBox);
            elements.append(text);
            return elements;
        }
        function getRange(range, min, max) {
            var from = defined(range.from) ? range.from : MIN_VALUE;
            var to = defined(range.to) ? range.to : MAX_VALUE;
            range.from = math.max(math.min(to, from), min);
            range.to = math.min(math.max(to, from), max);
            return range;
        }
        function _pad(bbox, value) {
            var origin = bbox.getOrigin();
            var size = bbox.getSize();
            var spacing = getSpacing(value);
            bbox.setOrigin([
                origin.x - spacing.left,
                origin.y - spacing.top
            ]);
            bbox.setSize([
                size.width + (spacing.left + spacing.right),
                size.height + (spacing.top + spacing.bottom)
            ]);
            return bbox;
        }
        function _unpad(bbox, value) {
            var spacing = getSpacing(value);
            spacing.left = -spacing.left;
            spacing.top = -spacing.top;
            spacing.right = -spacing.right;
            spacing.bottom = -spacing.bottom;
            return _pad(bbox, spacing);
        }
        dataviz.ui.plugin(RadialGauge);
        dataviz.ui.plugin(LinearGauge);
        dataviz.ExportMixin.extend(Gauge.fn);
        deepExtend(dataviz, {
            Gauge: Gauge,
            RadialPointer: RadialPointer,
            LinearPointer: LinearPointer,
            ArrowLinearPointer: ArrowLinearPointer,
            BarLinearPointer: BarLinearPointer,
            LinearScale: LinearScale,
            RadialScale: RadialScale,
            LinearGauge: LinearGauge,
            RadialGauge: RadialGauge
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));