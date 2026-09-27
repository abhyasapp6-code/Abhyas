import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/*
  1) Replace the firebaseConfig values with your Firebase Web App config.
  2) Create EmailJS service/template and put the three identifiers in the UI.
  3) Your EmailJS template should use:
       {{to_email}}, {{to_name}}, {{subject}}, {{message}}, {{from_name}}
*/

const firebaseConfig = {
  apiKey: "PASTE_FIREBASE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const $ = id => document.getElementById(id);
let contacts = [];

$("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, $("email").value.trim(), $("password").value);
    $("authMsg").textContent = "";
  } catch(e) {
    $("authMsg").textContent = e.message;
    $("authMsg").className = "msg error";
  }
};

$("signupBtn").onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, $("email").value.trim(), $("password").value);
    $("authMsg").textContent = "Account created.";
    $("authMsg").className = "msg success";
  } catch(e) {
    $("authMsg").textContent = e.message;
    $("authMsg").className = "msg error";
  }
};

$("logoutBtn").onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  $("loginCard").classList.toggle("hidden", !!user);
  $("dashboard").classList.toggle("hidden", !user);
  $("logoutBtn").classList.toggle("hidden", !user);
});

$("csvFile").onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;
  $("contactsText").value = await file.text();
};

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(x => x.trim());
  if (!lines.length) return [];
  const rows = lines.map(parseCSVLine);
  const headers = rows.shift().map(x => x.trim().toLowerCase());
  return rows.map(row => {
    const obj = {};
    headers.forEach((h,i) => obj[h] = (row[i] ?? "").trim());
    return obj;
  }).filter(x => x.email);
}

function parseCSVLine(line) {
  const out=[]; let cur="", quoted=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c === '"' && line[i+1] === '"'){cur+='"';i++;continue}
    if(c === '"'){quoted=!quoted;continue}
    if(c === ',' && !quoted){out.push(cur);cur="";continue}
    cur+=c;
  }
  out.push(cur);
  return out;
}

function replaceVars(template, person) {
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_,key) => {
    const k = key.toLowerCase().trim();
    return person[k] ?? "";
  });
}

function refreshPreview() {
  const select = $("previewSelect");
  select.innerHTML = "";
  contacts.forEach((c,i)=>{
    const o=document.createElement("option");
    o.value=i; o.textContent=`${c.name || "Unnamed"} — ${c.email}`;
    select.appendChild(o);
  });
  showPreview();
}

function showPreview() {
  if(!contacts.length){$("preview").textContent="Load contacts to preview an email.";return}
  const p=contacts[Number($("previewSelect").value)||0];
  $("preview").textContent =
    `To: ${p.email}\nSubject: ${replaceVars($("subject").value,p)}\n\n${replaceVars($("body").value,p)}`;
}
$("previewSelect").onchange=showPreview;
$("subject").oninput=showPreview;
$("body").oninput=showPreview;

$("parseBtn").onclick = () => {
  contacts=parseCSV($("contactsText").value);
  $("contactCount").textContent=`${contacts.length} contacts`;
  refreshPreview();
};

$("sendBtn").onclick = async () => {
  if(!auth.currentUser){alert("Please login.");return}
  if(!contacts.length){alert("Load contacts first.");return}
  const service=$("serviceId").value.trim();
  const template=$("templateId").value.trim();
  const publicKey=$("publicKey").value.trim();
  if(!service || !template || !publicKey){alert("Enter EmailJS Service ID, Template ID and Public Key.");return}

  emailjs.init({publicKey});
  $("sendBtn").disabled=true;
  $("results").innerHTML="";
  let sent=0, failed=0;

  for(let i=0;i<contacts.length;i++){
    const p=contacts[i];
    $("progress").textContent=`Sending ${i+1}/${contacts.length}`;
    try{
      await emailjs.send(service, template, {
        to_email:p.email,
        to_name:p.name || "",
        subject:replaceVars($("subject").value,p),
        message:replaceVars($("body").value,p),
        from_name:$("fromName").value.trim() || "Bulk Mail Sender"
      });
      sent++;
      addResult(p.email,"Sent","success");
      await addDoc(collection(db,"users",auth.currentUser.uid,"emailLogs"),{
        email:p.email,status:"sent",createdAt:serverTimestamp()
      });
    }catch(e){
      failed++;
      addResult(p.email,`Failed: ${e.text || e.message || "Unknown error"}`,"error");
    }
  }

  $("progress").textContent=`Done — ${sent} sent, ${failed} failed`;
  $("sendBtn").disabled=false;
};

function addResult(email,status,cls){
  const div=document.createElement("div");
  div.className=`result ${cls}`;
  div.textContent=`${email} — ${status}`;
  $("results").appendChild(div);
}
