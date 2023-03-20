function auth(){
    let mail = document.getElementById("exampleInputEmail1");
    let password = document.getElementById("exampleInputPassword1");
    if(mail.value === "test@test.com" && password.value === "test"){
        window.location.assign("../pages/blog.html");
    }
    mail.value = '';
    password.value = '';
}