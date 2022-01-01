// login area
Login = () => {
    var Login = document.getElementById("_InputEmail1");
    var password = document.getElementById("_InputPassword1");
    var error = document.getElementById("error_show");
    var errorM = document.getElementById("error_main");
    if(Login.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Please Enter Email!!";
        Login.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 2000);
    } else if(password.value === ""){
        errorM.style.display = "block";
        error.setAttribute("class","error_show");
        error.innerHTML = "Please Enter Password!!"
        password.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 2000);
    } else{
        var Data1 = {
            Email : Login.value,
            pass1 : password.value,
        }
        firebase.auth().signInWithEmailAndPassword(Data1.Email, Data1.pass1)
        .then((Result) =>{
            errorM.style.display = "block";
            error.setAttribute("id","_success");
            error.innerHTML = "Login Successfull!!!"
            if(Result.user.emailVerified){
                setTimeout(()=>{
                    window.location.assign("./../DataBase/Home.html");
                },3000)
            } else{
                setTimeout(()=>{
                    window.location.assign("./EmailV.html");
                },3000)
                
            }
        }).catch((ErrorF)=>{
            errorM.style.display = "block";
            error.innerHTML = ErrorF.message;
            setTimeout(() => {
                errorM.style.display = "none";
        }, 3000);
        })
    }
}
// forgot password
forgot_password = () => {
    var forgotPass = document.getElementById("_forgot_email");
    var errorM2 = document.getElementById("_error_p");
    var errorP = document.getElementById("error_show1");
    if(forgotPass.value == ""){
        errorM2.style.display = "block";
        errorP.setAttribute("id","error_show");
        errorP.innerHTML = "Please enter valid email address"
        setTimeout(() => {
            errorM2.style.display = "none"
        }, 3000);
    } else{
    firebase.auth().sendPasswordResetEmail(forgotPass.value)
    .then(()=>{
        errorM2.style.display = "block";
        errorP.setAttribute("id","_success");
        errorP.innerHTML = "no thanks";
        setTimeout(() => {
            errorM2.style.display = "none"
        }, 3000);
    }).catch((error5)=>{
        errorM2.style.display = "block";
        errorP.setAttribute("id","error_show");
        errorP.innerHTML = error5.message;
        setTimeout(() => {
            errorM2.style.display = "none"
        }, 3000);
    })
    }

}