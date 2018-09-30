/**
 * Service for managing dates and times.
 *
 * @service DateTime
 * @author Skyflow Team - Franck Diomandé <fkdiomande@gmail.com>
 * @version 1.0.0
 */
Skyflow.register(function DateTime() {

    const H = Skyflow.helper.all();

    let self = this,  currentDate = new Date(), defaultLang = Skyflow.locale();

    let configs = {
        months: {
            fr : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            en : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        days: {
            fr : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            en : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        formats: {
            fr: "",
            en: ""
        },
        lang: defaultLang,
    };

    function isDate(date) {return H.getType(date) === "date"}
    function isNumber(nb) {return H.getType(nb) === "number"}
    function getSetDate(nb, what){
        if(nb === undefined){ return (currentDate['get'+what]()+((what==='Month')?1:0))+'' }
        if (isNumber(nb)) {
            nb = Math.abs(nb);
            if (nb > 0) {
                try {
                    currentDate['set' + what](nb-((what==='Month')?1:0))
                } catch (e) {
                    currentDate.setDate(nb)
                }
            }
            return this
        }
        if(/[\+\-]\d+/.test(nb)){
            nb = (new Function("","return " + currentDate['get'+what]() + nb))() ;
            try { currentDate['set'+what](nb) } catch (e) { currentDate.setDate(nb) }
        }

        return self
    }
    function daysInMonth(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }

    /**
     * Gets original current date.
     *
     * @method get
     * @returns {Date}
     */
    this.get = function() {
        return currentDate
    };

    /**
     * Sets original current date.
     *
     * @method set
     * @param {Date} date JavaScript date.
     * @returns {DateTime}
     */
    this.set = function(date) {

        if(isDate(date)){
            currentDate = date
        }

        return self
    };

    /**
     * Gets or sets current language.
     *
     * @method lang
     * @param {string} [lang]
     * @returns {DateTime|string}
     */
    this.lang = function (lang) {

        if(lang === undefined){ return configs.lang }
        configs.lang = lang;

        return self;
    };

    /**
     * Gets or sets year. Obtaining is done on the last two digits.
     *
     * @method y
     * @param {string|int} [value]
     * @returns {string|DateTime}
     * @example datetime.y.example.js
     */
    this.y = function (value) {

        let y = getSetDate(value, 'FullYear') ;
        if(value === undefined){ return y.slice(-2)}

        return self
    };

    /**
     * Gets or sets year.
     *
     * @method yy
     * @param {string|int} [value]
     * @returns {string|DateTime}
     * @example datetime.y.example.js
     */
    this.yy = function (value) {
        return getSetDate(value, 'FullYear');
    };

    /**
     * Gets the corresponding number on a day of the week: 0 for Monday, 1 for Tuesday, ...
     *
     * @method w
     * @returns {int}
     */
    this.w = function () { return (currentDate.getDay()||7)-1 };

    /**
     * Gets short name of month.
     *
     * @method M
     * @param {int} [length]
     * @returns {string}
     */
    this.M = function (length = 3) {

        let lang = configs.lang, months = configs.months[lang] || configs.months[defaultLang];

        return months[currentDate.getMonth()].slice(0,Math.abs(length))
    };

    /**
     * Gets long name of month.
     *
     * @method MM
     * @returns {string}
     */
    this.MM = function () {

        let lang = configs.lang, months = configs.months[lang] || configs.months[defaultLang];

        return months[currentDate.getMonth()]
    };

    /**
     * Gets short name of day.
     *
     * @method D
     * @param {int} [length]
     * @returns {string}
     */
    this.D = function (length = 3) {

        let lang = configs.lang, days = configs.days[lang] || configs.days[defaultLang];

        return days[self.w()].slice(0,Math.abs(length))
    };

    /**
     * Gets long name of day.
     *
     * @method DD
     * @returns {string}
     */
    this.DD = function () {

        let lang = configs.lang, days = configs.days[lang] || configs.days[defaultLang];

        return days[self.w()]
    };

    let symbols = {
        "m": 'Month',
        "d": 'Date',
        "h": 'Hours',
        "i": 'Minutes',
        "s": 'Seconds',
        "l": 'Milliseconds'
    };
    for (let k in symbols){

        if(symbols.hasOwnProperty(k)){

            self[k] = function (value) { return getSetDate(value, symbols[k]) };
            self[k+k] = function (value) {

                let val = getSetDate(value, symbols[k]);
                if (value === undefined) {
                    val = parseInt(val);
                    if(val < 10){ val = "0" + val }
                    val += "";
                }
                return val

            };

        }

    }

    /**
     * Gets or sets month.
     *
     * @method m
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets month. Prefix the result of a zero if necessary.
     *
     * @method mm
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets day.
     *
     * @method d
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets day. Prefix the result of a zero if necessary.
     *
     * @method dd
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets hour.
     *
     * @method h
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets hour. Prefix the result of a zero if necessary.
     *
     * @method hh
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets minute.
     *
     * @method i
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets minute. Prefix the result of a zero if necessary.
     *
     * @method ii
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets second.
     *
     * @method s
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets second. Prefix the result of a zero if necessary.
     *
     * @method ss
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets millisecond.
     *
     * @method l
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets millisecond. Prefix the result of a zero if necessary.
     *
     * @method ll
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */

    /**
     * Gets or sets day. Alias of dd method.
     *
     * @method day
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.day = function(value){ return self.dd(value) };

    /**
     * Gets or sets month. Alias of mm method.
     *
     * @method month
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.month = function(value){ return self.mm(value) };

    /**
     * Gets or sets year. Alias of yy method.
     *
     * @method year
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.year = function(value){ return self.yy(value) };

    /**
     * Gets or sets hour. Alias of hh method.
     *
     * @method hour
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.hour = function(value){ return self.hh(value) };

    /**
     * Gets or sets minute. Alias of ii method.
     *
     * @method minute
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.minute = function(value){ return self.ii(value) };

    /**
     * Gets or sets second. Alias of ss method.
     *
     * @method second
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.second = function(value){ return self.ss(value) };

    /**
     * Gets or sets millisecond. Alias of ll method.
     *
     * @method millisecond
     * @param {string|int} [value]
     * @returns {string|DateTime}
     */
    this.millisecond = function(value){ return self.ll(value) };

    /**
     * Formats a date according to a string.
     *
     * @method format
     * @param {string} format Available tag: y yy M MM m mm D DD d dd h hh i ii s ss l ll
     * @returns {string}
     * @example datetime.format.example.js
     */
    this.format = function(format){

        let copiedDate = new Date(currentDate.getTime());

        if(format === undefined){ return ""}
        format += "";
        format = format.replace(/(\%\w{1,2})([+-]\d+)?/g, function (format, s1, s2) {
            s1 = s1.slice(1);
            if (self.hasOwnProperty(s1)) { self[s1.toLowerCase()](s2); return '%' + s1 }
            return format;
        });
        format = format.replace(/\%\w{1,2}/g, function (format) {
            format = format.slice(1);
            if (self.hasOwnProperty(format)) { return self[format]() }
            return format;
        });

        currentDate = copiedDate;

        return format
    };

    /**
     * Counts the number of days in a month.
     *
     * @method count
     * @param {string} [day]
     * @returns {int}
     * @example datetime.count.example.js
     */
    this.count = function(day){

        let totalDays = daysInMonth(currentDate);

        if(day === undefined){ return totalDays }

        let total = 0, reg = new RegExp('^'+day+'$','i');

        let copiedDate = new Date(currentDate.getTime());

        for (let i = 1; i <= totalDays; i++){
            self.dd(i);
            if(reg.test(self.DD())){ total++ }
        }

        currentDate = copiedDate;

        return total
    };

    /**
     * Gets the future date.
     *
     * @method next
     * @param {string} [value]
     * @returns {DateTime}
     * @example datetime.next.example.js
     */
    this.next = function(value){

        if(value===undefined){ return self.d('+1') }
        let reg = new RegExp('^'+value+'$','i'),
            lang = configs.lang;

        // @TODO :  Do for number (check if 0<value<32)

        // Look for days
        let days = configs.days[lang] || configs.days[defaultLang];
        days = days.concat(days).slice(self.w()+1);
        let i, k = days.length;
        for(i=0 ; i<k ; i++){
            if(reg.test(days[i])){ currentDate.setDate(i+1+currentDate.getDate()); return self }
        }

        // Look for months
        let months = configs.months[lang] || configs.months[defaultLang];
        months = months.concat(months).slice(currentDate.getMonth()+1);
        k = months.length;
        for(i=0 ; i<k ; i++){
            if(reg.test(months[i])){ currentDate.setMonth(currentDate.getMonth()+i+1); return self }
        }

        return self
    };

    /**
     * Gets the previous date.
     *
     * @method previous
     * @param {string} [value]
     * @returns {DateTime}
     * @example datetime.previous.example.js
     */
    this.previous = function(value){
        if(value===undefined){ return self.d('-1') }
        let reg = new RegExp('^'+value+'$','i'),
            lang = configs.lang;

        // @TODO :  Do for number (check if 0<value<32)

        // Look for days
        let days = configs.days[lang] || configs.days[defaultLang];
        days = days.concat(days.slice(0,self.w()));
        let i, k = days.length-1;
        for(i=k ; i>-1 ; i--){
            if(reg.test(days[i])){ currentDate.setDate(currentDate.getDate()-k+i-1); return self }
        }

        // Look for months
        let months = configs.months[lang] || configs.months[defaultLang];
        months = months.concat(months.slice(0,currentDate.getMonth())) ;
        k = months.length-1 ;
        for(i=k ; i>-1 ; i--){
            if(reg.test(months[i])){ currentDate.setMonth(currentDate.getMonth()-k+i-1); return self }
        }

        return self
    };

    /**
     * Gets the current date.
     *
     * @method now
     * @returns {DateTime}
     */
    this.now = function(){ currentDate = new Date(); return self };

}, true);