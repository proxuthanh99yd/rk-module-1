function dialog(close = false) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const overlay = document.createElement('div');
    // Open the dialog
    $('.dialog__trigger').onclick = function (e) {
        overlay.className = 'overlay-create';
        $('.app').appendChild(overlay);
        $('.dialog').classList.toggle('dialog--active');
        e.stopPropagation();
    };

    // Close the dialog - click close button
    $('.dialog__close').onclick = function () {
        $('.dialog').classList.remove('dialog--active');
        overlay.remove();
    };

    // Close the dialog - click outside
    document.onclick = function (e) {
        if (e.target.className == 'overlay-create') {
            $('.dialog').classList.remove('dialog--active');
            overlay.remove();
        }
        if (e.target.className == 'overlay-delete') {
            $('.modal').classList.add('hidden');
            overlay.remove();
        }
    };
    $$('.btn-detail').forEach(element => {
        element.onclick = function (e) {
            overlay.className = 'overlay-create';
            $('.app').appendChild(overlay);
            $('.dialog').classList.toggle('dialog--active');
            e.stopPropagation();
        }
    });
    $$('.btn-edit').forEach(element => {
        element.onclick = function (e) {
            overlay.className = 'overlay-create';
            $('.app').appendChild(overlay);
            $('.dialog').classList.toggle('dialog--active');
            e.stopPropagation();
        };
    });
    $$('.btn-delete').forEach(element => {
        element.onclick = function (e) {
            overlay.className = 'overlay-delete';
            $('.app').appendChild(overlay);
            $('.modal').classList.remove('hidden')
        }
    });
    $('.btn-no').onclick = function (e) {
        $('.modal').classList.add('hidden')
        overlay.remove();
    }
    if (close == true) {
        $('.modal').classList.add('hidden')
        $('.overlay-delete')?.remove();

        $('.dialog').classList.remove('dialog--active');
        $('.overlay-create')?.remove();
    }
}

// Run function
export default dialog;