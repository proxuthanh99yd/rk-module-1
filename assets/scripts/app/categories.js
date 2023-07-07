import request from "./database.js";
import categoriesHtml from "../components/admin/categories.js"
import Validate from "./validator.js";
import Pagination from "./pagination.js";
import modalBox from "../components/modal.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const pageSettings = {
    current: 1,
    search: {
        keyword: '',
        field: 'categoryName'
    },
    sort: {
        filter: '',
        field: ''
    },
    status: 'all'
}
export default function categories() {

    if ($('.container')) {
        $('.container').innerHTML = categoriesHtml;
    }

    const query = request('categories');
    let get = query.get(pageSettings.status, pageSettings.current, 5)
    render(get);
    const paginate = new Pagination(get.pageCount);
    paginate.action = function (current) {
        pageSettings.current = current;
        switch (pageSettings.status) {
            case 'sort':
                get = query.get('all', current, 5, pageSettings.sort.filter, pageSettings.sort.field)
                break;
            case 'search':
                get = query.search(pageSettings.search.keyword, pageSettings.search.field, current, 5);
                break;
            default:
                get = request('categories').get(pageSettings.status, current, 5)
                break;
        }
        render(get);
    }
    paginate.gotoPage(1);

    const modal = modalBox('#modal');
    const modalDel = modalBox('#modal-delete');
    const form = new Validate('.form-category');

    $('.btn-create').addEventListener('click', function (e) {
        resetForm();
        $('#modal header h2').innerText = 'Create Category';
        pageSettings.edit = false;
        form.onSubmit = function (data) {
            if (pageSettings.edit === false) {
                const res = query.create(data);
                if (typeof res == 'object') {
                    modal.close();
                    const get = query.get('all', 1, 5);
                    pageSettings.status = 'all';
                    paginate.gotoPage(get.pageCount);
                    paginate.pageNumber(get.pageCount);
                } else {
                    alert('create category failed ' + res)
                }
            }
        }
    })

    $('.table-data').onclick = function (e) {
        const btnDel = e.target.closest('.btn-delete');
        if (btnDel) {
            const category = query.get(btnDel.getAttribute('delete-id'));
            $('#modal-delete .message span').innerText = category.categoryName;
            modalDel.open();
            $('.btn-yes').onclick = function (e) {
                if (query.destroy(category.id) == 'success') {
                    const get = query.get('all', 1, 5)
                    if (pageSettings.current > get.pageCount) {
                        paginate.gotoPage(get.pageCount)
                        paginate.pageNumber(get.pageCount);
                    } else {
                        paginate.gotoPage();
                    }
                    modalDel.close();
                } else {
                    console.log('failed');
                }
            }
        }

        const btnEdit = e.target.closest('.btn-edit');
        if (btnEdit) {
            resetForm();
            const category = query.get(btnEdit.getAttribute('edit-id'));
            const id = document.createElement('input');
            id.value = category.id;
            id.name = 'id';
            id.type = 'text';
            id.hidden = true;
            $('#modal form').appendChild(id);
            $('#modal header h2').innerText = 'Edit Category';
            $('#modal input[name="categoryName"]').value = category.categoryName;
            modal.open();
            pageSettings.edit = true;
            form.onSubmit = function (data) {
                if (pageSettings.edit === true) {
                    const res = query.update(data.id, data);
                    if (typeof res == 'object') {
                        paginate.gotoPage();
                        modal.close();
                        pageSettings.edit === false;
                    } else {
                        alert(res)
                    }
                }
            }
        }
    }
    $('.btn-search').onclick = function (e) {
        pageSettings.status = 'search';
        pageSettings.search.keyword = $('.search').value;
        paginate.gotoPage(1);
        paginate.pageNumber(get.pageCount);
    }
    $('.search').oninput = function (e) {
        if ($('.search').value.trim() == '') {
            pageSettings.status = 'all'
            pageSettings.search.keyword = '';
            paginate.gotoPage(1);
            paginate.pageNumber(get.pageCount);
        }
    }
    $$('.table-header button').forEach(element => {
        element.onclick = function (e) {
            unActiveSort();
            this.classList.add('active')
            if (this.dataset.sort.includes('index')) {
                this.classList.remove('active')
                pageSettings.status = 'all';
                paginate.gotoPage(1);
                paginate.pageNumber(get.pageCount);
            } else {
                if (this.getAttribute('sort').includes('az')) {
                    this.setAttribute('sort', 'za');
                    this.innerHTML = '<i class="fa fa-arrow-up"></i>'

                } else {
                    this.innerHTML = '<i class="fa fa-arrow-down"></i>'
                    this.setAttribute('sort', 'az');
                }
                pageSettings.status = 'sort';
                pageSettings.sort.filter = this.getAttribute('sort');
                pageSettings.sort.field = this.dataset.sort;
                paginate.gotoPage(1);
                paginate.pageNumber(get.pageCount);
            }
        }
    });
}

function unActiveSort() {
    $$('.table-header button').forEach(element => element.classList.remove('active'))
}

function resetForm() {
    $$('form [name]:not(select)').forEach(element => {
        element.value = '';
        element.required = false;
    })
    $$('form .form-group').forEach(element => {
        element.classList.remove('invalid');
        element.querySelector('.form-message').innerHTML = '';
    })
}

function render(query) {
    $('.table-data').innerHTML = ''
    query?.res.forEach((element, index) => {
        const tableRow = document.createElement('li');
        tableRow.className = 'table-row';
        tableRow.innerHTML = `
                            <div class="col col-1" data-label="No.">
                                ${index + 1}
                            </div>
                            <div class="col col-1" data-label="ID">
                                ${element.id}
                            </div>
                            <div class="col col-4" data-label="Category Name">
                               ${element.categoryName}
                            </div>
                            <div class="col col-3" data-label="Update_at">
                                ${element.updated_at}
                            </div>
                            <div class="col col-3" data-label="">
                                <button edit-id="${element.id}" class="btn btn-edit button-2">
                                    Edit
                                </button>
                                <button delete-id="${element.id}" class="btn btn-delete button-2">
                                    Delete
                                </button>
                            </div>`;
        $('.table-data').appendChild(tableRow);
    });
}