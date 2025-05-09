import React, {useEffect, useState } from "react";
import "./goPage.css";
import courseIcon from "../../../../assets/img/course-icons.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Terms } from "../../../../helpers/helperData";
import { useTranslation } from "react-i18next";
import { getCurrentYear } from "../../../../helpers/helper";
import logo from "../../../../assets/img/pricing-logo.png";

 const GoPage = () => {

  const [URL, setUrl] = useState(
    "https://player.vimeo.com/video/1039401182?badge=0&autopause=0&player_id=0&app_id=58479"
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refId = queryParams.get("uname");
  const time = queryParams.get("time");
  const currLang = queryParams.get("lang");
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState(null);
  const copyRightYears = getCurrentYear()


  useEffect(() => {
    if (currLang?.includes("de")) {
      localStorage.setItem("selectedLocale", "de-DE");
     
      i18n.changeLanguage("de-DE")
      setUrl(
        "https://player.vimeo.com/video/1063794317?badge=0&autopause=0&player_id=0&app_id=58479"
      );
    } else {
      localStorage.setItem("selectedLocale", "fr-FR");
      i18n.changeLanguage("fr-FR")
      setUrl(
        "https://player.vimeo.com/video/1039401182?badge=0&autopause=0&player_id=0&app_id=58479"
      );
    }

   
  }, []);


  useEffect(() => {
    let goTime = localStorage.getItem("go_time");
    const now = new Date();
    let calculatedDate = new Date();
    const is_gt = !goTime || now > new Date(goTime);
  
    if (!time && is_gt) {
      // ✅ Default to today at 11:59 PM
      calculatedDate.setHours(23, 59, 0, 0);
      localStorage.setItem("go_time", calculatedDate);
    } else if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(time) && is_gt) {
      let [ day,month, year] = time.split("/").map(Number);
      year += year < 50 ? 2000 : 1900;
      calculatedDate = new Date(year, month - 1, day);
      calculatedDate.setHours(23, 59, 0, 0);
      localStorage.setItem("go_time", calculatedDate);
    } else if (is_gt && time) {
      const mins = parseInt(time);
      if (!isNaN(mins)) {
        calculatedDate.setMinutes(calculatedDate.getMinutes() + mins);
        localStorage.setItem("go_time", calculatedDate);
      }
    } else if (goTime) {
      calculatedDate = new Date(goTime);
    }
  
    setTargetDate(calculatedDate);
  }, [time]);
  
  // Your countdown function
  function calculateTimeLeft() {
    const now = new Date();
    if (!targetDate) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  
    const difference = targetDate - now;
  
    const timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  
  
  
    return difference > 0 ? timeLeft : { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }
  

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
  

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (
      document.querySelector(
        `script[src="https://event.webinarjam.com/t/sale/cookie.js"]`
      )
    ) {
      console.log("Script already exists, skipping injection.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://event.webinarjam.com/t/sale/cookie.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.wj_sales = { webinar_id: "roolri9" };
      console.log("WebinarJam sales tracking data set:", window.wj_sales);
    };

    script.onerror = (error) => {
      console.error("Error loading script:", error);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
        console.log("Script removed on unmount.");
      }
    };
  }, []);

 

 

  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(Terms));
    localStorage.setItem("referralId", refId || "SONNY");
  }, []);

  const handleBuy = (plan,isBasic)=>{
	localStorage.setItem("planId",plan)
	localStorage.setItem("backto","/go-offer")
	navigate(`/capture?coupon_code=${isBasic?"Course-LTC":"Course-LTC-unlimited-yearly"}`)
  }

  return (
    <>
    

      <div className="course-main">
        <div className="course-header">
          <div className="course-container">
            <div className="cour se-header-warp">
              <img
                className="course-head-img"
                src={logo}
                alt="logo"
				style={{width:"150px"}}
              />
            </div>
            {/* <div style={{ width: "170px" }}><LocalizationOptions /></div> */}
          </div>
        </div>

        <div className="course-video-wrap">
          <div className="course-container">
            <div className="connect_name">
              {/* {loginUserData?.firstname &&
                `You are connected as ${loginUserData.firstname}`} */}
            </div>

            <div className="">
              <div className="courserRight">
                <span className="course-title-new">
                Convertissez Vos Leads en Clients <br />
                Offre Spéciale
                  {/* {t("go.La Méthode Imparable pour Obtenir des Rendez-Vous Qualifiés")} */}
                </span>
                <div className="" style={{ width: '100%', maxWidth: '700px',height: 'auto' }}>
                  <div className="courserVideoWrap">
                    <iframe
                      className="course-videos"
                      src={URL}
                      title="Video"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                    marginBottom: "20px",
                  }}
                >
                  {/* 2 Months Offer Card */}
                  <div
                    style={{
                      background: "#f4f8ff",
                      borderRadius: "10px",
                      padding: "30px",
                      width: "390px",
                      textAlign: "center",
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ marginBottom: "20px" }}>
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontSize: "28px",
                          margin: "0 0",
                        }}
                      >
                        2 MOIS 
                      </h3>
                      <h3
                        style={{
                          textAlign: "center",
                          display: "block",
                          margin: "0 0",
                        }}
                      >
                        BASIC
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontWeight: "600",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ textAlign: "left" }}>
                        🎓 LA FORMATION (897€)
                      </span>
                      <span style={{ textAlign: "left" }}>
                        🧠 2 MOIS D'ABONNEMENT NOVALYA SUR LE PLAN BASIC (194€)
                      </span>
                      <span style={{ textAlign: "left" }}>
                        🤝ACCOMPAGNEMENT ZOOM 1-1 (60€)
                      </span>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "18px",
                        }}
                      >
                        VALEUR : 1151€
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "0",
                          width: "100%",
                          height: "2px",
                          backgroundColor: "red",
                          transform: "rotate(8deg)", // adjust angle for best fit
                          transformOrigin: "center",
                          pointerEvents: "none",
                        }}
                      ></div>
                    </div>
                    <p
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Aujourd’hui Seulement 100€
                    </p>
                    <button
                      style={{
                        backgroundColor: "#2d79f3",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
					  onClick={()=>handleBuy("Formation-Leads-en-RDV-Qualifies-Basic-Plan-EUR-Monthly",true)}
                    >
                      Je veux cette offre
                    </button>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        marginTop: "12px",
                      }}
                    >
                      🔥 Vous économisez 1051€ aujourd’hui !
                    </p>
                  </div>

				  <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
					<h2>OU</h2>
				  </div>

                  <div
                    style={{
                      background: "#FFFACD",
                      borderRadius: "10px",
                      padding: "30px",
                      width: "390px",
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      border: "2px solid gold",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#ffcc00",
                        padding: "2px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1,
                      }}
                    >
                      MEILLEURE OFFRE
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontSize: "28px",
                          margin: "0 0",
                        }}
                      >
                        12 MOIS
                      </h3>
                      <h3
                        style={{
                          textAlign: "center",
                          display: "block",
                          margin: "0 0",
                        }}
                      >
                        UNLIMITED
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontWeight: "600",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ textAlign: "left" }}>
                        🎓 LA FORMATION (897€)
                      </span>
                      <span style={{ textAlign: "left" }}>
                        🧠 12 MOIS D'ABONNEMENT NOVALYA SUR LE PLAN UNLIMITED
                        (3564€)
                      </span>
                      <span style={{ textAlign: "left" }}>
                        🤝 ACCOMPAGNEMENT ZOOM 1-1 (60€)
                      </span>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "18px",
                        }}
                      >
                        VALEUR : 4521€
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "0",
                          width: "100%",
                          height: "2px",
                          backgroundColor: "red",
                          transform: "rotate(8deg)",
                          transformOrigin: "center",
                          pointerEvents: "none",
                        }}
                      ></div>
                    </div>
                    <p
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Aujourd’hui Seulement 497€
                    </p>

                    <button
                      style={{
                        backgroundColor: "#2d79f3",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
					  onClick={()=>handleBuy("Formation-Leads-en-RDV-Qualifies-Unlimited-Plan-EUR-Yearly",false)}
                    >
                      Je veux cette offre
                    </button>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        marginTop: "12px",
                      }}
                    >
                      🔥 Vous économisez 4024€ aujourd’hui !
                    </p>
                  </div>
                </div>

                <div
                  className="offerDuration"
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ textAlign: "center" }}>
                    {t("go.L'offre se termine dans")}:
                  </span>
                  <div id="countdown">
                    <div id="tiles">
                      <span>{timeLeft?.days || "00"}</span>
                      <span>{timeLeft.hours}</span>
                      <span>{timeLeft.minutes}</span>
                      <span>{timeLeft.seconds}</span>
                    </div>
                    <div className="labels">
                      <li>jours</li>
                      <li>{t("go.Heures")}</li>
                      <li>{t("go.Minutes")}</li>
                      <li>{t("go.Secondes")}</li>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>

        <div className="course-module">
          <div className="module-container">
            <span className="course-title">{t("go.Programme")} :</span>
            <div className="module-wraper">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="module-items">
                  <div className="module-items-icon">
                    <img src={courseIcon} />
                  </div>
                  <div className="module-item-text">
                    <span className="module-title">
                      {t("go.Module inx", { index })}:
                    </span>
                    <p>
                      {t(
                        `go.${
                          [
                            "La Psychologie du Lead",
                            "Structurer un Entonnoir de Conversion",
                            "Scripts de Communication et Suivi",
                            "Optimisation et Analyse",
                            "Sécuriser les rendez-vous et réduire les absences",
                            "L’Art de Démarrer un Rendez-Vous Impactant",
                          ][index - 1]
                        }`
                      )}
                    </p>
                  </div>
                </div>
              ))}

              <div className="module-items">
                <div className="module-items-icon">
                  <img src={courseIcon} />
                </div>
                <div className="module-item-text">
                  <span className="module-title">
                    Bonus
                     {/* {!loginUserData?.customerid && "#1"} */}
                  </span>
                  <p>Le replay des 2 jours de Challenge Facebook</p>
                </div>
              </div>

              <div className="module-items">
                <div className="module-items-icon">
                  <img src={courseIcon} />
                </div>
                <div className="module-item-text">
                  <span className="module-title">{t("go.Bonus")} #2*</span>
                  <p>2-12 mois d’abonnement Novalya offerts !</p>
                </div>
              </div>
              <div className="module-items">
                <div className="module-items-icon">
                  <img src={courseIcon} />
                </div>
                <div className="module-item-text">
                  <span className="module-title">{t("go.Bonus")} #3*</span>
                  <p>Accompagnement de démarrage Novalya offert</p>
                </div>
              </div>
         
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginBottom: "20px",
                marginTop: "60px",
              }}
            >
              {/* 2 Months Offer Card */}
              <div
                style={{
                  background: "#f4f8ff",
                  borderRadius: "10px",
                  padding: "30px",
                  width: "390px",
                  textAlign: "center",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "28px",
                      margin: "0 0",
                    }}
                  >
                    2 MOIS 
                  </h3>
                  <h3
                    style={{
                      textAlign: "center",
                      display: "block",
                      margin: "0 0",
                    }}
                  >
                    BASIC
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "600",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ textAlign: "left" }}>
                    🎓 LA FORMATION (897€)
                  </span>
                  <span style={{ textAlign: "left" }}>
                    🧠 2 MOIS D'ABONNEMENT NOVALYA SUR LE PLAN BASIC (194€)
                  </span>
                  <span style={{ textAlign: "left" }}>
                    🤝 ACCOMPAGNEMENT ZOOM 1-1 (60€)
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "18px",
                    }}
                  >
                    VALEUR : 1151€
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "red",
                      transform: "rotate(8deg)", // adjust angle for best fit
                      transformOrigin: "center",
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Aujourd’hui Seulement 100€
                </p>
                <button
                  style={{
                    backgroundColor: "#2d79f3",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
				  onClick={()=>handleBuy("Formation-Leads-en-RDV-Qualifies-Basic-Plan-EUR-Monthly",true)}
                >
                  Je veux cette offre
                </button>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    marginTop: "12px",
                  }}
                >
                  🔥 Vous économisez 1051€ aujourd’hui !
                </p>
              </div>

			  <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
					<h2>OU</h2>
				  </div>

              {/* 12 Months Offer Card */}
              <div
                style={{
                  background: "#FFFACD",
                  borderRadius: "10px",
                  padding: "30px",
                  width: "390px",
                  textAlign: "center",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  border: "2px solid gold",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffcc00",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  MEILLEURE OFFRE
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "28px",
                      margin: "0 0",
                    }}
                  >
                    12 MOIS 
                  </h3>
                  <h3
                    style={{
                      textAlign: "center",
                      display: "block",
                      margin: "0 0",
                    }}
                  >
                    UNLIMITED
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "600",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ textAlign: "left" }}>
                    🎓 LA FORMATION (897€)
                  </span>
                  <span style={{ textAlign: "left" }}>
                    🧠 12 MOIS D'ABONNEMENT NOVALYA SUR LE PLAN UNLIMITED
                    (3564€)
                  </span>
                  <span style={{ textAlign: "left" }}>
                    🤝 ACCOMPAGNEMENT ZOOM 1-1 (60€)
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "18px",
                    }}
                  >
                    VALEUR : 4521€
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "red",
                      transform: "rotate(8deg)",
                      transformOrigin: "center",
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Aujourd’hui Seulement 497€
                </p>

                <button
                  style={{
                    backgroundColor: "#2d79f3",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
				  onClick={()=>handleBuy("Formation-Leads-en-RDV-Qualifies-Unlimited-Plan-EUR-Yearly",false)}
                >
                  Je veux cette offre
                </button>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    marginTop: "12px",
                  }}
                >
                  🔥 Vous économisez 4024€ aujourd’hui !
                </p>
              </div>
            </div>

            <div
              className="offerDuration"
              style={{
                borderRadius: "8px",
                margin: "0 auto",
              }}
            >
              <span>{t("go.L'offre se termine dans")}:</span>
              <div id="countdown">
                <div id="tiles">
                  <span>{timeLeft?.days}</span>
                  <span>{timeLeft?.hours}</span>
                  <span>{timeLeft?.minutes}</span>
                  <span>{timeLeft?.seconds}</span>
                </div>
                <div className="labels">
                  <li style={{ textAlign: "center" }}>{"jours"}</li>
                  <li style={{ textAlign: "center" }}>{t("go.Heures")}</li>
                  <li style={{ textAlign: "center" }}>{t("go.Minutes")}</li>
                  <li style={{ textAlign: "center" }}>{t("go.Secondes")}</li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="course-footer">
          <div className="course-container-foot">
            <div className="course-footer-wrap">
              <p className="course-footer-txt">
                Copyright | Novalya © {copyRightYears.prev}-{copyRightYears.curr}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export  default GoPage
