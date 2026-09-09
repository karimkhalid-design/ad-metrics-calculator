"use client";
import {useMemo,useState} from "react";

const n=v=>Number(v)||0;
const money=v=>`${v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} EGP`;

export default function ForecastPage(){
 const [plan,setPlan]=useState({budget:0,cpa:0,aov:0,days:0});
 const setP=(k,v)=>setPlan(x=>({...x,[k]:v}));
 const forecast=useMemo(()=>{
   const budget=n(plan.budget), cpa=n(plan.cpa), aov=n(plan.aov), days=Math.max(1,n(plan.days));
   const purchases=cpa?budget/cpa:0;
   const revenue=purchases*aov;
   return {
    purchases,
    dailyBudget:budget/days,
    purchasesPerDay:purchases/days,
    revenue,
    roas:budget?revenue/budget:0,
    revenueAfterAds:revenue-budget
   };
 },[plan]);

 const metric=(name,val,sub="")=><div className="card"><span>{name}</span><b>{val}</b><small>{sub}</small></div>;

 return <div className="shell">
  <header>
   <div><div className="eyebrow">NEESH AGENCY TOOL</div><h1>Ad Results Forecast</h1><p>خطط لميزانية إعلانك واعرف النتائج المتوقعة بناءً على الـ Target CPA.</p></div>
  </header>
  <nav className="topnav">
   <a href="/">Ad Metrics</a>
   <a className="active" href="/forecast">توقع نتائج الإعلان</a>
  </nav>
  <main>
   <section className="panel forecast" dir="rtl">
    <div className="forecastHead">
     <div><div className="eyebrow">EXPECTED RESULTS</div><h2>توقع نتائج الإعلان</h2><p>ادخل ميزانية الإعلان والـ CPA المستهدف، والأداة تحسب لك النتائج المتوقعة تقريبياً.</p></div>
     <div className="estimateBadge">تقديرات وليست ضماناً للنتائج</div>
    </div>
    <div className="forecastLayout">
     <div className="forecastInputs">
      <label>إجمالي ميزانية الإعلان (EGP)<input type="number" min="0" value={plan.budget} onChange={e=>setP("budget",e.target.value)}/></label>
      <label>Target CPA (EGP)<input type="number" min="0" value={plan.cpa} onChange={e=>setP("cpa",e.target.value)}/></label>
      <label>متوسط قيمة الطلب AOV (اختياري)<input type="number" min="0" value={plan.aov} onChange={e=>setP("aov",e.target.value)}/></label>
      <label>مدة الحملة بالأيام<input type="number" min="0" value={plan.days} onChange={e=>setP("days",e.target.value)}/></label>
     </div>
     <div className="forecastResults">
      {metric("مبيعات / تحويلات متوقعة",forecast.purchases.toFixed(1),"Budget ÷ Target CPA")}
      {metric("ميزانية يومية",money(forecast.dailyBudget),"Budget ÷ Days")}
      {metric("تحويلات يومية",forecast.purchasesPerDay.toFixed(1),"Expected purchases ÷ Days")}
      {metric("إيراد متوقع",money(forecast.revenue),"Expected purchases × AOV")}
      {metric("ROAS متوقع",forecast.roas.toFixed(2)+"x","Expected revenue ÷ Budget")}
      {metric("الإيراد بعد تكلفة الإعلان",money(forecast.revenueAfterAds),"Revenue − Ad Spend (قبل تكلفة المنتج والمصاريف)")}
     </div>
    </div>
   </section>
  </main>
  <footer><strong>MADE BY NEESH AGENCY</strong><br/><span>Built for media buyers • No data leaves your browser</span></footer>
 </div>
}
