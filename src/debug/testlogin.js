
let username = window.location.search;
username = username.substring(1, username.length);

    axios_inst.get("/auth_debug/" + username)
    console.log(axios_inst.data)
.then(response => {
document.cookie = "auth_token=" + response.data.auth_token + ";path=/";
window.location.replace("/index.js");
})
