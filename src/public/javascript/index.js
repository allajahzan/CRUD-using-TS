var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// add user
function addUser(event) {
    return __awaiter(this, void 0, void 0, function () {
        var form, formData, resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    form = document.getElementById('user-add-form');
                    formData = new FormData(form);
                    formData.append('name', form[0].value);
                    formData.append('email', form[1].value);
                    formData.append('phoneNo', form[2].value);
                    formData.append('image', form[3].files[0]);
                    return [4 /*yield*/, fetch('users', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    if (resp.ok) {
                        // alert(data.msg)
                        setTimeout(function () {
                            $('#staticBackdrop').modal('hide');
                            window.location.reload();
                        }, 200);
                    }
                    else {
                        alert(data.msg);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// edit user
function editUserBtn(userId, uname, uemail, uphoneNo) {
    localStorage.setItem('userId', userId);
    var name = document.getElementById('uname-edit-admin');
    name.value = uname;
    var email = document.getElementById('uemail-edit-admin');
    email.value = uemail;
    var phoneNo = document.getElementById('uphoneNo-edit-admin');
    phoneNo.value = uphoneNo;
}
function editUser(event) {
    return __awaiter(this, void 0, void 0, function () {
        var form, formData, userId, resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    form = document.getElementById('user-edit-Form');
                    formData = new FormData(form);
                    userId = localStorage.getItem('userId');
                    if (userId) {
                        formData.append('userId', userId);
                    }
                    else {
                        alert("no user id in local storage");
                        return [2 /*return*/];
                    }
                    formData.append('name', form[0].value);
                    formData.append('email', form[1].value);
                    formData.append('phoneNo', form[2].value);
                    formData.append('image', form[3].files[0]);
                    return [4 /*yield*/, fetch('users', {
                            method: 'PATCH',
                            body: formData
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    if (resp.ok) {
                        // alert(data.msg)
                        setTimeout(function () {
                            $('#editUserData').modal('hide');
                            window.location.reload();
                        }, 200);
                    }
                    else {
                        alert(data.msg);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// delete user
function deleteUserBtn(userId, name) {
    localStorage.setItem('userId', userId);
    var text = document.getElementById('delete-user-name');
    if (text) {
        text.innerHTML = "".concat(name);
    }
}
function deleteUser(event) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    userId = localStorage.getItem('userId');
                    return [4 /*yield*/, fetch("users?userId=".concat(userId), {
                            method: 'DELETE'
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    if (resp.ok) {
                        // alert(data.msg)
                        setTimeout(function () {
                            $('#deleteUserData').modal('hide');
                            window.location.reload();
                        }, 200);
                    }
                    else {
                        alert(data.msg);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// clear edit form
function clearUserEditFormByadmin() {
    localStorage.clear();
    var form = document.getElementById('user-edit-Form');
    form.reset();
}
// clear add form
function clearAddUserForm() {
    localStorage.clear();
    var form = document.getElementById('user-add-form');
    form.reset();
}
// close delte modal
function closeDeleteModal() {
    localStorage.clear();
    var text = document.getElementById('delete-user-name');
    if (text) {
        text.innerHTML = '';
    }
}
// showsnack bar
// function showSnackBar(text: string) {
//     let div = document.getElementById("snackbar");
//     let textP = document.getElementById('snackbar_msg')
//     if (div) {
//         div.className = 'show'
//         setTimeout(function () {
//             if (div && textP) {
//                 div.className = div.className.replace("show", "");
//                 textP.innerHTML = text
//             }
//         }, 3000);
//     }
// }
// showSnackBar('kjhjhb')
