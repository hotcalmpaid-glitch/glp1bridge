import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`;

// ⬇️ UPDATE THIS CODE EVERY 15 DAYS
const ACCESS_CODE = "GLPBRIDGE";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --forest: #1C4A2E;
    --sage: #4A7C59;
    --mint: #A8C5A0;
    --cream: #F7F3EE;
    --warm: #EDE4D8;
    --coral: #C86B4F;
    --text: #1C2B1E;
    --muted: #6B7B6E;
  }

  .app-wrap { min-height: 100vh; background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--text); }

  /* ACCESS GATE */
  .gate-wrap {
    min-height: 100vh;
    background: var(--forest);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .gate-card {
    background: #fff;
    border-radius: 24px;
    padding: 48px 36px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }
  .gate-icon { font-size: 48px; margin-bottom: 16px; }
  .gate-card h1 { font-family: 'Fraunces', serif; font-size: 28px; color: var(--forest); margin-bottom: 8px; }
  .gate-card h1 em { font-style: italic; color: var(--sage); }
  .gate-card p { color: var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
  .gate-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E0D9D0;
    border-radius: 12px;
    font-size: 16px;
    font-family: 'DM Sans', sans-serif;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 12px;
    color: var(--text);
    background: var(--cream);
  }
  .gate-input:focus { border-color: var(--sage); background: #fff; }
  .gate-input.error { border-color: var(--coral); }
  .gate-error { color: var(--coral); font-size: 13px; margin-bottom: 12px; }
  .gate-note { font-size: 12px; color: var(--muted); margin-top: 16px; line-height: 1.5; }
  .gate-note a { color: var(--sage); }

  .hero {
    background: var(--forest);
    padding: 40px 24px 52px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before { content:''; position:absolute; top:-60px; left:-60px; width:280px; height:280px; border-radius:50%; background:rgba(168,197,160,0.1); }
  .hero::after { content:''; position:absolute; bottom:-70px; right:-40px; width:200px; height:200px; border-radius:50%; background:rgba(200,148,58,0.08); }
  .hero-badge { display:inline-block; background:rgba(168,197,160,0.2); color:var(--mint); border:1px solid rgba(168,197,160,0.3); border-radius:100px; padding:6px 18px; font-size:11px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:18px; }
  .hero h1 { font-family:'Fraunces',serif; font-size:clamp(24px,4vw,38px); color:#fff; line-height:1.2; margin-bottom:14px; position:relative; z-index:1; }
  .hero h1 em { color:var(--mint); font-style:italic; }
  .hero p { color:rgba(255,255,255,0.7); font-size:15px; max-width:480px; margin:0 auto; line-height:1.6; position:relative; z-index:1; }

  .steps-bar { background:#fff; border-bottom:1px solid #E8E2DA; padding:0 16px; display:flex; justify-content:center; overflow-x:auto; }
  .step-tab { padding:14px 14px; font-size:12px; font-weight:500; color:var(--muted); border-bottom:3px solid transparent; white-space:nowrap; display:flex; align-items:center; gap:6px; }
  .step-tab.active { color:var(--forest); border-bottom-color:var(--forest); }
  .step-tab.done { color:var(--sage); }
  .step-num { width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; background:#E8E2DA; color:var(--muted); flex-shrink:0; }
  .step-tab.active .step-num { background:var(--forest); color:#fff; }
  .step-tab.done .step-num { background:var(--sage); color:#fff; }

  .container { max-width:680px; margin:0 auto; padding:32px 16px 80px; }
  .card { background:#fff; border-radius:18px; padding:28px 24px; box-shadow:0 2px 20px rgba(28,74,46,0.06); margin-bottom:16px; }

  .section-title { font-family:'Fraunces',serif; font-size:24px; color:var(--forest); margin-bottom:6px; }
  .section-sub { color:var(--muted); font-size:14px; margin-bottom:24px; line-height:1.5; }

  .form-row { margin-bottom:18px; }
  .form-label { display:block; font-size:11px; font-weight:700; color:var(--forest); margin-bottom:7px; letter-spacing:0.5px; text-transform:uppercase; }
  .form-input { width:100%; padding:12px 14px; border:1.5px solid #DDD6CE; border-radius:10px; font-size:14px; font-family:'DM Sans',sans-serif; color:var(--text); background:var(--cream); outline:none; transition:border-color 0.2s; }
  .form-input:focus { border-color:var(--sage); background:#fff; }
  .form-row-two { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

  .tag-group { display:flex; flex-wrap:wrap; gap:8px; margin-top:4px; }
  .tag { padding:7px 14px; border-radius:100px; border:1.5px solid #DDD6CE; font-size:13px; cursor:pointer; transition:all 0.15s; background:var(--cream); color:var(--text); user-select:none; }
  .tag:hover { border-color:var(--sage); }
  .tag.selected { background:var(--forest); color:#fff; border-color:var(--forest); }

  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:13px 24px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .btn-primary { background:var(--forest); color:#fff; width:100%; margin-top:6px; }
  .btn-primary:hover { background:#163d24; }
  .btn-primary:disabled { opacity:0.55; cursor:not-allowed; }
  .btn-outline { background:transparent; border:1.5px solid var(--forest); color:var(--forest); }
  .btn-outline:hover { background:var(--forest); color:#fff; }
  .btn-sm { padding:9px 16px; font-size:13px; }

  .edu-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px; }
  .edu-card { background:var(--warm); border-radius:12px; padding:18px; }
  .edu-icon { font-size:24px; margin-bottom:8px; }
  .edu-card h4 { font-size:14px; font-weight:600; color:var(--forest); margin-bottom:5px; }
  .edu-card p { font-size:12px; color:var(--muted); line-height:1.5; }

  .info-box { background:linear-gradient(135deg,#EBF4EE,#F0F7F2); border:1px solid #C5DFCC; border-radius:12px; padding:18px 20px; margin-bottom:16px; }
  .info-box h4 { color:var(--forest); font-weight:600; margin-bottom:7px; font-size:14px; }
  .info-box p, .info-box li { font-size:13px; color:#3A5C42; line-height:1.6; }
  .info-box ul { padding-left:18px; margin-top:5px; }
  .info-box li { margin-bottom:3px; }

  .month-banner {
    background: var(--forest);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .month-banner-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
  .month-banner h4 { color: #fff; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .month-banner p { color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5; }

  .warn-box { background:#FFF8F0; border:1px solid #F0D5B0; border-radius:12px; padding:14px 18px; margin-bottom:16px; font-size:12px; color:#7A5228; line-height:1.5; display:flex; gap:10px; }

  .spinner { width:44px; height:44px; border:3px solid #E8E2DA; border-top-color:var(--forest); border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 16px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .loading-wrap { text-align:center; padding:50px 20px; }
  .loading-wrap h3 { font-family:'Fraunces',serif; font-size:20px; color:var(--forest); margin-bottom:6px; }
  .loading-wrap p { color:var(--muted); font-size:13px; }

  .meal-day { border:1.5px solid #E8E2DA; border-radius:14px; overflow:hidden; margin-bottom:14px; }
  .meal-day-header { background:var(--forest); color:#fff; padding:11px 18px; font-weight:600; font-size:13px; display:flex; justify-content:space-between; align-items:center; }
  .meal-day-header span { font-size:11px; opacity:0.7; }
  .meal-item { padding:12px 18px; border-bottom:1px solid #F0EBE4; display:grid; grid-template-columns:72px 1fr auto; gap:10px; align-items:start; }
  .meal-item:last-child { border-bottom:none; }
  .meal-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--coral); padding-top:2px; }
  .meal-name { font-size:13px; font-weight:600; color:var(--text); margin-bottom:2px; }
  .meal-desc { font-size:12px; color:var(--muted); line-height:1.4; }
  .meal-cal { font-size:11px; font-weight:600; color:var(--sage); white-space:nowrap; text-align:right; }

  .grocery-section { margin-bottom:20px; }
  .grocery-section h4 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--coral); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .grocery-section h4::after { content:''; flex:1; height:1px; background:#E8E2DA; }
  .grocery-grid { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
  .grocery-item { display:flex; align-items:center; gap:9px; padding:9px 12px; background:var(--cream); border-radius:8px; font-size:12px; cursor:pointer; transition:all 0.15s; }
  .grocery-item:hover { background:var(--warm); }
  .grocery-item.checked { opacity:0.45; text-decoration:line-through; }
  .grocery-check { width:16px; height:16px; border-radius:4px; border:1.5px solid #C0B8AF; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:10px; }
  .grocery-item.checked .grocery-check { background:var(--sage); border-color:var(--sage); color:#fff; }

  .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
  .stat-box { background:var(--warm); border-radius:12px; padding:16px; text-align:center; }
  .stat-num { font-family:'Fraunces',serif; font-size:26px; color:var(--forest); font-weight:700; }
  .stat-label { font-size:11px; color:var(--muted); margin-top:3px; text-transform:uppercase; letter-spacing:0.5px; }

  .log-form { display:flex; gap:10px; align-items:flex-end; margin-bottom:20px; flex-wrap:wrap; }
  .log-form .form-row { flex:1; min-width:120px; margin-bottom:0; }
  .log-entry { display:flex; justify-content:space-between; align-items:center; padding:11px 14px; background:var(--cream); border-radius:8px; margin-bottom:7px; font-size:13px; }
  .log-entry .date { color:var(--muted); font-size:11px; }
  .log-entry .weight { font-weight:700; color:var(--forest); }
  .change-down { color:var(--sage); font-size:11px; font-weight:600; }
  .change-up { color:var(--coral); font-size:11px; font-weight:600; }

  .progress-bar-wrap { background:#E8E2DA; border-radius:100px; height:10px; overflow:hidden; margin:14px 0 6px; }
  .progress-bar-fill { height:100%; background:linear-gradient(90deg,var(--sage),var(--forest)); border-radius:100px; transition:width 0.8s ease; }

  @media (max-width:560px) {
    .gate-card { padding: 36px 24px; }
    .edu-grid { grid-template-columns:1fr; }
    .form-row-two { grid-template-columns:1fr; }
    .grocery-grid { grid-template-columns:1fr; }
    .meal-item { grid-template-columns:60px 1fr; }
    .meal-cal { display:none; }
  }
`;

const STEPS = ["Profile","Learn","Meal Plan","Groceries","Track"];
const PROTEIN_OPTS = ["Chicken","Salmon","Ground Turkey","Ground Beef","Tuna","Shrimp","Steak","Eggs"];
const CARB_OPTS = ["Sweet Potato","Beans","Brown Rice","Oats","Fruits","Quinoa"];
const AVOID_OPTS = ["Soy/Soy Sauce","Dairy","Gluten","Nuts","Shellfish","Pork","Red Meat","None"];
const COOKING_OPTS = ["Baking","Sautéing","Grilling","One-pan meals","Quick (under 30 min)","Meal prep friendly"];

function Tag({ label, selected, onToggle }) {
  return <div className={`tag${selected?" selected":""}`} onClick={onToggle}>{label}</div>;
}

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="gate-wrap">
      <div className="gate-card">
        <div className="gate-icon">🌿</div>
        <h1>GLP-1 <em>Bridge</em><br/>Program</h1>
        <p>Enter your access code from your purchase confirmation email to get started.</p>
        <input
          className={`gate-input${error?" error":""}`}
          placeholder="Enter code"
          value={code}
          onChange={e=>{ setCode(e.target.value); setError(false); }}
          onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
          maxLength={20}
        />
        {error && <p className="gate-error">That code doesn't look right. Check your confirmation email and try again.</p>}
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!code.trim()}>
          Unlock My Plan →
        </button>
        <p className="gate-note">
          Don't have a code? <a href="YOUR_STAN_STORE_LINK_HERE" target="_blank" rel="noreferrer">Get access here for $17 →</a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ heightFt:"", heightIn:"", weight:"", goalWeight:"", activityLevel:"light", proteins:[], carbs:[], avoid:[], cooking:[], notes:"" });
  const [mealPlan, setMealPlan] = useState(null);
  const [groceryList, setGroceryList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState({});
  const [logs, setLogs] = useState([]);
  const [logWeight, setLogWeight] = useState("");
  const [logDate, setLogDate] = useState(new Date().toISOString().split("T")[0]);

  const toggleTag = (field, val) => setProfile(p => ({ ...p, [field]: p[field].includes(val) ? p[field].filter(x=>x!==val) : [...p[field],val] }));
  const canContinue = profile.weight && profile.heightFt && profile.proteins.length > 0;

  const startWeight = logs.length > 0 ? logs[0].weight : parseFloat(profile.weight)||0;
  const currentWeight = logs.length > 0 ? logs[logs.length-1].weight : startWeight;
  const totalLost = startWeight - currentWeight;
  const goal = parseFloat(profile.goalWeight)||(startWeight-20);
  const pct = startWeight > goal ? Math.min(100,(totalLost/(startWeight-goal))*100) : 0;

  const generatePlan = async () => {
    setLoading(true); setError("");
    try {
      const prompt = `You are a clinical nutritionist. Create a 7-day whole foods meal plan for a GLP-1 candidate.
Profile: ${profile.heightFt}ft ${profile.heightIn}in, ${profile.weight}lbs, goal: ${profile.goalWeight||"unspecified"}lbs, activity: ${profile.activityLevel}
Proteins: ${profile.proteins.join(", ")||"any"} | Carbs: ${profile.carbs.join(", ")||"any"} | Avoid: ${profile.avoid.join(", ")||"none"} | Style: ${profile.cooking.join(", ")||"any"}
Notes: ${profile.notes||"none"}

High protein (130-145g/day), moderate-low carb, whole foods only, exciting and varied meals. No soy sauce if soy is in avoid list. Make meals genuinely appetizing — think steak chimichurri, Greek bowls, salmon with herbs, burger bowls, not sad diet food.

Respond ONLY with valid JSON, no markdown:
{"weeklyCalories":1750,"weeklyProtein":138,"days":[{"day":"Monday","meals":{"breakfast":{"name":"...","description":"...","calories":300,"protein":28},"lunch":{"name":"...","description":"...","calories":420,"protein":38},"snack":{"name":"...","description":"...","calories":200,"protein":15},"dinner":{"name":"...","description":"...","calories":490,"protein":42}}}],"grocery":{"Proteins":["..."],"Produce":["..."],"Dairy & Eggs":["..."],"Pantry & Canned":["..."],"Spices & Condiments":["..."]}}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4000, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      const text = data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(text);
      setMealPlan(parsed);
      setGroceryList(parsed.grocery);
      setStep(2);
    } catch(e) {
      setError("Something went wrong generating your plan. Please try again.");
    }
    setLoading(false);
  };

  const addLog = () => {
    const w = parseFloat(logWeight);
    if (!w||!logDate) return;
    setLogs(prev => [...prev,{weight:w,date:logDate}].sort((a,b)=>a.date.localeCompare(b.date)));
    setLogWeight("");
  };

  if (!unlocked) return (
    <>
      <style>{FONTS}{css}</style>
      <AccessGate onUnlock={()=>setUnlocked(true)} />
    </>
  );

  return (
    <>
      <style>{FONTS}{css}</style>
      <div className="app-wrap">
        <div className="hero">
          <div className="hero-badge">🌿 GLP-1 Bridge Program</div>
          <h1>Lose Weight <em>Before</em><br/>Your Medication Arrives</h1>
          <p>A personalized whole foods plan built for people waiting on GLP-1 approval. Start now. Arrive stronger.</p>
        </div>

        <div className="steps-bar">
          {STEPS.map((s,i) => (
            <div key={i} className={`step-tab${step===i?" active":""}${step>i?" done":""}`}>
              <div className="step-num">{step>i?"✓":i+1}</div>{s}
            </div>
          ))}
        </div>

        <div className="container">

          {/* STEP 0 — PROFILE */}
          {step===0 && (
            <div>
              <div className="card">
                <p className="section-title">Your profile</p>
                <p className="section-sub">We use this to calculate your calorie targets and build around what you actually like to eat.</p>
                <div className="form-row-two">
                  <div className="form-row"><label className="form-label">Height (ft)</label><input className="form-input" type="number" placeholder="5" value={profile.heightFt} onChange={e=>setProfile(p=>({...p,heightFt:e.target.value}))} /></div>
                  <div className="form-row"><label className="form-label">Height (in)</label><input className="form-input" type="number" placeholder="6" value={profile.heightIn} onChange={e=>setProfile(p=>({...p,heightIn:e.target.value}))} /></div>
                </div>
                <div className="form-row-two">
                  <div className="form-row"><label className="form-label">Current weight (lbs)</label><input className="form-input" type="number" placeholder="276" value={profile.weight} onChange={e=>setProfile(p=>({...p,weight:e.target.value}))} /></div>
                  <div className="form-row"><label className="form-label">Goal weight (lbs)</label><input className="form-input" type="number" placeholder="230" value={profile.goalWeight} onChange={e=>setProfile(p=>({...p,goalWeight:e.target.value}))} /></div>
                </div>
                <div className="form-row">
                  <label className="form-label">Activity level</label>
                  <div className="tag-group">
                    {["Sedentary","Light","Moderate","Active"].map(l=><Tag key={l} label={l} selected={profile.activityLevel===l.toLowerCase()} onToggle={()=>setProfile(p=>({...p,activityLevel:l.toLowerCase()}))} />)}
                  </div>
                </div>
              </div>

              <div className="card">
                <p className="section-title">Food preferences</p>
                <p className="section-sub">Select everything that appeals to you. Your plan will be built around these.</p>
                <div className="form-row"><label className="form-label">Proteins you enjoy</label><div className="tag-group">{PROTEIN_OPTS.map(o=><Tag key={o} label={o} selected={profile.proteins.includes(o)} onToggle={()=>toggleTag("proteins",o)} />)}</div></div>
                <div className="form-row"><label className="form-label">Complex carbs</label><div className="tag-group">{CARB_OPTS.map(o=><Tag key={o} label={o} selected={profile.carbs.includes(o)} onToggle={()=>toggleTag("carbs",o)} />)}</div></div>
                <div className="form-row"><label className="form-label">Foods to avoid</label><div className="tag-group">{AVOID_OPTS.map(o=><Tag key={o} label={o} selected={profile.avoid.includes(o)} onToggle={()=>toggleTag("avoid",o)} />)}</div></div>
                <div className="form-row"><label className="form-label">Cooking style</label><div className="tag-group">{COOKING_OPTS.map(o=><Tag key={o} label={o} selected={profile.cooking.includes(o)} onToggle={()=>toggleTag("cooking",o)} />)}</div></div>
                <div className="form-row"><label className="form-label">Anything else we should know?</label><textarea className="form-input" rows={2} placeholder="e.g. high blood pressure, hate mushrooms, cooking for a family of 4..." style={{resize:"vertical"}} value={profile.notes} onChange={e=>setProfile(p=>({...p,notes:e.target.value}))} /></div>
              </div>

              {!canContinue && <p style={{textAlign:"center",color:"var(--muted)",fontSize:12,marginBottom:10}}>Enter your height, weight, and at least one protein preference to continue.</p>}
              <button className="btn btn-primary" disabled={!canContinue} onClick={()=>setStep(1)}>Continue →</button>
            </div>
          )}

          {/* STEP 1 — EDUCATION */}
          {step===1 && (
            <div>
              <div className="card">
                <p className="section-title">What you need to know</p>
                <p className="section-sub">You've been told you need GLP-1s. Here's why starting your diet right now is the smartest move you can make.</p>
                <div className="edu-grid">
                  {[
                    ["💉","What are GLP-1s?","Medications like Ozempic and Wegovy that mimic a gut hormone, slowing digestion and reducing appetite. They work best when paired with real diet habits."],
                    ["⏳","Why act now?","Insurance approval takes weeks or months. Every week without changing your diet is progress left on the table. Start now and arrive to your medication stronger."],
                    ["🍽️","What GLP-1s do","They dramatically reduce hunger. If you build your eating habits now, you'll work with the medication — not against it."],
                    ["💪","Protect your muscle","High protein intake is critical during fat loss. This plan is built around hitting your protein targets every single day so you lose fat, not muscle."]
                  ].map(([icon,title,desc])=>(
                    <div className="edu-card" key={title}><div className="edu-icon">{icon}</div><h4>{title}</h4><p>{desc}</p></div>
                  ))}
                </div>
                <div className="info-box">
                  <h4>📉 Your realistic 3-month outlook</h4>
                  <ul>
                    <li><strong>Week 1–2:</strong> 5–10 lbs (water weight from cutting processed carbs)</li>
                    <li><strong>Weeks 3–12:</strong> 1.5–2 lbs per week of true fat loss</li>
                    <li><strong>Month 1 total:</strong> 10–16 lbs with consistency</li>
                    <li><strong>3 months total:</strong> 18–28 lbs possible</li>
                  </ul>
                </div>
                <div className="info-box">
                  <h4>🥦 The rules that drive results</h4>
                  <ul>
                    <li><strong>Protein first</strong> at every meal — aim for 130g+ per day</li>
                    <li><strong>Whole foods only</strong> — if it has 15 ingredients, skip it</li>
                    <li><strong>Fiber is your hunger manager</strong> — beans, chia seeds, vegetables</li>
                    <li><strong>Walk 30 min daily</strong> — even slow walking doubles fat loss at this stage</li>
                    <li><strong>80–100oz of water</strong> — thirst masquerades as hunger constantly</li>
                  </ul>
                </div>
                <div className="warn-box"><span>⚠️</span><span>This is a wellness tool, not medical advice. Keep your GLP-1 approval process moving — diet and medication work together, not in competition.</span></div>
              </div>

              <button className="btn btn-primary" onClick={generatePlan} disabled={loading}>
                {loading ? "Building your plan..." : "✨ Generate My Personalized Meal Plan"}
              </button>
              {loading && <div className="loading-wrap"><div className="spinner"/><h3>Crafting your plan...</h3><p>Personalizing your 7-day rotation based on your preferences</p></div>}
              {error && <p style={{color:"var(--coral)",textAlign:"center",marginTop:12,fontSize:13}}>{error}</p>}
              <div style={{marginTop:12}}><button className="btn btn-outline btn-sm" onClick={()=>setStep(0)}>← Back</button></div>
            </div>
          )}

          {/* STEP 2 — MEAL PLAN */}
          {step===2 && mealPlan && (
            <div>
              <div className="card">
                <p className="section-title">Your 7-day meal plan</p>
                <p className="section-sub">Built around your preferences. This is your full 30-day program.</p>

                <div className="month-banner">
                  <div className="month-banner-icon">🔁</div>
                  <div>
                    <h4>This 7-day rotation is your full 30-day plan</h4>
                    <p>Repeat it 4 times over the next month. Consistency over variety is what actually moves the scale. The repetition removes decision fatigue — one of the biggest enemies of progress.</p>
                  </div>
                </div>

                <div className="stat-row">
                  <div className="stat-box"><div className="stat-num">~{mealPlan.weeklyCalories}</div><div className="stat-label">Cal / day</div></div>
                  <div className="stat-box"><div className="stat-num">{mealPlan.weeklyProtein}g</div><div className="stat-label">Protein / day</div></div>
                  <div className="stat-box"><div className="stat-num">30</div><div className="stat-label">Days of meals</div></div>
                </div>

                {mealPlan.days.map((day,di)=>(
                  <div className="meal-day" key={di}>
                    <div className="meal-day-header">
                      <span>{day.day}</span>
                      <span>{Object.values(day.meals).reduce((a,m)=>a+(m.calories||0),0)} cal · {Object.values(day.meals).reduce((a,m)=>a+(m.protein||0),0)}g protein</span>
                    </div>
                    {["breakfast","lunch","snack","dinner"].map(type=>day.meals[type]&&(
                      <div className="meal-item" key={type}>
                        <div className="meal-label">{type}</div>
                        <div><div className="meal-name">{day.meals[type].name}</div><div className="meal-desc">{day.meals[type].description}</div></div>
                        <div className="meal-cal">{day.meals[type].calories} cal<br/><span style={{color:"var(--sage)"}}>{day.meals[type].protein}g</span></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-outline btn-sm" onClick={()=>setStep(1)}>← Back</button>
                <button className="btn btn-primary" style={{flex:1,marginTop:0}} onClick={()=>setStep(3)}>View Grocery List →</button>
              </div>
            </div>
          )}

          {/* STEP 3 — GROCERY */}
          {step===3 && groceryList && (
            <div>
              <div className="card">
                <p className="section-title">Your grocery list</p>
                <p className="section-sub">Everything you need for the week. Tap items to check them off as you shop.</p>
                {Object.entries(groceryList).map(([cat,items])=>(
                  <div className="grocery-section" key={cat}>
                    <h4>{cat}</h4>
                    <div className="grocery-grid">
                      {items.map(item=>{
                        const key=`${cat}:${item}`;
                        return <div key={item} className={`grocery-item${checked[key]?" checked":""}`} onClick={()=>setChecked(p=>({...p,[key]:!p[key]}))}>
                          <div className="grocery-check">{checked[key]?"✓":""}</div>{item}
                        </div>;
                      })}
                    </div>
                  </div>
                ))}
                <div className="warn-box" style={{marginTop:16}}><span>💡</span><span>Check sodium on all packaged items — tzatziki, salsa, canned goods. Aim for under 150mg per serving, especially important for blood pressure management.</span></div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-outline btn-sm" onClick={()=>setStep(2)}>← Meal Plan</button>
                <button className="btn btn-primary" style={{flex:1,marginTop:0}} onClick={()=>{if(logs.length===0)setLogs([{weight:parseFloat(profile.weight),date:new Date().toISOString().split("T")[0]}]);setStep(4);}}>Start Tracking →</button>
              </div>
            </div>
          )}

          {/* STEP 4 — TRACKER */}
          {step===4 && (
            <div>
              <div className="card">
                <p className="section-title">Progress tracker</p>
                <p className="section-sub">Log your weight once a week — not daily. Daily fluctuations are noise. The weekly trend is the truth.</p>
                <div className="stat-row">
                  <div className="stat-box"><div className="stat-num" style={{color:"var(--coral)"}}>{startWeight||"—"}</div><div className="stat-label">Start</div></div>
                  <div className="stat-box"><div className="stat-num">{currentWeight||"—"}</div><div className="stat-label">Current</div></div>
                  <div className="stat-box"><div className="stat-num" style={{color:"var(--sage)"}}>{totalLost>0?`-${totalLost.toFixed(1)}`:"0"}</div><div className="stat-label">lbs lost</div></div>
                </div>
                {profile.goalWeight && <>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--muted)"}}><span>Progress to {profile.goalWeight} lbs</span><span>{pct.toFixed(0)}%</span></div>
                  <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width:`${pct}%`}}/></div>
                  <p style={{fontSize:11,color:"var(--muted)",marginBottom:18}}>{(currentWeight-parseFloat(profile.goalWeight)).toFixed(1)} lbs to go</p>
                </>}
                <div className="log-form">
                  <div className="form-row"><label className="form-label">Date</label><input type="date" className="form-input" value={logDate} onChange={e=>setLogDate(e.target.value)} /></div>
                  <div className="form-row"><label className="form-label">Weight (lbs)</label><input type="number" className="form-input" placeholder="271.5" value={logWeight} onChange={e=>setLogWeight(e.target.value)} /></div>
                  <button className="btn btn-primary btn-sm" style={{marginBottom:0,whiteSpace:"nowrap"}} onClick={addLog}>Log it</button>
                </div>
                <div>
                  {[...logs].reverse().map((log,i,arr)=>{
                    const prev=arr[i+1];
                    const change=prev?(log.weight-prev.weight).toFixed(1):null;
                    return <div className="log-entry" key={i}>
                      <span className="date">{new Date(log.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                      <span className="weight">{log.weight} lbs</span>
                      {change!==null?<span className={parseFloat(change)<0?"change-down":"change-up"}>{parseFloat(change)<0?"▼":"▲"} {Math.abs(change)} lbs</span>:<span style={{fontSize:11,color:"var(--muted)"}}>Starting weight</span>}
                    </div>;
                  })}
                  {logs.length===0&&<p style={{color:"var(--muted)",fontSize:13,textAlign:"center",padding:"16px 0"}}>No entries yet. Log your starting weight above.</p>}
                </div>
              </div>

              <div className="card">
                <p className="section-title" style={{fontSize:19}}>Daily habits that move the needle</p>
                {[
                  ["💧","Drink 80–100oz of water daily — reduces hunger significantly"],
                  ["🚶","Walk 30 minutes every day — even slow walking matters enormously at this stage"],
                  ["😴","Get 7–8 hours of sleep — sleep deprivation tanks fat-burning hormones"],
                  ["🍽️","Eat protein first at every meal — it blunts blood sugar spikes and keeps you full longer"],
                  ["📋","Keep your GLP-1 approval process moving — diet and medication are partners, not competition"],
                ].map(([icon,text])=>(
                  <div key={text} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:18}}>{icon}</span>
                    <span style={{fontSize:13,lineHeight:1.6}}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button className="btn btn-outline btn-sm" onClick={()=>setStep(3)}>← Grocery List</button>
                <button className="btn btn-outline btn-sm" onClick={()=>setStep(2)}>View Meal Plan</button>
                <button className="btn btn-outline btn-sm" onClick={()=>window.print()}>🖨️ Print</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
