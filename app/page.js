 "use client";
import {useMemo,useState} from "react";

const n=(v)=>Number(v)||0;
const pct=(v)=>`${(v*100).toFixed(2)}%`;
const money=(v)=>`${v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} EGP`;

export default function Home(){
 const [d,setD]=useState({spend:0,impressions:0,reach:0,clicks:0,lpv:0,leads:0,purchases:0,revenue:0,profit:0});
 const set=(k,v)=>setD(x=>({...x,[k]:v}));
 const m=useMemo(()=>{
   const spend=n(d.spend), imp=n(d.impressions), reach=n(d.reach), clicks=n(d.clicks), lpv=n(d.lpv), leads=n(d.leads), purchases=n(d.purchases), rev=n(d.revenue);
   const grossProfit=rev-spend;
   return {
    cpm:imp?spend/imp*1000:0, frequency:reach?imp/reach:0, ctr:imp?clicks/imp:0,
    cpc:clicks?spend/clicks:0, lpvRate:clicks?lpv/clicks:0, cpl:leads?spend/leads:0,
    leadRate:clicks?leads/clicks:0, cpa:purchases?spend/purchases:0,
    cvr:clicks?purchases/clicks:0, roas:spend?rev/spend:0, aov:purchases?rev/purchases:0,
    profit:grossProfit, margin:rev?grossProfit/rev:0, breakEvenCPA:purchases?rev/purchases:0
   };
 },[d]);
 const metric=(name,val,sub="")=><div className="card"><div className="label">{name}</div><div className="value">{val}</div>{sub&&<div className="sub">{sub}</div>}</div>;
 return <main>
  <header><div><div className="eyebrow">MEDIA BUYING TOOL</div><h1>Ad Metrics Calculator</h1><p>احسب أهم أرقام الإعلان والحملة في ثواني.</p></div><button className="reset" onClick={()=>setD({spend:1000,impressions:50000,reach:30000,clicks:1000,lpv:700,leads:100,purchases:20,revenue:3000})}>Reset</button></header>
  <section className="layout">
   <div className="panel"><h2>Input Data</h2><div className="grid">
    {[
     ["spend","Ad Spend"],["impressions","Impressions"],["reach","Reach"],["clicks","Clicks"],["lpv","Landing Page Views"],["leads","Leads"],["purchases","Purchases / Conversions"],["revenue","Revenue"]
    ].map(([k,l])=><label key={k}>{l}<input type="number" min="0" value={d[k]} onChange={e=>set(k,e.target.value)}/></label>)}
   </div></div>
   <div className="panel"><h2>Performance</h2><div className="metrics">
    {metric("CPM",money(m.cpm),"Cost per 1,000 impressions")}
    {metric("Frequency",m.frequency.toFixed(2),"Impressions ÷ Reach")}
    {metric("CTR",pct(m.ctr),"Clicks ÷ Impressions")}
    {metric("CPC",money(m.cpc),"Cost per click")}
    {metric("LPV Rate",pct(m.lpvRate),"LPV ÷ Clicks")}
    {metric("CPL",money(m.cpl),"Cost per lead")}
    {metric("Lead CVR",pct(m.leadRate),"Leads ÷ Clicks")}
    {metric("CPA / CAC",money(m.cpa),"Spend ÷ Purchases")}
    {metric("Purchase CVR",pct(m.cvr),"Purchases ÷ Clicks")}
    {metric("ROAS",m.roas.toFixed(2)+"x","Revenue ÷ Spend")}
    {metric("AOV",money(m.aov),"Revenue ÷ Purchases")}
    {metric("Profit",money(m.profit),"Revenue − Ad Spend")}
    {metric("Profit Margin",pct(m.margin),"Profit ÷ Revenue")}
    {metric("Break-even CPA",money(m.breakEvenCPA),"Max CPA before ad spend consumes revenue")}
   </div></div>
  </section>
  <section className="panel verdict" dir="rtl"><h2>التشخيص السريع</h2><div className="diagnosis">
   <div><b>CTR</b><span className={m.ctr>=.015?"good":"warn"}>{m.ctr>=.015?"ممتاز — الإعلان يجذب النقرات بشكل جيد":"يحتاج اختبار كريتيفات جديدة"}</span></div>
   <div><b>CPA</b><span className={m.cpa<=m.breakEvenCPA*.7?"good":m.cpa<=m.breakEvenCPA?"warn":"bad"}>{m.cpa<=m.breakEvenCPA*.7?"قوي — تكلفة الاكتساب جيدة":m.cpa<=m.breakEvenCPA?"راقبه — قريب من الحد الأقصى":"غير مربح — تكلفة الاكتساب مرتفعة"}</span></div>
   <div><b>ROAS</b><span className={m.roas>=3?"good":m.roas>=1?"warn":"bad"}>{m.roas>=3?"ممتاز — عائد قوي على الإنفاق الإعلاني":m.roas>=1?"يحتاج تحسين لزيادة العائد":"خسارة — الإيراد أقل من الإنفاق"}</span></div>
  </div></section>
  <footer><strong>MADE BY NEESH AGENCY</strong><br/><span>Built for media buyers • No data leaves your browser</span></footer>
 </main>
}