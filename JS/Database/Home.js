//user check
var error = document.getElementById("error_show");
var errorM = document.getElementById("error_main");
var eventShow = [];
firebase.auth().onAuthStateChanged(async(user) => {
    if (user) {
        if (!user.emailVerified) {
            errorM.style.display = "block"
            error.setAttribute("class", "error_show");
            error.innerHTML = "Verify Your Email!!!";
            setTimeout(() => {
                window.location.assign("./../Auth/EmailV.html");
            }, 3000)
        } else {
            firebase.firestore().collection("UserData").doc(user.uid).get()
                .then((getdata) => {
                    var dataM = getdata.data()
                    userProfile = dataM._profile;
                })
            await firebase.firestore().collection("EventData")
                .get().then((Rdata) => {
                    Rdata.forEach((forEvent) => {
                        var Allevents = forEvent.data();
                        if (user.uid != Allevents._uid) {
                            eventShow.push(Allevents);
                        }
                    });
                })
                // data show
            var _noevents = document.getElementById("_noevents");

            if (eventShow.length === 0) {
                _noevents.style.display = "block";
                _noevents.innerHTML = "No events created";
            } else {
                //map
                eventShow.map((valueI, indexI) => {
                    var dom = document.getElementById("_cardmain");

                    var card = document.createElement("div");
                    card.setAttribute("class", "card col-12 col-lg-6");
                    dom.appendChild(card);
                    // avatar preview start

                    var avatar = document.createElement("div");
                    avatar.setAttribute("class", "avatar-upload")
                    card.appendChild(avatar);

                    var avPreview = document.createElement("div");
                    avPreview.setAttribute("class", "avatar-preview");
                    avatar.appendChild(avPreview);

                    var Pimage = document.createElement("img");
                    avPreview.appendChild(Pimage)
                    Pimage.setAttribute("src", `${valueI._profile}`);

                    var userdata = document.createElement("div");
                    userdata.setAttribute("class", "userdata");
                    avatar.appendChild(userdata);

                    var div1 = document.createElement("div");
                    userdata.appendChild(div1);

                    var label1 = document.createElement("label");
                    label1.setAttribute("class", "_RobotoRegular");
                    div1.appendChild(label1);
                    var txt1 = document.createTextNode(valueI._fullname);
                    label1.appendChild(txt1);

                    var div2 = document.createElement("div");
                    userdata.appendChild(div2);

                    var label2 = document.createElement("label");
                    label2.setAttribute("class", "_RobotoRegular");

                    var event1 = document.createElement("div");
                    event1.setAttribute("class", "eventdata")
                    card.appendChild(event1);

                    var h1 = document.createElement("h1");
                    event1.appendChild(h1);
                    h1.setAttribute("class", "_eventdetails _RobotoBold");
                    var txt2 = document.createTextNode(valueI._eventname);
                    h1.appendChild(txt2);

                    var div3 = document.createElement("div");
                    div3.setAttribute("class", "_event");
                    event1.appendChild(div3);

                    var div4 = document.createElement("div");
                    div3.appendChild(div4);

                    var imgC = document.createElement("img");
                    imgC.setAttribute("src", "./../../Images/calendar(1).png");
                    div4.appendChild(imgC);

                    var label3 = document.createElement("label");
                    div4.appendChild(label3);
                    label3.setAttribute("class", "_username _RobotoBold");
                    var txt3 = document.createTextNode(valueI._eventDate);
                    label3.appendChild(txt3);

                    var div5 = document.createElement("div");
                    div3.appendChild(div5);

                    var imgT = document.createElement("img");
                    imgT.setAttribute("src", "./../../Images/clock.png");
                    div5.appendChild(imgT);

                    var label4 = document.createElement("label");
                    div5.appendChild(label4);
                    label4.setAttribute("class", "_username _RobotoBold");
                    var txt4 = document.createTextNode(valueI._eventTime);
                    label4.appendChild(txt4);

                    var div6 = document.createElement("div");
                    div3.appendChild(div6);

                    var imgp = document.createElement("img");
                    div6.appendChild(imgp);
                    imgp.setAttribute("src", "./../../Images/price-tag.png");

                    var label5 = document.createElement("label");
                    div6.appendChild(label5);
                    label5.setAttribute("class", "_username _RobotoBold");
                    var txt5 = document.createTextNode(valueI._eventPrice + "PKR");
                    label5.appendChild(txt5);

                    var eventImage = document.createElement("img");
                    event1.appendChild(eventImage);
                    eventImage.setAttribute("class", "_eventimage img-fluid");
                    eventImage.setAttribute("src", `${valueI._eventImage}`)

                    var eventD = document.createElement("p");
                    event1.appendChild(eventD);
                    eventD.setAttribute("class", "_eventdetails _RobotoRegular");
                    var eventDtxt = document.createTextNode(valueI._eventDes.slice(0, 100));
                    eventD.appendChild(eventDtxt);
                    if (eventDtxt.length > 80) {
                        var popup = document.getElementById("_popup");
                        var _readmore = document.createElement("a");
                        _readmore.setAttribute("class", "_popbtn _RobotoBold");
                        _readmore.setAttribute("data-target", "#exampleModalLong");
                        _readmore.setAttribute("data-toggle", "modal");
                        var _readTxt = document.createTextNode(" " + "Read More");
                        _readmore.appendChild(_readTxt);
                        eventD.appendChild(_readmore);
                        _readmore.addEventListener("click", addDes);
                        function addDes(){
                            popup.innerHTML = `${valueI._eventDes}`
                        }
                    }
                })
            }
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

var signout = () => {
    firebase.auth().signOut();
    window.location.assign("./../Auth/Login.html");
}