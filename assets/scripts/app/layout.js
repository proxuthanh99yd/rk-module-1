
import layoutHtml from "../components/layout.js";
import products from "./products.js";
import users from "./users.js";
import categories from "./categories.js";
import profile from "./profile.js";
export default function layout() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    $('.app').innerHTML = layoutHtml;

    $('.user-avatar').onclick = function (e) {
        $('.user-info').classList.toggle('show');
    }
    if ($('.user-name p')) {
        $('.user-name p').innerHTML = JSON.parse(localStorage.getItem('user'))?.username
    }
    if (JSON.parse(localStorage.getItem('user')).role == 1) {
        $('#users').parentElement.remove();
    }
    $$('.nav-vertical .nav-item').forEach(element => {
        element.querySelector('a').onclick = function (e) {
            e.preventDefault();
            if (this.id == 'categories') {
                categories();
                removeActive()
                this.parentElement.classList.add('active')
                localStorage.setItem('page', 'categories')

            }
            if (this.id == 'products') {
                products();
                removeActive();
                this.parentElement.classList.add('active')
                localStorage.setItem('page', 'products')
            }
            if (this.id == 'users') {
                users();
                removeActive();
                this.parentElement.classList.add('active')
                localStorage.setItem('page', 'users')
            }
        }
    });
    $('.profile').onclick = function (e) {
        e.preventDefault()
        profile();
    }
}

function removeActive() {
    document.querySelectorAll('.nav-vertical .nav-item').forEach(element => {
        element.classList.remove('active')
    })
}