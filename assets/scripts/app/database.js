
function request(table) {
    if (!localStorage.getItem('shop')) {
        fakeData.getCategories()
        fakeData.getProducts()
        fakeData.getUsers();
        const shop = {
            categories: [],
            products: [],
            users: [],
        }
        localStorage.setItem('shop', JSON.stringify(shop));
    }
    const data = JSON.parse(localStorage.getItem('shop'));

    function maxId() {
        let max = -Infinity;
        for (let index = 0; index < data[table]?.length; index++) {
            if (data[table][index].id > max) {
                max = data[table][index].id
            }
        }
        return max;
    }
    function hasValue(field, value) {
        const has = data[table].find(element => element[field] === value);
        if (has) {
            return true
        }
        return false
    }

    function paginationPage(currentPage, paginationLimit, data) {
        const newData = [];
        data.forEach((element, index) => {
            if (index >= (currentPage - 1) * paginationLimit
                && index < (currentPage * paginationLimit)) {
                newData.push(element);
            }
        })
        return newData;
    }

    return {

        get(id = 'all', currentPage = '', paginationLimit = '', sort = '', field = '') {
            if (id === 'all') {
                if (currentPage == '' && paginationLimit == '') {
                    return data[table];
                } else {
                    const pageCount = Math.ceil(data[table].length / paginationLimit);
                    const newData = paginationPage(currentPage, paginationLimit, data[table])
                    let sortedList = {};
                    if (sort == 'az') {
                        if (field == 'id') {
                            sortedList = data[table].sort((a, b) => a[field] - b[field]);
                        } else {

                            sortedList = data[table].sort((a, b) => a[field].localeCompare(b[field]));
                        }
                        const pageCount = Math.ceil(sortedList.length / paginationLimit);
                        const newData = paginationPage(currentPage, paginationLimit, sortedList)
                        return {
                            res: newData,
                            pageCount: pageCount,
                        };
                    } else if (sort == 'za') {
                        if (field == 'id') {
                            sortedList = data[table].sort((a, b) => b[field] - a[field]);
                        } else {
                            sortedList = data[table].sort((a, b) => b[field].localeCompare(a[field]));
                        }
                        const pageCount = Math.ceil(sortedList.length / paginationLimit);
                        const newData = paginationPage(currentPage, paginationLimit, sortedList)
                        return {
                            res: newData,
                            pageCount: pageCount,
                        };
                    }
                    return {
                        res: newData,
                        pageCount: pageCount,
                    };
                }
            } else {
                const res = data[table].find(value => value.id == id);
                if (currentPage == '' && paginationLimit == '') {
                    return res;
                } else {
                    const pageCount = Math.ceil(res.length / paginationLimit);
                    const newData = paginationPage(currentPage, paginationLimit, res)
                    let sortedList = {};
                    if (sort == 'az') {
                        if (field == 'id') {
                            sortedList = res.sort((a, b) => a[field] - b[field]);
                        } else {

                            sortedList = res.sort((a, b) => a[field].localeCompare(b[field]));
                        }
                        const pageCount = Math.ceil(sortedList.length / paginationLimit);
                        const newData = paginationPage(currentPage, paginationLimit, sortedList)
                        return {
                            res: newData,
                            pageCount: pageCount,
                        };
                    } else if (sort == 'za') {
                        if (field == 'id') {
                            sortedList = res.sort((a, b) => b[field] - a[field]);
                        } else {
                            sortedList = res.sort((a, b) => b[field].localeCompare(a[field]));
                        }
                        const pageCount = Math.ceil(sortedList.length / paginationLimit);
                        const newData = paginationPage(currentPage, paginationLimit, sortedList)
                        return {
                            res: newData,
                            pageCount: pageCount,
                        };
                    }
                    return {
                        res: newData,
                        pageCount: pageCount,
                    };
                }
            }
        },
        create(body) {
            if (table == 'categories') {
                if (JSON.stringify(body) !== '{}' && body.categoryName !== '') {
                    if (hasValue('categoryName', body.categoryName)) {
                        return 'categoryName has in database'
                    }
                    if (maxId() == -Infinity) {
                        body['id'] = 1;
                    } else {
                        body['id'] = maxId() + 1;
                    }
                    body['created_at'] = dateTime();
                    body['updated_at'] = dateTime();
                    data[table].push(body);
                    localStorage.setItem('shop', JSON.stringify(data));
                    return body;
                } else {
                    return "failed"
                }
            }
            if (table == 'products') {
                if (JSON.stringify(body) !== '{}' && body.title !== '') {
                    if (hasValue('title', body.title)) {
                        return 'title has in database'
                    }
                    if (maxId() == -Infinity) {
                        body['id'] = 1;
                    } else {
                        body['id'] = maxId() + 1;
                    }
                    body['image'] = '';
                    body['create_by'] = JSON.parse(localStorage.getItem('user')).id;
                    body['created_at'] = dateTime();
                    body['updated_at'] = dateTime();
                    data[table].push(body);
                    localStorage.setItem('shop', JSON.stringify(data));
                    return body;
                } else {
                    return "failed"
                }
            }
            if (table == 'users') {

                if (JSON.stringify(body) !== '{}' && body) {

                    if (hasValue('username', body.username)) {
                        return 'username has in database'
                    }
                    if (hasValue('email', body.email)) {
                        return 'email has in database'
                    }
                    body['id'] = maxId() + 1;
                    body['age'] = '';
                    body['gender'] = '';
                    body['role'] = '1';
                    body['address'] = '';
                    if (body.status === 0) {
                        body['status'] = 0;
                    } else {
                        body['status'] = 1;
                    }
                    body['updated_at'] = dateTime();
                    body['created_at'] = dateTime();
                    data[table].push(body);
                    localStorage.setItem('shop', JSON.stringify(data));
                    return body;
                } else {
                    return "sign up failed"
                }
            }
        },
        update(id, body) {
            if (JSON.stringify(body) !== '{}' && body && id !== '') {
                const item = data[table].find(value => value.id == id);
                if (table == 'categories') {
                    // if (hasValue('categoryName', body.categoryName)) {
                    //     return 'categoryName has in database'
                    // }
                    item.categoryName = body.categoryName;
                    item.updated_at = dateTime();
                    localStorage.setItem('shop', JSON.stringify(data));
                    return item;
                }
                if (table == 'products') {
                    // if (hasValue('title', body.title)) {
                    //     return 'title has in database'
                    // }
                    item.title = body.title;
                    item.price = body.price;
                    item.description = body.description;
                    item.category = body.category;
                    item.updated_at = dateTime()
                    localStorage.setItem('shop', JSON.stringify(data));
                    return item;
                }
                if (table == 'users') {
                    // if (hasValue('username', body.username)) {
                    //     return 'username has in database'
                    // }
                    // if (hasValue('email', body.email)) {
                    //     return 'email has in database'
                    // }
                    console.log(body);
                    item.name = body.name;
                    item.password = body.password;
                    body.address ? item.address = body.address : '';
                    body.age ? item.age = body.age : '';
                    body.gender ? item.gender = body.gender : '';
                    if (body.username && body.email && body.status !== '') {
                        item.username = body.username;
                        item.email = body.email;
                        item.status = body.status;
                    }
                    item.updated_at = dateTime()
                    localStorage.setItem('shop', JSON.stringify(data));
                    return item;
                }
            } else {
                return "failed";
            }
        },
        destroy(id) {
            if (id) {
                data[table].forEach((element, index) => {
                    if (element.id == id) {
                        data[table].splice(index, 1);
                    }
                });
                localStorage.setItem('shop', JSON.stringify(data));
                return "success"
            } else {
                return "failed"
            }
        },
        search(keyword, field, currentPage, paginationLimit) {
            const items = []
            data[table].forEach((element) => {
                if (element[field].search(new RegExp(keyword.trim(), "i")) >= 0) {
                    items.push(element);
                }
            });
            const pageCount = Math.ceil(items.length / paginationLimit);
            const newData = paginationPage(currentPage, paginationLimit, items)
            return {
                res: newData,
                pageCount: pageCount,
            };
        },
        login(body) {
            if (JSON.stringify(body) !== '{}' && body) {
                for (const key in data[table]) {
                    if (Object.hasOwnProperty.call(data[table], key)) {
                        const element = data[table][key];
                        if (element.password === body.password
                            && element.username === body.username) {
                            if (element.status * 1.0 === 1) {
                                localStorage.setItem('user', JSON.stringify(element));
                                return 'success'

                            } else {
                                return 'Account has been locked'
                            }
                        }
                    }
                }
            }
            return "Incorrect account or password information";
        }
    }
};

function dateTime() {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const d = new Date();
    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());

    return `${weekday[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${h}:${m}`
}



const fakeData = {
    categoriesID: [],
    categories: [],
    products: [],
    users: [
        {
            id: 0,
            username: 'admin',
            password: '123456',
            email: 'admin@gmail.com',
            name: 'admin',
            age: 18,
            gender: 'male',
            address: 'thanh hoa',
            role: 0,
            status: 1,
            created_at: '',
            updated_at: '',
        }
    ],
    getCategories() {
        this.categories = [];
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => {
                this.categoriesID = json;
                for (let i = 0; i < json.length; i++) {
                    const categoryName = json[i];
                    this.categories.push({
                        id: i + 1,
                        create_by: 0,
                        categoryName: categoryName,
                        created_at: dateTime(),
                        updated_at: dateTime(),
                    })
                }
                this.res()
            })
        return this.categories;
    },

    getProducts() {
        this.products = []
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                for (let i = 0; i < json.length; i++) {
                    const element = json[i];
                    this.products.push({
                        id: element.id,
                        title: element.title,
                        price: element.price,
                        description: element.description,
                        category: this.categoriesID.indexOf(element.category) * 1.0 + 1,
                        image: element.image,
                        create_by: 0,
                        created_at: dateTime(),
                        updated_at: dateTime(),
                    })
                }
                this.res()
            })
        return this.products
    },
    getUsers() {
        fetch('https://fakestoreapi.com/users')
            .then(res => res.json())
            .then(json => {
                for (let i = 0; i < json.length; i++) {
                    const element = json[i];
                    this.users.push({
                        address: element.address.city,
                        id: element.id,
                        email: element.email,
                        username: element.username,
                        password: element.password,
                        name: `${element.name.firstname} ${element.name.lastname}`,
                        phone: element.phone,
                        age: '',
                        gender: '',
                        role: 1,
                        status: 1,
                        created_at: dateTime(),
                        updated_at: dateTime(),
                    })
                }
                this.res()
            })
        return this.users
    },
    res() {
        const shop = {
            categories: this.categories,
            products: this.products,
            users: this.users
        }
        localStorage.setItem('shop', JSON.stringify(shop));
    }
}
export default request