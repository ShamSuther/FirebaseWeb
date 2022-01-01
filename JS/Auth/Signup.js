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
    let selectedGender = false;
    let selectedGenderValue;
    for(let i = 0; i < gender.length; i++){
        if(gender[i].checked){
            selectedGender = true;
            selectedGenderValue = gender[i].id;
        }
    }
    //other validations
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
    } else if(Mobile.value === "" || Mobile.value.length < 11){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Please enter 11 digits Mobile Number";
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
    } else if(!selectedGenderValue){
        errorM.style.display = "block"
        error.setAttribute("class","error_show");
        error.innerHTML = "Select Gender!!";
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
            _gender : selectedGenderValue
        }

        //sign up user
        firebase.auth().createUserWithEmailAndPassword(data._Email, data._password)
        .then((userMain) => {
            // Signed in 
            errorM.style.display = "block"
            error.setAttribute("id","_success");
            error.innerHTML = "Sign Up Successful";
            setTimeout(() => {
            errorM.style.display = "none"
            }, 3000);

            //data entry
            firebase.firestore().collection("UserData").doc(userMain.user.uid).set(data);
            if (userMain.user.emailVerified === false) {
                setTimeout(() => {
                    window.location.assign("./../Auth/EmailV.html");
                }, 3000)
            } else if(userMain.user.emailVerified){
                setTimeout(() => {
                    window.location.assign("./../DataBase/Home.html.html");
                }, 3000)
            }

        })
        .catch((error6) => {
            var errorMessage = error6.message;
            errorM.style.display = "block"
            error.setAttribute("id","error_show");
            error.innerHTML = errorMessage;
            setTimeout(() => {
                errorM.style.display = "none"
            }, 3000);
        }); 
    }
}