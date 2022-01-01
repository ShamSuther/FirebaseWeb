setTimeout(()=>{
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            if(user.emailVerified){
                window.location.assign("././Pages/DataBase/Home.html")
            } else{
                window.location.assign("./Pages/Auth/EmailV.html")
                }
        } else if(!user){
            window.location.assign("./Pages/Auth/Login.html")
        }
      });
},3000);
