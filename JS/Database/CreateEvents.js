//user check
var error = document.getElementById("error_show");
var errorM = document.getElementById("error_main");
//
var _eventname = document.getElementById("_eventname");
var _eventTime = document.getElementById("_eventTime");
var _eventDate = document.getElementById("_eventDate");
var _eventPrice = document.getElementById("_eventPrice");
var _eventImage = document.getElementById("_eventImage");
var _eventDes = document.getElementById("eventDes");
// to save data
var fullName;
var MobileNum;
var email;
var userId;
var userImg;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        userId = uid;
        if (!user.emailVerified) {
            errorM.style.display = "block"
            error.setAttribute("class", "error_show");
            error.innerHTML = "Verify Your Email!!!";
            setTimeout(() => {
                window.location.assign("./../Auth/EmailV.html");
            }, 3000)
        } else {
            var getFirestore = firebase.firestore().collection("UserData").doc(user.uid);
            getFirestore.get()
                .then((ResultGet) => {
                    var udata = ResultGet.data();
                    fullName = `${udata._fistname} ${udata._lastname}`;
                    MobileNum = udata._Mobile;
                    email = udata._Email;
                    userImg = udata._profile;
                })
                .catch((ErroGet) => {
                    errorM.style.display = "block"
                    error.setAttribute("class", "error_show");
                    error.innerHTML = ErroGet.message;
                    setTimeout(() => {}, 3000)
                })
        }
    } else {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Login First!!!";
        setTimeout(() => {
            window.location.assign("./../Auth/Login.html")
        }, 3000)
    }
});
//Upload Images
var imgpath;
let uploadImg = (e) => {
    var _upload = document.getElementById("_progress");
    var targetImg = e.target.files[0];
    var storageRef = firebase.storage().ref().child(`/eventImages/${targetImg.name}/`);
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
        (error) => {},
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                imgpath = downloadURL;
            });
        }
    );
}

// Create Event
let createEvents = () => {
    if (_eventname.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please enter event name";
        _eventname.focus();
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else if (_eventTime.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please select event time";
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else if (_eventDate.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please select event date";
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else if (_eventPrice.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please set event price";
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else if (_eventImage.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please select event image";
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else if (_eventDes.value === "") {
        errorM.style.display = "block"
        error.setAttribute("class", "error_show");
        error.innerHTML = "Please select event details";
        setTimeout(() => {
            errorM.style.display = "none"
        }, 3000)
    } else {
        var EventData = {
            _eventname: _eventname.value,
            _eventTime: _eventTime.value,
            _eventDate: _eventDate.value,
            _eventPrice: _eventPrice.value,
            _eventImage: imgpath,
            _eventDes: _eventDes.value,
            _fullname: fullName,
            _MobileNum: MobileNum,
            _email: email,
            _uid: userId,
            _profile: userImg
        }
        console.log(EventData)
        firebase.firestore().collection("EventData").add(EventData)
            .then((EventUp) => {
                errorM.style.display = " block"
                error.setAttribute("id", "_success");
                error.innerHTML = "Event Created";
                setTimeout(() => {
                    errorM.style.display = "none"
                }, 5000)
                location.reload();
            })
            .catch((Error5) => {
                errorM.style.display = " block";
                error.setAttribute("id", "error_show");
                error.innerHTML = Error5.message;
                setTimeout(() => {
                    errorM.style.display = "none";
                }, 3000)
            })
    }
}
var signout = () => {
    firebase.auth().signOut();
    window.location.assign("./../Auth/Login.html");
}