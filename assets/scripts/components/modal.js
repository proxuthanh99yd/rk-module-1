function modalBox(box) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    let overlay = $('body .modal-bg');
    if (!$('body .modal-bg')) {
        overlay = document.createElement('div');
        overlay.className = `modal-bg ${box.slice(1)}`;
        $('body').appendChild(overlay)
    }
    overlay.onclick = closeModal;
    $$(`[open="${box}"]`).forEach(element => {
        element.onclick = openModal;
    });
    $$(`[close="${box}"]`).forEach(element => {
        element.onclick = closeModal;
    })
    function openModal() {
        $(box).classList.add('open');
        overlay.classList.add('open');
    }
    function closeModal() {
        $(box).classList.remove('open');
        overlay.classList.remove('open');
    }
    return {
        close() {
            return closeModal(box)
        },
        open() {
            return openModal(box)
        }
    }
};

export default modalBox;
