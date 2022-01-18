var error = document.getElementById("error_show");
var errorM = document.getElementById("error_main");
let Fname = document.getElementById("_fnameshow");
let Lname = document.getElementById("_lname_show");
let Mobile = document.getElementById("_Mnumb_show");
let Mail1 = document.getElementById("_email_show");
let gender = document.getElementsByName("_gender2");
let dis = document.getElementById("eventDes");
let IDMale = document.getElementById("Male");
let IDFemale = document.getElementById("Female");
let imgpreview = document.getElementById("imagePreview");
// id female
let selectedGenderValue;
var uid;
//user check

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (!user.emailVerified) {
            errorM.style.display = "block"
            error.setAttribute("class", "error_show");
            error.innerHTML = "Verify Your Email!!!";
            setTimeout(() => {
                errorM.style.display = "none"
                window.location.assign("./../Auth/EmailV.html");
            }, 3000)
        } else {
            //getting data
            uid = user.uid;
            var getFirestore = firebase.firestore().collection("UserData").doc(uid);
            getFirestore.get()
                .then((ResultGet) => {
                    var mydata = ResultGet.data();
                    Fname.setAttribute("value", mydata._fistname);
                    Lname.setAttribute("value", mydata._lastname);
                    Mobile.setAttribute("value", mydata._Mobile);
                    Mail1.setAttribute("value", mydata._Email);
                    imgpreview.setAttribute("style", `background-image: url(${mydata._profile})`)
                    if (mydata._gender === "Male") {
                        selectedGenderValue = "Male";
                        IDMale.setAttribute("checked", "checked");
                    } else if (mydata._gender === "Female") {
                        selectedGenderValue = "Female";
                        IDFemale.setAttribute("checked", "checked");
                    }
                    if (mydata._discription === "") {
                        dis.innerHTML = "";
                    } else {
                        dis.innerHTML = mydata._discription;
                    }
                })
                .catch((ErroGet) => {
                    errorM.style.display = "block"
                    error.setAttribute("id", "error_show");
                    error.innerHTML = ErroGet.message;
                    setTimeout(() => {
                    }, 3000)
                })
        }
    } else {
        errorM.style.display = "block"
        error.setAttribute("id", "error_show");
        error.innerHTML = "Login First!!!";
        setTimeout(() => {
            errorM.style.display = "none"
            window.location.assign("./../Auth/Login.html")
        }, 3000)
    }
});

var imgpath;
let profileImg = (e) => {
    var _upload = document.getElementById("_progress");
    var targetImg = e.target.files[0];
    var storageRef = firebase.storage().ref().child(`/profileImages/${uid}/`);
    var uploadTask = storageRef.put(targetImg);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            _upload.style.display = "block";
            _upload.style.color = "#238420";
            _upload.style.fontWeight = "600";
            _upload.innerHTML = 'Upload is ' + progress + '% done';
            setTimeout(() => {
                _upload.style.display = "none";
            }, 10000)
        },
        (error) => {
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                imgpath = downloadURL;
                firebase.firestore().collection("UserData")
                    .doc(uid)
                    .update({
                        _profile: imgpath
                    })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            });
        }
    );
}

//   update data
let updateProfile = () => {
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            selectedGenderValue = gender[i].id;
        }
    }
    let UpdateSet = {
        _fistname: Fname.value,
        _lastname: Lname.value,
        _Mobile: Mobile.value,
        _gender: selectedGenderValue,
        _discription: dis.value,
    }
    firebase.firestore().collection("UserData").doc(uid).update(UpdateSet)
        .then((ResultUp) => {
            errorM.style.display = "block"
            error.setAttribute("id", "_success");
            error.innerHTML = "Update Complete!!!";
            setTimeout(() => {
                errorM.style.display = "none"
            }, 3000)
            location.reload();
        })
        .catch((Error2) => {
            errorM.style.display = "block";
            error.setAttribute("id", "error_show");
            error.innerHTML = Error2.message;
            setTimeout(() => {
                errorM.style.display = "none";
            }, 3000)
        })
}

var signout = () => {
    firebase.auth().signOut();
    window.location.assign("./../Auth/Login.html");
}