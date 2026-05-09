import { useState } from "react";

// ── PRAYER TABLE: Westfield MA 01085 (ISNA) May 9 – Sep 1 ──────────────────
// [fajrH,fajrM, dhuhrH,dhuhrM, asrH,asrM, maghribH,maghribM, ishaH,ishaM]
const PT = {
  "5/9":[4,6,12,48,16,44,19,59,21,30],"5/10":[4,5,12,48,16,44,20,0,21,31],
  "5/11":[4,3,12,48,16,45,20,1,21,33],"5/12":[4,2,12,48,16,45,20,2,21,34],
  "5/13":[4,0,12,48,16,45,20,3,21,36],"5/14":[3,59,12,48,16,46,20,4,21,37],
  "5/15":[3,57,12,48,16,46,20,5,21,39],"5/16":[3,56,12,48,16,46,20,6,21,40],
  "5/17":[3,54,12,48,16,47,20,7,21,42],"5/18":[3,53,12,48,16,47,20,8,21,43],
  "5/19":[3,51,12,48,16,47,20,9,21,45],"5/20":[3,50,12,48,16,48,20,10,21,46],
  "5/21":[3,49,12,48,16,48,20,11,21,47],"5/22":[3,48,12,48,16,48,20,12,21,49],
  "5/23":[3,46,12,48,16,48,20,13,21,50],"5/24":[3,45,12,48,16,49,20,14,21,52],
  "5/25":[3,44,12,48,16,49,20,15,21,53],"5/26":[3,43,12,49,16,49,20,16,21,54],
  "5/27":[3,42,12,49,16,50,20,16,21,55],"5/28":[3,41,12,49,16,50,20,17,21,57],
  "5/29":[3,40,12,49,16,50,20,18,21,58],"5/30":[3,39,12,49,16,51,20,19,21,59],
  "5/31":[3,38,12,49,16,51,20,20,22,0],
  "6/1":[3,37,12,49,16,51,20,21,22,1],"6/2":[3,36,12,49,16,52,20,22,22,3],
  "6/3":[3,35,12,49,16,52,20,23,22,4],"6/4":[3,34,12,49,16,52,20,23,22,5],
  "6/5":[3,33,12,50,16,53,20,24,22,6],"6/6":[3,33,12,50,16,53,20,25,22,7],
  "6/7":[3,32,12,50,16,53,20,26,22,8],"6/8":[3,31,12,50,16,53,20,26,22,9],
  "6/9":[3,31,12,50,16,54,20,27,22,10],"6/10":[3,30,12,50,16,54,20,28,22,11],
  "6/11":[3,30,12,50,16,54,20,28,22,12],"6/12":[3,29,12,50,16,55,20,29,22,13],
  "6/13":[3,29,12,51,16,55,20,30,22,13],"6/14":[3,28,12,51,16,55,20,30,22,14],
  "6/15":[3,28,12,51,16,55,20,31,22,15],"6/16":[3,28,12,51,16,56,20,31,22,15],
  "6/17":[3,27,12,51,16,56,20,32,22,16],"6/18":[3,27,12,52,16,56,20,32,22,16],
  "6/19":[3,27,12,52,16,56,20,33,22,17],"6/20":[3,27,12,52,16,57,20,33,22,17],
  "6/21":[3,27,12,52,16,57,20,34,22,18],"6/22":[3,27,12,52,16,57,20,34,22,18],
  "6/23":[3,27,12,53,16,57,20,34,22,18],"6/24":[3,27,12,53,16,58,20,35,22,18],
  "6/25":[3,28,12,53,16,58,20,35,22,19],"6/26":[3,28,12,53,16,58,20,35,22,19],
  "6/27":[3,28,12,53,16,58,20,35,22,19],"6/28":[3,29,12,54,16,58,20,36,22,19],
  "6/29":[3,29,12,54,16,58,20,36,22,19],"6/30":[3,30,12,54,16,59,20,36,22,19],
  "7/1":[3,30,12,54,16,59,20,36,22,19],"7/2":[3,31,12,54,16,59,20,36,22,18],
  "7/3":[3,32,12,54,16,59,20,36,22,18],"7/4":[3,33,12,54,16,59,20,36,22,18],
  "7/5":[3,33,12,55,16,59,20,36,22,17],"7/6":[3,34,12,55,16,59,20,36,22,17],
  "7/7":[3,35,12,55,16,59,20,36,22,16],"7/8":[3,36,12,55,16,59,20,35,22,15],
  "7/9":[3,37,12,55,16,59,20,35,22,15],"7/10":[3,38,12,55,16,59,20,35,22,14],
  "7/11":[3,39,12,55,16,59,20,34,22,13],"7/12":[3,40,12,55,16,59,20,34,22,12],
  "7/13":[3,41,12,55,16,59,20,33,22,11],"7/14":[3,43,12,55,16,59,20,33,22,10],
  "7/15":[3,44,12,55,16,59,20,32,22,9],"7/16":[3,45,12,55,16,59,20,31,22,8],
  "7/17":[3,47,12,55,16,59,20,31,22,7],"7/18":[3,48,12,55,16,58,20,30,22,6],
  "7/19":[3,49,12,55,16,58,20,29,22,5],"7/20":[3,51,12,55,16,58,20,28,22,3],
  "7/21":[3,52,12,55,16,58,20,28,22,2],"7/22":[3,54,12,55,16,57,20,27,22,1],
  "7/23":[3,55,12,55,16,57,20,26,21,59],"7/24":[3,57,12,55,16,57,20,25,21,58],
  "7/25":[3,58,12,55,16,56,20,24,21,56],"7/26":[4,0,12,55,16,56,20,23,21,55],
  "7/27":[4,1,12,55,16,55,20,22,21,53],"7/28":[4,3,12,55,16,55,20,21,21,51],
  "7/29":[4,5,12,55,16,54,20,20,21,50],"7/30":[4,6,12,55,16,54,20,19,21,48],
  "7/31":[4,8,12,54,16,53,20,18,21,46],
  "8/1":[4,10,12,54,16,53,20,17,21,44],"8/2":[4,11,12,54,16,52,20,15,21,42],
  "8/3":[4,13,12,54,16,52,20,14,21,41],"8/4":[4,15,12,53,16,51,20,13,21,39],
  "8/5":[4,16,12,53,16,50,20,11,21,37],"8/6":[4,18,12,53,16,50,20,10,21,35],
  "8/7":[4,20,12,52,16,49,20,8,21,33],"8/8":[4,22,12,52,16,48,20,7,21,31],
  "8/9":[4,23,12,52,16,48,20,5,21,29],"8/10":[4,25,12,51,16,47,20,4,21,27],
  "8/11":[4,27,12,51,16,46,20,2,21,25],"8/12":[4,28,12,50,16,45,20,0,21,22],
  "8/13":[4,30,12,50,16,44,19,59,21,20],"8/14":[4,32,12,50,16,44,19,57,21,18],
  "8/15":[4,34,12,49,16,43,19,55,21,16],"8/16":[4,35,12,49,16,42,19,54,21,13],
  "8/17":[4,37,12,48,16,41,19,52,21,11],"8/18":[4,39,12,48,16,40,19,50,21,9],
  "8/19":[4,41,12,47,16,39,19,48,21,6],"8/20":[4,42,12,47,16,38,19,47,21,4],
  "8/21":[4,44,12,46,16,37,19,45,21,2],"8/22":[4,46,12,46,16,36,19,43,20,59],
  "8/23":[4,47,12,45,16,35,19,41,20,57],"8/24":[4,49,12,45,16,34,19,39,20,54],
  "8/25":[4,51,12,44,16,33,19,37,20,52],"8/26":[4,53,12,44,16,32,19,35,20,49],
  "8/27":[4,54,12,43,16,31,19,34,20,47],"8/28":[4,56,12,43,16,30,19,32,20,44],
  "8/29":[4,58,12,42,16,29,19,30,20,42],"8/30":[5,0,12,41,16,28,19,28,20,39],
  "8/31":[5,1,12,41,16,27,19,26,20,37],"9/1":[5,3,12,40,16,25,19,24,20,34],
};

function fmt(h, m) {
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return hh + ":" + String(m).padStart(2, "0") + " " + ap;
}
function addM(h, m, mins) {
  const t = h * 60 + m + mins;
  return fmt(Math.floor(t / 60) % 24, t % 60);
}
function getPrayer(d) {
  const k = (d.getMonth() + 1) + "/" + d.getDate();
  const t = PT[k];
  if (!t) return null;
  return {
    fajr: fmt(t[0],t[1]), fH:t[0], fM:t[1],
    dhuhr: fmt(t[2],t[3]), dH:t[2], dM:t[3],
    asr: fmt(t[4],t[5]), aH:t[4], aM:t[5],
    maghrib: fmt(t[6],t[7]), mgH:t[6], mgM:t[7],
    isha: fmt(t[8],t[9]),
  };
}

// ── COLORS ────────────────────────────────────────────────────────────────────
const CAT = {
  body:   {label:"Body & Posture",accent:"#1D9E75",bg:"#112B1F",color:"#5DD4A0",emoji:"💪"},
  arabic: {label:"Arabic",        accent:"#2E86DE",bg:"#0D1F35",color:"#7BB8F5",emoji:"📖"},
  quran:  {label:"Quran",         accent:"#7F77DD",bg:"#1A1830",color:"#B5B0F5",emoji:"🌙"},
  money:  {label:"AI Content",    accent:"#E88B1A",bg:"#2A1D07",color:"#F5BC70",emoji:"🎬"},
  career: {label:"Career",        accent:"#17C6A2",bg:"#0A2420",color:"#6EECD3",emoji:"💼"},
  mind:   {label:"Learning",      accent:"#D05A8A",bg:"#2A0F1C",color:"#F09AC0",emoji:"🧠"},
  life:   {label:"Life",          accent:"#888780",bg:"#1C1C1A",color:"#C8C6BE",emoji:"⭐"},
};
function pctColor(p) {
  if (p === 0) return "#555";
  if (p < 25)  return "#E84040";
  if (p < 50)  return "#E88B1A";
  if (p < 75)  return "#E8C11A";
  if (p < 100) return "#8BC34A";
  return "#1D9E75";
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
const DAILY = {
  body:   ["Posture exercises — 10 min","Gym or bodyweight (5x/week — rest Wed & Sun)","Hit protein goal (~160g+)","Caloric surplus — don't skip meals","10-min walk outside"],
  arabic: ["30-min retrieval practice (quiz, not re-read)","Write 5 sentences from memory"],
  quran:  ["Recite after Fajr","1 page minimum with tajweed focus"],
  money:  ["Script or research 1 video idea","Record / generate AI video","Post or schedule to platform","Engage with 5 comments / DMs","Study 1 faceless channel — 15 min"],
  career: ["Work on resume or LinkedIn","Send 1 application or follow-up","1 networking outreach message"],
  mind:   ["Read 'Make It Stick' — 20 pages","Write 1 takeaway from today's reading"],
  life:   ["No bad habits — honest check-in","Pray all 5 salah on time","Plan tomorrow the night before","Drink 2.5L+ water","In bed by midnight"],
};
const TOTAL_DAILY = Object.values(DAILY).flat().length;

const WEEKLY_CONSISTENT = {
  body:   ["Gym exactly 5x (Mon Tue Thu Fri Sat)","Log weight every Sunday morning","Increase at least 1 lift by 5 lbs"],
  arabic: ["Sunday self-quiz — no notes allowed","Add 10 new flashcards to deck"],
  quran:  ["Zero missed recitation days","Review previous surah memorisation"],
  money:  ["7 videos posted — no days off","Review analytics on top performer"],
  career: ["3+ applications or follow-ups sent","1 networking message sent"],
  mind:   ["5+ reading sessions this week","1 written takeaway per session"],
  life:   ["Bad habit streak maintained","2.5L water every day","Sleep before midnight every night"],
};

const WEEKS = [
  {n:1,dates:"May 16–22",phase:"Launch",goals:{body:["Set up gym + equipment","Starting photos + log weight (153 lbs)","Establish posture routine"],arabic:["Audit all class notes","Create revision schedule","Set up Anki/Quizlet"],quran:["Set daily recitation target","Start streak — day 1"],money:["Pick niche","Set up YouTube + TikTok","Install CapCut, Canva, ElevenLabs","Post first video by Friday"],career:["Update resume","Update LinkedIn"],mind:["Get 'Make It Stick'","Read intro + ch. 1"],life:["Write your why for quitting bad habits","Pick your daily schedule"]}},
  {n:2,dates:"May 23–29",phase:"Launch",goals:{body:["Gym 5x — first full week","Track every meal","Add progressive overload"],arabic:["Top 3 weak areas identified","20+ flashcards started"],quran:["7 consecutive days"],money:["7 videos posted — no days off","Study analytics after each post"],career:["Research 20 target companies"],mind:["Finish ch. 2-3"],life:["14-day bad habit streak going"]}},
  {n:3,dates:"May 30–Jun 5",phase:"Launch → Build",goals:{body:["Sunday weigh-in logged","50 flashcards in deck"],arabic:["Quiz week 1 material — no notes","50 flashcards in deck"],quran:["Identify surah to memorise this summer","21-day streak by Jun 5"],money:["14 videos posted","First 100 views"],career:["Draft 3 cover letter templates"],mind:["Finish ch. 4-5, apply retrieval to Arabic"],life:["Plan fishing trip #1 date","Review first 2 weeks honestly"]}},
  {n:4,dates:"Jun 6–12",phase:"Build",goals:{body:["Introduce deadlifts and squats","160g+ protein every day"],arabic:["Weekly self-quiz locked in","80+ flashcards"],quran:["Begin memorising target surah — 3 ayahs/day"],money:["21 videos total","First $100 earned"],career:["Send first 3 internship applications"],mind:["Finish Make It Stick"],life:["30-day bad habit checkpoint"]}},
  {n:5,dates:"Jun 13–19",phase:"Build",goals:{body:["Track weekly strength gains","Sunday weigh-in: ~155 lbs"],arabic:["Mock test: Arabic ch. 1 from scratch"],quran:["6 ayahs memorised"],money:["28 videos posted","Experiment with new hook style"],career:["5 total apps sent","5 LinkedIn connections in field"],mind:["Write 1-page Make It Stick summary"],life:["Plan fishing trip #1"]}},
  {n:6,dates:"Jun 20–26",phase:"Build",goals:{body:["Weigh-in: ~156-158 lbs","Posture photo comparison"],arabic:["Review all weak areas","Add listening 15 min/day"],quran:["Half of surah memorised"],money:["35 videos posted","First $500"],career:["8 apps sent","Follow up on first batch"],mind:["Apply spaced repetition to Arabic + career daily"],life:["Fishing trip #1 — go"]}},
  {n:7,dates:"Jun 27–Jul 3",phase:"Build",goals:{body:["All lifts up 5-10% from week 4"],arabic:["Full chapter mock test — grade it"],quran:["Full surah memorised"],money:["42 videos posted","Analyse top 3 videos"],career:["10 apps sent","Research interview Q&A"],mind:["Apply retrieval to internship prep"],life:["Halfway — journal 10 mins"]}},
  {n:8,dates:"Jul 4–10",phase:"Build",goals:{body:["Weigh-in — on track for 160+?","New exercise per muscle group"],arabic:["Explain a topic in Arabic out loud"],quran:["Start second surah"],money:["49 videos posted","$2,000 earned"],career:["13 apps sent","Draft top 5 interview answers"],mind:["Apply interleaving to Arabic + career"],life:["Full rest day 1x — no guilt"]}},
  {n:9,dates:"Jul 11–17",phase:"Build",goals:{body:["Deload week — lighter, more sleep","Document gains vs week 1"],arabic:["Final Build-phase mock test"],quran:["10 ayahs of second surah"],money:["56 videos posted","$3,500-5k earned","Pitch editing to 1 business"],career:["15 apps sent","1 interview secured"],mind:["Summer learning journal entry #2"],life:["Pack for trip — let go"]}},
  {n:10,dates:"Jul 18–24",phase:"Trip ✈️",goals:{body:["Bodyweight only","Sleep 8hrs, eat clean"],arabic:["15-min flashcards only"],quran:["More Quran — worship time"],money:["10 videos pre-scheduled","Zero income stress"],career:["Rest"],mind:["Journal: what are you learning?"],life:["No screens after 9pm","Make dua","Explore fully"]}},
  {n:11,dates:"Jul 25–31",phase:"Trip ✈️",goals:{body:["Stay active — walks, swims","Return rested"],arabic:["Light review only"],quran:["Daily recitation maintained"],money:["Scheduled content posting","Brainstorm new angles"],career:["Rest — come back sharp"],mind:["Return with 3 new ideas"],life:["Return grateful and recharged"]}},
  {n:12,dates:"Aug 1–7",phase:"Final Push",goals:{body:["Back in gym — pick up where you left off","Weigh-in: target 160-163 lbs"],arabic:["Full revision restart — all chapters"],quran:["Resume second surah memorisation"],money:["77 videos posted","$6k earned","Launch editing service if not done"],career:["3 apps/week minimum","Prep fall recruiting"],mind:["Review Make It Stick — apply to senior year"],life:["Recommit — final push is NOW"]}},
  {n:13,dates:"Aug 8–14",phase:"Final Push",goals:{body:["Peak training — 5x/week","All lifts at personal best"],arabic:["Mock test: full syllabus from scratch"],quran:["Second surah fully memorised"],money:["84 videos posted","$7,500 earned"],career:["6+ apps this week","2+ interviews scheduled"],mind:["Mock interview with a friend"],life:["Fishing trip #2"]}},
  {n:14,dates:"Aug 15–21",phase:"Final Push",goals:{body:["Weigh-in: 163-167 lbs","Progress photos — compare to day 1"],arabic:["Final revision — exam-ready","30-min daily oral practice"],quran:["Reflect on carrying habit into senior year"],money:["91 videos posted","$9k+ earned","Apply YT Partner Program"],career:["10 apps this phase","1 offer or active pipeline"],mind:["Write what I learned this summer"],life:["Senior year intentions written"]}},
  {n:15,dates:"Aug 22–28",phase:"Final Push",goals:{body:["Final weigh-in: 165-170 lbs","Document it fully"],arabic:["Ready for class — confident"],quran:["Quran habit locked into fall"],money:["100 videos posted","$10,000 earned","Document what worked"],career:["Senior year pipeline set","Resume polished"],mind:["You finished Make It Stick and lived it"],life:["Full summer debrief","Enter senior year as a different person"]}},
  {n:16,dates:"Aug 29–Sep 1",phase:"Final Push",goals:{body:["Last gym sessions — celebrate progress"],arabic:["Quick final review — you're ready"],quran:["Gratitude recitation — thank Allah for the summer"],money:["Final revenue count — hit $10k?","Plan how to keep channel running in school"],career:["All apps in — just wait and follow up"],mind:["Read your summer journal — be proud"],life:["Rest — senior year starts now"]}},
];

const MONTHS = [
  {name:"May",dates:"May 16-31",emoji:"🌱",phase:"Launch",goals:{body:["Join gym + 5x/week","Posture routine daily from day 1","Log starting weight (153 lbs) + photos"],arabic:["Audit all class notes","Set up Anki/Quizlet","Identify every weak area"],quran:["Start recitation streak — day 1","Set daily page goal"],money:["Choose niche","Set up YouTube + TikTok + tools","Post 14+ videos in first 2 weeks","Earn first dollar"],career:["Update resume + LinkedIn","Build target company list (20+)"],mind:["Get Make It Stick","Read at least 4 chapters"],life:["Day 1 quitting bad habits — no turning back","Choose and commit to one daily schedule"]}},
  {name:"June",dates:"Jun 1-30",emoji:"📈",phase:"Build",goals:{body:["Progressive overload every week","Sunday weigh-ins","Target: 156-160 lbs","Posture improving"],arabic:["Weekly self-quiz locked in","80+ flashcard deck","Full chapter mock test"],quran:["First surah memorised","No days missed"],money:["49+ videos posted","First $500 earned","Analyse top 3","Offer editing to 1 client"],career:["10+ apps sent","5+ LinkedIn connections","Cover letters ready"],mind:["Finish Make It Stick","Write personal summary","Apply retrieval daily"],life:["30-day streak","Fishing trip #1","Halfway reflection"]}},
  {name:"July",dates:"Jul 1-31",emoji:"✈️",phase:"Build+Trip",goals:{body:["Stay active on trip","Deload week done","Return rested"],arabic:["Final Build mock test","Light review on trip"],quran:["Daily on trip","Second surah started"],money:["$5k earned by Jul 13","63+ videos","14 pre-scheduled","Fresh ideas from trip"],career:["15+ apps total","1 interview secured"],mind:["Journal during trip","3 new ideas on return"],life:["Trip enjoyed","Returned recharged"]}},
  {name:"Aug",dates:"Aug 1-Sep 1",emoji:"🏁",phase:"Final Push",goals:{body:["5x/week peak phase","Final weigh-in: 165-170","Personal bests","Before/after documented"],arabic:["Full syllabus revised","Exam-ready","Oral practice daily"],quran:["Second surah memorised","Habit into senior year"],money:["100 videos posted","$10k earned","YT Partner applied","System documented"],career:["10+ apps","1-2 interviews active","Fall pipeline locked"],mind:["Summer journal complete","Make It Stick applied"],life:["Fishing trip #2","Senior year intentions","Full debrief","Enter Sep 1 different"]}},
];

// ── SCHEDULE BUILDER ─────────────────────────────────────────────────────────
function buildBlocks(type, p) {
  if (!p) return [];
  const {fH,fM,dH,dM,aH,aM,mgH,mgM,fajr,dhuhr,asr,maghrib,isha} = p;
  const w = addM(fH,fM,60); // wake = fajr+1h

  if (type === "morning") return [
    {time:fajr,     dur:"20 min", cat:"quran",  tp:"salah",   label:"🌅 Fajr salah + morning adhkar"},
    {time:addM(fH,fM,20),dur:"30 min",cat:"quran", tp:"worship", label:"📖 Quran recitation (1-2 pages)"},
    {time:addM(fH,fM,50),dur:"10 min",cat:"body",  tp:"task",    label:"Posture — dead hangs, face pulls"},
    {time:w,        dur:"15 min", cat:"life",   tp:"free",    label:"🍳 Pre-workout meal + get ready"},
    {time:addM(fH,fM,75), dur:"75 min",cat:"body",  tp:"task",  label:"🏋️ GYM — heavy lifts (Mon/Tue/Thu/Fri/Sat)"},
    {time:addM(fH,fM,150),dur:"30 min",cat:"body",  tp:"free",  label:"🚿 Shower + protein breakfast"},
    {time:addM(fH,fM,180),dur:"90 min",cat:"money", tp:"task",  label:"🎬 AI Content — script + record video"},
    {time:addM(fH,fM,270),dur:"30 min",cat:"money", tp:"task",  label:"🎬 Edit + post + engage comments"},
    {time:addM(fH,fM,300),dur:"30 min",cat:"arabic",tp:"task",  label:"📖 Arabic — retrieval practice"},
    {time:addM(fH,fM,330),dur:"30 min",cat:"arabic",tp:"task",  label:"📖 Arabic — write 5 sentences from memory"},
    {time:addM(fH,fM,360),dur:"30 min",cat:"mind",  tp:"task",  label:"🧠 Read Make It Stick — 20 pages"},
    {time:addM(fH,fM,390),dur:"60 min",cat:"life",  tp:"free",  label:"🥗 Lunch + chill — no screen"},
    {time:addM(fH,fM,450),dur:"30 min",cat:"career",tp:"task",  label:"💼 Internship app or LinkedIn outreach"},
    {time:dhuhr,    dur:"15 min", cat:"quran",  tp:"salah",   label:"☀️ Dhuhr salah"},
    {time:addM(dH,dM,15), dur:"75 min",cat:"money", tp:"task",  label:"🎬 Content research — plan next 3 videos"},
    {time:addM(dH,dM,90), dur:"90 min",cat:"life",  tp:"free",  label:"🛋 Free time — nap, walk, whatever"},
    {time:asr,      dur:"15 min", cat:"quran",  tp:"salah",   label:"🌤 Asr salah"},
    {time:addM(aH,aM,15), dur:"45 min",cat:"life",  tp:"free",  label:"☀️ Outside time — walk, decompress"},
    {time:addM(aH,aM,60), dur:"75 min",cat:"life",  tp:"free",  label:"🍽 Dinner + family time"},
    {time:maghrib,  dur:"15 min", cat:"quran",  tp:"salah",   label:"🌇 Maghrib salah"},
    {time:addM(mgH,mgM,15),dur:"45 min",cat:"life", tp:"free", label:"🛋 Wind down — no heavy work"},
    {time:addM(mgH,mgM,60),dur:"30 min",cat:"life", tp:"task", label:"📋 Plan tomorrow — checklist review"},
    {time:isha,     dur:"15 min", cat:"quran",  tp:"salah",   label:"🌙 Isha salah + dua"},
  ];

  if (type === "evening") return [
    {time:fajr,     dur:"20 min", cat:"quran",  tp:"salah",   label:"🌅 Fajr salah + morning adhkar"},
    {time:addM(fH,fM,20),dur:"30 min",cat:"quran", tp:"worship", label:"📖 Quran recitation (1-2 pages)"},
    {time:w,        dur:"30 min", cat:"life",   tp:"free",    label:"🍳 Wake up — big breakfast, get dressed"},
    {time:addM(fH,fM,90), dur:"90 min",cat:"money", tp:"task",  label:"🎬 AI Content deep work — script + record"},
    {time:addM(fH,fM,180),dur:"30 min",cat:"money", tp:"task",  label:"🎬 Edit + post + engage"},
    {time:addM(fH,fM,210),dur:"45 min",cat:"arabic",tp:"task",  label:"📖 Arabic — retrieval practice"},
    {time:addM(fH,fM,255),dur:"30 min",cat:"arabic",tp:"task",  label:"📖 Arabic — write 5 sentences from memory"},
    {time:addM(fH,fM,285),dur:"30 min",cat:"mind",  tp:"task",  label:"🧠 Read Make It Stick — 20 pages"},
    {time:addM(fH,fM,315),dur:"60 min",cat:"life",  tp:"free",  label:"🥗 Lunch + break"},
    {time:dhuhr,    dur:"15 min", cat:"quran",  tp:"salah",   label:"☀️ Dhuhr salah"},
    {time:addM(dH,dM,15), dur:"60 min",cat:"career",tp:"task",  label:"💼 Internship apps / resume / networking"},
    {time:addM(dH,dM,75), dur:"60 min",cat:"money", tp:"task",  label:"🎬 Content research + plan next 3 videos"},
    {time:addM(dH,dM,135),dur:"25 min",cat:"life",  tp:"free",  label:"🍌 Pre-workout snack + get ready"},
    {time:addM(dH,dM,160),dur:"20 min",cat:"body",  tp:"task",  label:"Posture routine before gym"},
    {time:addM(dH,dM,180),dur:"80 min",cat:"body",  tp:"task",  label:"🏋️ GYM — heavy lifts (Mon/Tue/Thu/Fri/Sat)"},
    {time:asr,      dur:"15 min", cat:"quran",  tp:"salah",   label:"🌤 Asr salah (at gym or right after)"},
    {time:addM(aH,aM,15), dur:"35 min",cat:"body",  tp:"free",  label:"🚿 Shower + protein meal"},
    {time:addM(aH,aM,50), dur:"90 min",cat:"life",  tp:"free",  label:"🍽 Dinner + family / free time"},
    {time:addM(mgH,mgM,-30),dur:"30 min",cat:"life",tp:"free", label:"🚶 Evening walk outside"},
    {time:maghrib,  dur:"15 min", cat:"quran",  tp:"salah",   label:"🌇 Maghrib salah"},
    {time:addM(mgH,mgM,15),dur:"30 min",cat:"life", tp:"task", label:"📋 Plan tomorrow + checklist"},
    {time:addM(mgH,mgM,45),dur:"30 min",cat:"life", tp:"free", label:"🛋 Wind down — phone down"},
    {time:isha,     dur:"20 min", cat:"quran",  tp:"salah",   label:"🌙 Isha salah + dua"},
  ];

  return [
    {time:fajr,     dur:"20 min", cat:"quran",  tp:"salah",   label:"🌅 Fajr salah + morning adhkar"},
    {time:addM(fH,fM,20),dur:"25 min",cat:"quran", tp:"worship", label:"📖 Quran recitation"},
    {time:w,        dur:"45 min", cat:"life",   tp:"free",    label:"🍳 Wake up, eat, get right"},
    {time:addM(fH,fM,105),dur:"45 min",cat:"arabic",tp:"task", label:"📖 Arabic — retrieval quiz first thing"},
    {time:addM(fH,fM,150),dur:"90 min",cat:"money", tp:"task",  label:"🎬 AI Content — script + record"},
    {time:addM(fH,fM,240),dur:"30 min",cat:"money", tp:"task",  label:"🎬 Post video + engage"},
    {time:addM(fH,fM,270),dur:"30 min",cat:"mind",  tp:"task",  label:"🧠 Make It Stick — 20 pages"},
    {time:addM(fH,fM,300),dur:"30 min",cat:"arabic",tp:"task",  label:"📖 Arabic sentences + flashcards"},
    {time:addM(fH,fM,330),dur:"50 min",cat:"life",  tp:"free",  label:"🥗 Lunch + decompress"},
    {time:dhuhr,    dur:"15 min", cat:"quran",  tp:"salah",   label:"☀️ Dhuhr salah"},
    {time:addM(dH,dM,15), dur:"varies",cat:"body",  tp:"task",  label:"🏋️ GYM — go when energy hits (aim before Asr)"},
    {time:addM(dH,dM,105),dur:"30 min",cat:"career",tp:"task",  label:"💼 Internship app or networking"},
    {time:addM(dH,dM,135),dur:"60 min",cat:"life",  tp:"free",  label:"🛋 Free block — recharge"},
    {time:asr,      dur:"15 min", cat:"quran",  tp:"salah",   label:"🌤 Asr salah"},
    {time:addM(aH,aM,15), dur:"60 min",cat:"money", tp:"task",  label:"🎬 Content research or client work"},
    {time:addM(aH,aM,75), dur:"30 min",cat:"body",  tp:"task",  label:"Posture routine + 10-min walk"},
    {time:addM(aH,aM,105),dur:"90 min",cat:"life",  tp:"free",  label:"🍽 Dinner + chill"},
    {time:maghrib,  dur:"15 min", cat:"quran",  tp:"salah",   label:"🌇 Maghrib salah"},
    {time:addM(mgH,mgM,15),dur:"30 min",cat:"life", tp:"task", label:"📋 Plan tomorrow + checklist"},
    {time:addM(mgH,mgM,45),dur:"45 min",cat:"life", tp:"free", label:"🛋 Your time — no agenda"},
    {time:isha,     dur:"20 min", cat:"quran",  tp:"salah",   label:"🌙 Isha salah + dua"},
  ];
}

// ── MINI COMPONENTS ──────────────────────────────────────────────────────────
const D = "#0f0f0f", D2 = "#161616", D3 = "#1a1a1a", BOR = "#2a2a2a";

function Card({children, style}) {
  return <div style={{background:D3,border:"0.5px solid "+BOR,borderRadius:14,...style}}>{children}</div>;
}

function TaskRow({id, cat, label, state, onDone, onSkip, onReset}) {
  const c = CAT[cat];
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderTop:"0.5px solid "+BOR,opacity:state==="skip"?.35:1}}>
      <span style={{flex:1,fontSize:13,lineHeight:1.5,color:state==="done"?"#555":"#ddd",textDecoration:state==="done"?"line-through":"none"}}>{label}</span>
      <div style={{display:"flex",gap:4}}>
        {!state && <>
          <button onClick={onDone} style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",background:c.bg,color:c.color,fontSize:13,fontWeight:700}}>✓</button>
          <button onClick={onSkip} style={{width:28,height:28,borderRadius:7,border:"0.5px solid #333",cursor:"pointer",background:"transparent",color:"#555",fontSize:14}}>–</button>
        </>}
        {state && <button onClick={onReset} style={{width:28,height:28,borderRadius:7,border:"0.5px solid #333",cursor:"pointer",background:"transparent",color:"#555",fontSize:12}}>↩</button>}
      </div>
    </div>
  );
}

function GoalRow({id, label, state, onToggle}) {
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderTop:"0.5px solid "+BOR,opacity:state==="skip"?.35:1}}>
      <span style={{flex:1,fontSize:13,lineHeight:1.5,color:state==="done"?"#555":"#ddd",textDecoration:state==="done"?"line-through":"none"}}>{label}</span>
      <div style={{display:"flex",gap:4}}>
        {!state && <>
          <button onClick={()=>onToggle(id,"done")} style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",background:"#112B1F",color:"#5DD4A0",fontSize:13,fontWeight:700}}>✓</button>
          <button onClick={()=>onToggle(id,"skip")} style={{width:28,height:28,borderRadius:7,border:"0.5px solid #333",cursor:"pointer",background:"transparent",color:"#555",fontSize:14}}>–</button>
        </>}
        {state && <button onClick={()=>onToggle(id,null)} style={{width:28,height:28,borderRadius:7,border:"0.5px solid #333",cursor:"pointer",background:"transparent",color:"#555",fontSize:12}}>↩</button>}
      </div>
    </div>
  );
}

function SBlock({b}) {
  const s = b.tp==="salah"  ? {bg:"#1A1830",color:"#B5B0F5",bdr:"#3A3570"}
          : b.tp==="worship"? {bg:"#0D1F35",color:"#7BB8F5",bdr:"#1A3D6B"}
          : b.tp==="task"   ? {bg:CAT[b.cat].bg,color:CAT[b.cat].color,bdr:BOR}
          :                   {bg:D3,color:"#888",bdr:BOR};
  return (
    <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:8,marginBottom:6,alignItems:"start"}}>
      <div style={{textAlign:"right",paddingTop:6}}>
        <div style={{fontSize:11,color:"#555",fontWeight:500}}>{b.time}</div>
        <div style={{fontSize:10,color:"#444"}}>{b.dur}</div>
      </div>
      <div style={{background:s.bg,borderRadius:8,padding:"6px 10px",border:"0.5px solid "+s.bdr}}>
        <span style={{fontSize:13,color:s.color,lineHeight:1.5}}>{b.label}</span>
      </div>
    </div>
  );
}

function CatSection({cat, items, open, onToggle, doneCount, skipCount, keyPfx, states, onDone, onSkip, onReset, isGoal, onGoalToggle}) {
  const c = CAT[cat];
  return (
    <div style={{border:"0.5px solid "+BOR,borderRadius:12,marginBottom:8,overflow:"hidden",background:D2}}>
      <div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:8,padding:"11px 13px",cursor:"pointer"}}>
        <span style={{fontSize:15}}>{c.emoji}</span>
        <span style={{flex:1,fontSize:13,fontWeight:500,color:"#ddd"}}>{c.label}</span>
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:20,background:c.bg,color:c.color,fontWeight:500}}>{doneCount}/{items.length}</span>
        {skipCount>0 && <span style={{fontSize:11,color:"#444"}}>{skipCount} skip</span>}
        <span style={{fontSize:11,color:"#444"}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{padding:"0 13px 10px"}}>
          {items.map((label,i) => {
            const id = keyPfx+"-"+i;
            if (isGoal) return <GoalRow key={id} id={id} label={label} state={states[id]} onToggle={onGoalToggle}/>;
            return <TaskRow key={id} id={id} cat={cat} label={label} state={states[id]} onDone={()=>onDone(id)} onSkip={()=>onSkip(id)} onReset={()=>onReset(id)}/>;
          })}
        </div>
      )}
    </div>
  );
}

function DonutChart({states}) {
  const cats = Object.keys(CAT);
  const done = cats.reduce((a,c)=>a+DAILY[c].filter((_,i)=>states[c+"-"+i]==="done").length,0);
  const skip = cats.reduce((a,c)=>a+DAILY[c].filter((_,i)=>states[c+"-"+i]==="skip").length,0);
  const pct = Math.round(done/TOTAL_DAILY*100);
  const CX=150,CY=150,R=68;
  const ap = (s,e)=>{
    if(e-s>=360)e=s+359.99;
    const r2d=d=>(d-90)*Math.PI/180;
    const x1=CX+R*Math.cos(r2d(s)),y1=CY+R*Math.sin(r2d(s));
    const x2=CX+R*Math.cos(r2d(e)),y2=CY+R*Math.sin(r2d(e));
    return "M"+x1+" "+y1+" A"+R+" "+R+" 0 "+(e-s>180?1:0)+" 1 "+x2+" "+y2;
  };
  let cur=0;
  const slices=cats.map(cat=>{
    const ts=DAILY[cat],n=ts.length,deg=(n/TOTAL_DAILY)*360;
    const d=ts.filter((_,i)=>states[cat+"-"+i]==="done").length;
    const sk=ts.filter((_,i)=>states[cat+"-"+i]==="skip").length;
    const sl={cat,n,d,sk,start:cur,end:cur+deg};cur+=deg;return sl;
  });
  return (
    <svg viewBox="0 0 300 300" width="100%" style={{maxWidth:300,display:"block",margin:"0 auto"}}>
      {slices.map((s,i)=><path key={"bg"+i} d={ap(s.start+1,s.end-1)} fill="none" stroke="#222" strokeWidth={20} strokeLinecap="round"/>)}
      {slices.map((s,i)=>{
        if(!s.d)return null;
        const dd=(s.d/s.n)*(s.end-s.start);
        return <path key={"d"+i} d={ap(s.start+1,s.start+dd)} fill="none" stroke={CAT[s.cat].accent} strokeWidth={20} strokeLinecap="round"/>;
      })}
      {slices.map((s,i)=>{
        if(!s.sk)return null;
        const dd=(s.d/s.n)*(s.end-s.start),sd=(s.sk/s.n)*(s.end-s.start);
        return <path key={"sk"+i} d={ap(s.start+1+dd,s.start+dd+sd)} fill="none" stroke="#333" strokeWidth={20} strokeLinecap="round" strokeDasharray="4 3"/>;
      })}
      {slices.map((s,i)=>{
        const mid=(s.start+s.end)/2,mr=(mid-90)*Math.PI/180;
        return <text key={"l"+i} x={CX+(R+38)*Math.cos(mr)} y={CY+(R+38)*Math.sin(mr)} textAnchor="middle" dominantBaseline="middle" fontSize="14">{CAT[s.cat].emoji}</text>;
      })}
      <text x={CX} y={CY-14} textAnchor="middle" fontSize="34" fontWeight="700" fill={pctColor(pct)}>{pct}%</text>
      <text x={CX} y={CY+10} textAnchor="middle" fontSize="12" fill="#555">today complete</text>
      <text x={CX} y={CY+26} textAnchor="middle" fontSize="11" fill="#444">{done} done · {skip} skipped</text>
    </svg>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]   = useState("home");
  const [dSt,setDS]    = useState({});
  const [wSt,setWS]    = useState({});
  const [mSt,setMS]    = useState({});
  const [oCat,setOC]   = useState({body:true,money:true,quran:true,arabic:false,career:false,mind:false,life:false});
  const [selW,setSW]   = useState(1);
  const [selM,setSM]   = useState(0);
  const [oWC,setOWC]   = useState({});
  const [oMC,setOMC]   = useState({});
  const [sched,setSched]= useState("morning");
  const [showCon,setSC] = useState(false);

  const today   = new Date();
  const todayStr= today.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  const prayer  = getPrayer(today);
  const blocks  = buildBlocks(sched, prayer);

  const dailyDone = Object.keys(CAT).reduce((a,c)=>a+DAILY[c].filter((_,i)=>dSt[c+"-"+i]==="done").length,0);
  const dailyPct  = Math.round(dailyDone/TOTAL_DAILY*100);

  const wk   = WEEKS[selW-1];
  const mo   = MONTHS[selM];
  const wIDs = Object.entries(wk.goals).flatMap(([c,gs])=>gs.map((_,i)=>"w"+selW+"-"+c+"-"+i));
  const wDone= wIDs.filter(id=>wSt[id]==="done").length;
  const wPct = wIDs.length ? Math.round(wDone/wIDs.length*100) : 0;
  const mIDs = Object.entries(mo.goals).flatMap(([c,gs])=>gs.map((_,i)=>"m"+selM+"-"+c+"-"+i));
  const mDone= mIDs.filter(id=>mSt[id]==="done").length;
  const mPct = mIDs.length ? Math.round(mDone/mIDs.length*100) : 0;

  const doDone  = id => setDS(p=>({...p,[id]:"done"}));
  const doSkip  = id => setDS(p=>({...p,[id]:"skip"}));
  const doReset = id => setDS(p=>{const n={...p};delete n[id];return n;});
  const togGoal = (setter)=>(id,val)=>setter(p=>val===null?{...p,[id]:undefined}:{...p,[id]:val});

  const TABS=[["home","🏠"],["daily","☀️"],["week","📅"],["month","🗓"],["schedule","🕐"],["chart","📊"]];
  const tabLabel={"home":"Home","daily":"Daily","week":"Weekly","month":"Monthly","schedule":"Schedule","chart":"Chart"};

  return (
    <div style={{padding:"0.75rem",fontFamily:"system-ui,sans-serif",maxWidth:500,margin:"0 auto",background:D,minHeight:"100vh",color:"#e8e8e8"}}>

      {/* top bar */}
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:11,color:"#555"}}>{todayStr}</span>
          <span style={{fontSize:11,fontWeight:600,color:pctColor(dailyPct)}}>{dailyDone}/{TOTAL_DAILY}</span>
        </div>
        <div style={{height:4,background:"#1e1e1e",borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:dailyPct+"%",background:pctColor(dailyPct),borderRadius:2,transition:"width .4s"}}/>
        </div>
      </div>

      {/* tab bar */}
      <div style={{display:"flex",marginBottom:12,background:D2,borderRadius:10,overflow:"hidden",border:"0.5px solid "+BOR}}>
        {TABS.map(([v,icon])=>(
          <button key={v} onClick={()=>setTab(v)} style={{flex:1,fontSize:10,padding:"8px 2px",border:"none",cursor:"pointer",background:tab===v?"#252525":"transparent",color:tab===v?"#e8e8e8":"#555",fontWeight:tab===v?700:400}}>
            <div>{icon}</div><div style={{fontSize:9,marginTop:1}}>{tabLabel[v]}</div>
          </button>
        ))}
      </div>

      {/* HOME */}
      {tab==="home" && (
        <div style={{paddingBottom:24}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:40,marginBottom:10}}>🌙</div>
            <p style={{fontSize:11,color:"#555",letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 4px"}}>{todayStr}</p>
            <h1 style={{fontSize:24,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>Welcome back, Sir 👑</h1>
            <p style={{fontSize:12,color:"#555",margin:0}}>Summer 2026 · May 16 – Sep 1</p>
          </div>

          {prayer && (
            <Card style={{padding:"12px 16px",marginBottom:10}}>
              <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>🕌 Today's Salah — Westfield MA</div>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                {[["🌅","Fajr",prayer.fajr],["☀️","Dhuhr",prayer.dhuhr],["🌤","Asr",prayer.asr],["🌇","Maghrib",prayer.maghrib],["🌙","Isha",prayer.isha]].map(([e,n,t])=>(
                  <div key={n} style={{textAlign:"center",flex:1}}>
                    <div style={{fontSize:13}}>{e}</div>
                    <div style={{fontSize:10,fontWeight:600,color:"#8B88E0"}}>{n}</div>
                    <div style={{fontSize:11,color:"#7F77DD"}}>{t}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
            {[{label:"Today",val:dailyPct+"%",sub:dailyDone+"/"+TOTAL_DAILY+" tasks",pct:dailyPct},{label:"Week "+selW,val:wPct+"%",sub:wDone+"/"+wIDs.length+" goals",pct:wPct},{label:mo.name,val:mPct+"%",sub:mDone+"/"+mIDs.length+" goals",pct:mPct}].map((r,i)=>(
              <Card key={i} style={{padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:700,color:pctColor(r.pct)}}>{r.val}</div>
                <div style={{fontSize:10,fontWeight:600,color:"#aaa",margin:"2px 0"}}>{r.label}</div>
                <div style={{fontSize:9,color:"#555"}}>{r.sub}</div>
              </Card>
            ))}
          </div>

          <Card style={{padding:"14px 16px",marginBottom:10}}>
            <div style={{fontSize:11,color:"#555",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.1em"}}>Daily reminder</div>
            <div style={{fontSize:14,color:"#ccc",lineHeight:1.7,fontStyle:"italic"}}>"Verily, with hardship comes ease."</div>
            <div style={{fontSize:11,color:"#444",marginTop:4}}>— Quran 94:6</div>
          </Card>

          <div style={{fontSize:11,color:"#555",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.1em",textAlign:"center"}}>Jump to</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
            {[["☀️ Daily Checklist","daily","#1D9E75"],["📅 This Week","week","#2E86DE"],["🗓 Monthly Goals","month","#E88B1A"],["🕐 My Schedule","schedule","#7F77DD"],["📊 Progress Chart","chart","#D05A8A"]].map(([l,v,col])=>(
              <button key={v} onClick={()=>setTab(v)} style={{padding:"12px 10px",borderRadius:10,border:"0.5px solid "+BOR,background:D3,color:"#ddd",fontSize:12,fontWeight:500,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:3,height:24,borderRadius:2,background:col,flexShrink:0}}/>
                {l}
              </button>
            ))}
          </div>

          <Card style={{padding:"14px 16px"}}>
            <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>Summer targets</div>
            {[["💪","Body","153 → 165–170 lbs by Sep 1"],["🎬","AI Content","$10,000 + 100 videos posted"],["📖","Arabic","Class-ready and confident"],["🌙","Quran","Daily + 2 surahs memorised"],["💼","Career","Senior year pipeline locked"]].map(([emoji,cat,goal])=>(
              <div key={cat} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderTop:"0.5px solid #222"}}>
                <span style={{fontSize:16}}>{emoji}</span>
                <div><div style={{fontSize:12,fontWeight:600,color:"#bbb"}}>{cat}</div><div style={{fontSize:11,color:"#555"}}>{goal}</div></div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* DAILY */}
      {tab==="daily" && <>
        {Object.entries(DAILY).map(([cat,tasks])=>{
          const done=tasks.filter((_,i)=>dSt[cat+"-"+i]==="done").length;
          const skip=tasks.filter((_,i)=>dSt[cat+"-"+i]==="skip").length;
          return <CatSection key={cat} cat={cat} items={tasks} open={oCat[cat]} onToggle={()=>setOC(p=>({...p,[cat]:!p[cat]}))} doneCount={done} skipCount={skip} keyPfx={cat} states={dSt} onDone={doDone} onSkip={doSkip} onReset={doReset} isGoal={false}/>;
        })}
        <button onClick={()=>setDS({})} style={{marginTop:4,width:"100%",padding:"9px 0",fontSize:12,color:"#444",background:"transparent",border:"0.5px solid "+BOR,borderRadius:10,cursor:"pointer"}}>↺ Reset today</button>
      </>}

      {/* WEEKLY */}
      {tab==="week" && <>
        <div style={{background:D2,border:"0.5px solid "+BOR,borderRadius:10,padding:"10px 13px",marginBottom:10}}>
          <div onClick={()=>setSC(p=>!p)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <span style={{fontSize:13,fontWeight:600,color:"#ddd"}}>🔁 Consistent Weekly Habits</span>
            <span style={{fontSize:11,color:"#444"}}>{showCon?"▲":"▼"}</span>
          </div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>Same every week — non-negotiable</div>
          {showCon && <div style={{marginTop:10}}>
            {Object.entries(WEEKLY_CONSISTENT).map(([cat,items])=>(
              <div key={cat} style={{marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:600,color:CAT[cat].color,marginBottom:3}}>{CAT[cat].emoji} {CAT[cat].label}</div>
                {items.map((item,i)=><div key={i} style={{fontSize:12,color:"#bbb",padding:"2px 0 2px 12px",lineHeight:1.5}}>→ {item}</div>)}
              </div>
            ))}
          </div>}
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
          {WEEKS.map(w=>(
            <button key={w.n} onClick={()=>setSW(w.n)} style={{fontSize:11,padding:"4px 10px",borderRadius:20,border:selW===w.n?"none":"0.5px solid #2a2a2a",background:selW===w.n?"#1D9E75":"transparent",color:selW===w.n?"#fff":"#555",cursor:"pointer",fontWeight:selW===w.n?600:400}}>Wk {w.n}</button>
          ))}
        </div>
        <div style={{background:D2,border:"0.5px solid "+BOR,borderRadius:10,padding:"10px 13px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div><span style={{fontSize:14,fontWeight:600,color:"#ddd"}}>Week {wk.n} </span><span style={{fontSize:12,color:"#555"}}>{wk.dates}</span></div>
            <span style={{fontSize:12,padding:"2px 9px",borderRadius:20,background:"#112B1F",color:pctColor(wPct),fontWeight:600}}>{wPct}%</span>
          </div>
          <div style={{height:5,background:"#1e1e1e",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:wPct+"%",background:pctColor(wPct),borderRadius:3,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:11,color:"#444",marginTop:4}}>{wk.phase} · {wDone}/{wIDs.length} goals</div>
        </div>
        {Object.entries(wk.goals).map(([cat,goals])=>{
          const ck="w"+selW+"-"+cat, open=oWC[ck]!==false;
          const done=goals.filter((_,i)=>wSt["w"+selW+"-"+cat+"-"+i]==="done").length;
          return <CatSection key={cat} cat={cat} items={goals} open={open} onToggle={()=>setOWC(p=>({...p,[ck]:!open}))} doneCount={done} skipCount={0} keyPfx={"w"+selW+"-"+cat} states={wSt} isGoal={true} onGoalToggle={togGoal(setWS)}/>;
        })}
      </>}

      {/* MONTHLY */}
      {tab==="month" && <>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {MONTHS.map((m,i)=>(
            <button key={i} onClick={()=>setSM(i)} style={{flex:1,fontSize:12,padding:"7px 4px",borderRadius:10,border:selM===i?"none":"0.5px solid "+BOR,background:selM===i?"#185FA5":"transparent",color:selM===i?"#fff":"#555",cursor:"pointer",fontWeight:selM===i?600:400}}>{m.emoji} {m.name}</button>
          ))}
        </div>
        <div style={{background:D2,border:"0.5px solid "+BOR,borderRadius:10,padding:"10px 13px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div><span style={{fontSize:14,fontWeight:600,color:"#ddd"}}>{mo.emoji} {mo.name}</span><span style={{fontSize:12,color:"#555",marginLeft:6}}>{mo.dates}</span></div>
            <span style={{fontSize:12,padding:"2px 9px",borderRadius:20,background:"#0D1F35",color:pctColor(mPct),fontWeight:600}}>{mPct}%</span>
          </div>
          <div style={{height:5,background:"#1e1e1e",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:mPct+"%",background:pctColor(mPct),borderRadius:3,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:11,color:"#444",marginTop:4}}>{mo.phase} · {mDone}/{mIDs.length} goals</div>
        </div>
        {Object.entries(mo.goals).map(([cat,goals])=>{
          const ck="m"+selM+"-"+cat, open=oMC[ck]!==false;
          const done=goals.filter((_,i)=>mSt["m"+selM+"-"+cat+"-"+i]==="done").length;
          return <CatSection key={cat} cat={cat} items={goals} open={open} onToggle={()=>setOMC(p=>({...p,[ck]:!open}))} doneCount={done} skipCount={0} keyPfx={"m"+selM+"-"+cat} states={mSt} isGoal={true} onGoalToggle={togGoal(setMS)}/>;
        })}
      </>}

      {/* SCHEDULE */}
      {tab==="schedule" && <>
        {prayer && (
          <div style={{background:"#1A1830",border:"0.5px solid #3A3570",borderRadius:12,padding:"12px 14px",marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:"#B5B0F5",marginBottom:8}}>🌙 Westfield MA — Today's Salah Times</div>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
              {[["🌅","Fajr",prayer.fajr],["☀️","Dhuhr",prayer.dhuhr],["🌤","Asr",prayer.asr],["🌇","Maghrib",prayer.maghrib],["🌙","Isha",prayer.isha]].map(([e,n,t])=>(
                <div key={n} style={{textAlign:"center"}}>
                  <div style={{fontSize:14}}>{e}</div>
                  <div style={{fontSize:11,fontWeight:600,color:"#8B88E0"}}>{n}</div>
                  <div style={{fontSize:11,color:"#7F77DD"}}>{t}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:"#555",marginTop:8}}>Schedule starts 1hr after Fajr ({prayer ? addM(prayer.fH,prayer.fM,60) : "—"}) · Updates daily automatically.</div>
          </div>
        )}
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {[["morning","🏋️ Morning Gym","#1D9E75"],["evening","🌆 Evening Gym","#185FA5"],["flexible","🌀 Flexible","#7F77DD"]].map(([id,label,col])=>(
            <button key={id} onClick={()=>setSched(id)} style={{flex:1,fontSize:11,padding:"8px 4px",borderRadius:10,border:sched===id?"none":"0.5px solid "+BOR,background:sched===id?col:"transparent",color:sched===id?"#fff":"#555",cursor:"pointer",fontWeight:sched===id?600:400,lineHeight:1.3}}>{label}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {[["#1A1830","#B5B0F5","🕌 Salah"],["#0D1F35","#7BB8F5","📖 Worship"],[D3,"#888","🛋 Free"],["#112B1F","#5DD4A0","✅ Task"]].map(([bg,col,l])=>(
            <span key={l} style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:bg,color:col}}>{l}</span>
          ))}
        </div>
        {blocks.map((b,i)=><SBlock key={i} b={b}/>)}
      </>}

      {/* CHART */}
      {tab==="chart" && <>
        <DonutChart states={dSt}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:12}}>
          {Object.entries(CAT).map(([cat,c])=>{
            const tasks=DAILY[cat];
            const done=tasks.filter((_,i)=>dSt[cat+"-"+i]==="done").length;
            const skip=tasks.filter((_,i)=>dSt[cat+"-"+i]==="skip").length;
            const pct=Math.round(done/tasks.length*100);
            return (
              <div key={cat} style={{background:D2,border:"0.5px solid "+BOR,borderRadius:10,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:12,fontWeight:500,color:"#ddd"}}>{c.emoji} {c.label}</span>
                  <span style={{fontSize:11,color:pctColor(pct)}}>{done}/{tasks.length}</span>
                </div>
                <div style={{height:5,background:"#1e1e1e",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:pct+"%",background:pctColor(pct),borderRadius:3,transition:"width .4s"}}/>
                </div>
                {skip>0 && <div style={{fontSize:10,color:"#444",marginTop:3}}>{skip} skipped</div>}
              </div>
            );
          })}
        </div>
        <div style={{marginTop:12,background:D2,border:"0.5px solid "+BOR,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:12,fontWeight:600,color:"#555",marginBottom:8}}>BIGGER PICTURE</div>
          {[{label:"Week "+selW+" ("+WEEKS[selW-1].dates+")",pct:wPct,done:wDone,total:wIDs.length},{label:mo.name+" ("+mo.dates+")",pct:mPct,done:mDone,total:mIDs.length}].map((row,i)=>(
            <div key={i} style={{marginBottom:i===0?10:0}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:"#bbb"}}>{row.label}</span>
                <span style={{fontSize:12,color:pctColor(row.pct)}}>{row.done}/{row.total}</span>
              </div>
              <div style={{height:5,background:"#1e1e1e",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:row.pct+"%",background:pctColor(row.pct),borderRadius:3,transition:"width .4s"}}/>
              </div>
            </div>
          ))}
        </div>
        {dailyPct===100 && <div style={{marginTop:14,textAlign:"center",fontSize:15,color:"#1D9E75",fontWeight:600}}>🎉 Perfect day. Allahu Akbar. Keep going.</div>}
      </>}

    </div>
  );
}