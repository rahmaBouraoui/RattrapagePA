/**
 * Service for managing input select element.
 *
 * @service Select
 * @author Skyflow Team - Franck Diomandé <fkdiomande@gmail.com>
 * @version 1.0.0
 * @example notification.example.js
 */
export default function Select(selector) {

    function getType(object) {
        if (object === null) {return null}
        if (object === undefined) {return undefined}
        let t = object.constructor.name;
        if (/^html[a-z]*element$/i.test(t)) {
            return 'Element'
        }
        return t;
    }
    function isString(object) {
        return getType(object) === "String";
    }
    function isElement(object) {
        return getType(object) === "Element";
    }

    let selectElement = selector;

    if(isString(selectElement)){
        selectElement = document.querySelector(selector);
    }

    if(!isElement(selectElement)){
        throw new Error("Can not construct Skyflow Select object. Constructor argument is invalid.")
    }

    const SELF = this;
    let stylesheet = null;
    let container, input, itemsContainer, searchContainer, closeContainer;

    let timeoutId;
    let searchResults = [];

    let isMultiple = selectElement.hasAttribute('multiple');

    let lastSelectedItem = null;

    let events = {
        'show': null,
        'hide': null,
        'select': null,
        'unSelect': null,
        'search': null,
    };

    /**
     * - With html option element
     *      label = innerHTML
     *      value = value attribute
     *      icon = data-icon attribute
     *      id = data-id attribute
     *      selected = selected attribute
     *      index = Will generated
     *
     * @type {Array}
     */
    let localData = [
        /*{
            label: "Label Item 1",
            value: "Value Item 1",
            icon: null,
            id: 12,
            index: 0, // Index of option element
            selected: true, // Select or un-select this element
        },
        {
            label: "Label Item 2",
            value: "Value Item 2",
            icon: null,
            id: 22
        },*/
    ];

    /**
     * Extract data from an option. Data can be:
     * label = innerHTML
     * value = value
     * icon = data-icon
     * id = data-id
     * index = data-index
     * selected = selected
     */
    function extractDataFromOption(option) {
        let data = {};
        data.value = option.value;
        data.label = option.innerHTML;
        if (option.hasAttribute('data-id')) {
            data.id = option.getAttribute('data-id')
        }
        if (option.hasAttribute('data-icon')) {
            data.icon = option.getAttribute('data-icon')
        }
        if (option.hasAttribute('data-index')) {
            data.index = option.getAttribute('data-index')
        }
        if (option.hasAttribute('selected')) {
            data.selected = true
        }
        return data
    }

    /**
     * Extract options data from given select object
     */
    function extractDataFromSelect() {
        [].slice.call(selectElement.options)
            .forEach((option, index) => {
                option.setAttribute('data-index', index);
                let data = extractDataFromOption(option);
                data.option = option;
                localData.push(data);
            });
    }

    /**
     * When displaying select items, some data are stored in data attributes.
     * This function convert these data attributes to json array.
     * @param item
     * @returns {{}}
     */
    function extractDataFromSkyflowItem(item) {
        let index = parseInt(item.getAttribute('data-index'), 10);
        let data = localData[index];
        data['selected'] = data['item'].classList.contains('skyflow-select-item-selected');
        data['index'] = parseInt(data['index'], 10);
        data['option'].selected = data['selected'];
        return data;
    }

    function addEvent(element, event, callback) {
        if (element.addEventListener) {
            element.addEventListener(event, callback, false)
        } else {
            element.attachEvent('on' + event, callback);
        }
    }

    function insertNodeBefore(newElement, beforeElement) {
        let parent = beforeElement.parentNode;
        if (parent) {
            parent.insertBefore(newElement, beforeElement);
        }
        return parent
    }

    function insertAfter(newNode, referenceNode) {
        let next = referenceNode.nextSibling;
        if (next) {
            referenceNode.parentNode.insertBefore(newNode, next);
        } else {
            referenceNode.parentNode.appendChild(newNode);
        }
    }

    function insertStylesheetInHead() {

        stylesheet = document.querySelector('head style#skyflow-select-stylesheet');
        if (stylesheet) {
            return false
        }

        stylesheet = document.createElement('style');
        stylesheet.id = 'skyflow-select-stylesheet';
        // WebKit hack :(
        stylesheet.appendChild(document.createTextNode(""));

        const link = document.querySelector('head link');
        if (link) {
            insertNodeBefore(stylesheet, link)
        } else {
            document.querySelector('head').appendChild(stylesheet)
        }

        createStyle();

    }

    function addCSSRule(selector, rules) {
        const sheet = stylesheet.sheet;
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}");
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules);
        }
    }

    function createStyle() {

        // Container
        let css = "width: 100%;background-color: #fff;padding: 15px;z-index: 100;" +
            "overflow: hidden;display: none; position: relative";
        addCSSRule('.skyflow-select-container', css);

        // Close container
        addCSSRule('.skyflow-select-close-container', "position: absolute; display: inline-block" +
            "font-size: 12px;font-style: italic;top: 5px;right: 15px; " +
            "text-decoration: underline; cursor: pointer"
        );

        // Search container
        addCSSRule('.skyflow-select-search-container', "position: absolute;" +
            "top: 25px;left: 15px;right: 15px;margin: 0;"
        );

        // Input
        css = "display: block;width: 100%;border: none;border-bottom: 1px solid #000000;" +
            "padding: 0 0 5px 0;font-size: 18px;";
        addCSSRule('.skyflow-select-search-container .skyflow-select-input', css);

        // Items container
        addCSSRule('.skyflow-select-items-container', "list-style: none; max-height: 200px; " +
            "overflow-y: auto;margin-top: 45px;"
        );

        // Items
        css = "display: block;padding: 15px;cursor: pointer;";
        addCSSRule('.skyflow-select-items-container .skyflow-select-item', css);

        // Icon and label
        css = "display: inline-block;vertical-align: middle;";
        let selector = ".skyflow-select-item .skyflow-select-item-icon, " +
            ".skyflow-select-item .skyflow-select-item-label";
        addCSSRule(selector, css);

        // Icon
        css = "width: 30px;margin-right: 15px;";
        selector = ".skyflow-select-item .skyflow-select-item-icon";
        addCSSRule(selector, css);

        //
        // css = "width: 30px;margin-right: 15px;";
        selector = ".skyflow-select-item.skyflow-select-item-selected";
        addCSSRule(selector, "position: relative;");

        //
        css = "content: '';position: absolute;width: 8px;height: 15px;right: 15px;" +
            "top: 0;bottom: 0;margin: auto;border-color: #000000;border-style: solid;" +
            "border-width: 0 2px 2px 0;transform: rotate(50deg);";
        selector = ".skyflow-select-item.skyflow-select-item-selected:after";
        addCSSRule(selector, css);

    }

    function createSkyflowSelect() {

        // Create container
        container = document.createElement('div');
        container.classList.add('skyflow-select-container');

        // Create close container
        closeContainer = document.createElement('div');
        closeContainer.innerHTML = 'Close';
        closeContainer.classList.add('skyflow-select-close-container');
        addEvent(closeContainer, 'click', ()=>{
            SELF.hide()
        });
        container.appendChild(closeContainer);

        // Create search container
        searchContainer = document.createElement('div');
        searchContainer.classList.add('skyflow-select-search-container');
        // Create search
        input = document.createElement('input');
        input.classList.add('skyflow-select-input');
        input.type = "text";
        input.placeholder = "Search ...";
        addEvent(input, 'input', searchEvent);
        searchContainer.appendChild(input);
        container.appendChild(searchContainer);

        // Create items container
        itemsContainer = document.createElement('ul');
        itemsContainer.classList.add('skyflow-select-items-container');
        container.appendChild(itemsContainer);


        insertAfter(container, selectElement);

    }

    /**
     * Uses localData array to display skyflow select items.
     */
    function displayData() {
        itemsContainer.innerHTML = "";
        localData.forEach((d, index) => {

            let label = d.label;
            if (label === undefined) {
                label = d.value
            }

            let item = document.createElement('li');
            item.classList.add('skyflow-select-item');

            if (d.icon) {
                let img = document.createElement('img');
                img.src = d.icon;
                img.alt = d.label;
                img.classList.add('skyflow-select-item-icon');
                item.appendChild(img);
            }

            let span = document.createElement('span');
            span.classList.add('skyflow-select-item-label');
            span.innerHTML = label;
            item.appendChild(span);

            if (d.selected) {
                if(!isMultiple && lastSelectedItem){
                    d.selected = false;
                    d.option.selected = false
                }else {
                    item.classList.add('skyflow-select-item-selected');
                    lastSelectedItem = d;
                }
            }

            item.setAttribute('data-index', index.toString());

            addEvent(item, 'click', itemClickEvent);

            itemsContainer.appendChild(item);

            d.item = item;
            return d;
        });
    }

    function getSelectedValues() {
        let selectedValues = [];
        localData.every((data) => {

                if(!data.item.classList.contains('skyflow-select-item-selected')){
                    return true
                }
                if(!isMultiple && selectedValues[0]){
                    return false
                }
                selectedValues.push(data);
                return true
            });

        return selectedValues;
    }

    // ========== Events ==========

    function itemClickEvent() {
        this.classList.toggle('skyflow-select-item-selected');
        let data = extractDataFromSkyflowItem(this);

        if(data.selected){

            if(!isMultiple && lastSelectedItem){
                let index = parseInt(lastSelectedItem.index, 10);
                localData[index].selected = false;
                lastSelectedItem.selected = false;
                lastSelectedItem.option.selected = false;
                lastSelectedItem.item.classList.remove('skyflow-select-item-selected');
                lastSelectedItem = null;
            }

            lastSelectedItem = data;
        }else {
            lastSelectedItem = null;
        }

        if (data.selected && events['select']) {
            events['select'].apply(SELF, [this, data]);
        }
        if (!data.selected && events['unSelect']) {
            events['unSelect'].apply(SELF, [this, data]);
        }
    }

    function searchEvent() {

        let search = this.value.toLowerCase();
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            searchResults = [];
            localData.forEach((data) => {

                    if ((data.value && data.value.toLowerCase().indexOf(search) > -1) ||
                        (data.label && data.label.toLowerCase().indexOf(search) > -1)) {
                        searchResults.push(data);
                        data.item.style.display = 'block';
                        return true
                    }
                    data.item.style.display = 'none';

                });

            if (events['search']) {
                events['search'].apply(SELF, [this]);
            }

        }, 300)

    }

    // ========== Run functions ==========

    extractDataFromSelect();
    insertStylesheetInHead();
    createSkyflowSelect();
    displayData();




    // ========== Public methods ==========


    this.searchPlaceholder = (placeholder) => {
        input.placeholder = placeholder;
        return this
    };

    this.hideSearch = () => {
        searchContainer.style.display = 'none';
        return this
    };

    this.showSearch = () => {
        searchContainer.style.display = 'block';
        return this
    };

    this.getData = () => {
        return localData
    };

    this.setData = (data = []) => {
        // localData = data;
        // displayData();
        // Todo
        return this
    };

    this.addData = (data = {}) => {
        // localData.push(data);
        // displayData();
        // Todo
        return this
    };

    this.getSearchResults = ()=>{
        return searchResults;
    };

    this.getValues = ()=>{
        return getSelectedValues()
    };

    /**
     *
     * @param {string[]} values
     */
    this.setValues = (values = [])=>{

        values.forEach((value)=>{
            localData.forEach((data)=>{
                if(data.label === value || data.value === value){
                    data.selected = true;
                    data.option.selected = true;
                    data.item.classList.add('skyflow-select-item-selected')
                }
            })
        });

        return SELF
    };

    this.multiple = (multiple)=>{
        isMultiple = multiple;
        return SELF
    };

    this.show = ()=>{
        container.style.display = 'block';
        if (events['show']) {
            events['show'].apply(SELF, []);
        }
        return SELF
    };

    this.hide = ()=>{
        container.style.display = 'none';
        if (events['hide']) {
            events['hide'].apply(SELF, []);
        }
        return SELF
    };

    this.close = ()=>{
        return SELF.hide();
    };

    this.closeText = (text)=>{
        return closeContainer.innerHTML = text;
    };

    this.on = (event, callback) =>{
        if(events.hasOwnProperty(event)){
            events[event] = callback;
        }
        return SELF;
    };

    this.off = (event) =>{
        if(events.hasOwnProperty(event)){
            events[event] = null;
        }
        return SELF;
    };

    this.selectByIndex = (index)=>{
        let data = this.getData()[index];
        if(!data){return SELF}
        itemClickEvent.apply(data.item);
        return SELF
    };

    this.unSelectByIndex = (index)=>{
        let data = this.getData()[index];
        if(!data){return SELF}
        data.option.selected = false;
        data.item.classList.remove('skyflow-select-item-selected');
        return SELF
    };

}