import request from "./database.js";
import loginTemplate from "../components/login.js";
import middleware from "./auth.js";
import Validate from "./validator.js";


export default function login() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    $('.app').innerHTML = loginTemplate;

    if ($('#login-form')) {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");

        signupBtn.onclick = (() => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        });
        loginBtn.onclick = (() => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        });
        signupLink.onclick = (() => {
            signupBtn.click();
            return false;
        });
        const formLogin = new Validate('#login-form');
        formLogin.onSubmit = function (data) {
            const res = request('users').login(data);
            console.log(res);
            if (res === 'success') {
                localStorage.setItem('page', 'categories')
                middleware()
            } else {
                alert(res)
            }
        }
        const formSignup = new Validate('#signup-form');
        formSignup.onSubmit = function (data) {
            const res = request('users').create(data);
            if (typeof res === 'object') {
                request('users').login(res)
                localStorage.setItem('page', 'categories')
                middleware()
            } else {
                alert(res)
            }
        }
    }


}