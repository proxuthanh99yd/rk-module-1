import profileHtml from "../components/admin/profile.js";
import request from "./database.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export default function profile() {
    if ($('.container')) {
        $('.container').innerHTML = profileHtml;
    }

    const queryUser = request('users').get(JSON.parse(localStorage.getItem('user')).id);
    render(queryUser)
    if ($('.card-body')) {
        $('.edit').onclick = function (e) {
            if (e.target.closest('.edit')) {
                let editBtn = e.target;
                if (e.target.closest('.fa')) {
                    editBtn = e.target.parentElement;

                }
                editBtn.innerHTML = '<i class="fa fa-solid fa-floppy-disk"></i>'
                editBtn.className = 'save button-2';
                if ($$('tbody tr')) {
                    $$('tbody tr td:last-child').forEach(element => {
                        if (element.dataset.value || element.dataset.value == "") {
                            if (element.getAttribute('name')) {
                                if (element.getAttribute('name') == 'password') {
                                    element.innerHTML = ''
                                }
                                element.contentEditable = true;
                                element.classList.add('action');

                            } else {
                                if (element.dataset.value == 'male') {
                                    element.innerHTML = `<label for="male">Male : </label>
                                                    <input value="male" type="radio" name="gender" id="male" checked />
                                                    <label for="female">Female : </label>
                                                    <input value="female" type="radio" name="gender" id="female" />`
                                } else {
                                    element.innerHTML = `<label for="male">Male : </label>
                                                    <input value="male" type="radio" name="gender" id="male" />
                                                    <label for="female">Female : </label>
                                                    <input value="female" type="radio" name="gender" id="female" checked />`
                                }

                            }
                        }
                    });
                }
                $$('tbody tr td:last-child').forEach(element => {
                    element.oninput = function (e) {
                        if (element.getAttribute('name')) {
                            this.dataset.value = this.innerText;
                        } else {
                            this.dataset.value = element.querySelector('input:checked').value
                        }
                    }
                })
            }
            if (e.target.closest('.save')) {
                let saveBtn = e.target;
                if (e.target.closest('.fa')) {
                    saveBtn = e.target.parentElement;

                }
                saveBtn.innerHTML = '<i class="fa fa-pen fa-xs"></i>'
                saveBtn.className = 'edit button-2';
                $$('tbody tr td:last-child').forEach(element => {
                    if (element.dataset.value) {
                        if (element.getAttribute('name')) {
                            if (element.getAttribute('name') == 'password') {
                                element.innerHTML = '******'
                            }
                            element.contentEditable = false;
                            element.classList.remove('action');

                        } else {
                            element.innerHTML = element.querySelector('input:checked').value

                        }
                    }
                });
                const body = {}
                $$('tbody tr td:last-child').forEach(element => {
                    if (element.dataset.value) {
                        if (element.getAttribute('name')) {
                            body[element.getAttribute('name')] = element.dataset.value;
                        } else {
                            body['gender'] = element.dataset.value
                        }
                    }
                })
                const queryUpdate = request('users').update(queryUser.id, body);

                if (queryUpdate == 'failed') {
                    alert('failed')
                }
            }
        }

    }
}
function render(queryUser) {
    $('tbody').innerHTML = `<tr>
                                    <td>User Name</td>
                                    <td>:</td>
                                    <td>${queryUser.username}</td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>:</td>
                                    <td name="password" data-value="${queryUser.password}">******</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td name="name" data-value="${queryUser.name}">${queryUser.name}</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>:</td>
                                    <td name="age" data-value="${queryUser.age}">${queryUser.age}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td >${queryUser.email}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td name="address" data-value="${queryUser.address}">${queryUser.address}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>:</td>
                                    <td data-value="${queryUser.gender}">${queryUser.gender}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>:</td>
                                    <td>${queryUser.role == 0 ? 'admin' : 'normal user'}</td>
                                </tr>
                                `;
}