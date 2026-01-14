// ODLICZANIE
function updateCountdown() {
    const targetDate = new Date('2026-01-22T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((distance % (1000*60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('countdown').innerHTML = "<div style='font-size:1.5em; color:#d84b7b;'>Już wróciłaś! 🎉</div>";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// KOPERTA
function openEnvelope() { document.getElementById('wishEnvelope').classList.add('show'); }
function closeEnvelope() { document.getElementById('wishEnvelope').classList.remove('show'); }

// QUIZ
const quizQuestions = [
    { question: "Co oznacza „bycie dorosłym”?", options: ["Samodzielne kupowanie lodów o 3 w nocy","Płacenie rachunków i udawanie, że to fajne","Kupowanie mebli IKEA i składanie bez kłótni","Wszystko powyższe"] },
    { question: "Twój pierwszy obowiązkowy rachunek – co robisz?", options: ["Płacę z uśmiechem i radością","Ukrywam w szufladzie i udaję, że nie istnieje","Płaczę przez 10 minut, ale płacę","Wszystkie powyższe"] },
    { question: "Co jest najbardziej dorosłe w twoim życiu?", options: ["Mam własny kubek do kawy","Mam roślinę, która wciąż żyje","Umiejętnie kłamię, że „już idę spać”","Wszystko powyższe"] },
    { question: "Jak radzić sobie ze stresem dorosłego życia?", options: ["Pizza i Netflix","Kryzys zakupowy w sklepie z gadżetami","Rozmowa z kotem","Wszystko powyższe"] }
];

let currentQuestion = 0;
let score = 0;
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizBtn = document.getElementById('quizBtn');
const quizScore = document.getElementById('quizScore');

function loadQuestion() {
    quizQuestion.textContent = quizQuestions[currentQuestion].question;
    quizOptions.innerHTML = '';
    quizQuestions[currentQuestion].options.forEach((option) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.textContent = option;
        div.addEventListener('click', () => {
            document.querySelectorAll('.quiz-option').forEach(o=>o.classList.remove('selected'));
            div.classList.add('selected');
            score++;
        });
        quizOptions.appendChild(div);
    });
    quizBtn.textContent = currentQuestion < quizQuestions.length-1 ? 'Następne pytanie' : 'Zakończ quiz';
}
quizBtn.addEventListener('click', () => {
    if(!document.querySelector('.quiz-option.selected')) { alert("Wybierz odpowiedź!"); return; }
    currentQuestion++;
    if(currentQuestion<quizQuestions.length){ loadQuestion(); } 
    else {
        quizQuestion.textContent = `Twój wynik: ${score}/${quizQuestions.length}`;
        quizOptions.innerHTML = '';
        quizBtn.style.display='none';
        quizScore.textContent=`Punkty: ${score}/${quizQuestions.length}`;
        const comment=document.createElement('div');
        comment.style.marginTop='15px';
        comment.style.fontStyle='italic';
        comment.textContent="Brawo! W dorosłość wchodzisz perfekcyjnie!";
        quizScore.appendChild(comment);
    }
});
loadQuestion();

// MIŁOŚCIOMIERZ
function fillLove(){
    const bar = document.getElementById('loveBar');
    const container = document.getElementById('loveBarContainer');
    const percentDisplay = document.getElementById('lovePercent');
    bar.style.width='0';
    percentDisplay.textContent='0%';
    container.querySelectorAll('.floating-heart').forEach(h=>h.remove());
    let width=0;
    const interval = setInterval(()=>{
        if(width>=100){ clearInterval(interval); width=100; }
        bar.style.width = width+'%';
        percentDisplay.textContent = width+'%';
        width++;
    },20);

    let heartCount=0;
    const maxHearts = window.innerWidth<768?10:15;
    const heartInterval = setInterval(()=>{
        if(heartCount>=maxHearts){ clearInterval(heartInterval); return; }
        const heart=document.createElement('div');
        heart.className='floating-heart';
        heart.textContent='❤';
        heart.style.left=`${Math.random()*90}%`;
        container.appendChild(heart);
        setTimeout(()=>{ heart.style.bottom='100%'; heart.style.opacity=0; },50);
        setTimeout(()=>heart.remove(),2500);
        heartCount++;
    },150);
}

// Animacja tła i strona
function createPageHearts(){
    const totalHearts = window.innerWidth<768?10:20;
    for(let i=0;i<totalHearts;i++){
        const heart=document.createElement('div');
        heart.className='page-heart';
        heart.textContent='❤';
        heart.style.left=Math.random()*100+'%';
        heart.style.top=Math.random()*window.innerHeight+'px';
        heart.style.fontSize=(Math.random()*2+1)+'em';
        heart.style.animationDelay=(Math.random()*5)+'s';
        document.body.appendChild(heart);
    }
}
createPageHearts();

window.addEventListener('scroll',()=>{
    const scroll = window.scrollY;
    document.querySelector('header').style.transform = `translateY(${scroll*0.2}px)`;
});

const faders = document.querySelectorAll('.fade-in');
window.addEventListener('scroll',()=>{
    faders.forEach(el=>{
        const rect = el.getBoundingClientRect();
        if(rect.top<window.innerHeight-50){ el.classList.add('show'); }
    });
});

// Spadające serduszka
function createHeart(){
    const heart=document.createElement('div');
    heart.classList.add('falling-heart');
    heart.textContent='❤';
    const xPos=Math.floor(Math.random()*window.innerWidth);
    const size=Math.random()*20+10;
    const duration=Math.random()*5+5;
    heart.style.left=xPos+'px';
    heart.style.fontSize=size+'px';
    heart.style.animationDuration=duration+'s';
    heart.style.setProperty('--x',Math.floor(Math.random()*100-50)+'px');
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),duration*1000);
}
const fallInterval = window.innerWidth<768?400:200;
setInterval(createHeart,fallInterval);
