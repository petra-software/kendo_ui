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
    define('kendo.dataviz.qrcode', [
        'kendo.dataviz.core',
        'kendo.drawing'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.qrcode',
        name: 'QRCode',
        category: 'dataviz',
        description: 'QRCode widget.',
        depends: [
            'dataviz.core',
            'drawing'
        ]
    };
    (function ($, undefined) {
        var kendo = window.kendo, extend = $.extend, draw = kendo.drawing, dataviz = kendo.dataviz, Widget = kendo.ui.Widget, Box2D = dataviz.Box2D, terminator = '0000', NUMERIC = 'numeric', ALPHA_NUMERIC = 'alphanumeric', BYTE = 'byte', powersOfTwo = { '1': 0 }, powersOfTwoResult = { '0': 1 }, generatorPolynomials = [
                [
                    1,
                    0
                ],
                [
                    1,
                    25,
                    0
                ]
            ], irregularAlignmentPatternsStartDistance = {
                15: 20,
                16: 20,
                18: 24,
                19: 24,
                22: 20,
                24: 22,
                26: 24,
                28: 20,
                30: 20,
                31: 24,
                32: 28,
                33: 24,
                36: 18,
                37: 22,
                39: 20,
                40: 24
            }, versionsCodewordsInformation = [
                {
                    L: {
                        groups: [[
                                1,
                                19
                            ]],
                        totalDataCodewords: 19,
                        errorCodewordsPerBlock: 7
                    },
                    M: {
                        groups: [[
                                1,
                                16
                            ]],
                        totalDataCodewords: 16,
                        errorCodewordsPerBlock: 10
                    },
                    Q: {
                        groups: [[
                                1,
                                13
                            ]],
                        totalDataCodewords: 13,
                        errorCodewordsPerBlock: 13
                    },
                    H: {
                        groups: [[
                                1,
                                9
                            ]],
                        totalDataCodewords: 9,
                        errorCodewordsPerBlock: 17
                    }
                },
                {
                    L: {
                        groups: [[
                                1,
                                34
                            ]],
                        totalDataCodewords: 34,
                        errorCodewordsPerBlock: 10
                    },
                    M: {
                        groups: [[
                                1,
                                28
                            ]],
                        totalDataCodewords: 28,
                        errorCodewordsPerBlock: 16
                    },
                    Q: {
                        groups: [[
                                1,
                                22
                            ]],
                        totalDataCodewords: 22,
                        errorCodewordsPerBlock: 22
                    },
                    H: {
                        groups: [[
                                1,
                                16
                            ]],
                        totalDataCodewords: 16,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [[
                                1,
                                55
                            ]],
                        totalDataCodewords: 55,
                        errorCodewordsPerBlock: 15
                    },
                    M: {
                        groups: [[
                                1,
                                44
                            ]],
                        totalDataCodewords: 44,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [[
                                2,
                                17
                            ]],
                        totalDataCodewords: 34,
                        errorCodewordsPerBlock: 18
                    },
                    H: {
                        groups: [[
                                2,
                                13
                            ]],
                        totalDataCodewords: 26,
                        errorCodewordsPerBlock: 22
                    }
                },
                {
                    L: {
                        groups: [[
                                1,
                                80
                            ]],
                        totalDataCodewords: 80,
                        errorCodewordsPerBlock: 20
                    },
                    M: {
                        groups: [[
                                2,
                                32
                            ]],
                        totalDataCodewords: 64,
                        errorCodewordsPerBlock: 18
                    },
                    Q: {
                        groups: [[
                                2,
                                24
                            ]],
                        totalDataCodewords: 48,
                        errorCodewordsPerBlock: 26
                    },
                    H: {
                        groups: [[
                                4,
                                9
                            ]],
                        totalDataCodewords: 36,
                        errorCodewordsPerBlock: 16
                    }
                },
                {
                    L: {
                        groups: [[
                                1,
                                108
                            ]],
                        totalDataCodewords: 108,
                        errorCodewordsPerBlock: 26
                    },
                    M: {
                        groups: [[
                                2,
                                43
                            ]],
                        totalDataCodewords: 86,
                        errorCodewordsPerBlock: 24
                    },
                    Q: {
                        groups: [
                            [
                                2,
                                15
                            ],
                            [
                                2,
                                16
                            ]
                        ],
                        totalDataCodewords: 62,
                        errorCodewordsPerBlock: 18
                    },
                    H: {
                        groups: [
                            [
                                2,
                                11
                            ],
                            [
                                2,
                                12
                            ]
                        ],
                        totalDataCodewords: 46,
                        errorCodewordsPerBlock: 22
                    }
                },
                {
                    L: {
                        groups: [[
                                2,
                                68
                            ]],
                        totalDataCodewords: 136,
                        errorCodewordsPerBlock: 18
                    },
                    M: {
                        groups: [[
                                4,
                                27
                            ]],
                        totalDataCodewords: 108,
                        errorCodewordsPerBlock: 16
                    },
                    Q: {
                        groups: [[
                                4,
                                19
                            ]],
                        totalDataCodewords: 76,
                        errorCodewordsPerBlock: 24
                    },
                    H: {
                        groups: [[
                                4,
                                15
                            ]],
                        totalDataCodewords: 60,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [[
                                2,
                                78
                            ]],
                        totalDataCodewords: 156,
                        errorCodewordsPerBlock: 20
                    },
                    M: {
                        groups: [[
                                4,
                                31
                            ]],
                        totalDataCodewords: 124,
                        errorCodewordsPerBlock: 18
                    },
                    Q: {
                        groups: [
                            [
                                2,
                                14
                            ],
                            [
                                4,
                                15
                            ]
                        ],
                        totalDataCodewords: 88,
                        errorCodewordsPerBlock: 18
                    },
                    H: {
                        groups: [
                            [
                                4,
                                13
                            ],
                            [
                                1,
                                14
                            ]
                        ],
                        totalDataCodewords: 66,
                        errorCodewordsPerBlock: 26
                    }
                },
                {
                    L: {
                        groups: [[
                                2,
                                97
                            ]],
                        totalDataCodewords: 194,
                        errorCodewordsPerBlock: 24
                    },
                    M: {
                        groups: [
                            [
                                2,
                                38
                            ],
                            [
                                2,
                                39
                            ]
                        ],
                        totalDataCodewords: 154,
                        errorCodewordsPerBlock: 22
                    },
                    Q: {
                        groups: [
                            [
                                4,
                                18
                            ],
                            [
                                2,
                                19
                            ]
                        ],
                        totalDataCodewords: 110,
                        errorCodewordsPerBlock: 22
                    },
                    H: {
                        groups: [
                            [
                                4,
                                14
                            ],
                            [
                                2,
                                15
                            ]
                        ],
                        totalDataCodewords: 86,
                        errorCodewordsPerBlock: 26
                    }
                },
                {
                    L: {
                        groups: [[
                                2,
                                116
                            ]],
                        totalDataCodewords: 232,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                3,
                                36
                            ],
                            [
                                2,
                                37
                            ]
                        ],
                        totalDataCodewords: 182,
                        errorCodewordsPerBlock: 22
                    },
                    Q: {
                        groups: [
                            [
                                4,
                                16
                            ],
                            [
                                4,
                                17
                            ]
                        ],
                        totalDataCodewords: 132,
                        errorCodewordsPerBlock: 20
                    },
                    H: {
                        groups: [
                            [
                                4,
                                12
                            ],
                            [
                                4,
                                13
                            ]
                        ],
                        totalDataCodewords: 100,
                        errorCodewordsPerBlock: 24
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                2,
                                68
                            ],
                            [
                                2,
                                69
                            ]
                        ],
                        totalDataCodewords: 274,
                        errorCodewordsPerBlock: 18
                    },
                    M: {
                        groups: [
                            [
                                4,
                                43
                            ],
                            [
                                1,
                                44
                            ]
                        ],
                        totalDataCodewords: 216,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [
                            [
                                6,
                                19
                            ],
                            [
                                2,
                                20
                            ]
                        ],
                        totalDataCodewords: 154,
                        errorCodewordsPerBlock: 24
                    },
                    H: {
                        groups: [
                            [
                                6,
                                15
                            ],
                            [
                                2,
                                16
                            ]
                        ],
                        totalDataCodewords: 122,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [[
                                4,
                                81
                            ]],
                        totalDataCodewords: 324,
                        errorCodewordsPerBlock: 20
                    },
                    M: {
                        groups: [
                            [
                                1,
                                50
                            ],
                            [
                                4,
                                51
                            ]
                        ],
                        totalDataCodewords: 254,
                        errorCodewordsPerBlock: 30
                    },
                    Q: {
                        groups: [
                            [
                                4,
                                22
                            ],
                            [
                                4,
                                23
                            ]
                        ],
                        totalDataCodewords: 180,
                        errorCodewordsPerBlock: 28
                    },
                    H: {
                        groups: [
                            [
                                3,
                                12
                            ],
                            [
                                8,
                                13
                            ]
                        ],
                        totalDataCodewords: 140,
                        errorCodewordsPerBlock: 24
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                2,
                                92
                            ],
                            [
                                2,
                                93
                            ]
                        ],
                        totalDataCodewords: 370,
                        errorCodewordsPerBlock: 24
                    },
                    M: {
                        groups: [
                            [
                                6,
                                36
                            ],
                            [
                                2,
                                37
                            ]
                        ],
                        totalDataCodewords: 290,
                        errorCodewordsPerBlock: 22
                    },
                    Q: {
                        groups: [
                            [
                                4,
                                20
                            ],
                            [
                                6,
                                21
                            ]
                        ],
                        totalDataCodewords: 206,
                        errorCodewordsPerBlock: 26
                    },
                    H: {
                        groups: [
                            [
                                7,
                                14
                            ],
                            [
                                4,
                                15
                            ]
                        ],
                        totalDataCodewords: 158,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [[
                                4,
                                107
                            ]],
                        totalDataCodewords: 428,
                        errorCodewordsPerBlock: 26
                    },
                    M: {
                        groups: [
                            [
                                8,
                                37
                            ],
                            [
                                1,
                                38
                            ]
                        ],
                        totalDataCodewords: 334,
                        errorCodewordsPerBlock: 22
                    },
                    Q: {
                        groups: [
                            [
                                8,
                                20
                            ],
                            [
                                4,
                                21
                            ]
                        ],
                        totalDataCodewords: 244,
                        errorCodewordsPerBlock: 24
                    },
                    H: {
                        groups: [
                            [
                                12,
                                11
                            ],
                            [
                                4,
                                12
                            ]
                        ],
                        totalDataCodewords: 180,
                        errorCodewordsPerBlock: 22
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                3,
                                115
                            ],
                            [
                                1,
                                116
                            ]
                        ],
                        totalDataCodewords: 461,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                4,
                                40
                            ],
                            [
                                5,
                                41
                            ]
                        ],
                        totalDataCodewords: 365,
                        errorCodewordsPerBlock: 24
                    },
                    Q: {
                        groups: [
                            [
                                11,
                                16
                            ],
                            [
                                5,
                                17
                            ]
                        ],
                        totalDataCodewords: 261,
                        errorCodewordsPerBlock: 20
                    },
                    H: {
                        groups: [
                            [
                                11,
                                12
                            ],
                            [
                                5,
                                13
                            ]
                        ],
                        totalDataCodewords: 197,
                        errorCodewordsPerBlock: 24
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                5,
                                87
                            ],
                            [
                                1,
                                88
                            ]
                        ],
                        totalDataCodewords: 523,
                        errorCodewordsPerBlock: 22
                    },
                    M: {
                        groups: [
                            [
                                5,
                                41
                            ],
                            [
                                5,
                                42
                            ]
                        ],
                        totalDataCodewords: 415,
                        errorCodewordsPerBlock: 24
                    },
                    Q: {
                        groups: [
                            [
                                5,
                                24
                            ],
                            [
                                7,
                                25
                            ]
                        ],
                        totalDataCodewords: 295,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                11,
                                12
                            ],
                            [
                                7,
                                13
                            ]
                        ],
                        totalDataCodewords: 223,
                        errorCodewordsPerBlock: 24
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                5,
                                98
                            ],
                            [
                                1,
                                99
                            ]
                        ],
                        totalDataCodewords: 589,
                        errorCodewordsPerBlock: 24
                    },
                    M: {
                        groups: [
                            [
                                7,
                                45
                            ],
                            [
                                3,
                                46
                            ]
                        ],
                        totalDataCodewords: 453,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                15,
                                19
                            ],
                            [
                                2,
                                20
                            ]
                        ],
                        totalDataCodewords: 325,
                        errorCodewordsPerBlock: 24
                    },
                    H: {
                        groups: [
                            [
                                3,
                                15
                            ],
                            [
                                13,
                                16
                            ]
                        ],
                        totalDataCodewords: 253,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                1,
                                107
                            ],
                            [
                                5,
                                108
                            ]
                        ],
                        totalDataCodewords: 647,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [
                            [
                                10,
                                46
                            ],
                            [
                                1,
                                47
                            ]
                        ],
                        totalDataCodewords: 507,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                1,
                                22
                            ],
                            [
                                15,
                                23
                            ]
                        ],
                        totalDataCodewords: 367,
                        errorCodewordsPerBlock: 28
                    },
                    H: {
                        groups: [
                            [
                                2,
                                14
                            ],
                            [
                                17,
                                15
                            ]
                        ],
                        totalDataCodewords: 283,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                5,
                                120
                            ],
                            [
                                1,
                                121
                            ]
                        ],
                        totalDataCodewords: 721,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                9,
                                43
                            ],
                            [
                                4,
                                44
                            ]
                        ],
                        totalDataCodewords: 563,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [
                            [
                                17,
                                22
                            ],
                            [
                                1,
                                23
                            ]
                        ],
                        totalDataCodewords: 397,
                        errorCodewordsPerBlock: 28
                    },
                    H: {
                        groups: [
                            [
                                2,
                                14
                            ],
                            [
                                19,
                                15
                            ]
                        ],
                        totalDataCodewords: 313,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                3,
                                113
                            ],
                            [
                                4,
                                114
                            ]
                        ],
                        totalDataCodewords: 795,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [
                            [
                                3,
                                44
                            ],
                            [
                                11,
                                45
                            ]
                        ],
                        totalDataCodewords: 627,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [
                            [
                                17,
                                21
                            ],
                            [
                                4,
                                22
                            ]
                        ],
                        totalDataCodewords: 445,
                        errorCodewordsPerBlock: 26
                    },
                    H: {
                        groups: [
                            [
                                9,
                                13
                            ],
                            [
                                16,
                                14
                            ]
                        ],
                        totalDataCodewords: 341,
                        errorCodewordsPerBlock: 26
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                3,
                                107
                            ],
                            [
                                5,
                                108
                            ]
                        ],
                        totalDataCodewords: 861,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [
                            [
                                3,
                                41
                            ],
                            [
                                13,
                                42
                            ]
                        ],
                        totalDataCodewords: 669,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [
                            [
                                15,
                                24
                            ],
                            [
                                5,
                                25
                            ]
                        ],
                        totalDataCodewords: 485,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                15,
                                15
                            ],
                            [
                                10,
                                16
                            ]
                        ],
                        totalDataCodewords: 385,
                        errorCodewordsPerBlock: 28
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                4,
                                116
                            ],
                            [
                                4,
                                117
                            ]
                        ],
                        totalDataCodewords: 932,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [[
                                17,
                                42
                            ]],
                        totalDataCodewords: 714,
                        errorCodewordsPerBlock: 26
                    },
                    Q: {
                        groups: [
                            [
                                17,
                                22
                            ],
                            [
                                6,
                                23
                            ]
                        ],
                        totalDataCodewords: 512,
                        errorCodewordsPerBlock: 28
                    },
                    H: {
                        groups: [
                            [
                                19,
                                16
                            ],
                            [
                                6,
                                17
                            ]
                        ],
                        totalDataCodewords: 406,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                2,
                                111
                            ],
                            [
                                7,
                                112
                            ]
                        ],
                        totalDataCodewords: 1006,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [[
                                17,
                                46
                            ]],
                        totalDataCodewords: 782,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                7,
                                24
                            ],
                            [
                                16,
                                25
                            ]
                        ],
                        totalDataCodewords: 568,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [[
                                34,
                                13
                            ]],
                        totalDataCodewords: 442,
                        errorCodewordsPerBlock: 24
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                4,
                                121
                            ],
                            [
                                5,
                                122
                            ]
                        ],
                        totalDataCodewords: 1094,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                4,
                                47
                            ],
                            [
                                14,
                                48
                            ]
                        ],
                        totalDataCodewords: 860,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                11,
                                24
                            ],
                            [
                                14,
                                25
                            ]
                        ],
                        totalDataCodewords: 614,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                16,
                                15
                            ],
                            [
                                14,
                                16
                            ]
                        ],
                        totalDataCodewords: 464,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                6,
                                117
                            ],
                            [
                                4,
                                118
                            ]
                        ],
                        totalDataCodewords: 1174,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                6,
                                45
                            ],
                            [
                                14,
                                46
                            ]
                        ],
                        totalDataCodewords: 914,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                11,
                                24
                            ],
                            [
                                16,
                                25
                            ]
                        ],
                        totalDataCodewords: 664,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                30,
                                16
                            ],
                            [
                                2,
                                17
                            ]
                        ],
                        totalDataCodewords: 514,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                8,
                                106
                            ],
                            [
                                4,
                                107
                            ]
                        ],
                        totalDataCodewords: 1276,
                        errorCodewordsPerBlock: 26
                    },
                    M: {
                        groups: [
                            [
                                8,
                                47
                            ],
                            [
                                13,
                                48
                            ]
                        ],
                        totalDataCodewords: 1000,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                7,
                                24
                            ],
                            [
                                22,
                                25
                            ]
                        ],
                        totalDataCodewords: 718,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                22,
                                15
                            ],
                            [
                                13,
                                16
                            ]
                        ],
                        totalDataCodewords: 538,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                10,
                                114
                            ],
                            [
                                2,
                                115
                            ]
                        ],
                        totalDataCodewords: 1370,
                        errorCodewordsPerBlock: 28
                    },
                    M: {
                        groups: [
                            [
                                19,
                                46
                            ],
                            [
                                4,
                                47
                            ]
                        ],
                        totalDataCodewords: 1062,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                28,
                                22
                            ],
                            [
                                6,
                                23
                            ]
                        ],
                        totalDataCodewords: 754,
                        errorCodewordsPerBlock: 28
                    },
                    H: {
                        groups: [
                            [
                                33,
                                16
                            ],
                            [
                                4,
                                17
                            ]
                        ],
                        totalDataCodewords: 596,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                8,
                                122
                            ],
                            [
                                4,
                                123
                            ]
                        ],
                        totalDataCodewords: 1468,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                22,
                                45
                            ],
                            [
                                3,
                                46
                            ]
                        ],
                        totalDataCodewords: 1128,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                8,
                                23
                            ],
                            [
                                26,
                                24
                            ]
                        ],
                        totalDataCodewords: 808,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                12,
                                15
                            ],
                            [
                                28,
                                16
                            ]
                        ],
                        totalDataCodewords: 628,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                3,
                                117
                            ],
                            [
                                10,
                                118
                            ]
                        ],
                        totalDataCodewords: 1531,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                3,
                                45
                            ],
                            [
                                23,
                                46
                            ]
                        ],
                        totalDataCodewords: 1193,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                4,
                                24
                            ],
                            [
                                31,
                                25
                            ]
                        ],
                        totalDataCodewords: 871,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                11,
                                15
                            ],
                            [
                                31,
                                16
                            ]
                        ],
                        totalDataCodewords: 661,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                7,
                                116
                            ],
                            [
                                7,
                                117
                            ]
                        ],
                        totalDataCodewords: 1631,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                21,
                                45
                            ],
                            [
                                7,
                                46
                            ]
                        ],
                        totalDataCodewords: 1267,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                1,
                                23
                            ],
                            [
                                37,
                                24
                            ]
                        ],
                        totalDataCodewords: 911,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                19,
                                15
                            ],
                            [
                                26,
                                16
                            ]
                        ],
                        totalDataCodewords: 701,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                5,
                                115
                            ],
                            [
                                10,
                                116
                            ]
                        ],
                        totalDataCodewords: 1735,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                19,
                                47
                            ],
                            [
                                10,
                                48
                            ]
                        ],
                        totalDataCodewords: 1373,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                15,
                                24
                            ],
                            [
                                25,
                                25
                            ]
                        ],
                        totalDataCodewords: 985,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                23,
                                15
                            ],
                            [
                                25,
                                16
                            ]
                        ],
                        totalDataCodewords: 745,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                13,
                                115
                            ],
                            [
                                3,
                                116
                            ]
                        ],
                        totalDataCodewords: 1843,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                2,
                                46
                            ],
                            [
                                29,
                                47
                            ]
                        ],
                        totalDataCodewords: 1455,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                42,
                                24
                            ],
                            [
                                1,
                                25
                            ]
                        ],
                        totalDataCodewords: 1033,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                23,
                                15
                            ],
                            [
                                28,
                                16
                            ]
                        ],
                        totalDataCodewords: 793,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [[
                                17,
                                115
                            ]],
                        totalDataCodewords: 1955,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                10,
                                46
                            ],
                            [
                                23,
                                47
                            ]
                        ],
                        totalDataCodewords: 1541,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                10,
                                24
                            ],
                            [
                                35,
                                25
                            ]
                        ],
                        totalDataCodewords: 1115,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                19,
                                15
                            ],
                            [
                                35,
                                16
                            ]
                        ],
                        totalDataCodewords: 845,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                17,
                                115
                            ],
                            [
                                1,
                                116
                            ]
                        ],
                        totalDataCodewords: 2071,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                14,
                                46
                            ],
                            [
                                21,
                                47
                            ]
                        ],
                        totalDataCodewords: 1631,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                29,
                                24
                            ],
                            [
                                19,
                                25
                            ]
                        ],
                        totalDataCodewords: 1171,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                11,
                                15
                            ],
                            [
                                46,
                                16
                            ]
                        ],
                        totalDataCodewords: 901,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                13,
                                115
                            ],
                            [
                                6,
                                116
                            ]
                        ],
                        totalDataCodewords: 2191,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                14,
                                46
                            ],
                            [
                                23,
                                47
                            ]
                        ],
                        totalDataCodewords: 1725,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                44,
                                24
                            ],
                            [
                                7,
                                25
                            ]
                        ],
                        totalDataCodewords: 1231,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                59,
                                16
                            ],
                            [
                                1,
                                17
                            ]
                        ],
                        totalDataCodewords: 961,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                12,
                                121
                            ],
                            [
                                7,
                                122
                            ]
                        ],
                        totalDataCodewords: 2306,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                12,
                                47
                            ],
                            [
                                26,
                                48
                            ]
                        ],
                        totalDataCodewords: 1812,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                39,
                                24
                            ],
                            [
                                14,
                                25
                            ]
                        ],
                        totalDataCodewords: 1286,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                22,
                                15
                            ],
                            [
                                41,
                                16
                            ]
                        ],
                        totalDataCodewords: 986,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                6,
                                121
                            ],
                            [
                                14,
                                122
                            ]
                        ],
                        totalDataCodewords: 2434,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                6,
                                47
                            ],
                            [
                                34,
                                48
                            ]
                        ],
                        totalDataCodewords: 1914,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                46,
                                24
                            ],
                            [
                                10,
                                25
                            ]
                        ],
                        totalDataCodewords: 1354,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                2,
                                15
                            ],
                            [
                                64,
                                16
                            ]
                        ],
                        totalDataCodewords: 1054,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                17,
                                122
                            ],
                            [
                                4,
                                123
                            ]
                        ],
                        totalDataCodewords: 2566,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                29,
                                46
                            ],
                            [
                                14,
                                47
                            ]
                        ],
                        totalDataCodewords: 1992,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                49,
                                24
                            ],
                            [
                                10,
                                25
                            ]
                        ],
                        totalDataCodewords: 1426,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                24,
                                15
                            ],
                            [
                                46,
                                16
                            ]
                        ],
                        totalDataCodewords: 1096,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                4,
                                122
                            ],
                            [
                                18,
                                123
                            ]
                        ],
                        totalDataCodewords: 2702,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                13,
                                46
                            ],
                            [
                                32,
                                47
                            ]
                        ],
                        totalDataCodewords: 2102,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                48,
                                24
                            ],
                            [
                                14,
                                25
                            ]
                        ],
                        totalDataCodewords: 1502,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                42,
                                15
                            ],
                            [
                                32,
                                16
                            ]
                        ],
                        totalDataCodewords: 1142,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                20,
                                117
                            ],
                            [
                                4,
                                118
                            ]
                        ],
                        totalDataCodewords: 2812,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                40,
                                47
                            ],
                            [
                                7,
                                48
                            ]
                        ],
                        totalDataCodewords: 2216,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                43,
                                24
                            ],
                            [
                                22,
                                25
                            ]
                        ],
                        totalDataCodewords: 1582,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                10,
                                15
                            ],
                            [
                                67,
                                16
                            ]
                        ],
                        totalDataCodewords: 1222,
                        errorCodewordsPerBlock: 30
                    }
                },
                {
                    L: {
                        groups: [
                            [
                                19,
                                118
                            ],
                            [
                                6,
                                119
                            ]
                        ],
                        totalDataCodewords: 2956,
                        errorCodewordsPerBlock: 30
                    },
                    M: {
                        groups: [
                            [
                                18,
                                47
                            ],
                            [
                                31,
                                48
                            ]
                        ],
                        totalDataCodewords: 2334,
                        errorCodewordsPerBlock: 28
                    },
                    Q: {
                        groups: [
                            [
                                34,
                                24
                            ],
                            [
                                34,
                                25
                            ]
                        ],
                        totalDataCodewords: 1666,
                        errorCodewordsPerBlock: 30
                    },
                    H: {
                        groups: [
                            [
                                20,
                                15
                            ],
                            [
                                61,
                                16
                            ]
                        ],
                        totalDataCodewords: 1276,
                        errorCodewordsPerBlock: 30
                    }
                }
            ], finderPattern = [
                1,
                0,
                1,
                1,
                1
            ], alignmentPattern = [
                1,
                0,
                1
            ], errorCorrectionPatterns = {
                L: '01',
                M: '00',
                Q: '11',
                H: '10'
            }, formatMaskPattern = '101010000010010', formatGeneratorPolynomial = '10100110111', versionGeneratorPolynomial = '1111100100101', paddingCodewords = [
                '11101100',
                '00010001'
            ], finderPatternValue = 93, maskPatternConditions = [
                function (row, column) {
                    return (row + column) % 2 === 0;
                },
                function (row) {
                    return row % 2 === 0;
                },
                function (row, column) {
                    return column % 3 === 0;
                },
                function (row, column) {
                    return (row + column) % 3 === 0;
                },
                function (row, column) {
                    return (Math.floor(row / 2) + Math.floor(column / 3)) % 2 === 0;
                },
                function (row, column) {
                    return row * column % 2 + row * column % 3 === 0;
                },
                function (row, column) {
                    return (row * column % 2 + row * column % 3) % 2 === 0;
                },
                function (row, column) {
                    return ((row + column) % 2 + row * column % 3) % 2 === 0;
                }
            ], numberRegex = /^\d+/, alphaPattern = 'A-Z0-9 $%*+./:-', alphaExclusiveSet = 'A-Z $%*+./:-', alphaRegex = new RegExp('^[' + alphaExclusiveSet + ']+'), alphaNumericRegex = new RegExp('^[' + alphaPattern + ']+'), byteRegex = new RegExp('^[^' + alphaPattern + ']+'), initMinNumericBeforeAlpha = 8, initMinNumericBeforeByte = 5, initMinAlphaBeforeByte = 8, minNumericBeforeAlpha = 17, minNumericBeforeByte = 9, minAlphaBeforeByte = 16, round = Math.round;
        function toDecimal(value) {
            return parseInt(value, 2);
        }
        function toBitsString(value, length) {
            var result = Number(value).toString(2);
            if (result.length < length) {
                result = new Array(length - result.length + 1).join(0) + result;
            }
            return result;
        }
        function splitInto(str, n) {
            var result = [], idx = 0;
            while (idx < str.length) {
                result.push(str.substring(idx, idx + n));
                idx += n;
            }
            return result;
        }
        var QRDataMode = kendo.Class.extend({
            getVersionIndex: function (version) {
                if (version < 10) {
                    return 0;
                } else if (version > 26) {
                    return 2;
                }
                return 1;
            },
            getBitsCharacterCount: function (version) {
                var mode = this;
                return mode.bitsInCharacterCount[mode.getVersionIndex(version || 40)];
            },
            getModeCountString: function (length, version) {
                var mode = this;
                return mode.modeIndicator + toBitsString(length, mode.getBitsCharacterCount(version));
            },
            encode: function () {
            },
            getStringBitsLength: function () {
            },
            getValue: function () {
            },
            modeIndicator: '',
            bitsInCharacterCount: []
        });
        var modes = {};
        modes[NUMERIC] = QRDataMode.extend({
            bitsInCharacterCount: [
                10,
                12,
                14
            ],
            modeIndicator: '0001',
            getValue: function (character) {
                return parseInt(character, 10);
            },
            encode: function (str, version) {
                var mode = this, parts = splitInto(str, 3), result = mode.getModeCountString(str.length, version);
                for (var i = 0; i < parts.length - 1; i++) {
                    result += toBitsString(parts[i], 10);
                }
                return result + toBitsString(parts[i], 1 + 3 * parts[i].length);
            },
            getStringBitsLength: function (inputLength, version) {
                var mod3 = inputLength % 3;
                return 4 + this.getBitsCharacterCount(version) + 10 * Math.floor(inputLength / 3) + 3 * mod3 + (mod3 === 0 ? 0 : 1);
            }
        });
        modes[ALPHA_NUMERIC] = QRDataMode.extend({
            characters: {
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
                'A': 10,
                'B': 11,
                'C': 12,
                'D': 13,
                'E': 14,
                'F': 15,
                'G': 16,
                'H': 17,
                'I': 18,
                'J': 19,
                'K': 20,
                'L': 21,
                'M': 22,
                'N': 23,
                'O': 24,
                'P': 25,
                'Q': 26,
                'R': 27,
                'S': 28,
                'T': 29,
                'U': 30,
                'V': 31,
                'W': 32,
                'X': 33,
                'Y': 34,
                'Z': 35,
                ' ': 36,
                '$': 37,
                '%': 38,
                '*': 39,
                '+': 40,
                '-': 41,
                '.': 42,
                '/': 43,
                ':': 44
            },
            bitsInCharacterCount: [
                9,
                11,
                13
            ],
            modeIndicator: '0010',
            getValue: function (character) {
                return this.characters[character];
            },
            encode: function (str, version) {
                var mode = this, parts = splitInto(str, 2), result = mode.getModeCountString(str.length, version), value;
                for (var i = 0; i < parts.length - 1; i++) {
                    value = 45 * mode.getValue(parts[i].charAt(0)) + mode.getValue(parts[i].charAt(1));
                    result += toBitsString(value, 11);
                }
                value = parts[i].length == 2 ? 45 * mode.getValue(parts[i].charAt(0)) + mode.getValue(parts[i].charAt(1)) : mode.getValue(parts[i].charAt(0));
                return result + toBitsString(value, 1 + 5 * parts[i].length);
            },
            getStringBitsLength: function (inputLength, version) {
                return 4 + this.getBitsCharacterCount(version) + 11 * Math.floor(inputLength / 2) + 6 * (inputLength % 2);
            }
        });
        modes[BYTE] = QRDataMode.extend({
            bitsInCharacterCount: [
                8,
                16,
                16
            ],
            modeIndicator: '0100',
            getValue: function (character) {
                var code = character.charCodeAt(0);
                if (code <= 127 || 160 <= code && code <= 255) {
                    return code;
                } else {
                    throw new Error('Unsupported character: ' + character);
                }
            },
            encode: function (str, version) {
                var mode = this, result = mode.getModeCountString(str.length, version);
                for (var i = 0; i < str.length; i++) {
                    result += toBitsString(mode.getValue(str.charAt(i)), 8);
                }
                return result;
            },
            getStringBitsLength: function (inputLength, version) {
                return 4 + this.getBitsCharacterCount(version) + 8 * inputLength;
            }
        });
        var modeInstances = {};
        for (var mode in modes) {
            modeInstances[mode] = new modes[mode]();
        }
        var FreeCellVisitor = function (matrix) {
            var that = this, row = matrix.length - 1, column = matrix.length - 1, startColumn = column, dir = -1, c = 0;
            that.move = function () {
                row += dir * c;
                c ^= 1;
                column = startColumn - c;
            };
            that.getNextCell = function () {
                while (matrix[row][column] !== undefined) {
                    that.move();
                    if (row < 0 || row >= matrix.length) {
                        dir = -dir;
                        startColumn -= startColumn != 8 ? 2 : 3;
                        column = startColumn;
                        row = dir < 0 ? matrix.length - 1 : 0;
                    }
                }
                return {
                    row: row,
                    column: column
                };
            };
            that.getNextRemainderCell = function () {
                that.move();
                if (matrix[row][column] === undefined) {
                    return {
                        row: row,
                        column: column
                    };
                }
            };
        };
        function fillFunctionCell(matrices, bit, x, y) {
            for (var i = 0; i < matrices.length; i++) {
                matrices[i][x][y] = bit;
            }
        }
        function fillDataCell(matrices, bit, x, y) {
            for (var i = 0; i < maskPatternConditions.length; i++) {
                matrices[i][x][y] = maskPatternConditions[i](x, y) ? bit ^ 1 : parseInt(bit, 10);
            }
        }
        var fillData = function (matrices, blocks) {
            var cellVisitor = new FreeCellVisitor(matrices[0]), block, codewordIdx, cell;
            for (var blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
                block = blocks[blockIdx];
                codewordIdx = 0;
                while (block.length > 0) {
                    for (var i = 0; i < block.length; i++) {
                        for (var j = 0; j < 8; j++) {
                            cell = cellVisitor.getNextCell();
                            fillDataCell(matrices, block[i][codewordIdx].charAt(j), cell.row, cell.column);
                        }
                    }
                    codewordIdx++;
                    while (block[0] && codewordIdx == block[0].length) {
                        block.splice(0, 1);
                    }
                }
            }
            while (cell = cellVisitor.getNextRemainderCell()) {
                fillDataCell(matrices, 0, cell.row, cell.column);
            }
        };
        var padDataString = function (dataString, totalDataCodewords) {
            var dataBitsCount = totalDataCodewords * 8, terminatorIndex = 0, paddingCodewordIndex = 0;
            while (dataString.length < dataBitsCount && terminatorIndex < terminator.length) {
                dataString += terminator.charAt(terminatorIndex++);
            }
            if (dataString.length % 8 !== 0) {
                dataString += new Array(9 - dataString.length % 8).join('0');
            }
            while (dataString.length < dataBitsCount) {
                dataString += paddingCodewords[paddingCodewordIndex];
                paddingCodewordIndex ^= 1;
            }
            return dataString;
        };
        function generatePowersOfTwo() {
            var result;
            for (var power = 1; power < 255; power++) {
                result = powersOfTwoResult[power - 1] * 2;
                if (result > 255) {
                    result = result ^ 285;
                }
                powersOfTwoResult[power] = result;
                powersOfTwo[result] = power;
            }
            result = powersOfTwoResult[power - 1] * 2 ^ 285;
            powersOfTwoResult[power] = result;
            powersOfTwoResult[-1] = 0;
        }
        var xorPolynomials = function (x, y) {
            var result = [], idx = x.length - 2;
            for (var i = idx; i >= 0; i--) {
                result[i] = x[i] ^ y[i];
            }
            return result;
        };
        var multiplyPolynomials = function (x, y) {
            var result = [];
            for (var i = 0; i < x.length; i++) {
                for (var j = 0; j < y.length; j++) {
                    if (result[i + j] === undefined) {
                        result[i + j] = (x[i] + (y[j] >= 0 ? y[j] : 0)) % 255;
                    } else {
                        result[i + j] = powersOfTwo[powersOfTwoResult[result[i + j]] ^ powersOfTwoResult[(x[i] + y[j]) % 255]];
                    }
                }
            }
            return result;
        };
        function generateGeneratorPolynomials() {
            var maxErrorCorrectionCodeWordsCount = 68;
            for (var idx = 2; idx <= maxErrorCorrectionCodeWordsCount; idx++) {
                var firstPolynomial = generatorPolynomials[idx - 1], secondPolynomial = [
                        idx,
                        0
                    ];
                generatorPolynomials[idx] = multiplyPolynomials(firstPolynomial, secondPolynomial);
            }
        }
        generatePowersOfTwo();
        generateGeneratorPolynomials();
        function multiplyByConstant(polynomial, power) {
            var result = [], idx = polynomial.length - 1;
            do {
                result[idx] = powersOfTwoResult[(polynomial[idx] + power) % 255];
                idx--;
            } while (polynomial[idx] !== undefined);
            return result;
        }
        var generateErrorCodewords = function (data, errorCodewordsCount) {
            var generator = generatorPolynomials[errorCodewordsCount - 1], result = new Array(errorCodewordsCount).concat(data), generatorPolynomial = new Array(result.length - generator.length).concat(generator), steps = data.length, errorCodewords = [], divisor, idx;
            for (idx = 0; idx < steps; idx++) {
                divisor = multiplyByConstant(generatorPolynomial, powersOfTwo[result[result.length - 1]]);
                generatorPolynomial.splice(0, 1);
                result = xorPolynomials(divisor, result);
            }
            for (idx = result.length - 1; idx >= 0; idx--) {
                errorCodewords[errorCodewordsCount - 1 - idx] = toBitsString(result[idx], 8);
            }
            return errorCodewords;
        };
        var getBlocks = function (dataStream, versionCodewordsInformation) {
            var codewordStart = 0, dataBlocks = [], errorBlocks = [], dataBlock, versionGroups = versionCodewordsInformation.groups, blockCodewordsCount, groupBlocksCount, messagePolynomial, codeword;
            for (var groupIdx = 0; groupIdx < versionGroups.length; groupIdx++) {
                groupBlocksCount = versionGroups[groupIdx][0];
                for (var blockIdx = 0; blockIdx < groupBlocksCount; blockIdx++) {
                    blockCodewordsCount = versionGroups[groupIdx][1];
                    dataBlock = [];
                    messagePolynomial = [];
                    for (var codewordIdx = 1; codewordIdx <= blockCodewordsCount; codewordIdx++) {
                        codeword = dataStream.substring(codewordStart, codewordStart + 8);
                        dataBlock.push(codeword);
                        messagePolynomial[blockCodewordsCount - codewordIdx] = toDecimal(codeword);
                        codewordStart += 8;
                    }
                    dataBlocks.push(dataBlock);
                    errorBlocks.push(generateErrorCodewords(messagePolynomial, versionCodewordsInformation.errorCodewordsPerBlock));
                }
            }
            return [
                dataBlocks,
                errorBlocks
            ];
        };
        var chooseMode = function (str, minNumericBeforeAlpha, minNumericBeforeByte, minAlphaBeforeByte, previousMode) {
            var numeric = numberRegex.exec(str), numericMatch = numeric ? numeric[0] : '', alpha = alphaRegex.exec(str), alphaMatch = alpha ? alpha[0] : '', alphaNumeric = alphaNumericRegex.exec(str), alphaNumericMatch = alphaNumeric ? alphaNumeric[0] : '', mode, modeString;
            if (numericMatch && (numericMatch.length >= minNumericBeforeAlpha || str.length == numericMatch.length || numericMatch.length >= minNumericBeforeByte && !alphaNumericRegex.test(str.charAt(numericMatch.length)))) {
                mode = NUMERIC;
                modeString = numericMatch;
            } else if (alphaNumericMatch && (str.length == alphaNumericMatch.length || alphaNumericMatch.length >= minAlphaBeforeByte || previousMode == ALPHA_NUMERIC)) {
                mode = ALPHA_NUMERIC;
                modeString = numericMatch || alphaMatch;
            } else {
                mode = BYTE;
                if (alphaNumericMatch) {
                    modeString = alphaNumericMatch + byteRegex.exec(str.substring(alphaNumericMatch.length))[0];
                } else {
                    modeString = byteRegex.exec(str)[0];
                }
            }
            return {
                mode: mode,
                modeString: modeString
            };
        };
        var getModes = function (str) {
            var modes = [], previousMode, idx = 0;
            modes.push(chooseMode(str, initMinNumericBeforeAlpha, initMinNumericBeforeByte, initMinAlphaBeforeByte, previousMode));
            previousMode = modes[0].mode;
            str = str.substr(modes[0].modeString.length);
            while (str.length > 0) {
                var nextMode = chooseMode(str, minNumericBeforeAlpha, minNumericBeforeByte, minAlphaBeforeByte, previousMode);
                if (nextMode.mode != previousMode) {
                    previousMode = nextMode.mode;
                    modes.push(nextMode);
                    idx++;
                } else {
                    modes[idx].modeString += nextMode.modeString;
                }
                str = str.substr(nextMode.modeString.length);
            }
            return modes;
        };
        var getDataCodewordsCount = function (modes) {
            var length = 0, mode;
            for (var i = 0; i < modes.length; i++) {
                mode = modeInstances[modes[i].mode];
                length += mode.getStringBitsLength(modes[i].modeString.length);
            }
            return Math.ceil(length / 8);
        };
        var getVersion = function (dataCodewordsCount, errorCorrectionLevel) {
            var x = 0, y = versionsCodewordsInformation.length - 1, version = Math.floor(versionsCodewordsInformation.length / 2);
            do {
                if (dataCodewordsCount < versionsCodewordsInformation[version][errorCorrectionLevel].totalDataCodewords) {
                    y = version;
                } else {
                    x = version;
                }
                version = x + Math.floor((y - x) / 2);
            } while (y - x > 1);
            if (dataCodewordsCount <= versionsCodewordsInformation[x][errorCorrectionLevel].totalDataCodewords) {
                return version + 1;
            }
            return y + 1;
        };
        var getDataString = function (modes, version) {
            var dataString = '', mode;
            for (var i = 0; i < modes.length; i++) {
                mode = modeInstances[modes[i].mode];
                dataString += mode.encode(modes[i].modeString, version);
            }
            return dataString;
        };
        var encodeFormatInformation = function (format) {
            var formatNumber = toDecimal(format), encodedString, result = '';
            if (formatNumber === 0) {
                return '101010000010010';
            } else {
                encodedString = encodeBCH(toDecimal(format), formatGeneratorPolynomial, 15);
            }
            for (var i = 0; i < encodedString.length; i++) {
                result += encodedString.charAt(i) ^ formatMaskPattern.charAt(i);
            }
            return result;
        };
        var encodeBCH = function (value, generatorPolynomial, codeLength) {
            var generatorNumber = toDecimal(generatorPolynomial), polynomialLength = generatorPolynomial.length - 1, valueNumber = value << polynomialLength, length = codeLength - polynomialLength, valueString = toBitsString(value, length), result = dividePolynomials(valueNumber, generatorNumber);
            result = valueString + toBitsString(result, polynomialLength);
            return result;
        };
        var dividePolynomials = function (numberX, numberY) {
            var yLength = numberY.toString(2).length, xLength = numberX.toString(2).length;
            do {
                numberX ^= numberY << xLength - yLength;
                xLength = numberX.toString(2).length;
            } while (xLength >= yLength);
            return numberX;
        };
        function getNumberAt(str, idx) {
            return parseInt(str.charAt(idx), 10);
        }
        var initMatrices = function (version) {
            var matrices = [], modules = 17 + 4 * version;
            for (var i = 0; i < maskPatternConditions.length; i++) {
                matrices[i] = new Array(modules);
                for (var j = 0; j < modules; j++) {
                    matrices[i][j] = new Array(modules);
                }
            }
            return matrices;
        };
        var addFormatInformation = function (matrices, formatString) {
            var matrix = matrices[0], x, y, idx = 0, length = formatString.length;
            for (x = 0, y = 8; x <= 8; x++) {
                if (x !== 6) {
                    fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
                }
            }
            for (x = 8, y = 7; y >= 0; y--) {
                if (y !== 6) {
                    fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
                }
            }
            idx = 0;
            for (y = matrix.length - 1, x = 8; y >= matrix.length - 8; y--) {
                fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
            }
            fillFunctionCell(matrices, 1, matrix.length - 8, 8);
            for (x = matrix.length - 7, y = 8; x < matrix.length; x++) {
                fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
            }
        };
        var encodeVersionInformation = function (version) {
            return encodeBCH(version, versionGeneratorPolynomial, 18);
        };
        var addVersionInformation = function (matrices, dataString) {
            var matrix = matrices[0], modules = matrix.length, x1 = 0, y1 = modules - 11, x2 = modules - 11, y2 = 0, quotient, mod, value;
            for (var idx = 0; idx < dataString.length; idx++) {
                quotient = Math.floor(idx / 3);
                mod = idx % 3;
                value = getNumberAt(dataString, dataString.length - idx - 1);
                fillFunctionCell(matrices, value, x1 + quotient, y1 + mod);
                fillFunctionCell(matrices, value, x2 + mod, y2 + quotient);
            }
        };
        var addCentricPattern = function (matrices, pattern, x, y) {
            var size = pattern.length + 2, length = pattern.length + 1, value;
            for (var i = 0; i < pattern.length; i++) {
                for (var j = i; j < size - i; j++) {
                    value = pattern[i];
                    fillFunctionCell(matrices, value, x + j, y + i);
                    fillFunctionCell(matrices, value, x + i, y + j);
                    fillFunctionCell(matrices, value, x + length - j, y + length - i);
                    fillFunctionCell(matrices, value, x + length - i, y + length - j);
                }
            }
        };
        var addFinderSeparator = function (matrices, direction, x, y) {
            var nextX = x, nextY = y, matrix = matrices[0];
            do {
                fillFunctionCell(matrices, 0, nextX, y);
                fillFunctionCell(matrices, 0, x, nextY);
                nextX += direction[0];
                nextY += direction[1];
            } while (nextX >= 0 && nextX < matrix.length);
        };
        var addFinderPatterns = function (matrices) {
            var modules = matrices[0].length;
            addCentricPattern(matrices, finderPattern, 0, 0);
            addFinderSeparator(matrices, [
                -1,
                -1
            ], 7, 7);
            addCentricPattern(matrices, finderPattern, modules - 7, 0);
            addFinderSeparator(matrices, [
                1,
                -1
            ], modules - 8, 7);
            addCentricPattern(matrices, finderPattern, 0, modules - 7);
            addFinderSeparator(matrices, [
                -1,
                1
            ], 7, modules - 8);
        };
        var addAlignmentPatterns = function (matrices, version) {
            if (version < 2) {
                return;
            }
            var matrix = matrices[0], modules = matrix.length, pointsCount = Math.floor(version / 7), points = [6], startDistance, distance, idx = 0;
            if (startDistance = irregularAlignmentPatternsStartDistance[version]) {
                distance = (modules - 13 - startDistance) / pointsCount;
            } else {
                startDistance = distance = (modules - 13) / (pointsCount + 1);
            }
            points.push(points[idx++] + startDistance);
            while (points[idx] + distance < modules) {
                points.push(points[idx++] + distance);
            }
            for (var i = 0; i < points.length; i++) {
                for (var j = 0; j < points.length; j++) {
                    if (matrix[points[i]][points[j]] === undefined) {
                        addCentricPattern(matrices, alignmentPattern, points[i] - 2, points[j] - 2);
                    }
                }
            }
        };
        var addTimingFunctions = function (matrices) {
            var row = 6, column = 6, value = 1, modules = matrices[0].length;
            for (var i = 8; i < modules - 8; i++) {
                fillFunctionCell(matrices, value, row, i);
                fillFunctionCell(matrices, value, i, column);
                value ^= 1;
            }
        };
        var scoreMaskMatrixes = function (matrices) {
            var scores = [], previousBits = [], darkModules = [], patterns = [], adjacentSameBits = [], matrix, i, row = 0, column = 1, modules = matrices[0].length;
            for (i = 0; i < matrices.length; i++) {
                scores[i] = 0;
                darkModules[i] = 0;
                adjacentSameBits[i] = [
                    0,
                    0
                ];
                patterns[i] = [
                    0,
                    0
                ];
                previousBits[i] = [];
            }
            for (i = 0; i < modules; i++) {
                for (var j = 0; j < modules; j++) {
                    for (var k = 0; k < matrices.length; k++) {
                        matrix = matrices[k];
                        darkModules[k] += parseInt(matrix[i][j], 10);
                        if (previousBits[k][row] === matrix[i][j] && i + 1 < modules && j - 1 >= 0 && matrix[i + 1][j] == previousBits[k][row] && matrix[i + 1][j - 1] == previousBits[k][row]) {
                            scores[k] += 3;
                        }
                        scoreFinderPatternOccurance(k, patterns, scores, row, matrix[i][j]);
                        scoreFinderPatternOccurance(k, patterns, scores, column, matrix[j][i]);
                        scoreAdjacentSameBits(k, scores, previousBits, matrix[i][j], adjacentSameBits, row);
                        scoreAdjacentSameBits(k, scores, previousBits, matrix[j][i], adjacentSameBits, column);
                    }
                }
            }
            var total = modules * modules, minIdx, min = Number.MAX_VALUE;
            for (i = 0; i < scores.length; i++) {
                scores[i] += calculateDarkModulesRatioScore(darkModules[i], total);
                if (scores[i] < min) {
                    min = scores[i];
                    minIdx = i;
                }
            }
            return minIdx;
        };
        function scoreFinderPatternOccurance(idx, patterns, scores, rowColumn, bit) {
            patterns[idx][rowColumn] = (patterns[idx][rowColumn] << 1 ^ bit) % 128;
            if (patterns[idx][rowColumn] == finderPatternValue) {
                scores[idx] += 40;
            }
        }
        function scoreAdjacentSameBits(idx, scores, previousBits, bit, adjacentBits, rowColumn) {
            if (previousBits[idx][rowColumn] == bit) {
                adjacentBits[idx][rowColumn]++;
            } else {
                previousBits[idx][rowColumn] = bit;
                if (adjacentBits[idx][rowColumn] >= 5) {
                    scores[idx] += 3 + adjacentBits[idx][rowColumn] - 5;
                }
                adjacentBits[idx][rowColumn] = 1;
            }
        }
        function calculateDarkModulesRatioScore(darkModules, total) {
            var percent = Math.floor(darkModules / total * 100), mod5 = percent % 5, previous = Math.abs(percent - mod5 - 50), next = Math.abs(percent + 5 - mod5 - 50), score = 10 * Math.min(previous / 5, next / 5);
            return score;
        }
        var EncodingResult = function (dataString, version) {
            this.dataString = dataString;
            this.version = version;
        };
        var IsoEncoder = function () {
            this.getEncodingResult = function (inputString, errorCorrectionLevel) {
                var modes = getModes(inputString), dataCodewordsCount = getDataCodewordsCount(modes), version = getVersion(dataCodewordsCount, errorCorrectionLevel), dataString = getDataString(modes, version);
                return new EncodingResult(dataString, version);
            };
        };
        var UTF8Encoder = function () {
            this.mode = modeInstances[this.encodingMode];
        };
        UTF8Encoder.fn = UTF8Encoder.prototype = {
            encodingMode: BYTE,
            utfBOM: '111011111011101110111111',
            initialModeCountStringLength: 20,
            getEncodingResult: function (inputString, errorCorrectionLevel) {
                var that = this, data = that.encode(inputString), dataCodewordsCount = that.getDataCodewordsCount(data), version = getVersion(dataCodewordsCount, errorCorrectionLevel), dataString = that.mode.getModeCountString(data.length / 8, version) + data;
                return new EncodingResult(dataString, version);
            },
            getDataCodewordsCount: function (data) {
                var that = this, dataLength = data.length, dataCodewordsCount = Math.ceil((that.initialModeCountStringLength + dataLength) / 8);
                return dataCodewordsCount;
            },
            encode: function (str) {
                var that = this, result = that.utfBOM;
                for (var i = 0; i < str.length; i++) {
                    result += that.encodeCharacter(str.charCodeAt(i));
                }
                return result;
            },
            encodeCharacter: function (code) {
                var bytesCount = this.getBytesCount(code), bc = bytesCount - 1, result = '';
                if (bytesCount == 1) {
                    result = toBitsString(code, 8);
                } else {
                    var significantOnes = 8 - bytesCount;
                    for (var i = 0; i < bc; i++) {
                        result = toBitsString(code >> i * 6 & 63 | 128, 8) + result;
                    }
                    result = (code >> bc * 6 | 255 >> significantOnes << significantOnes).toString(2) + result;
                }
                return result;
            },
            getBytesCount: function (code) {
                var ranges = this.ranges;
                for (var i = 0; i < ranges.length; i++) {
                    if (code < ranges[i]) {
                        return i + 1;
                    }
                }
            },
            ranges: [
                128,
                2048,
                65536,
                2097152,
                67108864
            ]
        };
        var QRCodeDataEncoder = function (encoding) {
            if (encoding && encoding.toLowerCase().indexOf('utf_8') >= 0) {
                return new UTF8Encoder();
            } else {
                return new IsoEncoder();
            }
        };
        var encodeData = function (inputString, errorCorrectionLevel, encoding) {
            var encoder = new QRCodeDataEncoder(encoding), encodingResult = encoder.getEncodingResult(inputString, errorCorrectionLevel), version = encodingResult.version, versionInformation = versionsCodewordsInformation[version - 1][errorCorrectionLevel], dataString = padDataString(encodingResult.dataString, versionInformation.totalDataCodewords), blocks = getBlocks(dataString, versionInformation), matrices = initMatrices(version);
            addFinderPatterns(matrices);
            addAlignmentPatterns(matrices, version);
            addTimingFunctions(matrices);
            if (version >= 7) {
                addVersionInformation(matrices, toBitsString(0, 18));
            }
            addFormatInformation(matrices, toBitsString(0, 15));
            fillData(matrices, blocks);
            var minIdx = scoreMaskMatrixes(matrices), optimalMatrix = matrices[minIdx];
            if (version >= 7) {
                addVersionInformation([optimalMatrix], encodeVersionInformation(version));
            }
            var formatString = errorCorrectionPatterns[errorCorrectionLevel] + toBitsString(minIdx, 3);
            addFormatInformation([optimalMatrix], encodeFormatInformation(formatString));
            return optimalMatrix;
        };
        var QRCodeDefaults = {
            DEFAULT_SIZE: 200,
            QUIET_ZONE_LENGTH: 4,
            DEFAULT_ERROR_CORRECTION_LEVEL: 'L',
            DEFAULT_BACKGROUND: '#fff',
            DEFAULT_DARK_MODULE_COLOR: '#000',
            MIN_BASE_UNIT_SIZE: 1
        };
        var QRCode = Widget.extend({
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that.element = $(element);
                that.wrapper = that.element;
                that.element.addClass('k-qrcode');
                that.surfaceWrap = $('<div />').css('position', 'relative').appendTo(this.element);
                that.surface = draw.Surface.create(that.surfaceWrap, { type: that.options.renderAs });
                that.setOptions(options);
            },
            redraw: function () {
                var size = this._getSize();
                this.surfaceWrap.css({
                    width: size,
                    height: size
                });
                this.surface.clear();
                this.createVisual();
                this.surface.draw(this.visual);
            },
            getSize: function () {
                return kendo.dimensions(this.element);
            },
            _resize: function () {
                this.redraw();
            },
            createVisual: function () {
                this.visual = this._render();
            },
            exportVisual: function () {
                return this._render();
            },
            _render: function () {
                var that = this, value = that._value, baseUnit, border = that.options.border || {}, padding = that.options.padding || 0, borderWidth = border.width || 0, quietZoneSize, matrix, size, dataSize, contentSize;
                border.width = borderWidth;
                var visual = new draw.Group();
                if (value) {
                    matrix = encodeData(value, that.options.errorCorrection, that.options.encoding);
                    size = that._getSize();
                    contentSize = size - 2 * (borderWidth + padding);
                    baseUnit = that._calculateBaseUnit(contentSize, matrix.length);
                    dataSize = matrix.length * baseUnit;
                    quietZoneSize = borderWidth + padding + (contentSize - dataSize) / 2;
                    visual.append(that._renderBackground(size, border));
                    visual.append(that._renderMatrix(matrix, baseUnit, quietZoneSize));
                }
                return visual;
            },
            _getSize: function () {
                var that = this, size;
                if (that.options.size) {
                    size = parseInt(that.options.size, 10);
                } else {
                    var element = that.element, min = Math.min(element.width(), element.height());
                    if (min > 0) {
                        size = min;
                    } else {
                        size = QRCodeDefaults.DEFAULT_SIZE;
                    }
                }
                return size;
            },
            _calculateBaseUnit: function (size, matrixSize) {
                var baseUnit = Math.floor(size / matrixSize);
                if (baseUnit < QRCodeDefaults.MIN_BASE_UNIT_SIZE) {
                    throw new Error('Insufficient size.');
                }
                if (baseUnit * matrixSize >= size && baseUnit - 1 >= QRCodeDefaults.MIN_BASE_UNIT_SIZE) {
                    baseUnit--;
                }
                return baseUnit;
            },
            _renderMatrix: function (matrix, baseUnit, quietZoneSize) {
                var path = new draw.MultiPath({
                    fill: { color: this.options.color },
                    stroke: null
                });
                for (var row = 0; row < matrix.length; row++) {
                    var y = quietZoneSize + row * baseUnit;
                    var column = 0;
                    while (column < matrix.length) {
                        while (matrix[row][column] === 0 && column < matrix.length) {
                            column++;
                        }
                        if (column < matrix.length) {
                            var x = column;
                            while (matrix[row][column] == 1) {
                                column++;
                            }
                            var x1 = round(quietZoneSize + x * baseUnit);
                            var y1 = round(y);
                            var x2 = round(quietZoneSize + column * baseUnit);
                            var y2 = round(y + baseUnit);
                            path.moveTo(x1, y1).lineTo(x1, y2).lineTo(x2, y2).lineTo(x2, y1).close();
                        }
                    }
                }
                return path;
            },
            _renderBackground: function (size, border) {
                var box = Box2D(0, 0, size, size).unpad(border.width / 2);
                return draw.Path.fromRect(box.toRect(), {
                    fill: { color: this.options.background },
                    stroke: {
                        color: border.color,
                        width: border.width
                    }
                });
            },
            setOptions: function (options) {
                var that = this;
                options = options || {};
                that.options = extend(that.options, options);
                if (options.value !== undefined) {
                    that._value = that.options.value + '';
                }
                that.redraw();
            },
            value: function (value) {
                var that = this;
                if (value === undefined) {
                    return that._value;
                }
                that._value = value + '';
                that.redraw();
            },
            options: {
                name: 'QRCode',
                renderAs: 'svg',
                encoding: 'ISO_8859_1',
                value: '',
                errorCorrection: QRCodeDefaults.DEFAULT_ERROR_CORRECTION_LEVEL,
                background: QRCodeDefaults.DEFAULT_BACKGROUND,
                color: QRCodeDefaults.DEFAULT_DARK_MODULE_COLOR,
                size: '',
                padding: 0,
                border: {
                    color: '',
                    width: 0
                }
            }
        });
        dataviz.ExportMixin.extend(QRCode.fn);
        dataviz.ui.plugin(QRCode);
        kendo.deepExtend(dataviz, {
            QRCode: QRCode,
            QRCodeDefaults: QRCodeDefaults,
            QRCodeFunctions: {
                FreeCellVisitor: FreeCellVisitor,
                fillData: fillData,
                padDataString: padDataString,
                generateErrorCodewords: generateErrorCodewords,
                xorPolynomials: xorPolynomials,
                getBlocks: getBlocks,
                multiplyPolynomials: multiplyPolynomials,
                chooseMode: chooseMode,
                getModes: getModes,
                getDataCodewordsCount: getDataCodewordsCount,
                getVersion: getVersion,
                getDataString: getDataString,
                encodeFormatInformation: encodeFormatInformation,
                encodeBCH: encodeBCH,
                dividePolynomials: dividePolynomials,
                initMatrices: initMatrices,
                addFormatInformation: addFormatInformation,
                encodeVersionInformation: encodeVersionInformation,
                addVersionInformation: addVersionInformation,
                addCentricPattern: addCentricPattern,
                addFinderSeparator: addFinderSeparator,
                addFinderPatterns: addFinderPatterns,
                addAlignmentPatterns: addAlignmentPatterns,
                addTimingFunctions: addTimingFunctions,
                scoreMaskMatrixes: scoreMaskMatrixes,
                encodeData: encodeData,
                UTF8Encoder: UTF8Encoder
            },
            QRCodeFields: {
                modes: modeInstances,
                powersOfTwo: powersOfTwo,
                powersOfTwoResult: powersOfTwoResult,
                generatorPolynomials: generatorPolynomials
            }
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));