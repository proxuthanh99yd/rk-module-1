const productsHtml = `<div id="categories" class="header">
                        <h2 class="heading">Products</h2>
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
                                Create new Product +
                            </button>
                        </div>
                    </div>
                    <ul class="responsive-table">
                        <li class="table-header">
                            <div class="col col-1">No.<button data-sort="index"><i class="fa-solid fa-rotate-left"></i></button></div>
                            <div class="col col-1">Id <button data-sort="id" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div  class="col col-4">Title <button data-sort="title" sort="za"><i class="fa fa-arrow-up"></i></button></div>
                            <div class="col col-1">Price </div>
                            <div class="col col-2">Image</div>
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
                            <form action="#" class="form-product">
                                <div class="form-group">
                                    <label for="title" class="form-label">Title</label>
                                    <input
                                        rule="required"
                                        type="text"
                                        name="title"
                                        id="title"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Price</label>
                                    <input
                                        step="any"
                                        rule="required"
                                        type="number"
                                        name="price"
                                        id="price"
                                        class="form-control"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="description" class="form-label"
                                        >Description</label
                                    >
                                    <textarea
                                        rule="required"
                                        name="description"
                                        id="description"
                                        cols="30"
                                        rows="10"
                                    ></textarea>
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <label for="category" class="form-label"
                                        >Category</label
                                    >
                                    <select
                                        rule="required"
                                        class="form-control"
                                        name="category"
                                        id="category"
                                    >
                                        <option value="null">---Select Category---</option>
                                    </select>
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

export default productsHtml;
