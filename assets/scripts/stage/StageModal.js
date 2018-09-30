import Notification from './Notification';

function stageModal() {
    const SELF = this;
    const MODAL = new Notification();

    let events = {
        'cancel': null,
        'accept': null
    };

    // Configure animation
    MODAL.animation.type('zoomUp');
    MODAL.animation.time(0.5);

    // Configure header
    MODAL.header.addClass('stage-modal-header');

    // Configure body
    MODAL.body.addClass('stage-modal-body');

    // Configure footer
    let acceptButton = document.createElement('button');
    acceptButton.setAttribute('id', 'stage-modal-accept');
    acceptButton.setAttribute('class', 'stage-btn _lg-inline-block _md-inline-block _block _m-t-15' +
        ' _m-b-15\n' +
        '_m-l-auto\n' +
        '_m-r-auto\n' +
        ' _md-m-10');
    acceptButton.innerHTML = 'Valider';
    acceptButton.get().on('click', function () {
        if(events['accept']){
            events['accept'].apply(SELF);
        }
    });
    MODAL.footer.addElement(acceptButton);

    let cancelButton = document.createElement('button');
    cancelButton.setAttribute('id', 'stage-modal-cancel');
    cancelButton.setAttribute('class', 'stage-btn _lg-inline-block _md-inline-block _block _m-t-15' +
        ' _m-b-15\n' +
        '_m-l-auto\n' +
        '_m-r-auto\n' +
        ' _md-m-10');
    cancelButton.innerHTML = 'Annuler';
    cancelButton.get().on('click', function () {
        SELF.hide();
        if(events['cancel']){
            events['cancel'].apply(SELF);
        }
    });
    MODAL.footer.addElement(cancelButton);

    MODAL.footer.addClass('stage-modal-footer');

    const buttons = {
        'accept': acceptButton,
        'cancel': cancelButton
    };

    // Configure container
    MODAL.container
        .addClass('stage-modal-container')
        .addStyle('width', '60%');
    MODAL.autoHeight(true);

    // Others configurations
    MODAL.closeButton.hide();

    this.show = ()=>{
        'body'.addClass('stage-modal-is-open');
        MODAL.showModal();
        return SELF;
    };
    this.hide = ()=>{
        MODAL.hideModal();
        'body'.removeClass('stage-modal-is-open');
        return SELF;
    };
    this.onCancel = (callback) => {
        events['cancel'] = callback;
        return SELF;
    };
    this.onAccept = (callback) => {
        events['accept'] = callback;
        return SELF;
    };
    this.setHeaderContent = (content) => {
        MODAL.header.setHtml(content);
        return SELF;
    };
    this.setBodyContent = (content) => {
        MODAL.body.setHtml(content);
        return SELF;
    };

    function Button(type) {
        const buttonInstance = this;

        this.content = (content) => {
            buttons[type].innerHTML = content;
            return buttonInstance;
        };
        this.show = () => {
            buttons[type].style.display = 'block';
            return buttonInstance;
        };
        this.hide = () => {
            buttons[type].style.display = 'none';
            return buttonInstance;
        };
        this.get = () => {
            return buttons[type];
        };
    }
    this.acceptButton = new Button('accept');
    this.cancelButton = new Button('cancel');

    /**
     * Notification object.
     *
     * @property parent
     * @type {Notification}
     */
    this.parent = MODAL;

}

export default stageModal;