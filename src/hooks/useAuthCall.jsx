import axios from "axios";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database"
import { useNavigate, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { auth } from "../auth/firebase";
import { fetchFail, fetchLoginSuccess, fetLogOutSuccess, fetchStart } from "../features/authSlice";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import { uid } from "uid"
import { t } from "i18next";
import { fetchLandingSuccess } from "../features/landingSlice";


const useAuthCall = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const computerLanguage = navigator.language.split('-')[0] // "en-US" gibi bir değeri "en" yapar



    function formatDate(dateStr) {
        const parts = dateStr.split(' ')[0].split('-')
        return `${parts[0]}-${parts[1]}-${parts[2]}`
    }


    const login = async (userdata) => {

        dispatch(fetchStart())

        const auth = getAuth()
        signInWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {

                const user = userCredential?.user;

                if (user) {
                    dispatch(fetchLoginSuccess(user))
                    navigate("/")
                    toastSuccessNotify("Login Success!");
                }
            })
            .catch((error) => {
                dispatch(fetchFail())
                toastErrorNotify(error.message);
            });

    }

    const logout = async () => {


        signOut(auth);
        dispatch(fetLogOutSuccess())
        navigate("/");
        toastSuccessNotify("LogOut Success!");
    }


    const postFireDB = (address, info) => {

        try {

            const uID = uid()
            const db = getDatabase()
            set(ref(db, `${address}/` + uID), info)
            toastSuccessNotify(t('text.success'))
            navigate("/thanks",{state:uID})

        }
        catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message);
        }
    }

    const getFireDB = (address,dateFrom,dateTo) => {

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                if (data == null || data == undefined) {
                    console.log("firebase data null geliyor:", data)
                    dispatch(fetchLandingSuccess({}))
                }
                else {

                    //db den gelen datayı array olarak çevir
                    const dizi = Object.keys(data).map(key => { return { id: key, ...data[key] } })
                    
                    if (dateFrom && dateTo) {

                        const result = dizi.filter((item) => {
                            return formatDate(item.datetime) >= dateFrom && formatDate(item.datetime) <= dateTo
                        })

                        dispatch(fetchLandingSuccess(result))
                    }
                    else {
                        dispatch(fetchLandingSuccess(dizi))
                    }

                }


            });

        }
        catch (error) {

        }
    }


    //! firebase data silme
    const removeFirebaseData = async (address, id) => {

        try {
            const db = getDatabase();
            remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted')
        } catch (error) {
            toastErrorNotify('No Delete Data')
        }
    }


    return {
        login,
        logout,
        postFireDB,
        getFireDB,
        removeFirebaseData
    }
}



export default useAuthCall