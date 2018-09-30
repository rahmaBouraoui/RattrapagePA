function Helper() {

    this.openStageLoader = (modal) => {
        let loader = '#spinner-loader'.clone(true).show().get()[0];
        modal.parent.body.addElement(loader);
        modal.parent.container.addClass('modal-loading');
        modal.show();
    };

    this.closeStageLoader = (modal) => {
        modal.hide();
        setTimeout(()=>{
            modal.parent.body.get().get().find('#spinner-loader').remove();
            modal.parent.container.removeClass('modal-loading');
        }, 1000);
    }

}

export default new Helper();

