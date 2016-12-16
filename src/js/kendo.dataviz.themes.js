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
    define('kendo.dataviz.themes', ['kendo.dataviz.core'], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.themes',
        name: 'Themes',
        description: 'Built-in themes for the DataViz widgets',
        category: 'dataviz',
        depends: ['dataviz.core'],
        hidden: true
    };
    (function ($) {
        var kendo = window.kendo, ui = kendo.dataviz.ui, deepExtend = kendo.deepExtend;
        var BAR_GAP = 1.5, BAR_SPACING = 0.4, BLACK = '#000', SANS = 'Arial,Helvetica,sans-serif', SANS11 = '11px ' + SANS, SANS12 = '12px ' + SANS, SANS16 = '16px ' + SANS, WHITE = '#fff';
        var chartBaseTheme = {
            title: { font: SANS16 },
            legend: { labels: { font: SANS12 } },
            seriesDefaults: {
                visible: true,
                labels: { font: SANS11 },
                donut: { margin: 1 },
                line: { width: 2 },
                vericalLine: { width: 2 },
                scatterLine: { width: 1 },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    highlight: {
                        markers: {
                            border: {
                                color: '#fff',
                                opacity: 1,
                                width: 1
                            }
                        }
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                verticalArea: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                radarLine: {
                    width: 2,
                    markers: { visible: false }
                },
                radarArea: {
                    opacity: 0.5,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                candlestick: {
                    line: {
                        width: 1,
                        color: BLACK
                    },
                    border: {
                        width: 1,
                        _brightness: 0.8
                    },
                    gap: 1,
                    spacing: 0.3,
                    downColor: WHITE,
                    highlight: {
                        line: { width: 2 },
                        border: {
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                ohlc: {
                    line: { width: 1 },
                    gap: 1,
                    spacing: 0.3,
                    highlight: {
                        line: {
                            width: 3,
                            opacity: 1
                        }
                    }
                },
                bubble: {
                    opacity: 0.6,
                    border: { width: 0 },
                    labels: { background: 'transparent' }
                },
                bar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                column: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                rangeColumn: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                rangeBar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                waterfall: {
                    gap: 0.5,
                    spacing: BAR_SPACING,
                    line: {
                        width: 1,
                        color: BLACK
                    }
                },
                horizontalWaterfall: {
                    gap: 0.5,
                    spacing: BAR_SPACING,
                    line: {
                        width: 1,
                        color: BLACK
                    }
                },
                bullet: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING,
                    target: { color: '#ff0000' }
                },
                verticalBullet: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING,
                    target: { color: '#ff0000' }
                },
                boxPlot: {
                    outliersField: '',
                    meanField: '',
                    whiskers: {
                        width: 1,
                        color: BLACK
                    },
                    mean: {
                        width: 1,
                        color: BLACK
                    },
                    median: {
                        width: 1,
                        color: BLACK
                    },
                    border: {
                        width: 1,
                        _brightness: 0.8
                    },
                    gap: 1,
                    spacing: 0.3,
                    downColor: WHITE,
                    highlight: {
                        whiskers: { width: 2 },
                        border: {
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                funnel: {
                    labels: {
                        color: '',
                        background: ''
                    }
                },
                notes: {
                    icon: { border: { width: 1 } },
                    label: {
                        padding: 3,
                        font: SANS12
                    },
                    line: {
                        length: 10,
                        width: 1
                    },
                    visible: true
                }
            },
            categoryAxis: { majorGridLines: { visible: true } },
            axisDefaults: {
                labels: { font: SANS12 },
                title: {
                    font: SANS16,
                    margin: 5
                },
                crosshair: { tooltip: { font: SANS12 } },
                notes: {
                    icon: {
                        size: 7,
                        border: { width: 1 }
                    },
                    label: {
                        padding: 3,
                        font: SANS12
                    },
                    line: {
                        length: 10,
                        width: 1
                    },
                    visible: true
                }
            },
            tooltip: { font: SANS12 },
            navigator: {
                pane: {
                    height: 90,
                    margin: { top: 10 }
                }
            }
        };
        var gaugeBaseTheme = { scale: { labels: { font: SANS12 } } };
        var diagramBaseTheme = {
            shapeDefaults: {
                hover: { opacity: 0.2 },
                stroke: { width: 0 }
            },
            editable: {
                resize: {
                    handles: {
                        width: 7,
                        height: 7
                    }
                }
            },
            selectable: {
                stroke: {
                    width: 1,
                    dashType: 'dot'
                }
            },
            connectionDefaults: {
                stroke: { width: 2 },
                selection: {
                    handles: {
                        width: 8,
                        height: 8
                    }
                },
                editable: {
                    tools: [
                        'edit',
                        'delete'
                    ]
                }
            }
        };
        var themes = ui.themes, registerTheme = ui.registerTheme = function (themeName, options) {
                var result = {};
                result.chart = deepExtend({}, chartBaseTheme, options.chart);
                result.gauge = deepExtend({}, gaugeBaseTheme, options.gauge);
                result.diagram = deepExtend({}, diagramBaseTheme, options.diagram);
                result.treeMap = deepExtend({}, options.treeMap);
                var defaults = result.chart.seriesDefaults;
                defaults.verticalLine = deepExtend({}, defaults.line);
                defaults.verticalArea = deepExtend({}, defaults.area);
                defaults.verticalBoxPlot = deepExtend({}, defaults.boxPlot);
                defaults.polarArea = deepExtend({}, defaults.radarArea);
                defaults.polarLine = deepExtend({}, defaults.radarLine);
                themes[themeName] = result;
            };
        registerTheme('black', {
            chart: {
                title: { color: WHITE },
                legend: {
                    labels: { color: WHITE },
                    inactiveItems: {
                        labels: { color: '#919191' },
                        markers: { color: '#919191' }
                    }
                },
                seriesDefaults: {
                    labels: { color: WHITE },
                    errorBars: { color: WHITE },
                    notes: {
                        icon: {
                            background: '#3b3b3b',
                            border: { color: '#8e8e8e' }
                        },
                        label: { color: WHITE },
                        line: { color: '#8e8e8e' }
                    },
                    pie: { overlay: { gradient: 'sharpBevel' } },
                    donut: { overlay: { gradient: 'sharpGlass' } },
                    line: { markers: { background: '#3d3d3d' } },
                    scatter: { markers: { background: '#3d3d3d' } },
                    scatterLine: { markers: { background: '#3d3d3d' } },
                    waterfall: { line: { color: '#8e8e8e' } },
                    horizontalWaterfall: { line: { color: '#8e8e8e' } },
                    candlestick: {
                        downColor: '#555',
                        line: { color: WHITE },
                        border: {
                            _brightness: 1.5,
                            opacity: 1
                        },
                        highlight: {
                            border: {
                                color: WHITE,
                                opacity: 0.2
                            }
                        }
                    },
                    ohlc: { line: { color: WHITE } }
                },
                chartArea: { background: '#3d3d3d' },
                seriesColors: [
                    '#0081da',
                    '#3aafff',
                    '#99c900',
                    '#ffeb3d',
                    '#b20753',
                    '#ff4195'
                ],
                axisDefaults: {
                    line: { color: '#8e8e8e' },
                    labels: { color: WHITE },
                    majorGridLines: { color: '#545454' },
                    minorGridLines: { color: '#454545' },
                    title: { color: WHITE },
                    crosshair: { color: '#8e8e8e' },
                    notes: {
                        icon: {
                            background: '#3b3b3b',
                            border: { color: '#8e8e8e' }
                        },
                        label: { color: WHITE },
                        line: { color: '#8e8e8e' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#0070e4' },
                scale: {
                    rangePlaceholderColor: '#1d1d1d',
                    labels: { color: WHITE },
                    minorTicks: { color: WHITE },
                    majorTicks: { color: WHITE },
                    line: { color: WHITE }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#0066cc' },
                    connectorDefaults: {
                        fill: { color: WHITE },
                        stroke: { color: '#384049' },
                        hover: {
                            fill: { color: '#3d3d3d' },
                            stroke: { color: '#efefef' }
                        }
                    },
                    content: { color: WHITE }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: '#3d3d3d' },
                            stroke: { color: WHITE },
                            hover: {
                                fill: { color: WHITE },
                                stroke: { color: WHITE }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: WHITE },
                            fill: { color: WHITE }
                        }
                    }
                },
                selectable: { stroke: { color: WHITE } },
                connectionDefaults: {
                    stroke: { color: WHITE },
                    content: { color: WHITE },
                    selection: {
                        handles: {
                            fill: { color: '#3d3d3d' },
                            stroke: { color: '#efefef' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#0081da',
                        '#314b5c'
                    ],
                    [
                        '#3aafff',
                        '#3c5464'
                    ],
                    [
                        '#99c900',
                        '#4f5931'
                    ],
                    [
                        '#ffeb3d',
                        '#64603d'
                    ],
                    [
                        '#b20753',
                        '#543241'
                    ],
                    [
                        '#ff4195',
                        '#643e4f'
                    ]
                ]
            }
        });
        registerTheme('blueopal', {
            chart: {
                title: { color: '#293135' },
                legend: {
                    labels: { color: '#293135' },
                    inactiveItems: {
                        labels: { color: '#27A5BA' },
                        markers: { color: '#27A5BA' }
                    }
                },
                seriesDefaults: {
                    labels: {
                        color: BLACK,
                        background: WHITE,
                        opacity: 0.5
                    },
                    errorBars: { color: '#293135' },
                    candlestick: {
                        downColor: '#c4d0d5',
                        line: { color: '#9aabb2' }
                    },
                    waterfall: { line: { color: '#9aabb2' } },
                    horizontalWaterfall: { line: { color: '#9aabb2' } },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#9aabb2' }
                        },
                        label: { color: '#293135' },
                        line: { color: '#9aabb2' }
                    }
                },
                seriesColors: [
                    '#0069a5',
                    '#0098ee',
                    '#7bd2f6',
                    '#ffb800',
                    '#ff8517',
                    '#e34a00'
                ],
                axisDefaults: {
                    line: { color: '#9aabb2' },
                    labels: { color: '#293135' },
                    majorGridLines: { color: '#c4d0d5' },
                    minorGridLines: { color: '#edf1f2' },
                    title: { color: '#293135' },
                    crosshair: { color: '#9aabb2' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#9aabb2' }
                        },
                        label: { color: '#293135' },
                        line: { color: '#9aabb2' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#005c83' },
                scale: {
                    rangePlaceholderColor: '#daecf4',
                    labels: { color: '#293135' },
                    minorTicks: { color: '#293135' },
                    majorTicks: { color: '#293135' },
                    line: { color: '#293135' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#7ec6e3' },
                    connectorDefaults: {
                        fill: { color: '#003f59' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#003f59' }
                        }
                    },
                    content: { color: '#293135' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#003f59' },
                            hover: {
                                fill: { color: '#003f59' },
                                stroke: { color: '#003f59' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#003f59' },
                            fill: { color: '#003f59' }
                        }
                    }
                },
                selectable: { stroke: { color: '#003f59' } },
                connectionDefaults: {
                    stroke: { color: '#003f59' },
                    content: { color: '#293135' },
                    selection: {
                        handles: {
                            fill: { color: '#3d3d3d' },
                            stroke: { color: '#efefef' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#0069a5',
                        '#bad7e7'
                    ],
                    [
                        '#0098ee',
                        '#b9e0f5'
                    ],
                    [
                        '#7bd2f6',
                        '#ceeaf6'
                    ],
                    [
                        '#ffb800',
                        '#e6e3c4'
                    ],
                    [
                        '#ff8517',
                        '#e4d8c8'
                    ],
                    [
                        '#e34a00',
                        '#ddccc2'
                    ]
                ]
            }
        });
        registerTheme('highcontrast', {
            chart: {
                title: { color: '#ffffff' },
                legend: {
                    labels: { color: '#ffffff' },
                    inactiveItems: {
                        labels: { color: '#66465B' },
                        markers: { color: '#66465B' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#ffffff' },
                    errorBars: { color: '#ffffff' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#ffffff' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#ffffff' }
                    },
                    pie: { overlay: { gradient: 'sharpGlass' } },
                    donut: { overlay: { gradient: 'sharpGlass' } },
                    line: { markers: { background: '#2c232b' } },
                    scatter: { markers: { background: '#2c232b' } },
                    scatterLine: { markers: { background: '#2c232b' } },
                    area: { opacity: 0.5 },
                    waterfall: { line: { color: '#ffffff' } },
                    horizontalWaterfall: { line: { color: '#ffffff' } },
                    candlestick: {
                        downColor: '#664e62',
                        line: { color: '#ffffff' },
                        border: {
                            _brightness: 1.5,
                            opacity: 1
                        },
                        highlight: {
                            border: {
                                color: '#ffffff',
                                opacity: 1
                            }
                        }
                    },
                    ohlc: { line: { color: '#ffffff' } }
                },
                chartArea: { background: '#2c232b' },
                seriesColors: [
                    '#a7008f',
                    '#ffb800',
                    '#3aafff',
                    '#99c900',
                    '#b20753',
                    '#ff4195'
                ],
                axisDefaults: {
                    line: { color: '#ffffff' },
                    labels: { color: '#ffffff' },
                    majorGridLines: { color: '#664e62' },
                    minorGridLines: { color: '#4f394b' },
                    title: { color: '#ffffff' },
                    crosshair: { color: '#ffffff' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#ffffff' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#ffffff' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#a7008f' },
                scale: {
                    rangePlaceholderColor: '#2c232b',
                    labels: { color: '#ffffff' },
                    minorTicks: { color: '#2c232b' },
                    majorTicks: { color: '#664e62' },
                    line: { color: '#ffffff' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#a7018f' },
                    connectorDefaults: {
                        fill: { color: WHITE },
                        stroke: { color: '#2c232b' },
                        hover: {
                            fill: { color: '#2c232b' },
                            stroke: { color: WHITE }
                        }
                    },
                    content: { color: WHITE }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: '#2c232b' },
                            stroke: { color: WHITE },
                            hover: {
                                fill: { color: WHITE },
                                stroke: { color: WHITE }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: WHITE },
                            fill: { color: WHITE }
                        }
                    }
                },
                selectable: { stroke: { color: WHITE } },
                connectionDefaults: {
                    stroke: { color: WHITE },
                    content: { color: WHITE },
                    selection: {
                        handles: {
                            fill: { color: '#2c232b' },
                            stroke: { color: WHITE }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#a7008f',
                        '#451c3f'
                    ],
                    [
                        '#ffb800',
                        '#564122'
                    ],
                    [
                        '#3aafff',
                        '#2f3f55'
                    ],
                    [
                        '#99c900',
                        '#424422'
                    ],
                    [
                        '#b20753',
                        '#471d33'
                    ],
                    [
                        '#ff4195',
                        '#562940'
                    ]
                ]
            }
        });
        registerTheme('default', {
            chart: {
                title: { color: '#8e8e8e' },
                legend: {
                    labels: { color: '#232323' },
                    inactiveItems: {
                        labels: { color: '#919191' },
                        markers: { color: '#919191' }
                    }
                },
                seriesDefaults: {
                    labels: {
                        color: BLACK,
                        background: WHITE,
                        opacity: 0.5
                    },
                    errorBars: { color: '#232323' },
                    candlestick: {
                        downColor: '#dedede',
                        line: { color: '#8d8d8d' }
                    },
                    waterfall: { line: { color: '#8e8e8e' } },
                    horizontalWaterfall: { line: { color: '#8e8e8e' } },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#8e8e8e' }
                        },
                        label: { color: '#232323' },
                        line: { color: '#8e8e8e' }
                    }
                },
                seriesColors: [
                    '#ff6800',
                    '#a0a700',
                    '#ff8d00',
                    '#678900',
                    '#ffb53c',
                    '#396000'
                ],
                axisDefaults: {
                    line: { color: '#8e8e8e' },
                    labels: { color: '#232323' },
                    minorGridLines: { color: '#f0f0f0' },
                    majorGridLines: { color: '#dfdfdf' },
                    title: { color: '#232323' },
                    crosshair: { color: '#8e8e8e' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#8e8e8e' }
                        },
                        label: { color: '#232323' },
                        line: { color: '#8e8e8e' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#ea7001' },
                scale: {
                    rangePlaceholderColor: '#dedede',
                    labels: { color: '#2e2e2e' },
                    minorTicks: { color: '#2e2e2e' },
                    majorTicks: { color: '#2e2e2e' },
                    line: { color: '#2e2e2e' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#e15613' },
                    connectorDefaults: {
                        fill: { color: '#282828' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#282828' }
                        }
                    },
                    content: { color: '#2e2e2e' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#282828' },
                            hover: {
                                fill: { color: '#282828' },
                                stroke: { color: '#282828' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#282828' },
                            fill: { color: '#282828' }
                        }
                    }
                },
                selectable: { stroke: { color: '#a7018f' } },
                connectionDefaults: {
                    stroke: { color: '#282828' },
                    content: { color: '#2e2e2e' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#282828' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#ff6800',
                        '#edcfba'
                    ],
                    [
                        '#a0a700',
                        '#dadcba'
                    ],
                    [
                        '#ff8d00',
                        '#edd7ba'
                    ],
                    [
                        '#678900',
                        '#cfd6ba'
                    ],
                    [
                        '#ffb53c',
                        '#eddfc6'
                    ],
                    [
                        '#396000',
                        '#c6ceba'
                    ]
                ]
            }
        });
        registerTheme('silver', {
            chart: {
                title: { color: '#4e5968' },
                legend: {
                    labels: { color: '#4e5968' },
                    inactiveItems: {
                        labels: { color: '#B1BCC8' },
                        markers: { color: '#B1BCC8' }
                    }
                },
                seriesDefaults: {
                    labels: {
                        color: '#293135',
                        background: '#eaeaec',
                        opacity: 0.5
                    },
                    errorBars: { color: '#4e5968' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#4e5968' }
                        },
                        label: { color: '#4e5968' },
                        line: { color: '#4e5968' }
                    },
                    line: { markers: { background: '#eaeaec' } },
                    scatter: { markers: { background: '#eaeaec' } },
                    scatterLine: { markers: { background: '#eaeaec' } },
                    pie: { connectors: { color: '#A6B1C0' } },
                    donut: { connectors: { color: '#A6B1C0' } },
                    waterfall: { line: { color: '#a6b1c0' } },
                    horizontalWaterfall: { line: { color: '#a6b1c0' } },
                    candlestick: { downColor: '#a6afbe' }
                },
                chartArea: { background: '#eaeaec' },
                seriesColors: [
                    '#007bc3',
                    '#76b800',
                    '#ffae00',
                    '#ef4c00',
                    '#a419b7',
                    '#430B62'
                ],
                axisDefaults: {
                    line: { color: '#a6b1c0' },
                    labels: { color: '#4e5968' },
                    majorGridLines: { color: '#dcdcdf' },
                    minorGridLines: { color: '#eeeeef' },
                    title: { color: '#4e5968' },
                    crosshair: { color: '#a6b1c0' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#4e5968' }
                        },
                        label: { color: '#4e5968' },
                        line: { color: '#4e5968' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#0879c0' },
                scale: {
                    rangePlaceholderColor: '#f3f3f4',
                    labels: { color: '#515967' },
                    minorTicks: { color: '#515967' },
                    majorTicks: { color: '#515967' },
                    line: { color: '#515967' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#1c82c2' },
                    connectorDefaults: {
                        fill: { color: '#515967' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#282828' }
                        }
                    },
                    content: { color: '#515967' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#515967' },
                            hover: {
                                fill: { color: '#515967' },
                                stroke: { color: '#515967' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#515967' },
                            fill: { color: '#515967' }
                        }
                    }
                },
                selectable: { stroke: { color: '#515967' } },
                connectionDefaults: {
                    stroke: { color: '#515967' },
                    content: { color: '#515967' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#515967' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#007bc3',
                        '#c2dbea'
                    ],
                    [
                        '#76b800',
                        '#dae7c3'
                    ],
                    [
                        '#ffae00',
                        '#f5e5c3'
                    ],
                    [
                        '#ef4c00',
                        '#f2d2c3'
                    ],
                    [
                        '#a419b7',
                        '#e3c7e8'
                    ],
                    [
                        '#430b62',
                        '#d0c5d7'
                    ]
                ]
            }
        });
        registerTheme('metro', {
            chart: {
                title: { color: '#777777' },
                legend: {
                    labels: { color: '#777777' },
                    inactiveItems: {
                        labels: { color: '#CBCBCB' },
                        markers: { color: '#CBCBCB' }
                    }
                },
                seriesDefaults: {
                    labels: { color: BLACK },
                    errorBars: { color: '#777777' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#777777' }
                        },
                        label: { color: '#777777' },
                        line: { color: '#777777' }
                    },
                    candlestick: {
                        downColor: '#c7c7c7',
                        line: { color: '#787878' }
                    },
                    waterfall: { line: { color: '#c7c7c7' } },
                    horizontalWaterfall: { line: { color: '#c7c7c7' } },
                    overlay: { gradient: 'none' },
                    border: { _brightness: 1 }
                },
                seriesColors: [
                    '#8ebc00',
                    '#309b46',
                    '#25a0da',
                    '#ff6900',
                    '#e61e26',
                    '#d8e404',
                    '#16aba9',
                    '#7e51a1',
                    '#313131',
                    '#ed1691'
                ],
                axisDefaults: {
                    line: { color: '#c7c7c7' },
                    labels: { color: '#777777' },
                    minorGridLines: { color: '#c7c7c7' },
                    majorGridLines: { color: '#c7c7c7' },
                    title: { color: '#777777' },
                    crosshair: { color: '#c7c7c7' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#777777' }
                        },
                        label: { color: '#777777' },
                        line: { color: '#777777' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#8ebc00' },
                scale: {
                    rangePlaceholderColor: '#e6e6e6',
                    labels: { color: '#777' },
                    minorTicks: { color: '#777' },
                    majorTicks: { color: '#777' },
                    line: { color: '#777' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#8ebc00' },
                    connectorDefaults: {
                        fill: { color: BLACK },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: BLACK }
                        }
                    },
                    content: { color: '#777' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#787878' },
                            hover: {
                                fill: { color: '#787878' },
                                stroke: { color: '#787878' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#787878' },
                            fill: { color: '#787878' }
                        }
                    }
                },
                selectable: { stroke: { color: '#515967' } },
                connectionDefaults: {
                    stroke: { color: '#787878' },
                    content: { color: '#777' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#787878' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#8ebc00',
                        '#e8f2cc'
                    ],
                    [
                        '#309b46',
                        '#d6ebda'
                    ],
                    [
                        '#25a0da',
                        '#d3ecf8'
                    ],
                    [
                        '#ff6900',
                        '#ffe1cc'
                    ],
                    [
                        '#e61e26',
                        '#fad2d4'
                    ],
                    [
                        '#d8e404',
                        '#f7facd'
                    ],
                    [
                        '#16aba9',
                        '#d0eeee'
                    ],
                    [
                        '#7e51a1',
                        '#e5dcec'
                    ],
                    [
                        '#313131',
                        '#d6d6d6'
                    ],
                    [
                        '#ed1691',
                        '#fbd0e9'
                    ]
                ]
            }
        });
        registerTheme('metroblack', {
            chart: {
                title: { color: '#ffffff' },
                legend: {
                    labels: { color: '#ffffff' },
                    inactiveItems: {
                        labels: { color: '#797979' },
                        markers: { color: '#797979' }
                    }
                },
                seriesDefaults: {
                    border: { _brightness: 1 },
                    labels: { color: '#ffffff' },
                    errorBars: { color: '#ffffff' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#cecece' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#cecece' }
                    },
                    line: { markers: { background: '#0e0e0e' } },
                    bubble: { opacity: 0.6 },
                    scatter: { markers: { background: '#0e0e0e' } },
                    scatterLine: { markers: { background: '#0e0e0e' } },
                    candlestick: {
                        downColor: '#828282',
                        line: { color: '#ffffff' }
                    },
                    waterfall: { line: { color: '#cecece' } },
                    horizontalWaterfall: { line: { color: '#cecece' } },
                    overlay: { gradient: 'none' }
                },
                chartArea: { background: '#0e0e0e' },
                seriesColors: [
                    '#00aba9',
                    '#309b46',
                    '#8ebc00',
                    '#ff6900',
                    '#e61e26',
                    '#d8e404',
                    '#25a0da',
                    '#7e51a1',
                    '#313131',
                    '#ed1691'
                ],
                axisDefaults: {
                    line: { color: '#cecece' },
                    labels: { color: '#ffffff' },
                    minorGridLines: { color: '#2d2d2d' },
                    majorGridLines: { color: '#333333' },
                    title: { color: '#ffffff' },
                    crosshair: { color: '#cecece' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#cecece' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#cecece' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#00aba9' },
                scale: {
                    rangePlaceholderColor: '#2d2d2d',
                    labels: { color: '#ffffff' },
                    minorTicks: { color: '#333333' },
                    majorTicks: { color: '#cecece' },
                    line: { color: '#cecece' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#00aba9' },
                    connectorDefaults: {
                        fill: { color: WHITE },
                        stroke: { color: '#0e0e0e' },
                        hover: {
                            fill: { color: '#0e0e0e' },
                            stroke: { color: WHITE }
                        }
                    },
                    content: { color: WHITE }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: '#0e0e0e' },
                            stroke: { color: '#787878' },
                            hover: {
                                fill: { color: '#787878' },
                                stroke: { color: '#787878' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: WHITE },
                            fill: { color: WHITE }
                        }
                    }
                },
                selectable: { stroke: { color: '#787878' } },
                connectionDefaults: {
                    stroke: { color: WHITE },
                    content: { color: WHITE },
                    selection: {
                        handles: {
                            fill: { color: '#0e0e0e' },
                            stroke: { color: WHITE }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#00aba9',
                        '#0b2d2d'
                    ],
                    [
                        '#309b46',
                        '#152a19'
                    ],
                    [
                        '#8ebc00',
                        '#28310b'
                    ],
                    [
                        '#ff6900',
                        '#3e200b'
                    ],
                    [
                        '#e61e26',
                        '#391113'
                    ],
                    [
                        '#d8e404',
                        '#36390c'
                    ],
                    [
                        '#25a0da',
                        '#132b37'
                    ],
                    [
                        '#7e51a1',
                        '#241b2b'
                    ],
                    [
                        '#313131',
                        '#151515'
                    ],
                    [
                        '#ed1691',
                        '#3b1028'
                    ]
                ]
            }
        });
        registerTheme('moonlight', {
            chart: {
                title: { color: '#ffffff' },
                legend: {
                    labels: { color: '#ffffff' },
                    inactiveItems: {
                        labels: { color: '#A1A7AB' },
                        markers: { color: '#A1A7AB' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#ffffff' },
                    errorBars: { color: '#ffffff' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#8c909e' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#8c909e' }
                    },
                    pie: { overlay: { gradient: 'sharpBevel' } },
                    donut: { overlay: { gradient: 'sharpGlass' } },
                    line: { markers: { background: '#212a33' } },
                    bubble: { opacity: 0.6 },
                    scatter: { markers: { background: '#212a33' } },
                    scatterLine: { markers: { background: '#212a33' } },
                    area: { opacity: 0.3 },
                    candlestick: {
                        downColor: '#757d87',
                        line: { color: '#ea9d06' },
                        border: {
                            _brightness: 1.5,
                            opacity: 1
                        },
                        highlight: {
                            border: {
                                color: WHITE,
                                opacity: 0.2
                            }
                        }
                    },
                    waterfall: { line: { color: '#8c909e' } },
                    horizontalWaterfall: { line: { color: '#8c909e' } },
                    ohlc: { line: { color: '#ea9d06' } }
                },
                chartArea: { background: '#212a33' },
                seriesColors: [
                    '#ffca08',
                    '#ff710f',
                    '#ed2e24',
                    '#ff9f03',
                    '#e13c02',
                    '#a00201'
                ],
                axisDefaults: {
                    line: { color: '#8c909e' },
                    minorTicks: { color: '#8c909e' },
                    majorTicks: { color: '#8c909e' },
                    labels: { color: '#ffffff' },
                    majorGridLines: { color: '#3e424d' },
                    minorGridLines: { color: '#2f3640' },
                    title: { color: '#ffffff' },
                    crosshair: { color: '#8c909e' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#8c909e' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#8c909e' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#f4af03' },
                scale: {
                    rangePlaceholderColor: '#2f3640',
                    labels: { color: WHITE },
                    minorTicks: { color: '#8c909e' },
                    majorTicks: { color: '#8c909e' },
                    line: { color: '#8c909e' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#f3ae03' },
                    connectorDefaults: {
                        fill: { color: WHITE },
                        stroke: { color: '#414550' },
                        hover: {
                            fill: { color: '#414550' },
                            stroke: { color: WHITE }
                        }
                    },
                    content: { color: WHITE }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: '#414550' },
                            stroke: { color: WHITE },
                            hover: {
                                fill: { color: WHITE },
                                stroke: { color: WHITE }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: WHITE },
                            fill: { color: WHITE }
                        }
                    }
                },
                selectable: { stroke: { color: WHITE } },
                connectionDefaults: {
                    stroke: { color: WHITE },
                    content: { color: WHITE },
                    selection: {
                        handles: {
                            fill: { color: '#414550' },
                            stroke: { color: WHITE }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#ffca08',
                        '#4e4b2b'
                    ],
                    [
                        '#ff710f',
                        '#4e392d'
                    ],
                    [
                        '#ed2e24',
                        '#4b2c31'
                    ],
                    [
                        '#ff9f03',
                        '#4e422a'
                    ],
                    [
                        '#e13c02',
                        '#482e2a'
                    ],
                    [
                        '#a00201',
                        '#3b232a'
                    ]
                ]
            }
        });
        registerTheme('uniform', {
            chart: {
                title: { color: '#686868' },
                legend: {
                    labels: { color: '#686868' },
                    inactiveItems: {
                        labels: { color: '#B6B6B6' },
                        markers: { color: '#B6B6B6' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#686868' },
                    errorBars: { color: '#686868' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#9e9e9e' }
                        },
                        label: { color: '#686868' },
                        line: { color: '#9e9e9e' }
                    },
                    pie: { overlay: { gradient: 'sharpBevel' } },
                    donut: { overlay: { gradient: 'sharpGlass' } },
                    line: { markers: { background: '#ffffff' } },
                    bubble: { opacity: 0.6 },
                    scatter: { markers: { background: '#ffffff' } },
                    scatterLine: { markers: { background: '#ffffff' } },
                    area: { opacity: 0.3 },
                    candlestick: {
                        downColor: '#cccccc',
                        line: { color: '#cccccc' },
                        border: {
                            _brightness: 1.5,
                            opacity: 1
                        },
                        highlight: {
                            border: {
                                color: '#cccccc',
                                opacity: 0.2
                            }
                        }
                    },
                    waterfall: { line: { color: '#9e9e9e' } },
                    horizontalWaterfall: { line: { color: '#9e9e9e' } },
                    ohlc: { line: { color: '#cccccc' } }
                },
                chartArea: { background: '#ffffff' },
                seriesColors: [
                    '#527aa3',
                    '#6f91b3',
                    '#8ca7c2',
                    '#a8bdd1',
                    '#c5d3e0',
                    '#e2e9f0'
                ],
                axisDefaults: {
                    line: { color: '#9e9e9e' },
                    minorTicks: { color: '#aaaaaa' },
                    majorTicks: { color: '#888888' },
                    labels: { color: '#686868' },
                    majorGridLines: { color: '#dadada' },
                    minorGridLines: { color: '#e7e7e7' },
                    title: { color: '#686868' },
                    crosshair: { color: '#9e9e9e' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#9e9e9e' }
                        },
                        label: { color: '#686868' },
                        line: { color: '#9e9e9e' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#527aa3' },
                scale: {
                    rangePlaceholderColor: '#e7e7e7',
                    labels: { color: '#686868' },
                    minorTicks: { color: '#aaaaaa' },
                    majorTicks: { color: '#888888' },
                    line: { color: '#9e9e9e' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#d1d1d1' },
                    connectorDefaults: {
                        fill: { color: '#686868' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#686868' }
                        }
                    },
                    content: { color: '#686868' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#686868' },
                            hover: {
                                fill: { color: '#686868' },
                                stroke: { color: '#686868' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#686868' },
                            fill: { color: '#686868' }
                        }
                    }
                },
                selectable: { stroke: { color: '#686868' } },
                connectionDefaults: {
                    stroke: { color: '#686868' },
                    content: { color: '#686868' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#686868' }
                        }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#527aa3',
                        '#d0d8e1'
                    ],
                    [
                        '#6f91b3',
                        '#d6dde4'
                    ],
                    [
                        '#8ca7c2',
                        '#dce1e7'
                    ],
                    [
                        '#a8bdd1',
                        '#e2e6ea'
                    ],
                    [
                        '#c5d3e0',
                        '#e7eaed'
                    ],
                    [
                        '#e2e9f0',
                        '#edeff0'
                    ]
                ]
            }
        });
        registerTheme('bootstrap', {
            chart: {
                title: { color: '#333333' },
                legend: {
                    labels: { color: '#333333' },
                    inactiveItems: {
                        labels: { color: '#999999' },
                        markers: { color: '#9A9A9A' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#333333' },
                    overlay: { gradient: 'none' },
                    errorBars: { color: '#343434' },
                    notes: {
                        icon: {
                            background: '#000000',
                            border: { color: '#000000' }
                        },
                        label: { color: '#333333' },
                        line: { color: '#000000' }
                    },
                    pie: { overlay: { gradient: 'none' } },
                    donut: { overlay: { gradient: 'none' } },
                    line: { markers: { background: '#ffffff' } },
                    bubble: { opacity: 0.6 },
                    scatter: { markers: { background: '#ffffff' } },
                    scatterLine: { markers: { background: '#ffffff' } },
                    area: { opacity: 0.8 },
                    candlestick: {
                        downColor: '#d0d0d0',
                        line: { color: '#333333' },
                        border: {
                            _brightness: 1.5,
                            opacity: 1
                        },
                        highlight: {
                            border: {
                                color: '#b8b8b8',
                                opacity: 0.2
                            }
                        }
                    },
                    waterfall: { line: { color: '#cccccc' } },
                    horizontalWaterfall: { line: { color: '#cccccc' } },
                    ohlc: { line: { color: '#333333' } }
                },
                chartArea: { background: '#ffffff' },
                seriesColors: [
                    '#428bca',
                    '#5bc0de',
                    '#5cb85c',
                    '#f2b661',
                    '#e67d4a',
                    '#da3b36'
                ],
                axisDefaults: {
                    line: { color: '#cccccc' },
                    minorTicks: { color: '#ebebeb' },
                    majorTicks: { color: '#cccccc' },
                    labels: { color: '#333333' },
                    majorGridLines: { color: '#cccccc' },
                    minorGridLines: { color: '#ebebeb' },
                    title: { color: '#333333' },
                    crosshair: { color: '#000000' },
                    notes: {
                        icon: {
                            background: '#000000',
                            border: { color: '#000000' }
                        },
                        label: { color: '#ffffff' },
                        line: { color: '#000000' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#428bca' },
                scale: {
                    rangePlaceholderColor: '#cccccc',
                    labels: { color: '#333333' },
                    minorTicks: { color: '#ebebeb' },
                    majorTicks: { color: '#cccccc' },
                    line: { color: '#cccccc' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#428bca' },
                    connectorDefaults: {
                        fill: { color: '#333333' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#333333' }
                        }
                    },
                    content: { color: '#333333' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#333333' },
                            hover: {
                                fill: { color: '#333333' },
                                stroke: { color: '#333333' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#333333' },
                            fill: { color: '#333333' }
                        }
                    }
                },
                selectable: { stroke: { color: '#333333' } },
                connectionDefaults: {
                    stroke: { color: '#c4c4c4' },
                    content: { color: '#333333' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#333333' }
                        },
                        stroke: { color: '#333333' }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#428bca',
                        '#d1e0ec'
                    ],
                    [
                        '#5bc0de',
                        '#d6eaf0'
                    ],
                    [
                        '#5cb85c',
                        '#d6e9d6'
                    ],
                    [
                        '#5cb85c',
                        '#f4e8d7'
                    ],
                    [
                        '#e67d4a',
                        '#f2ddd3'
                    ],
                    [
                        '#da3b36',
                        '#f0d0cf'
                    ]
                ]
            }
        });
        registerTheme('flat', {
            chart: {
                title: { color: '#4c5356' },
                legend: {
                    labels: { color: '#4c5356' },
                    inactiveItems: {
                        labels: { color: '#CBCBCB' },
                        markers: { color: '#CBCBCB' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#4c5356' },
                    errorBars: { color: '#4c5356' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#cdcdcd' }
                        },
                        label: { color: '#4c5356' },
                        line: { color: '#cdcdcd' }
                    },
                    candlestick: {
                        downColor: '#c7c7c7',
                        line: { color: '#787878' }
                    },
                    area: { opacity: 0.9 },
                    waterfall: { line: { color: '#cdcdcd' } },
                    horizontalWaterfall: { line: { color: '#cdcdcd' } },
                    overlay: { gradient: 'none' },
                    border: { _brightness: 1 }
                },
                seriesColors: [
                    '#10c4b2',
                    '#ff7663',
                    '#ffb74f',
                    '#a2df53',
                    '#1c9ec4',
                    '#ff63a5',
                    '#1cc47b'
                ],
                axisDefaults: {
                    line: { color: '#cdcdcd' },
                    labels: { color: '#4c5356' },
                    minorGridLines: { color: '#cdcdcd' },
                    majorGridLines: { color: '#cdcdcd' },
                    title: { color: '#4c5356' },
                    crosshair: { color: '#cdcdcd' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#cdcdcd' }
                        },
                        label: { color: '#4c5356' },
                        line: { color: '#cdcdcd' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#10c4b2' },
                scale: {
                    rangePlaceholderColor: '#cdcdcd',
                    labels: { color: '#4c5356' },
                    minorTicks: { color: '#4c5356' },
                    majorTicks: { color: '#4c5356' },
                    line: { color: '#4c5356' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#10c4b2' },
                    connectorDefaults: {
                        fill: { color: '#363940' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#363940' }
                        }
                    },
                    content: { color: '#4c5356' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#363940' },
                            hover: {
                                fill: { color: '#363940' },
                                stroke: { color: '#363940' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#363940' },
                            fill: { color: '#363940' }
                        }
                    }
                },
                selectable: { stroke: { color: '#363940' } },
                connectionDefaults: {
                    stroke: { color: '#cdcdcd' },
                    content: { color: '#4c5356' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#363940' }
                        },
                        stroke: { color: '#363940' }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#10c4b2',
                        '#cff3f0'
                    ],
                    [
                        '#ff7663',
                        '#ffe4e0'
                    ],
                    [
                        '#ffb74f',
                        '#fff1dc'
                    ],
                    [
                        '#a2df53',
                        '#ecf9dd'
                    ],
                    [
                        '#1c9ec4',
                        '#d2ecf3'
                    ],
                    [
                        '#ff63a5',
                        '#ffe0ed'
                    ],
                    [
                        '#1cc47b',
                        '#d2f3e5'
                    ]
                ]
            }
        });
        registerTheme('material', {
            chart: {
                title: { color: '#444444' },
                legend: {
                    labels: { color: '#444444' },
                    inactiveItems: {
                        labels: { color: '#CBCBCB' },
                        markers: { color: '#CBCBCB' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#444444' },
                    errorBars: { color: '#444444' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#e5e5e5' }
                        },
                        label: { color: '#444444' },
                        line: { color: '#e5e5e5' }
                    },
                    candlestick: {
                        downColor: '#c7c7c7',
                        line: { color: '#787878' }
                    },
                    area: { opacity: 0.9 },
                    waterfall: { line: { color: '#e5e5e5' } },
                    horizontalWaterfall: { line: { color: '#e5e5e5' } },
                    overlay: { gradient: 'none' },
                    border: { _brightness: 1 }
                },
                seriesColors: [
                    '#3f51b5',
                    '#03a9f4',
                    '#4caf50',
                    '#f9ce1d',
                    '#ff9800',
                    '#ff5722'
                ],
                axisDefaults: {
                    line: { color: '#e5e5e5' },
                    labels: { color: '#444444' },
                    minorGridLines: { color: '#e5e5e5' },
                    majorGridLines: { color: '#e5e5e5' },
                    title: { color: '#444444' },
                    crosshair: { color: '#7f7f7f' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#e5e5e5' }
                        },
                        label: { color: '#444444' },
                        line: { color: '#e5e5e5' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#3f51b5' },
                scale: {
                    rangePlaceholderColor: '#e5e5e5',
                    labels: { color: '#444444' },
                    minorTicks: { color: '#444444' },
                    majorTicks: { color: '#444444' },
                    line: { color: '#444444' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#3f51b5' },
                    connectorDefaults: {
                        fill: { color: '#7f7f7f' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#7f7f7f' }
                        }
                    },
                    content: { color: '#444444' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#444444' },
                            hover: {
                                fill: { color: '#444444' },
                                stroke: { color: '#444444' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#444444' },
                            fill: { color: '#444444' }
                        }
                    }
                },
                selectable: { stroke: { color: '#444444' } },
                connectionDefaults: {
                    stroke: { color: '#7f7f7f' },
                    content: { color: '#444444' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#444444' }
                        },
                        stroke: { color: '#444444' }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#3f51b5',
                        '#cff3f0'
                    ],
                    [
                        '#03a9f4',
                        '#e5f6fe'
                    ],
                    [
                        '#4caf50',
                        '#edf7ed'
                    ],
                    [
                        '#f9ce1d',
                        '#fefae8'
                    ],
                    [
                        '#ff9800',
                        '#fff4e5'
                    ],
                    [
                        '#ff5722',
                        '#ffeee8'
                    ]
                ]
            }
        });
        registerTheme('materialblack', {
            chart: {
                title: { color: '#fff' },
                legend: {
                    labels: { color: '#fff' },
                    inactiveItems: {
                        labels: { color: '#CBCBCB' },
                        markers: { color: '#CBCBCB' }
                    }
                },
                seriesDefaults: {
                    labels: { color: '#fff' },
                    errorBars: { color: '#fff' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#e5e5e5' }
                        },
                        label: { color: '#fff' },
                        line: { color: '#e5e5e5' }
                    },
                    candlestick: {
                        downColor: '#c7c7c7',
                        line: { color: '#787878' }
                    },
                    area: { opacity: 0.9 },
                    waterfall: { line: { color: '#4d4d4d' } },
                    horizontalWaterfall: { line: { color: '#4d4d4d' } },
                    overlay: { gradient: 'none' },
                    border: { _brightness: 1 }
                },
                chartArea: { background: '#1c1c1c' },
                seriesColors: [
                    '#3f51b5',
                    '#03a9f4',
                    '#4caf50',
                    '#f9ce1d',
                    '#ff9800',
                    '#ff5722'
                ],
                axisDefaults: {
                    line: { color: '#4d4d4d' },
                    labels: { color: '#fff' },
                    minorGridLines: { color: '#4d4d4d' },
                    majorGridLines: { color: '#4d4d4d' },
                    title: { color: '#fff' },
                    crosshair: { color: '#7f7f7f' },
                    notes: {
                        icon: {
                            background: 'transparent',
                            border: { color: '#4d4d4d' }
                        },
                        label: { color: '#fff' },
                        line: { color: '#4d4d4d' }
                    }
                }
            },
            gauge: {
                pointer: { color: '#3f51b5' },
                scale: {
                    rangePlaceholderColor: '#4d4d4d',
                    labels: { color: '#fff' },
                    minorTicks: { color: '#fff' },
                    majorTicks: { color: '#fff' },
                    line: { color: '#fff' }
                }
            },
            diagram: {
                shapeDefaults: {
                    fill: { color: '#3f51b5' },
                    connectorDefaults: {
                        fill: { color: '#7f7f7f' },
                        stroke: { color: WHITE },
                        hover: {
                            fill: { color: WHITE },
                            stroke: { color: '#7f7f7f' }
                        }
                    },
                    content: { color: '#fff' }
                },
                editable: {
                    resize: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#fff' },
                            hover: {
                                fill: { color: '#fff' },
                                stroke: { color: '#fff' }
                            }
                        }
                    },
                    rotate: {
                        thumb: {
                            stroke: { color: '#fff' },
                            fill: { color: '#fff' }
                        }
                    }
                },
                selectable: { stroke: { color: '#fff' } },
                connectionDefaults: {
                    stroke: { color: '#7f7f7f' },
                    content: { color: '#fff' },
                    selection: {
                        handles: {
                            fill: { color: WHITE },
                            stroke: { color: '#fff' }
                        },
                        stroke: { color: '#fff' }
                    }
                }
            },
            treeMap: {
                colors: [
                    [
                        '#3f51b5',
                        '#cff3f0'
                    ],
                    [
                        '#03a9f4',
                        '#e5f6fe'
                    ],
                    [
                        '#4caf50',
                        '#edf7ed'
                    ],
                    [
                        '#f9ce1d',
                        '#fefae8'
                    ],
                    [
                        '#ff9800',
                        '#fff4e5'
                    ],
                    [
                        '#ff5722',
                        '#ffeee8'
                    ]
                ]
            }
        });
        (function () {
            var TEXT = '#333333';
            var INACTIVE = '#7f7f7f';
            var INACTIVE_SHAPE = '#bdbdbd';
            var AXIS = '#c8c8c8';
            var AXIS_MINOR = '#dddddd';
            var SERIES = [
                '#008fd3',
                '#99d101',
                '#f39b02',
                '#f05662',
                '#c03c53',
                '#acacac'
            ];
            var SERIES_LIGHT = [
                '#cbe8f5',
                '#eaf5cb',
                '#fceacc',
                '#fbdcdf',
                '#f2d7dc',
                '#eeeeee'
            ];
            var PRIMARY = SERIES[0];
            var DIAGRAM_HOVER = WHITE;
            function noteStyle() {
                return {
                    icon: {
                        background: '#007cc0',
                        border: { color: '#007cc0' }
                    },
                    label: { color: '#ffffff' },
                    line: { color: AXIS }
                };
            }
            registerTheme('fiori', {
                chart: {
                    title: { color: TEXT },
                    legend: {
                        labels: { color: TEXT },
                        inactiveItems: {
                            labels: { color: INACTIVE },
                            markers: { color: INACTIVE }
                        }
                    },
                    seriesDefaults: {
                        labels: { color: TEXT },
                        errorBars: { color: TEXT },
                        notes: noteStyle(),
                        candlestick: {
                            downColor: AXIS,
                            line: { color: INACTIVE_SHAPE }
                        },
                        area: { opacity: 0.8 },
                        waterfall: { line: { color: AXIS } },
                        horizontalWaterfall: { line: { color: AXIS } },
                        overlay: { gradient: 'none' },
                        border: { _brightness: 1 }
                    },
                    seriesColors: SERIES,
                    axisDefaults: {
                        line: { color: AXIS },
                        labels: { color: TEXT },
                        minorGridLines: { color: AXIS_MINOR },
                        majorGridLines: { color: AXIS },
                        title: { color: TEXT },
                        crosshair: { color: INACTIVE },
                        notes: noteStyle()
                    }
                },
                gauge: {
                    pointer: { color: PRIMARY },
                    scale: {
                        rangePlaceholderColor: AXIS,
                        labels: { color: TEXT },
                        minorTicks: { color: TEXT },
                        majorTicks: { color: TEXT },
                        line: { color: TEXT }
                    }
                },
                diagram: {
                    shapeDefaults: {
                        fill: { color: PRIMARY },
                        connectorDefaults: {
                            fill: { color: TEXT },
                            stroke: { color: DIAGRAM_HOVER },
                            hover: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: TEXT }
                            }
                        },
                        content: { color: TEXT }
                    },
                    editable: {
                        resize: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE },
                                hover: {
                                    fill: { color: INACTIVE_SHAPE },
                                    stroke: { color: INACTIVE_SHAPE }
                                }
                            }
                        },
                        rotate: {
                            thumb: {
                                stroke: { color: INACTIVE_SHAPE },
                                fill: { color: INACTIVE_SHAPE }
                            }
                        }
                    },
                    selectable: { stroke: { color: INACTIVE_SHAPE } },
                    connectionDefaults: {
                        stroke: { color: INACTIVE_SHAPE },
                        content: { color: INACTIVE_SHAPE },
                        selection: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE }
                            },
                            stroke: { color: INACTIVE_SHAPE }
                        }
                    }
                },
                treeMap: { colors: fuse(SERIES, SERIES_LIGHT) }
            });
        }());
        (function () {
            var TEXT = '#4e4e4e';
            var INACTIVE = '#7f7f7f';
            var INACTIVE_SHAPE = '#bdbdbd';
            var AXIS = '#c8c8c8';
            var AXIS_MINOR = '#e5e5e5';
            var SERIES = [
                '#0072c6',
                '#5db2ff',
                '#008a17',
                '#82ba00',
                '#ff8f32',
                '#ac193d'
            ];
            var SERIES_LIGHT = [
                '#cbe2f3',
                '#deeffe',
                '#cbe7d0',
                '#e5f0cb',
                '#fee8d5',
                '#eed0d7'
            ];
            var PRIMARY = SERIES[0];
            var DIAGRAM_HOVER = WHITE;
            function noteStyle() {
                return {
                    icon: {
                        background: '#00b0ff',
                        border: { color: '#00b0ff' }
                    },
                    label: { color: '#ffffff' },
                    line: { color: AXIS }
                };
            }
            registerTheme('office365', {
                chart: {
                    title: { color: TEXT },
                    legend: {
                        labels: { color: TEXT },
                        inactiveItems: {
                            labels: { color: INACTIVE },
                            markers: { color: INACTIVE }
                        }
                    },
                    seriesDefaults: {
                        labels: { color: TEXT },
                        errorBars: { color: TEXT },
                        notes: noteStyle(),
                        candlestick: {
                            downColor: AXIS,
                            line: { color: INACTIVE_SHAPE }
                        },
                        area: { opacity: 0.8 },
                        waterfall: { line: { color: AXIS } },
                        horizontalWaterfall: { line: { color: AXIS } },
                        overlay: { gradient: 'none' },
                        border: { _brightness: 1 }
                    },
                    seriesColors: SERIES,
                    axisDefaults: {
                        line: { color: AXIS },
                        labels: { color: TEXT },
                        minorGridLines: { color: AXIS_MINOR },
                        majorGridLines: { color: AXIS },
                        title: { color: TEXT },
                        crosshair: { color: INACTIVE },
                        notes: noteStyle()
                    }
                },
                gauge: {
                    pointer: { color: PRIMARY },
                    scale: {
                        rangePlaceholderColor: AXIS,
                        labels: { color: TEXT },
                        minorTicks: { color: TEXT },
                        majorTicks: { color: TEXT },
                        line: { color: TEXT }
                    }
                },
                diagram: {
                    shapeDefaults: {
                        fill: { color: PRIMARY },
                        connectorDefaults: {
                            fill: { color: TEXT },
                            stroke: { color: DIAGRAM_HOVER },
                            hover: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: TEXT }
                            }
                        },
                        content: { color: TEXT }
                    },
                    editable: {
                        resize: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE },
                                hover: {
                                    fill: { color: INACTIVE_SHAPE },
                                    stroke: { color: INACTIVE_SHAPE }
                                }
                            }
                        },
                        rotate: {
                            thumb: {
                                stroke: { color: INACTIVE_SHAPE },
                                fill: { color: INACTIVE_SHAPE }
                            }
                        }
                    },
                    selectable: { stroke: { color: INACTIVE_SHAPE } },
                    connectionDefaults: {
                        stroke: { color: INACTIVE_SHAPE },
                        content: { color: INACTIVE_SHAPE },
                        selection: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE }
                            },
                            stroke: { color: INACTIVE_SHAPE }
                        }
                    }
                },
                treeMap: { colors: fuse(SERIES, SERIES_LIGHT) }
            });
        }());
        (function () {
            var TEXT = '#32364c';
            var INACTIVE = '#7f7f7f';
            var INACTIVE_SHAPE = '#bdbdbd';
            var AXIS = '#dfe0e1';
            var AXIS_MINOR = '#dfe0e1';
            var SERIES = [
                '#ff4350',
                '#ff9ea5',
                '#00acc1',
                '#80deea',
                '#ffbf46',
                '#ffd78c'
            ];
            var SERIES_LIGHT = [
                '#ffd9dc',
                '#ffeced',
                '#cceef3',
                '#e6f8fb',
                '#fff2da',
                '#fff7e8'
            ];
            var PRIMARY = SERIES[0];
            var DIAGRAM_HOVER = WHITE;
            function noteStyle() {
                return {
                    icon: {
                        background: '#007cc0',
                        border: { color: '#007cc0' }
                    },
                    label: { color: '#ffffff' },
                    line: { color: AXIS }
                };
            }
            registerTheme('nova', {
                chart: {
                    title: { color: TEXT },
                    legend: {
                        labels: { color: TEXT },
                        inactiveItems: {
                            labels: { color: INACTIVE },
                            markers: { color: INACTIVE }
                        }
                    },
                    seriesDefaults: {
                        labels: { color: TEXT },
                        errorBars: { color: TEXT },
                        notes: noteStyle(),
                        candlestick: {
                            downColor: AXIS,
                            line: { color: INACTIVE_SHAPE }
                        },
                        area: { opacity: 0.8 },
                        waterfall: { line: { color: AXIS } },
                        horizontalWaterfall: { line: { color: AXIS } },
                        overlay: { gradient: 'none' },
                        border: { _brightness: 1 }
                    },
                    seriesColors: SERIES,
                    axisDefaults: {
                        line: { color: AXIS },
                        labels: { color: TEXT },
                        minorGridLines: { color: AXIS_MINOR },
                        majorGridLines: { color: AXIS },
                        title: { color: TEXT },
                        crosshair: { color: TEXT },
                        notes: noteStyle()
                    }
                },
                gauge: {
                    pointer: { color: PRIMARY },
                    scale: {
                        rangePlaceholderColor: AXIS,
                        labels: { color: TEXT },
                        minorTicks: { color: TEXT },
                        majorTicks: { color: TEXT },
                        line: { color: TEXT }
                    }
                },
                diagram: {
                    shapeDefaults: {
                        fill: { color: PRIMARY },
                        connectorDefaults: {
                            fill: { color: TEXT },
                            stroke: { color: DIAGRAM_HOVER },
                            hover: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: TEXT }
                            }
                        },
                        content: { color: TEXT }
                    },
                    editable: {
                        resize: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE },
                                hover: {
                                    fill: { color: INACTIVE_SHAPE },
                                    stroke: { color: INACTIVE_SHAPE }
                                }
                            }
                        },
                        rotate: {
                            thumb: {
                                stroke: { color: INACTIVE_SHAPE },
                                fill: { color: INACTIVE_SHAPE }
                            }
                        }
                    },
                    selectable: { stroke: { color: INACTIVE_SHAPE } },
                    connectionDefaults: {
                        stroke: { color: INACTIVE_SHAPE },
                        content: { color: INACTIVE_SHAPE },
                        selection: {
                            handles: {
                                fill: { color: DIAGRAM_HOVER },
                                stroke: { color: INACTIVE_SHAPE }
                            },
                            stroke: { color: INACTIVE_SHAPE }
                        }
                    }
                },
                treeMap: { colors: fuse(SERIES, SERIES_LIGHT) }
            });
        }());
        function fuse(arr1, arr2) {
            return $.map(arr1, function (item, index) {
                return [[
                        item,
                        arr2[index]
                    ]];
            });
        }
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));