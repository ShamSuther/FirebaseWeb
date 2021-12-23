setTimeout(()=>{
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            console.log("true");
            if(user.emailVerified){
                window.location.assign("././Pages/DataBase/Home.html")
            } else{
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        // Email verification sent!
                        // ...
                    });
                }
                window.location.assign("././Pages/DataBase/EmailV.html")
        } else {
            console.log("false");
            window.location.assign("././Pages/Auth/Login.html")
        }
      });
},3000);
