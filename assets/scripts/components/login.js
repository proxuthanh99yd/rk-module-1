const loginTemplate = `<div class="login-container">
                <div class="wrapper">
                    <div class="title-text">
                        <div class="title login">Login Form</div>
                        <div class="title signup">Signup Form</div>
                    </div>
                    <div class="form-container">
                        <div class="slide-controls">
                            <input
                                type="radio"
                                name="slide"
                                id="login"
                                checked
                            />
                            <input type="radio" name="slide" id="signup" />
                            <label for="login" class="slide login">Login</label>
                            <label for="signup" class="slide signup"
                                >Signup</label
                            >
                            <div class="slider-tab"></div>
                        </div>
                        <div class="form-inner">
                            <form action="#" id="login-form" class="login">
                                <pre></pre>
                                <div class="form-group">
                                    <input
                                        rule="required"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        autocomplete="on"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <input
                                        rule="required"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        autocomplete="on"
                                    />
                                    <span class="form-message"></span>
                                </div>

                                <div class="form-group btn">
                                    <div class="btn-layer"></div>
                                    <input type="submit" value="Login" />
                                </div>
                                <div class="signup-link">
                                    Create an account <a href="">Signup now</a>
                                </div>
                            </form>
                            <form action="#" id="signup-form" class="signup">
                                <div class="form-group">
                                    <input
                                     rule="required"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <input
                                     rule="required|email"
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <input
                                        rule="required"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <input
                                     rule="required"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        autocomplete="on"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group">
                                    <input
                                     rule="required|password"
                                        type="password"
                                        placeholder="Confirm password"
                                        name="c_password"
                                        autocomplete="on"
                                    />
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group btn">
                                    <div class="btn-layer"></div>
                                    <input type="submit" value="Signup" />
                                </div>
                                <div class="signup-link">
                                    Already have an account?
                                    <a href="">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`

export default loginTemplate;