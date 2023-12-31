import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../componets/Firebase/firebase.init';
import axios from 'axios';
export const AuthContext= createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const googleProvider= new GoogleAuthProvider();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const logIn=(email,password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const profileUpdate=(name,photo)=>{
       return updateProfile(auth.currentUser,{displayName:name,photoURL:photo});
    }


    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            if(currentUser){
                axios.post(`https://school-hunt.vercel.app/jwt`, {email : currentUser.email})
                .then(res=>{
                    // console.log(res.data.token)
                    localStorage.setItem('access-token', res.data.token)
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            setUser(currentUser);
            setLoading(false);
         
        });

        return()=>{
            return unSubscribe();
        } 
            
    },[]);

    const authInfo={
        user,
        loading,
        auth,
        createUser,
        logIn,
        logOut,
        googleSignIn,
        profileUpdate
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;