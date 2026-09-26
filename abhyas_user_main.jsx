import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import "./abhyas_user_styles.css";

const exams=[
 {id:"ssc-cgl",title:"SSC CGL Quantitative Aptitude",tag:"SSC CGL",count:5},
 {id:"ssc-gd",title:"SSC GD General Knowledge",tag:"SSC GD",count:5},
 {id:"railway",title:"Railway Group D General Science",tag:"Railway Group D",count:5}
];

function App(){
 const [started,setStarted]=useState(null);
 return <main className="page">
  <nav className="nav"><div className="brand">Abhyas</div><div className="navlinks"><span>Home</span><span>My Results</span><button className="profile">Profile</button></div></nav>
  <section className="hero"><div><p className="eyebrow">SMART EXAM PRACTICE</p><h1>Prepare smarter.<br/><span>Practice with Abhyas.</span></h1><p className="sub">Practice government-exam questions, track your results and build consistency every day.</p><button className="primary" onClick={()=>document.getElementById("exams").scrollIntoView({behavior:"smooth"})}>Explore Exams →</button></div><div className="heroCard"><div className="circle">A</div><b>Daily Practice</b><small>Keep your preparation moving.</small></div></section>
  <section id="exams" className="section"><div className="sectionHead"><div><p className="eyebrow">AVAILABLE NOW</p><h2>Choose an exam</h2></div><span className="count">{exams.length} demo exams</span></div>
  <div className="grid">{exams.map(e=><article className="card" key={e.id}><span className="tag">{e.tag}</span><h3>{e.title}</h3><p>{e.count} demo questions · Practice mode</p><button className="secondary" onClick={()=>setStarted(e)}>Start Practice</button></article>)}</div></section>
  {started&&<div className="modal"><div className="modalbox"><button className="close" onClick={()=>setStarted(null)}>×</button><p className="eyebrow">PRACTICE</p><h2>{started.title}</h2><p>This starter build is ready for the question runner. Connect the question API/data source to load the full exam.</p><button className="primary" onClick={()=>setStarted(null)}>Got it</button></div></div>}
  <footer>© 2026 Abhyas · Practice • Progress • Prepare</footer>
 </main>
}
createRoot(document.getElementById("root")).render(<App/>);
