var errorshow = document.getElementById("error_show");
var errormain = document.getElementById("error_main");
//check email verification
firebase.auth().onAuthStateChanged((userCheck) => {
    if(userCheck){
    var email_show = document.getElementById("_Email2");
    var CurrentUser = userCheck.email;
    email_show.innerHTML = CurrentUser;    //send verification
    firebase.auth().currentUser.sendEmailVerification();
    if (CurrentUser) {
        if (userCheck.emailVerified === true) {
            errormain.style.display = "block";
            errorshow.innerHTML = "Your email has been verified";
            errorshow.style.display = "block";
            errorshow.setAttribute("id", "_success");
            setTimeout(() => {
                errormain.style.display = "none";
                window.location.href = "./../DataBase/home.html"
            }, 3000)
        }
    } else {
        errormain.style.display = "block";
        errorshow.innerHTML = "please login first";
        errorshow.setAttribute("id", "error_show");
        setTimeout(() => {
            errorshow.style.display = "none";
            window.location.href = "./../pages/login.html"
        }, 3000)
    }
    } else{
        errorshow.innerHTML = "Login First";
        errormain.style.display = "block";
        errorshow.setAttribute("id", "error_show");
        setTimeout(()=>{
            window.location.assign("./login.html")
        },5000)
    }
})
function reSendEmail() {
    var activeUser = firebase.auth().currentUser;
    activeUser.sendEmailVerification();
    errorshow.innerHTML = "Email Resent!";
    errormain.style.display = "block";
    errorshow.setAttribute("id", "_success");
    setTimeout(() => {
        errormain.style.display = "none";
    }, 3000)
}
//goTohome
function goToHome() {
    location.reload();
}