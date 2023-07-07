const layoutHtml = `<div class="layout">
                <nav class="nav-vertical">
                    <div class="nav-header">
                        <div class="logo">Administrator</div>
                        <div class="nav-close">
                            <i class="fa-solid fa-angles-left"></i>
                        </div>
                    </div>
                    <div class="nav-body">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="#!" id="categories" class="nav-link"
                                    ><i class="fas fa-th"></i> Categories</a
                                >
                            </li>
                            <li class="nav-item">
                                <a href="#!" id="products" class="nav-link"
                                    ><i class="fa-brands fa-product-hunt"></i>
                                    Products</a
                                >
                            </li>
                            <li class="nav-item">
                                <a href="#!" id="users" class="nav-link"
                                    ><i class="fa-solid fa-user"></i> Users</a
                                >
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="nav-horizontal">
                    <div class="user-profile">
                        <div class="user-name">
                            <p class="">Lê Tâm</p>
                        </div>
                        <button class="user-avatar button-2">
                            <img
                                src="./assets/images/avatar.jpg"
                                alt="avatar"
                                class="avatar"
                            />
                        </button>
                        <div class="user-info">
                            <a href="#!" class="profile">Profile</a>
                            <a href="#!">...</a>
                            <a class="log-out" href="#!">LogOut</a>
                        </div>
                    </div>
                </div>
                <div class="container">
                    
                </div>
            </div>

            `;

export default layoutHtml;