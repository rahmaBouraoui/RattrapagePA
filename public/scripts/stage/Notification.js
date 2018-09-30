function Notification() {

    const SELF = this, NOTIFICATION_ID = parseInt(Math.random() * 1000000);
    let referrer = null, timeoutId = null;

    let events = {
        'container.show': null,
        'container.hide': null,
        'header.show': null,
        'header.hide': null,
        'body.show': null,
        'body.hide': null,
        'footer.show': null,
        'footer.hide': null,
        'closeButton.show': null,
        'closeButton.hide': null,
        'modal.show': null,
        'modal.hide': null,
    };

    let settings = {
        animation: {
            type: 'slideDown',
            time: 0.7
        },
        stylesheet: {
            element: null,
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-stylesheet',
        },
        modal: {
            element: null,
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-modal',
        },
        position: {
            // 'top': '2px'
        },
        autoHide: false,
        autoHeight: true,
        autoWidth: false,
    };

    let animations = {
        zoom: {
            show() {

                let time = this.animation.time(),
                    id = this.container.getId(),
                    content = "@keyframes zoomIn{from{opacity:0;transform:scale3d(.3,.3,.3);}50%{opacity:1}}" +
                        "#" + id + "{animation-name:zoomIn;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content = "@keyframes zoomOut{from{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}" +
                        "#" + id + "{animation-name:zoomOut;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        zoomDown: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes zoomInDown{from{opacity:0;transform:scale3d(.1,.1,.1)translate3d(0,-1000px,0);" +
                        "animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}60%{" +
                        "opacity:1;transform:scale3d(.475,.475,.475)translate3d(0,60px,0);" +
                        "animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}" +
                        "#" + id + "{animation-name:zoomInDown;animation-duration:" + time + "s;animation-fill-mode:both;}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes zoomOutDown{40%{opacity:1;transform:scale3d(.475,.475,.475)translate3d(0,-60px,0);" +
                        "animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190);}to{opacity:0;" +
                        "transform:scale3d(.1,.1,.1)translate3d(0,2000px,0);transform-origin:center bottom;" +
                        "animation-timing-function:cubic-bezier(0.175,0.885,0.320,1);}}" +
                        "#" + id + "{animation-name:zoomOutDown;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        zoomUp: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes zoomInUp{from{opacity:0;transform:scale3d(.1,.1,.1)translate3d(0,1000px,0);" +
                        "animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190);}60%{opacity:1;" +
                        "transform:scale3d(.475,.475,.475)translate3d(0,-60px,0);" +
                        "animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}" +
                        "#" + id + "{animation-name:zoomInUp;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes zoomOutUp{40%{opacity:1;transform:scale3d(.475,.475,.475)translate3d(0,60px,0);" +
                        "animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}to{" +
                        "opacity:0;transform:scale3d(.1,.1,.1)translate3d(0,-2000px,0);transform-origin:center bottom;" +
                        "animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}" +
                        "#" + id + "{animation-name:zoomOutUp;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        bounce: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes bounceIn { from, 20%, 40%, 60%, 80%," +
                        "to {  animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000)}" +
                        "0% {  opacity: 0;transform: scale3d(.3, .3, .3)}" +
                        "20% {  transform: scale3d(1.1, 1.1, 1.1)}" +
                        "40% {  transform: scale3d(.9, .9, .9)}" +
                        "60% {  opacity: 1;transform: scale3d(1.03, 1.03, 1.03)}" +
                        "80% {  transform: scale3d(.97, .97, .97)}" +
                        "to {  opacity: 1;transform: scale3d(1, 1, 1)}}" +
                        "#" + id + "{animation-name:bounceIn;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes bounceOut { 20% {  transform: scale3d(.9, .9, .9)}" +
                        "50%, 55% {opacity:1;transform:scale3d(1.1,1.1,1.1)}" +
                        "to {opacity: 0;transform: scale3d(.3, .3, .3)}}" +
                        "#" + id + "{animation-name:bounceOut;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        fade: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes fadeIn{from{opacity:0}to{opacity:1}}" +
                        "#" + id + "{animation-name:fadeIn;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes fadeOut{from{opacity:1}to{opacity:0}}" +
                        "#" + id + "{animation-name:fadeOut;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        slideLeft: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideInLeft{from{transform:translate3d(-100%,0,0);visibility:visible}" +
                        "to{transform:translate3d(0,0,0)}}" +
                        "#" + id + "{animation-name:slideInLeft;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideOutLeft{from{transform:translate3d(0,0,0)}" +
                        "to{visibility:hidden;transform:translate3d(-100%,0,0)}}" +
                        "#" + id + "{animation-name:slideOutLeft;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        slideRight: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideInRight{from{transform:translate3d(100%,0,0);visibility:visible}" +
                        "to{transform:translate3d(0,0,0)}}" +
                        "#" + id + "{animation-name:slideInRight;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideOutRight{from{transform:translate3d(0,0,0)}" +
                        "to{visibility:hidden;transform:translate3d(100%,0,0)}}" +
                        "#" + id + "{animation-name:slideOutRight;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        slideUp: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideInUp{from{transform:translate3d(0,100%,0);visibility:visible}" +
                        "to{transform:translate3d(0,0,0)}}" +
                        "#" + id + "{animation-name:slideInUp;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideOutDown{from{transform:translate3d(0,0,0)}" +
                        "to{visibility:hidden;transform:translate3d(0,100%,0)}}" +
                        "#" + id + "{animation-name:slideOutDown;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
        slideDown: {
            show() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideInDown{from{transform:translate3d(0,-100%,0);visibility:visible}" +
                        "to{transform:translate3d(0,0,0)}}" +
                        "#" + id + "{animation-name:slideInDown;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                this.container.addStyle('display', 'block');

            },
            hide() {
                let time = this.animation.time(),
                    id = this.container.getId(),
                    content =
                        "@keyframes slideOutUp{from{transform:translate3d(0,0,0)}" +
                        "to{visibility:hidden;transform:translate3d(0,-100%,0)}}" +
                        "#" + id + "{animation-name:slideOutUp;animation-duration:" + time + "s;animation-fill-mode:both}";
                this.stylesheet.content(content);
                let container = this.container;
                setTimeout(function () {
                    container
                        .addStyle('display', 'none')
                }, time * 1000)
            },
        },
    };

    let partSettings = {
        container: {
            name: 'div',
            id: 'skyflow-notification-' + NOTIFICATION_ID,
            class: '',
            styles: {
                'position': 'fixed',
                'z-index': '1000000001',
                'box-shadow': '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
                'background-color': '#FFF',
            },
        },
        header: {
            name: 'div',
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-header',
            class: '',
            styles: {},
        },
        body: {
            name: 'div',
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-body',
            class: '',
            styles: {},
        },
        footer: {
            name: 'div',
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-footer',
            class: '',
            styles: {},
        },
        closeButton: {
            name: 'span',
            id: 'skyflow-notification-' + NOTIFICATION_ID + '-closeButton',
            class: '',
            styles: {
                'position': 'absolute',
                'cursor': 'pointer',
                'text-decoration': 'underline',
            },
        },
    };

    let partElements = {
        container: null,
        header: null,
        body: null,
        footer: null,
        closeButton: null,
    };

    // Build notification parts (container, header, body, footer, ...)
    function buildNotification() {

        for (let part in partSettings) {

            if (!partSettings.hasOwnProperty(part)) {
                continue;
            }

            // Create element
            let element = document.createElement(partSettings[part]['name']);

            // Add ids
            element.id = partSettings[part]['id'];

            // Add styles
            let styles = partSettings[part]['styles'];
            for (let style in styles) {
                if (!styles.hasOwnProperty(style)) {
                    continue;
                }
                element.style[style] = styles[style];
            }

            // Store element
            partElements[part] = element;

            let container = partElements['container'];
            if (part !== 'container' && container) {
                container.appendChild(element);
            }

        }

        // Configure container
        let container = SELF.container.get();
        SELF.container
            .addStyle('display', 'none')
            .addStyle('min-width', '300px')
            .addStyle('min-height', '50px');

        function containerCallback(e) {
            clearTimeout(timeoutId);
            if (e.type === 'mouseover') {
                return true
            }
            let autoHideTime = settings['autoHide'];
            if (autoHideTime) {
                timeoutId = setTimeout(function () {
                    SELF.container.hide();
                }, (SELF.animation.time() * 1000) + (autoHideTime * 1000))
            }
        }

        ['mouseover', 'mouseout'].forEach(function (e) {
            if (container.addEventListener) {
                container.addEventListener(e, containerCallback, false)
            } else {
                container.attachEvent('on' + e, containerCallback);
            }
        });
        document.querySelector('body').appendChild(container);

        // Set default settings
        SELF.position.bottom().right();
        SELF.animation.type('slideRight');

        // Configure close button
        let closeButton = SELF.closeButton.addHtml('close').get();

        function closeButtonCallback() {
            SELF.hide()
        }

        if (closeButton.addEventListener) {
            closeButton.addEventListener('click', closeButtonCallback, false)
        } else {
            closeButton.attachEvent('onclick', closeButtonCallback);
        }
        SELF.closeButton.position.top('5px').right('5px');
    }

    // To take effect, you need to set width and/or height values.
    function Position(part) {
        let positionInstance = this;

        /**
         * Sets top position.
         *
         * @method top
         * @param {string} value
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.top = (value) => {
            if (part !== 'container') {
                partElements[part].style.top = value || '0';
                partElements[part].style.bottom = 'auto';
            } else {
                settings['position']['top'] = value || '0';
            }
            return positionInstance;
        };
        /**
         * Sets right position.
         *
         * @method right
         * @param {string} value
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.right = (value) => {
            if (part !== 'container') {
                partElements[part].style.right = value || '0';
                partElements[part].style.left = 'auto';
            } else {
                settings['position']['right'] = value || '0';
            }
            return positionInstance;
        };

        /**
         * Sets bottom position.
         *
         * @method bottom
         * @param {string} value
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.bottom = (value) => {
            if (part !== 'container') {
                partElements[part].style.bottom = value || '0';
                partElements[part].style.top = 'auto';
            } else {
                settings['position']['bottom'] = value || '0';
            }
            return positionInstance;
        };

        /**
         * Sets left position.
         *
         * @method left
         * @param {string} value
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.left = (value) => {
            if (part !== 'container') {
                partElements[part].style.left = value || '0';
                partElements[part].style.right = 'auto';
            } else {
                settings['position']['left'] = value || '0';
            }
            return positionInstance;
        };

        /**
         * Center an element in the middle of the page. Only container can be centred.
         *
         * @method center
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.center = () => {
            settings['position']['top'] = '0';
            settings['position']['right'] = '0';
            settings['position']['bottom'] = '0';
            settings['position']['left'] = '0';
            settings['position']['margin'] = 'auto';
            return positionInstance;
        };

        /**
         * Center an element vertically. Only container can be centred.
         *
         * @method verticalCenter
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.verticalCenter = () => {
            settings['position']['top'] = '0';
            settings['position']['right'] = '0';
            settings['position']['bottom'] = '0';
            settings['position']['left'] = '0';
            settings['position']['margin-top'] = 'auto';
            settings['position']['margin-bottom'] = 'auto';
            settings['position']['margin-left'] = '0';
            settings['position']['margin-right'] = '0';
            return positionInstance;
        };

        /**
         * Center an element horizontally. Only container can be centred.
         *
         * @method horizontalCenter
         * @returns {Position}
         * @example notification.position.example.js
         * @service Notification.Position
         */
        this.horizontalCenter = () => {
            settings['position']['top'] = '0';
            settings['position']['right'] = '0';
            settings['position']['bottom'] = '0';
            settings['position']['left'] = '0';
            settings['position']['margin-top'] = '0';
            settings['position']['margin-bottom'] = '0';
            settings['position']['margin-left'] = 'auto';
            settings['position']['margin-right'] = 'auto';
            return positionInstance;
        };
    }

    /**
     * Position object.
     *
     * @property position
     * @type {Notification.Position}
     */
    this.position = new Position('container');

    function Part(part) {
        let partInstance = this;

        /**
         * Adds html value to element.
         *
         * @method addHtml
         * @param {string} html
         * @returns {Part}
         * @example notification.part.example.js
         * @service Notification.Part
         */
        this.addHtml = (html) => {
            let h = partElements[part].innerHTML;
            partElements[part].innerHTML = h + html;
            return partInstance;
        };

        /**
         * Sets html value to element. Replace all html content.
         *
         * @method setHtml
         * @param {string} html
         * @returns {Part}
         * @service Notification.Part
         */
        this.setHtml = (html) => {
            partElements[part].innerHTML = html;
            return partInstance;
        };

        /**
         * Appends element.
         *
         * @method addElement
         * @param {Element} element
         * @returns {Part}
         * @example notification.part.example.js
         * @service Notification.Part
         */
        this.addElement = (element) => {
            partElements[part].appendChild(element);
            return partInstance;
        };

        /**
         * Removes element.
         *
         * @method removeElement
         * @param {Element} element
         * @returns {Part}
         * @service Notification.Part
         */
        this.removeElement = (element) => {
            partElements[part].parentNode.removeChild(element);
            return partInstance;
        };

        /**
         * Adds class.
         *
         * @method addClass
         * @param {string} name
         * @returns {Part}
         * @example notification.part.example.js
         * @service Notification.Part
         */
        this.addClass = (name) => {
            partElements[part].classList.add(name);
            return partInstance;
        };

        /**
         * Removes class.
         *
         * @method removeClass
         * @param {string} name
         * @returns {Part}
         * @service Notification.Part
         */
        this.removeClass = (name) => {
            partElements[part].classList.remove(name);
            return partInstance;
        };

        /**
         * Show element.
         *
         * @method show
         * @returns {Part}
         * @service Notification.Part
         */
        this.show = () => {

            if (partElements[part].style.display !== 'none') {
                return partInstance;
            }

            clearTimeout(timeoutId);

            if (part === 'container') {

                if(settings['autoHeight']){
                    SELF.container.addStyle('display', 'block');
                    SELF.container.addStyle('height', (SELF.container.get().offsetHeight) + 'px');
                }

                if(settings['autoWidth']){
                    SELF.container.addStyle('display', 'block');
                    SELF.container.addStyle('width', (SELF.container.get().offsetWidth) + 'px');
                }

                // Set position
                let positions = settings['position'];
                for (let position in positions) {
                    if (!positions.hasOwnProperty(position)) {
                        continue
                    }
                    SELF.container.addStyle(position, positions[position])
                }

                // Show with animation
                animations[SELF.animation.type()]['show'].apply(SELF);

                let autoHideTime = settings['autoHide'];

                if (autoHideTime) {
                    timeoutId = setTimeout(function () {
                        SELF.container.hide();
                    }, (SELF.animation.time() * 1000) + (autoHideTime * 1000))
                }

            } else {
                partElements[part].style.display = 'block';
            }
            if (!referrer && events[part + '.show']) {
                events[part + '.show'].apply(SELF);
            }
            if (referrer === 'modal' && events['modal.show']) {
                events['modal.show'].apply(SELF);
            }

            return partInstance;
        };

        /**
         * Hide element.
         *
         * @method hide
         * @returns {Part}
         * @service Notification.Part
         */
        this.hide = () => {

            if (partElements[part].style.display === 'none') {
                return partInstance;
            }

            clearTimeout(timeoutId);

            if (part === 'container') {
                animations[SELF.animation.type()]['hide'].apply(SELF);
            } else {
                partElements[part].style.display = 'none';
                return partInstance;
            }
            if (!SELF.modal.isOpen() && events[part + '.hide']) {
                events[part + '.hide'].apply(SELF);
            }

            if (SELF.modal.isOpen()) {
                setTimeout(function () {
                    let modal = SELF.modal.get();
                    modal.style.display = 'none';
                    document.querySelector('body').removeChild(modal);
                    if (events['modal.hide']) {
                        events['modal.hide'].apply(SELF);
                    }
                }, SELF.animation.time() * 1000)
            }

            return partInstance;
        };

        /**
         * Removes element.
         *
         * @method remove
         * @returns {Part}
         * @service Notification.Part
         */
        this.remove = () => {
            partElements[part].parentNode.removeChild(partElements[part]);
            return partInstance;
        };

        /**
         * Adds style to element.
         *
         * @method addStyle
         * @param {string} style
         * @param {string} value
         * @returns {Part}
         * @service Notification.Part
         */
        this.addStyle = (style, value) => {
            partElements[part].style[style] = value;
            return partInstance;
        };

        /**
         * Gets style of element.
         *
         * @method getStyle
         * @param {string} style
         * @returns {Part}
         * @service Notification.Part
         */
        this.getStyle = (style) => {
            return partElements[part].style[style];
        };

        /**
         * Removes style from element.
         *
         * @method removeStyle
         * @param {string} style
         * @returns {Part}
         * @service Notification.Part
         */
        this.removeStyle = (style) => {
            partElements[part].style[style] = null;
            return partInstance;
        };

        /**
         * Gets id use for id attribute.
         *
         * @method getId
         * @returns {string}
         * @service Notification.Part
         */
        this.getId = () => {
            return partSettings[part]['id'];
        };

        /**
         * Gets original element.
         *
         * @method get
         * @returns {Element|null}
         * @example notification.part.example.js
         * @service Notification.Part
         */
        this.get = () => {
            return partElements[part];
        };

        /**
         * Object to manage positions.
         *
         * @property position
         * @type {Position}
         * @service Notification.Part
         */
        this.position = new Position(part);
    }

    /**
     * Container object.
     *
     * @property container
     * @type {Notification.Part}
     */
    this.container = new Part('container');

    /**
     * Header object.
     *
     * @property header
     * @type {Notification.Part}
     */
    this.header = new Part('header');

    /**
     * Body object.
     *
     * @property body
     * @type {Notification.Part}
     */
    this.body = new Part('body');

    /**
     * Footer object.
     *
     * @property footer
     * @type {Notification.Part}
     */
    this.footer = new Part('footer');

    /**
     * CloseButton object.
     *
     * @property closeButton
     * @type {Notification.Part}
     */
    this.closeButton = new Part('closeButton');

    function Animation() {

        let animationInstance = this;

        /**
         * Sets or gets animation type.
         *
         * @method type
         * @param {string} type
         * @returns {Animation|string}
         * @example notification.animation.example.js
         * @service Notification.Animation
         */
        this.type = (type) => {

            if (type === undefined) {
                return settings['animation']['type']
            }

            if (animations.hasOwnProperty(type)) {
                settings['animation']['type'] = type;
            }
            return animationInstance;
        };

        /**
         * Sets or gets animation time.
         *
         * @method time
         * @param {int} time
         * @returns {Animation|int}
         * @example notification.animation.example.js
         * @service Notification.Animation
         */
        this.time = (time) => {

            if (time === undefined) {
                return settings['animation']['time']
            }

            settings['animation']['time'] = time;

            return animationInstance;
        };

    }

    /**
     * Animation object.
     *
     * @property animation
     * @type {Notification.Animation}
     */
    this.animation = new Animation();

    function Stylesheet() {

        let stylesheetInstance = this;

        let stylesheet = document.createElement('style');
        stylesheet.id = settings['stylesheet']['id'];
        document.querySelector('head').appendChild(stylesheet);
        settings['stylesheet']['element'] = stylesheet;

        /**
         * Gets stylesheet element id.
         *
         * @method getId
         * @returns {string}
         * @example notification.stylesheet.example.js
         * @service Notification.Stylesheet
         */
        this.getId = () => {

            return settings['stylesheet']['id'];
        };

        /**
         * Sets or gets stylesheet content.
         *
         * @method content
         * @param {string} content
         * @returns {Stylesheet|string}
         * @example notification.stylesheet.example.js
         * @service Notification.Stylesheet
         */
        this.content = (content) => {

            if (content === undefined) {
                return settings['stylesheet']['element'].textContent
            }

            settings['stylesheet']['element'].textContent = content;

            return stylesheetInstance;
        };

    }

    /**
     * Stylesheet object.
     *
     * @property stylesheet
     * @type {Notification.Stylesheet}
     */
    this.stylesheet = new Stylesheet();

    function Modal() {

        let modalInstance = this;

        let modal = document.createElement('div');
        modal.id = settings['modal']['id'];
        modal.style.position = 'fixed';
        modal.style.width = '100%';
        modal.style.minHeight = '100%';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.opacity = '0.8';
        modal.style.backgroundColor = '#000';
        modal.style.zIndex = '1000000000';
        settings['modal']['element'] = modal;

        /**
         * Show modal notification.
         *
         * @method show
         * @returns {Modal}
         * @example notification.modal.example.js
         * @service Notification.Modal
         */
        this.show = () => {

            referrer = 'modal';
            SELF.position.center();
            modal.style.display = 'block';
            document.querySelector('body').appendChild(SELF.modal.get());
            SELF.container.show();

            return modalInstance
        };

        /**
         * Checks if modal notification is opened.
         *
         * @method isOpen
         * @returns {boolean}
         * @example notification.modal.example.js
         * @service Notification.Modal
         */
        this.isOpen = () => {
            return SELF.modal.get().style.display === 'block';
        };

        /**
         * Hide modal notification.
         *
         * @method hide
         * @returns {Modal}
         * @example notification.modal.example.js
         * @service Notification.Modal
         */
        this.hide = () => {
            referrer = 'modal';
            SELF.hide();
            return modalInstance
        };

        /**
         * Gets original element.
         *
         * @method get
         * @returns {Element}
         * @example notification.modal.example.js
         * @service Notification.Modal
         */
        this.get = () => {
            return settings['modal']['element'];
        };

    }

    /**
     * Modal object.
     *
     * @property modal
     * @type {Notification.Modal}
     */
    this.modal = new Modal();

    /**
     * Show notification.
     *
     * @method show
     * @returns {Notification}
     */
    this.show = () => {
        referrer = null;
        SELF.container.show();
        return SELF;
    };

    /**
     * Hide notification.
     *
     * @method hide
     * @returns {Notification}
     */
    this.hide = () => {
        referrer = null;
        SELF.container.hide();
        return SELF;
    };

    /**
     * Show modal notification.
     *
     * @method showModal
     * @returns {Notification}
     */
    this.showModal = () => {
        SELF.modal.show();
        return SELF;
    };

    /**
     * Hide modal notification.
     *
     * @method hideModal
     * @returns {Notification}
     */
    this.hideModal = () => {
        SELF.modal.hide();
        return SELF;
    };

    /**
     * Sets events.
     *
     * @method on
     * @param {string} event Name of event
     * @param {Function} callback
     * @returns {Notification}
     * @example notification.example.js
     */
    this.on = (event, callback) => {

        if (event === 'show') {
            event = 'container.show'
        }
        if (event === 'hide') {
            event = 'container.hide'
        }

        if (events.hasOwnProperty(event)) {
            events[event] = callback;
        }

        return SELF;
    };

    /**
     * Removes events.
     *
     * @method off
     * @param {String} event Name of event
     * @returns {Notification}
     * @example notification.example.js
     */
    this.off = (event) => {

        if (events.hasOwnProperty(event)) {
            events[event] = null;
        }

        return SELF;
    };

    /**
     * Sets width of notification container.
     *
     * @method width
     * @param {String} value
     * @returns {Notification}
     * @example notification.example.js
     */
    this.width = (value) => {

        SELF.container.addStyle('width', value);

        return SELF;
    };

    /**
     * Sets height of notification container.
     *
     * @method height
     * @param {String} value
     * @returns {Notification}
     * @example notification.example.js
     */
    this.height = (value) => {

        SELF.container.addStyle('height', value);

        return SELF;
    };

    /**
     * Set value to enabled auto hide notification.
     *
     * @method autoHide
     * @param {boolean|int} value Set value in seconds to hide notification after this time. Set false to disabled auto hide.
     * @returns {Notification}
     * @example notification.example.js
     */
    this.autoHide = (value) => {

        if (value === true) {
            value = 5
        }

        settings['autoHide'] = value;

        return SELF;
    };

    /**
     * Allows you to automatically set the height of an element. This can be used for automatic centering.
     *
     * @method autoHeight
     * @param {boolean} auto Set true value for automatic height.
     * @returns {Notification}
     * @example notification.example.js
     */
    this.autoHeight = (auto) => {
        settings['autoHeight'] = auto;
        return SELF;
    };

    /**
     * Allows you to automatically set the width of an element. This can be used for automatic centering.
     *
     * @method autoWidth
     * @param {boolean} value Set true value for automatic width.
     * @returns {Notification}
     * @example notification.example.js
     */
    this.autoWidth = (value) => {
        settings['autoWidth'] = value;
        return SELF;
    };

    buildNotification();

}

export default Notification;