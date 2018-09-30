import Notification from './Notification';

function StageNotification() {

    const SELF = this;
    const NOTIFICATION = new Notification();

    // Configure animation
    NOTIFICATION.animation.time(0.2);

    // Configure header
    NOTIFICATION.header.addClass('stage-notification-header');

    // Configure body
    NOTIFICATION.body.addClass('stage-notification-body');

    // Configure footer
    NOTIFICATION.footer.remove();

    // Configure container
    NOTIFICATION.container
        .addClass('stage-notification-container')
        .addStyle('width', '90%')
        .addStyle('max-width', '400px')
        .position.bottom('auto').bottom().right();

    // CloseButton configurations
    NOTIFICATION.closeButton
        .setHtml("<img src='/images/others/close-button.png'>")
        .addClass('stage-notification-closeButton')
        .position.top('11px').right('8px');

    // Others configurations
    NOTIFICATION.autoHide(true).autoHeight(false);
    NOTIFICATION.on('close', function () {
        this.container.get().removeAttribute('class');
    });

    this.show = (title, message)=>{
        SELF.setHeaderContent(title);
        SELF.setBodyContent(message);
        return NOTIFICATION.show();
    };
    this.notify = (title, message)=>{
        return SELF.show(title, message);
    };
    this.notifySuccess = (message)=>{
        NOTIFICATION.container.removeClass('stage-notification-error');
        NOTIFICATION.container.removeClass('stage-notification-info');
        NOTIFICATION.container.removeClass('stage-notification-warning');
        NOTIFICATION.container.addClass('stage-notification-success');
        message = "<img src='/images/others/success.png' alt='Succès'><p>" + message + "</p>";
        return SELF.show("Validation de l'opération", message);
    };
    this.notifyError = (message)=>{
        NOTIFICATION.container.removeClass('stage-notification-success');
        NOTIFICATION.container.removeClass('stage-notification-info');
        NOTIFICATION.container.removeClass('stage-notification-warning');
        NOTIFICATION.container.addClass('stage-notification-error');
        message = "<img src='/images/others/error.png' alt='Erreur'><p>" + message + "</p>";
        return SELF.show("Echec de l'opération", message);
    };
    this.notifyInfo = (message)=>{
        NOTIFICATION.container.removeClass('stage-notification-success');
        NOTIFICATION.container.removeClass('stage-notification-error');
        NOTIFICATION.container.removeClass('stage-notification-warning');
        NOTIFICATION.container.addClass('stage-notification-info');
        message = "<img src='/images/others/info.png' alt='Info'><p>" + message + "</p>";
        return SELF.show("Information", message);
    };
    this.notifyWarning = (message)=>{
        NOTIFICATION.container.removeClass('stage-notification-success');
        NOTIFICATION.container.removeClass('stage-notification-error');
        NOTIFICATION.container.removeClass('stage-notification-info');
        NOTIFICATION.container.addClass('stage-notification-warning');
        message = "<img src='/images/others/warning.png' alt='Attention'><p>" + message + "</p>";
        return SELF.show("Attention", message);
    };
    this.hide = ()=>{
        NOTIFICATION.hide();
        return SELF;
    };
    this.setHeaderContent = (content) => {
        NOTIFICATION.header.setHtml(content);
        return SELF;
    };
    this.setBodyContent = (content) => {
        NOTIFICATION.body.setHtml(content);
        return SELF;
    };
    /**
     * Notification object.
     *
     * @property parent
     * @type {Notification}
     */
    this.parent = NOTIFICATION;

}

export default StageNotification;