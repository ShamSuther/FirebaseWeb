signup = () => {
    let Fname = document.getElementById("fName");
    let Lname = document.getElementById("lName");
    let Mobile = document.getElementById("Mnumb");
    let Mail1 = document.getElementById("Email");
    let pass = document.getElementById("Password");
    let gender = document.getElementsByName("Gender");
    var error = document.getElementById("error_show");
    var errorM = document.getElementById("error_main");
    //gender
    for(let i = 0; i < gender.length; i++){
        if(gender[i].checked === false){
            errorM.style.display = "block"
            error.setAttribute("class","error_show");
            error.innerHTML = "Select Gender!!";
            setTimeout(() => {
                errorM.style.display = "none"
            }, 3000);
        } else if(gender[i].checked === true){
            var _checked = gender[i];
            break;
            
        }
    }
    if(Fname.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "First Name Required!!!";
        Fname.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000);
    } else if(Lname.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Last Name Required!!!";
        Lname.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000);
    } else if(Mobile.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Mobile Number Required!!!";
        Mobile.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000);
    } else if(Mail1.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Email Required!!!";
        Mail1.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000);
    } else if(pass.value === ""){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Password Required!!!";
        pass.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000);
    } else{
        var data = {
            _fistname : Fname.value,
            _lastname : Lname.value,
            _Mobile : Mobile.value,
            _Email : Mail1.value,
            _password : pass.value,
            _gender : _checked.id
        }
        console.log(data);
    }
}