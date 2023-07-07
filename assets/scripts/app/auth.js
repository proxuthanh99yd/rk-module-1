
import categories from "./categories.js";
import layout from "./layout.js";
import login from "./login.js";
import products from "./products.js";
import users from "./users.js";

function middleware() {
    if (localStorage.getItem('user')) {
        layout();
        document.querySelectorAll('.nav-vertical .nav-item').forEach(element => {
            element.classList.remove('active')
        })

        document.querySelectorAll('.nav-vertical .nav-item a').forEach(element => {
            if (element.id == localStorage.getItem('page')) {
                element.parentElement.classList.add('active')
            }
        })

        switch (localStorage.getItem('page')) {
            case 'products':
                products()
                break;
            case 'users':
                users()
                break;
            default:
                categories()
                break;
        }
        if (document.querySelector('.log-out')) {
            document.querySelector('.log-out').onclick = function (e) {
                e.preventDefault();
                localStorage.removeItem('user');
                login();
            }
        }
    } else {
        login()
    }

}
export default middleware;