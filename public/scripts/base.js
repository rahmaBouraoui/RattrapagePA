import StageNotification from './stage/StageNotification';

window.addEventListener('load', ()=>{

    // Toggle menu
    "#menu-container .menu".on('click', ()=>{

        "#menu-container .menu".toggleClass('active');
        "#menu-container .items-container".toggleClass('show');

    });

    // Search
    let searchSetTimeOutId;
    '#search-container #search'.on('input', function () {
        let value = this.target.value.toLowerCase();
        clearTimeout(searchSetTimeOutId);
        searchSetTimeOutId = setTimeout(function () {
            '.stage-search-item'.hide().each(function (v, k) {
                for (let data in v.dataset){
                    let d = v.dataset[data];
                    if(d['indexOf'] && d.indexOf(value) > -1){
                        v.get().show();
                    }
                }
            });
        }, 300)
    });

    // Notification
    const N = new StageNotification();
    let count = 0;
    '.stage-flash-message'.each((v)=>{

        if(N['notify' + v.dataset.type]){
            setTimeout(()=>{
                let notification = new StageNotification();
                notification['notify' + v.dataset.type](v.innerHTML)
            }, count * 5000);
            count++;
        }

    });

    // Remove page loading
    setTimeout(function () {
        'header#header, main#container, footer#footer'.show();
        "#page-loader-container".remove();
    }, 800)

});
