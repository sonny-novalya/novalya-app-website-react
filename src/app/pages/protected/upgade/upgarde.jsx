import  { useState, useEffect, useCallback } from "react";
import "../../auth/plans/plans.css";
import checkedCard from "../../../../assets/img/checked-card.png"
import checkedCardDark from "../../../../assets/img/checked-card-dark.png"
import CheckImg from "../../../../assets/img/check-img.png";
import CrossImg from "../../../../assets/img/cross-img.png";
import Vector from "../../../../assets/img/Vector-info.png"

import { Terms } from "../../../../helpers/helperData"; 
import { upgardeHelper } from "../../../../helpers/helper";
import useLoginUserDataStore from "../../../../store/loginuser/loginuserdata";
import { useTranslation } from "react-i18next";

const Upgrade = () => {
    const {loginUserData,upgardeApiCall}= useLoginUserDataStore()
  const [isAnnual, setIsAnnual] = useState("year");
  const [monthDivision, setMonthDivision] = useState(12);
  const [loader, setLoader] = useState(false);
  const [plan1, setPlan1] = useState({amount_2:0,amount_1:0});
  const [plan2, setPlan2] = useState({amount_2:0,amount_1:0});
  const [plan3, setPlan3] = useState({amount_2:0,amount_1:0});
  const [allPlans, setAllPlans] = useState(Terms)
  const [currency, setCurrency] = useState("");
  const [renderData, setRenderData] = useState({
    basic_1:true,
    basic_3:true,
    basic_12:true,
    buissness_1:true,
    buissness_3:true,
    buissness_12:true,
    unlimited_1:true,
    unlimited_3:true,
    unlimited_12:true,
    month_1:true,
    month_3:true,
    month_12:true,
  });
   const { t,i18n } = useTranslation();
  

  const callPlansFunction = useCallback(async () => {
    setLoader(false);

	if(isAnnual === "year"){
		setMonthDivision(12)
	}else if(isAnnual === "month"){
		setMonthDivision(1)
	}else{
		setMonthDivision(3)
	}
	

   const langList=[{title:"en",value:"en-US"},{title:"fr",value:"fr-FR"},{title:"de",value:"de-DE"},{title:"es",value:"es-ES"},{title:"pt",value:"pt-PT"}]
    let regionCode=localStorage.getItem("regionCode")
    if(!regionCode){
      const res= await (await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=2e685b36ba4a4c5cb3645fc6baa56306')).json()

      regionCode=res?.continent_code;
      const lang = res?.languages?.split(",")?.[0]?.split("-")?.[0]

      const selectedLang = langList.find((data)=>data?.title.toUpperCase() === lang?.toUpperCase())?.value || "en-US"

      i18n.changeLanguage(lang);
      localStorage.setItem("selectedLocale",selectedLang)
      localStorage.setItem('regionCode',regionCode)
    }
  
    const isEuropean = regionCode?.toUpperCase() === "EU" ?true:false;
  

    if (isEuropean) {
      country = "EUR";
      setCurrency("€");
    } else {
      setCurrency("$");
    }


		const filteredPLans = allPlans.filter((plan)=>plan?.period_unit === isAnnual && plan?.currency_code === loginUserData?.currency)
        setPlan1(filteredPLans?.[0]);
        setPlan2(filteredPLans?.[1]);
        setPlan3(filteredPLans?.[2]);

    localStorage.setItem("plans", JSON.stringify(allPlans));

  }, [isAnnual]);


  const handleBuyNow = async(planId) => {
    localStorage.setItem("planId", planId);
	let params={
		item_price_id:planId,
        subscription_id:loginUserData?.subscriptionId
	}
 
    const res = await upgardeApiCall(params)

    if (res.status === 200) {
       window.location.href = res.data.data.hosted_page.url

    }


  
  };

 

  useEffect(() => {
    callPlansFunction();
   
  }, [callPlansFunction,isAnnual]);


  

useEffect(() => {
const sortedPLans = upgardeHelper(loginUserData?.plan_pkg,`${loginUserData?.plan_period}_${loginUserData?.sub_type}`)
//  localStorage.getItem("hasAccepted") === "true" ? setIsAnnual("year"): setIsAnnual(sortedPLans?.deafultTF)
 setRenderData(sortedPLans)
console.log(sortedPLans)
 
 if(sortedPLans?.deafultTF === "year"){
	setMonthDivision(12)
}else if(sortedPLans?.deafultTF === "month"){
	setMonthDivision(1)
}else{
	setMonthDivision(3)
}
},[loginUserData])

const checkPlanRender =(item)=>{
	let render = false;
	if(item === "Basic"){
		if(isAnnual === "month"){
             render = renderData.basic_1;
		}else if(isAnnual === "quater"){
			render = renderData.basic_3;
		}else{
			render = renderData.basic_12;
		}
		
    } else if(item === "Business"){
		if(isAnnual === "month"){
			render = renderData.buissness_1;
	   }else if(isAnnual === "quater"){
		   render = renderData.buissness_3;
	   }else{
		   render = renderData.buissness_12;
	   }
    }else{
		if(isAnnual === "month"){
			render = renderData.unlimited_1;
	   }else if(isAnnual === "quater"){
		   render = renderData.unlimited_3;
	   }else{
		   render = renderData.unlimited_12;
	   }
	}

	return render;
}

 

  const selectPeriod = (val)=>{
    if(val==="year"){
      val=t('Billed Yearly')
    }else{
       val=t('Billed Quarterly')
    }

	return val;
  }

 

  const changeCurrencyText = (string)=>{
	let updatedString = string.replace("€", currency);
	
	 return updatedString;     
 }

  return <>
<div className="TermPlan" style={{paddingBottom:"40px",width:"100%",borderRadius:"12px",height:"100vh"}}>

<section class="aug-card-main">
	<div class="container">
	<div class="aug-card-tab">
			<h1 class="aug-card-tab-hd">{t("pricing.Upgrade Your Plan Today.")}</h1>
			<div class="aug-card-tab">
				<div class="aug-social-wrap">
					{ <div class="aug-plans-btn" style={{opacity:!renderData.month_1? "0.5":"1"}} >
						<input type="radio" id="aug-facebook" name="aug-plans-select" disabled={!renderData.month_1}  checked={isAnnual === "month"}
                         onClick={() => {setIsAnnual("month");
							setMonthDivision(1)
						 }} />
						<label for="aug-facebook">
							<span class="aug-check-span"></span>
							 <span>1 {t("pricing.month")}</span>
						</label>
					</div>}
					{  <div class="aug-plans-btn aug-plans-btn-mid" style={{opacity:!renderData.month_3? "0.5":"1"}}>
						<input type="radio" id="aug-fb-insta" name="aug-plans-select"  disabled={!renderData.month_3}  checked={isAnnual === "quater"}
                         onClick={() => {setIsAnnual("quater");
							setMonthDivision(3)
						 }} />
						<label for="aug-fb-insta">
						<span class="aug-check-span"></span>
						 <span>3 {t("pricing.months")}</span> <span class="aug-discount-label aug-discount-month">{t("pricing.Save")+" -20%"}</span>
						</label>
					</div>}
					{ <div class="aug-plans-btn" style={{opacity:!renderData.month_12? "0.5":"1"}}>
						<input type="radio" id="aug-insta" name="aug-plans-select" disabled={!renderData.month_12}  checked={isAnnual === "year"}
                         onClick={() => {setIsAnnual("year");
							setMonthDivision(12)
						 }} />
						<label for="aug-insta"><span class="aug-check-span"></span> <span>12 {t("pricing.months")}</span><span class="aug-discount-label aug-discount-yearly">{t("pricing.Save")+" -35%"}</span>
						</label>
					</div>}
				</div>
			</div>
		</div>
	</div>
</section>
<section class="aug-card-section">
	<div class="container">
		<div class="aug-plan-discount-cards">
			{  <div class="aug-starter-discont-cards aug-starter-side--card" style={{opacity:!checkPlanRender("Basic")? "0.5":"1"}} >
				<h3 class="aug-card-lg-hd">BASIC</h3>
				<p class="aug-card-sm-hd">{t("pricing.To kick off your business")}</p>
				<ul class="aug-card-section-list">
					<li><img src={checkedCard} alt="" /><span>{ "1200 " +t("pricing.Facebook Messages per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span>{"800 " + t("pricing.Instagram Messages per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span>{"800 " + t("pricing.AI Credits per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span>{"10 " + t("pricing.Tags + Pipelines")}</span></li>
					<li class="rael-humans-gray"><img src={checkedCardDark} alt="" /><span>{t("pricing.Live chat with real humanss")}</span></li>
				</ul>
				<h1 class="aug-card-discount-text">
					{
						!loader ? (
						<>
							{`${plan1?.currency_code === "USD"?"$":"€"}${plan1?.amount_1 ?Math.ceil(plan1?.amount_1 /monthDivision):0}`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>) : (
						<>
							{`${plan1?.currency_code === "USD"?"$":"€"}__`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>)
					}
				</h1>
				<p class="aug-card-sm-hd">{isAnnual === "month"? t("pricing.No commitment"):`${plan1?.currency_code === "USD"?"$":"€"}${
					plan1?.amount_1 ?plan1?.amount_1:0} ${selectPeriod(isAnnual)}`}</p>
				<button class="aug-card-chose-btn" disabled={!checkPlanRender("Basic")} onClick={()=>handleBuyNow(plan1?.plan_id)}>{t("pricing.Upgrade Now")}</button>
			</div>}
			{<div class="aug-starter-discont-cards aug-starter-side-mid" style={{opacity:!checkPlanRender("Business")? "0.5":"1"}} >
				{/* <div class="aug-popular">
					<img src={popular} alt="" />
				</div> */}
				<h3 class="aug-card-lg-hd">BUSINESS</h3>
				<p class="aug-card-sm-hd">{t("pricing.To get to the next level")}</p>
				<ul class="aug-card-section-list">
					<li><img src={checkedCard} alt="" /><span>{ "2400 "+t("pricing.Facebook Messages per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {"1600 "+ t("pricing.Instagram Messages per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {"2000 "+ t("pricing.AI Credits per month")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {"25 "+ t("pricing.Tags + Pipelines")}</span></li>
					<li><img src={checkedCard} alt="" /><span>{t("pricing.Live chat with real humanss")}</span></li>
				</ul>
				<h1 class="aug-card-discount-text">
					{
						!loader ? (
						<>
							{`${plan2?.currency_code === "USD"?"$":"€"}${plan2?.amount_1 ?Math.ceil(plan2?.amount_1 /monthDivision):0}`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>) : (
						<>
							{`${plan2?.currency_code === "USD"?"$":"€"}__`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>)
					}
				</h1>
				<p class="aug-card-sm-hd">{isAnnual === "month"? t("pricing.No commitment"):`${plan2?.currency_code === "USD"?"$":"€"}${
					plan2?.amount_1 ?plan2?.amount_1:0} ${selectPeriod(isAnnual)}`}</p>
				<button class="aug-card-chose-btn" disabled={!checkPlanRender("Business")} onClick={()=>handleBuyNow(plan2?.plan_id)}>{t("pricing.Upgrade Now")}</button>
			</div>}
		{ 	<div class="aug-starter-discont-cards aug-starter-side--card" style={{opacity:!checkPlanRender("Unlimited")? "0.5":"1"}} >
				<h3 class="aug-card-lg-hd">UNLIMITED</h3>
				<p class="aug-card-sm-hd">{t("pricing.To unlock your full potential")}</p>
				<ul class="aug-card-section-list">
					<li><img src={checkedCard} alt="" /><span>{t("pricing.Facebook Messages per month Unlimited")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {t("pricing.Instagram Messages per month Unlimited")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {t("pricing.AI Credits per month Unlimited")}</span></li>
					<li><img src={checkedCard} alt="" /><span> {t("pricing.Tags + Pipelines Unlimited")}</span></li>
					<li><img src={checkedCard} alt="" /><span>{t("pricing.Live chat with real humanss")}</span></li>
				</ul>
				<h1 class="aug-card-discount-text">
					{
						!loader ? (
						<>
							{`${plan3?.currency_code === "USD"?"$":"€"}${plan3?.amount_1 ?Math.ceil(plan3?.amount_1 /monthDivision):0}`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>
						) : (
						<>
							{`${plan3?.currency_code === "USD"?"$":"€"}__`}<span class="aug-small-year">{t("pricing./month")}</span>
						</>)
					}
				</h1>
				<p class="aug-card-sm-hd">{isAnnual === "month"? t("pricing.No commitment"):`${plan3?.currency_code === "USD"?"$":"€"}${
					plan3?.amount_1 ?plan3?.amount_1:0} ${selectPeriod(isAnnual)}`}</p>
				<button class="aug-card-chose-btn" disabled={!checkPlanRender("Unlimited")} onClick={()=>handleBuyNow(plan3?.plan_id)} >{t("pricing.Upgrade Now")}</button>
			</div>}
		</div>	
	</div>
</section>
<section class="aug-card-media aug-card-facebook">
	<div class="container">	
		<div class="aug-price-table">
			<ul class="aug-card-facebook-heading">
				<li class="aug-fb-hd">Facebook</li>
				<li class="aug-plan-hd">Basic</li>
				<li class="aug-plan-hd">Business</li>
				<li class="aug-plan-hd">Unlimited</li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto Prospection in Groups")}
						<div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title1')}</h5>
								<p>{t('pricing_tooltips.description.description1')}</p>
							</div>
						</div>
					</span></li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span>{t("pricing.Advanced search by gender")}<div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title2')}</h5>
								<p>{t('pricing_tooltips.description.description2')}</p>
							</div>
						</div></span></li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span>{t("pricing.Advanced search by keywords")}<div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title3')}</h5>
								<p>{t('pricing_tooltips.description.description3')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span>{t("pricing.Comment with AI")}  <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title4')}</h5>
								<p>{t('pricing_tooltips.description.description4')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span>{t("pricing.Bulk Follow up messages")} <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title5')}</h5>
								<p>{t('pricing_tooltips.description.description5')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span> {t("pricing.Auto Wish Birthday")}<div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title6')}</h5>
								<p>{t('pricing_tooltips.description.description6')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span> {t("pricing.Auto Wish Birthday Later")} <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title7')}</h5>
								<p>{t('pricing_tooltips.description.description7')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto reply on Accepted requests")}  <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title8')}</h5>
								<p>{t('pricing_tooltips.description.description8')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto clean pending requests")} <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title9')}</h5>
								<p>{t('pricing_tooltips.description.description9')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
				<li><img src={CheckImg} alt="" /></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Friends list importation")} <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title10')}</h5>
								<p>{t('pricing_tooltips.description.description10')}
									<br></br><br></br>
									<b>Basic: </b>{t('pricing_tooltips.basic')}
									<br></br><br></br>
									<b>Advanced: </b>{t('pricing_tooltips.advanced')}
									<br></br><br></br>
									<i>{t('pricing_tooltips.information')}</i>
								</p>
							</div>
						</div>
					</span>
				</li> 
				<li><span class="aug-face-importation">Basic</span></li>
				<li><span class="aug-face-importation">Advanced</span></li>
				<li><span class="aug-face-importation">Advanced</span></li>
			</ul>
			<ul class="aug-card-facebook-list aug-table-btn">
				<li></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Basic")} style={{opacity:!checkPlanRender("Basic")?"0.5":"1"}}  onClick={()=>handleBuyNow(plan1?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Business")} style={{opacity:!checkPlanRender("Business")?"0.5":"1"}} onClick={()=>handleBuyNow(plan2?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Unlimited")} style={{opacity:!checkPlanRender("Unlimited")?"0.5":"1"}} onClick={()=>handleBuyNow(plan3?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
			</ul>
		</div>
	</div>
</section>
<section class="aug-card-media aug-card-instagram">
	<div class="container">	
		<div class="aug-price-table">
			<ul class="aug-card-facebook-heading">
				<li class="aug-fb-hd">Instagram</li>
				<li class="aug-plan-hd">Basic</li>
				<li class="aug-plan-hd">Business</li>
				<li class="aug-plan-hd">Unlimited</li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto Message on Likes")} <div class="aug-tooltip-wrap">
							<img src={Vector} alt="" />
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title11')}</h5>
								<p>{t('pricing_tooltips.description.description11')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto Message on Followers")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title12')}</h5>
								<p>{t('pricing_tooltips.description.description12')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Auto Message on Hashtags")}  <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title13')}</h5>
								<p>{t('pricing_tooltips.description.description13')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span>{t("pricing.Comment with AI")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title14')}</h5>
								<p>{t('pricing_tooltips.description.description14')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Bulk Follow up messages")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title15')}</h5>
								<p>{t('pricing_tooltips.description.description15')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list aug-table-btn">
				<li></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Basic")} style={{opacity:!checkPlanRender("Basic")?"0.5":"1"}}  onClick={()=>handleBuyNow(plan1?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Business")} style={{opacity:!checkPlanRender("Business")?"0.5":"1"}} onClick={()=>handleBuyNow(plan2?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Unlimited")} style={{opacity:!checkPlanRender("Unlimited")?"0.5":"1"}} onClick={()=>handleBuyNow(plan3?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
			</ul>
		</div>
	</div>
</section>
<section class="aug-card-media aug-card-instagram aug-card-Support">
	<div class="container">	
		<div class="aug-price-table">
			<ul class="aug-card-facebook-heading">
				<li class="aug-fb-hd">Support</li>
				<li class="aug-plan-hd">Basic</li>
				<li class="aug-plan-hd">Business</li>
				<li class="aug-plan-hd">Unlimited
				</li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Explanation videos")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title16')}</h5>
								<p>{t('pricing_tooltips.description.description16')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Multilingual Email Support 6/7")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title17')}</h5>
								<p>{t('pricing_tooltips.description.description17')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li>
					<span>{t("pricing.Live Chat with real humans")} <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title18')}</h5>
								<p>{t('pricing_tooltips.description.description18')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={CrossImg}/></li>
				<li><img src={CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list">
				<li><span> {changeCurrencyText(t("pricing.1-to-1 Kickstart Zoom Call (60€ value)"))}  <div class="aug-tooltip-wrap">
							<img src={Vector}/>
							<div class="aug-tooltiptext">
								<h5>{t('pricing_tooltips.title.title19')}</h5>
								<p>{t('pricing_tooltips.description.description19')}</p>
							</div>
						</div>
					</span>
				</li> 
				<li><img src={isAnnual === "year"?CheckImg: CrossImg}/></li>
				<li><img src={isAnnual === "month"? CrossImg:CheckImg}/></li>
				<li><img src={CheckImg}/></li>
			</ul>
			<ul class="aug-card-facebook-list aug-table-btn">
				<li></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Basic")} style={{opacity:!checkPlanRender("Basic")?"0.5":"1"}}  onClick={()=>handleBuyNow(plan1?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Business")} style={{opacity:!checkPlanRender("Business")?"0.5":"1"}} onClick={()=>handleBuyNow(plan2?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
				<li><button class="aug-btn" disabled={!checkPlanRender("Unlimited")} style={{opacity:!checkPlanRender("Unlimited")?"0.5":"1"}} onClick={()=>handleBuyNow(plan3?.plan_id)}>{t("pricing.Upgrade Now")}</button></li>
			</ul>
		</div>
	</div>
</section>

</div>
  </>

  
};

export default Upgrade;