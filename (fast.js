import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async user=>{
  if(!user){
    localStorage.removeItem("userData");
    window.location.href="login.html";
    return;
  }

  const userRef = doc(db,"users", user.uid);
  const snap = await getDoc(userRef);

  if(snap.exists()){
    localStorage.setItem("userData", JSON.stringify(snap.data()));
    console.log("Fast Mode: بيانات المستخدم محفوظة");
  }
});