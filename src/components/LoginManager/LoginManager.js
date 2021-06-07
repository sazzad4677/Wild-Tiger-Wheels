if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export const googleSignIn = (e) => {
    
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth()
            .signInWithPopup(provider)

            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                console.log(credential);
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                return user;
                // if (credential.)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log(`Email address ${this.state.email} already in use.`);
                        break;
                }


                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            });
    }


export default LoginManager;