import StageModal from '../stage/StageModal';
import StageNotification from '../stage/StageNotification';
import Helper from '../stage/Helper';
import Ajax from '../skyflow/Ajax';

(()=>{

    let countEvent = 0;

    '.offer-box .description.short .more'.on('click', function (e) {

        let box = this.target.get().parent('.offer-box');

        box.find('.description.short').hide();
        box.find('.address').hide();
        box.find('.number').hide();
        box.find('.attribute.btn-company').hide();
        box.find('.description.long').show();

    });

    '.offer-box .description.long .less'.on('click', function (e) {

        let box = this.target.get().parent('.offer-box');

        box.find('.description.long').hide();
        box.find('.description.short').show();
        box.find('.address').setAttr('style', 'display: flex');
        box.find('.number').setAttr('style', 'display: flex');
        box.find('.attribute').show();

    });

    '.offer-box .footer .delete, .offer-box .footer .delete i, .offer-box .footer .delete span'.on('click', (e, target) => {

        if(countEvent > 0){
            return false
        }

        countEvent++;

        let box = target.get().parent('.offer-box').get()[0];

        let modal = new StageModal();
        modal.setHeaderContent("Confirmation de suppression");
        modal.setBodyContent("<p class='_text-center'>Voulez-vous supprimer cette offre ?</p>");

        let acceptButton = modal.acceptButton.content("Supprimer").get();
        acceptButton.classList.add('stage-btn');
        acceptButton.classList.add('btn-error');
        // acceptButton.classList.add('btn-company');

        let cancelButton = modal.cancelButton.get();
        cancelButton.classList.add('stage-btn');
        cancelButton.classList.add('btn-company');

        modal.onCancel(()=>{
            countEvent = 0;
        });

        modal.onAccept(() => {
            modal.hide();

            window.location.replace(box.dataset.url);

            let loaderModal = new StageModal();
            Helper.openStageLoader(loaderModal);

        });

        modal.show();

    });

    '.offer-box .attribute button'.on('click', function (e, target) {

        let box = target.get().parent('.offer-box').get()[0];

        let loaderModal = new StageModal();
        Helper.openStageLoader(loaderModal);

        let ajax = new Ajax();
        ajax.method('post')
            .responseType('json')
            .url(box.dataset.attribute)
            .success((response) => {

                if(response.code === 200){
                    box.get().find('.number .count').html(response.body.count);

                    if(response.body.count === 0){
                        box.get().find('.attribute').remove();
                    }

                    let notification = new StageNotification();
                    notification.notifySuccess("Merci d’avoir déclaré l’attribution d’un stage. " +
                        "Vous pouvez télécharger les fiches d’activité et le guide du maître de stage. " +
                        "Un porte-documents et une médaille vous seront adressés sur le lieu du stage");

                    setTimeout(()=>{
                        Helper.closeStageLoader(loaderModal);
                        window.location.replace("/download/kit");

                    }, 1000)

                }

            })
            .error((e) => {
                console.log(e);
            });
        ajax.send();



    });

    '.offer-box .attribute i.help'.on('click', (e, target) => {

        let content = "En cliquant sur ce bouton, je déclare avoir attribué un stage et l'avoir confirmé au stagiaire. Le nombre de stages encore disponibles sera mis à jour.\n" +
            "Le porte-documents et la médaille seront automatiquement envoyés sur le lieu du stage. Les fiches d'activité vont m'être proposées en téléchargement.";

        let modal = new StageModal();
        modal.setHeaderContent("Aide");
        modal.setBodyContent("<p class='_text-left'>"+content+"</p>");

        modal.acceptButton.hide();

        let cancelButton = modal.cancelButton.content("Fermer").get();
        cancelButton.classList.add('stage-btn');
        cancelButton.classList.add('btn-company');

        modal.show();

    });

})();

