const categoriesHtml = `<div id="categories" class="header">
                        <h2 class="heading">Categories</h2>
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
                                Create new category +
                            </button>
                        </div>
                    </div>
                    <ul class="responsive-table">
                        <li class="table-header">
                            <div class="col col-1">No.<button data-sort="index"><i class="fa-solid fa-rotate-left"></i></button></div>
                            <div class="col col-1">Id <button data-sort="id" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div class="col col-4">Category Name <button data-sort="categoryName" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div class="col col-3">Updated_at</div>
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
                            <form action="#" class="form-category">
                                <div class="form-group">
                                    <label for="categoryName" class="form-label">Category name</label>
                                    <input
                                        rule="required"
                                        type="text"
                                        name="categoryName"
                                        id="categoryName"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
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
                    `;

export default categoriesHtml;
