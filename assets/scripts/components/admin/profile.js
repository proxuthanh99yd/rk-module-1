const profileHtml = `<div class="user">
            <div class="user-avatar-block">
                <div class="form-update-avatar">
                    <label for="avatar">
                        <img
                            src="./assets/images/avatar.jpg"
                            alt="avatar"
                            class="avatar-info"
                        />
                    </label>
                    <input type="file" name="avatar" id="avatar" hidden />
                    <input class="button-2" type="submit" onclick="alert('have not yet been updated')" value="Update" />
                </div>
            </div>
            <div class="user-info-block">
                <div class="card">
                    <div class="card-body">
                        <button class="edit button-2"><i class="fa fa-pen fa-xs"></i></button>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>ImDezCode</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>imdezcode@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>Bali, Indonesia</td>
                                </tr>
                                <tr>
                                    <td>Hobbies</td>
                                    <td>:</td>
                                    <td>Diving, Reading Book</td>
                                </tr>
                                <tr>
                                    <td>Job</td>
                                    <td>:</td>
                                    <td>Web Developer</td>
                                </tr>
                                <tr>
                                    <td>Skill</td>
                                    <td>:</td>
                                    <td>PHP, HTML, CSS, Java</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`
export default profileHtml;