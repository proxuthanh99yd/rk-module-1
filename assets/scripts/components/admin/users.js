const usersHtml = `<div id="categories" class="header">
                        <h2 class="heading">Users</h2>
                        <div class="form-search">
                            <label for="search"
                                ><i class="fa fa-search"></i
                            ></label>
                            <input
                                type="search"
                                name="search"
                                id="search"
                                class="search"
                            />
                            <input
                                type="button"
                                name="btn-search"
                                id="btn-search"
                                class="btn-search button-2"
                                value="search"
                            />
                        </div>
                        <div class="create-block">
                            <button open="#modal" class="dialog__trigger btn-create button-2">
                                Create new users +
                            </button>
                        </div>
                    </div>
                    <ul class="responsive-table">
                        <li class="table-header">
                            <div class="col col-1">No.<button data-sort="index"><i class="fa-solid fa-rotate-left"></i></button></div>
                            <div class="col col-1">Id <button data-sort="id" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div  class="col col-2">User Name <button data-sort="username" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div class="col col-4">Email </div>
                            <div class="col col-1">Status</div>
                            <div class="col col-3"></div>                      
                        </li>
                        <div class="table-data">
                            
                        </div>
                    </ul>
                    
                    <nav class="pagination-container"></nav>
                    <div id="modal" class="modal-content">
                        <label for="modal" class="close" close="#modal">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </label>
                        <header>
                            <h2>So This is a Modal 2</h2>
                        </header>
                        <article class="content">
                            <form action="#" class="form-users">
                                <div class="form-group">
                                    <label for="name" class="form-label">Name</label>
                                    <input
                                        rule="required"
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="username" class="form-label">User Name</label>
                                    <input
                                    rule="required"
                                        type="text"
                                        name="username"
                                        id="username"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="form-label">Email</label>
                                    <input
                                    rule="required|email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                    rule="required"
                                        type="password"
                                        name="password"
                                        id="password"
                                        class="form-control"
                                        autocomplete="true"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="status" class="form-label">Active</label>
                                    <input
                                        type="checkbox"
                                        name="status"
                                        id="status"
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-btn">
                                    <input
                                        type="submit"
                                        class="dialog__action submit"
                                        value="submit"
                                    />
                                </div>
                            </form>
                        </article>
                        <footer></footer>
                    </div>
                    
                     <div id="modal-delete" class="modal-content sm">
                        <p class="message">Delete <span></span>?</p>
                        <div class="options">
                            <button class="btn btn-yes">Yes</button>
                            <button close="#modal-delete" class="btn btn-no">No</button>
                        </div>
                    </div>
                   <div id="modal-detail" class="modal-content">
                        <label for="modal" class="close" close="#modal-detail">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </label>
                        <header>
                            <h2>So This is a Modal 2</h2>
                        </header>
                        <article class="content">
                            
                        </article>
                        <footer></footer>
                    </div>`;

export default usersHtml;
