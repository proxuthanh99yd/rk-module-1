import request from "./database.js";
import usersHtml from "../components/admin/users.js";
import Validate from "./validator.js";
import Pagination from "./pagination.js";
import modalBox from "../components/modal.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const pageSettings = {
    current: 1,
    search: {
        keyword: '',
        field: 'username'
    },
    sort: {
        filter: '',
        field: ''
    },
    status: 'all'
}
export default function users() {

    if ($('.container')) {
        $('.container').innerHTML = usersHtml;
    }
    const query = request('users');
    let get = query.get(pageSettings.status, pageSettings.current, 5)
    render(get);
    const paginate = new Pagination(get.pageCount);
    paginate.action = function (current) {
        pageSettings.current = current;
        switch (pageSettings.status) {
            case 'sort':
                console.log('sort');
                get = query.get('all', current, 5, pageSettings.sort.filter, pageSettings.sort.field)

                break;
            case 'search':
                get = query.search(pageSettings.search.keyword, pageSettings.search.field, current, 5);
                break;
            default:
                get = request('users').get(pageSettings.status, current, 5)
                break;
        }
        render(get);

    }
    paginate.gotoPage(1);

    const modal = modalBox('#modal');
    const modalDel = modalBox('#modal-delete');
    const modalDetail = modalBox('#modal-detail')
    const form = new Validate('.form-users');

    $('.btn-create').addEventListener('click', function (e) {
        resetForm();
        $('#modal header h2').innerText = 'Create Users';
        pageSettings.edit = false;
        form.onSubmit = function (data) {
            if (pageSettings.edit === false) {
                if ($('.form-users input[type="checkbox"]').checked == true) {
                    data['status'] = 1
                } else {
                    data['status'] = 0
                }
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
            const user = query.get(btnDel.getAttribute('delete-id'));
            $('#modal-delete .message span').innerText = user.username;
            modalDel.open();
            $('.btn-yes').onclick = function (e) {
                if (query.destroy(user.id) == 'success') {
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
            const user = query.get(btnEdit.getAttribute('edit-id'));
            $('#modal header h2').innerText = 'Update Users';
            $('input[name="name"]').value = user.name;
            $('input[name="username"]').value = user.username;
            $('input[name="email"]').value = user.email;
            $('input[name="password"]').value = user.password;
            if (user.status == 1) {
                $('input[name="status"]').checked = true
            } else {
                $('input[name="status"]').checked = false
            }
            modal.open();
            pageSettings.edit = true;
            form.onSubmit = function (data) {
                if (pageSettings.edit === true) {
                    if ($('.form-users input[type="checkbox"]').checked == true) {
                        data['status'] = 1
                    } else {
                        data['status'] = 0
                    }
                    const res = query.update(btnEdit.getAttribute('edit-id'), data);
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
            const user = query.get(btnDetail.getAttribute('detail'))
            $('#modal-detail header h2').innerHTML = user.username;
            $('#modal-detail .content').innerHTML = `<ul class="detail">
                                                    <li><span>ID: </span> ${user.id}</li>
                                                    <li><span>Name : </span> ${user.name}</li>
                                                     <li><span>User Name: </span> ${user.username}</li>
                                                     <li><span>Email: </span> ${user.email}</li>
                                                     <li><span>Age: </span> ${user.age}</li>
                                                     <li><span>Gender: </span> ${user.gender}</li>
                                                     <li><span>Address: </span> ${user.address}</li>
                                                    <li><span>Role: </span> ${user.role == 1 ? 'Author' : 'Admin'}</li>
                                                      <li><span>Status: </span> ${user.status == 1 ? 'Active' : 'Block'}</li>
                                                     <li><span>Created at: </span> ${user.email}</li>
                                                     <li><span>Updated At: </span> ${user.updated_at}</li>
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
            if (this.dataset.sort == 'index') {
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
    $('input[name="name"]').value = '';
    $('input[name="username"]').value = '';
    $('input[name="email"]').value = '';
    $('input[name="password"]').value = '';
    $('input[name="status"]').checked = false
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
                            <div detail="${element.id}" class="col col-2 btn-detail detail" data-label="User Name">
                               ${element.username}
                            </div>
                            <div class="col col-4" data-label="Email">
                                ${element.email}
                            </div>
                            <div class="col col-1" data-label="Status">
                                ${element.status == 1 ? '<i style="color:green" class="fa-solid fa-circle"></i>' : '<i style="color:red" class="fa-solid fa-circle"></i>'}
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
