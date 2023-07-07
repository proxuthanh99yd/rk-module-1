import request from "./database.js";
import productsHtml from "../components/admin/products.js";
import Validate from "./validator.js"
import modalBox from "../components/modal.js";
import Pagination from "./pagination.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const pageSettings = {
    current: 1,
    search: {
        keyword: '',
        field: 'title'
    },
    sort: {
        filter: '',
        field: ''
    },
    status: 'all',
    edit: false,
}
export default function products() {

    if ($('.container')) {
        $('.container').innerHTML = productsHtml;
    }
    const query = request('products');
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
                get = request('products').get(pageSettings.status, current, 5)
                break;
        }
        render(get);

    }
    paginate.gotoPage(1);

    const modal = modalBox('#modal');
    const modalDel = modalBox('#modal-delete');
    const modalDetail = modalBox('#modal-detail')
    const form = new Validate('.form-product');

    $('.btn-create').addEventListener('click', function (e) {
        resetForm();
        $('#modal header h2').innerText = 'Create Product';
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
                    alert('create product failed ' + res)
                }
            }
        }
    })

    $('.table-data').onclick = function (e) {
        const btnDel = e.target.closest('.btn-delete');
        if (btnDel) {
            const product = query.get(btnDel.getAttribute('delete-id'));
            $('#modal-delete .message span').innerText = product.title;
            modalDel.open();
            $('.btn-yes').onclick = function (e) {
                if (query.destroy(product.id) == 'success') {
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
            const product = query.get(btnEdit.getAttribute('edit-id'));
            const id = document.createElement('input');
            id.value = product.id;
            id.name = 'id';
            id.type = 'text';
            id.hidden = true;
            $('#modal form').appendChild(id);
            $('#modal header h2').innerText = 'Edit Product';
            $('#modal input[name="title"]').value = product.title;
            $('#modal input[name="price"]').value = product.price;
            $('#modal textarea[name="description"]').value = product.description;
            $$('#modal select[name="category"] option').forEach(option => {
                if (option.value * 1.0 === product.category * 1.0) {
                    option.selected = true;
                }
            })
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
        const btnDetail = e.target.closest('.btn-detail');
        if (btnDetail) {
            const product = query.get(btnDetail.getAttribute('detail'))
            const queryCategories = request('categories').get();
            const queryUser = request('users').get();
            $('#modal-detail header h2').innerHTML = product.title;
            $('#modal-detail .content').innerHTML = `<ul class="product-detail">
                                                    <li><span>ID: </span> ${product.id}</li>
                                                    <li><span>Title: </span> ${product.title}</li>
                                                    <li><span>Price: </span> ${product.price}$</li>
                                                    <li><span>Description: </span> ${product.description}</li>
                                                    <li><span>Category: </span>
                                                    ${queryCategories.map((params) => {
                if (params.id == product.category) {
                    return params.categoryName
                }

            }).join('')}
                                                        </li>
                                                    <li><span>Image: </span> <img src="${product.image}" alt="img"/></li>
                                                    <li><span>Created By: </span> ${queryUser.map((params) => {
                if (params.id == product.create_by) {
                    return params.name
                }

            }).join('')}</li>
                                                    <li><span>Updated At: </span> ${product.updated_at}</li>
                                                </ul>`

            modalDetail.open();
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
    $('form select').innerHTML = ''
    const optionDefault = document.createElement('option');
    optionDefault.innerText = '---Select Category---';
    optionDefault.value = null;
    $('form select').appendChild(optionDefault);
    const queryCategories = request('categories').get();
    for (const category of queryCategories) {
        const optionEl = document.createElement('option');
        optionEl.value = category.id;
        optionEl.innerText = category.categoryName;
        $('form select').appendChild(optionEl);
    }
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
                            <div detail="${element.id}" class="col col-4 btn-detail detail" data-label="Title">
                               ${element.title}
                            </div>
                            <div class="col col-1" data-label="price">
                                ${element.price}$
                            </div>
                            <div class="col col-2" data-label="Image">
                                <img src="${element.image}" alt="img" /> 
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