const instance = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

class User {
    static GetUsers(callback) {
        instance.get('users')
            .then(res => {
                callback(null, res.data);    
            })
            .catch(err => {
                callback(err);
            });
    }

    static GetUser(id, callback) {
        instance.get(`user/${id}`)
            .then(res => {
                callback(null, res.data);
            })
            .catch(err => {
                callback(err);
            });
    }

    static DeleteUser(id, callback) {
        instance.delete(`user/${id}`)
            .then(res => {
                callback(null, res.data);
            })
            .catch(err => {
                callback(err);
            });
    }

    static CreateUser(user, callback) {
        instance.post('user', user)
            .then(res => {
                callback(null, res.data);
            })
            .catch(err => {
                callback(err);
            });
    }

    static EditUser(user, callback) {
        instance.put('user', user)
            .then(res => {
                callback(null, res.data);
            })
            .catch(err => {
                callback(err);
            });
    }
}

function GetRow(element, num){
    let number = num || ++$("table tbody tr").length;
    return `<tr data-rowid='${element._id}'>
                <th scope="row">${number}</th>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td><a href="#" class='editLink' data-id='${element._id}'>Изменить</a> | <a href="#" class='removeLink' data-id='${element._id}'>Удалить</a></td>
            </tr>`;
}

function GetRowUpdate(element){
    let num = $("tr[data-rowid='" + element._id + "'] th[scope='row'").text();
    return GetRow(element, num);
}

function Reset() {
    let form = $('#userForm')[0];
    form.reset();
    $(form.id).val(0);
}

$(() => {
    Reset();

    User.GetUsers((err, users) => {
        if(err){
            Message.danger(err.response.data);
            console.log(err);
        } else {
            for(let user of users){
                let row = GetRow(user);
                $("table tbody").append(row);
            }
        }
    });

    $("#btnReset").click(function(e){
        e.preventDefault();
        Reset();
    });

    $("body").on("click", ".editLink", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        User.GetUser(id, (err, user) => {
            if(err){
                Message.danger(err.response.data);
                console.log(err);
            } else {
                let form = $('#userForm')[0];
                $(form.id).val(user._id);
                $(form.age).val(user.age);
                $(form.name).val(user.name);
            }
        });
    });

    $("#btnSave").click(function(e){
        e.preventDefault();
        let form = $('#userForm')[0];
        if(Number($(form.id).val()) == 0){
            User.CreateUser({
                age: $(form.age).val(),
                name: $(form.name).val(),
            }, (err, user) => {
                if(err){
                    Message.danger(err.response.data);
                    console.log(err);
                } else {
                    $("table tbody").append(GetRow(user));
                }
            });
        } else {
            User.EditUser({
                id: $(form.id).val(),
                age: $(form.age).val(),
                name: $(form.name).val(),
            }, (err, user) => {
                if(err){
                    Message.danger(err.response.data);
                    console.log(err);
                } else {
                    Reset();
                    $("tr[data-rowid='" + user._id + "']").replaceWith(GetRowUpdate(user));
                }
            });
        }
    });

    $("body").on("click", ".removeLink", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        User.DeleteUser(id, (err, user) => {
            if(err){
                Message.danger(err.response.data);
                console.log(err);
            } else {
                $("tr[data-rowid='" + user._id + "']").remove();
            }
        });
    });
});