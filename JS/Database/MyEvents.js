//user check
var error = document.getElementById("error_show");
var errorM = document.getElementById("error_main");
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(!user.emailVerified){
            window.location.assign("././Pages/DataBase/Home.html");
            errorM.style.display = "block"
            error.setAttribute("class","error_show");
            error.innerHTML = "Verify Your Email!!!";
            setTimeout(()=>{
                window.location.assign("./../Auth/EmailV.html");
            }, 3000)
        } else{
            // database
            }
    } else{
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Login First!!!";
        setTimeout(()=>{
            window.location.assign("./../Auth/Login.html")
        }, 3000)
    }
  });