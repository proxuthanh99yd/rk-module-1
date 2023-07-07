
function enableEditTag(value) {

    disableEditTagAll();
    value.parentElement.parentElement.setAttribute('edit', 'true');
    handleEditTag(value);
}

function disableEditTag(value) {

    value.parentElement.parentElement.setAttribute('edit', 'false');
    handleEditTag(value);
}

function disableEditTagAll() {
    document.querySelectorAll('.btn-edit')
        .forEach(element => {
            element.parentElement.parentElement.setAttribute('edit', 'false');
            handleEditTag(element);
        })

}

function saveTag(value, cb) {

    const trTag = value.parentElement.parentElement;
    const values = [];
    trTag.querySelectorAll(`td div`)
        .forEach(element => {
            if (element.getAttribute('edit-type') == 'text') {

                element.contentEditable = "false";
                element.style.cssText = ""
                element.dataset.text = element.innerHTML;
            }
            if (element.getAttribute('edit-type') == 'checkbox') {
                element.dataset.text = element.childNodes[0].checked;
            }
            values.push(element.dataset.text);
        });

    cb(values);
    disableEditTag(value);
}

function handleEditTag(value) {

    const trTag = value.parentElement.parentElement;

    if (trTag.getAttribute('edit') == 'true') {

        trTag.querySelectorAll(`td div`).forEach(element => {

            if (element.getAttribute('edit-type') == 'text') {

                element.contentEditable = "true";
                element.style.cssText = " border:1px solid; border-radius: 3px "
            }
            if (element.getAttribute('edit-type') == 'checkbox') {

                const checkbox = document.createElement("INPUT");
                checkbox.setAttribute("type", "checkbox");
                checkbox.className = "status";
                if (element.innerHTML == 'true') {

                    checkbox.checked = true
                } else {

                    checkbox.checked = false
                }

                element.replaceChild(checkbox, element.childNodes[0]);
            }
        });
        trTag.querySelectorAll(`td button`)
            .forEach(element => {

                if (element.className.includes('btn-save') ||
                    element.className.includes('btn-cancel')) {

                    element.classList.remove('hidden');
                }
                if (element.className.includes('btn-edit')) {

                    element.classList.add('hidden');
                }
            })
    }
    else {
        trTag.querySelectorAll(`td div`)
            .forEach(element => {

                if (element.getAttribute('edit-type') == 'text') {

                    element.contentEditable = "false";
                    element.style.cssText = ""
                    element.innerHTML = element.dataset.text;
                }
                if (element.getAttribute('edit-type') == 'checkbox') {

                    element.innerHTML = element.dataset.text;
                }
            });
        trTag.querySelectorAll(`td button`)
            .forEach(element => {

                if (element.className.includes('btn-save') ||
                    element.className.includes('btn-cancel')) {

                    element.classList.add('hidden');
                }
                if (element.className.includes('btn-edit')) {

                    element.classList.remove('hidden');
                }
            })
    }

}
