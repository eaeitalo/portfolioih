/* DARK MODE */

function toggleTheme(){
  document.body.classList.toggle("dark");
}

/* PROJETOS */

const projects = [
  {
    name:"ATM Simulator",
    desc:"Complete banking system implementation",
    link:"https://github.com/eaeitalo/ATM-Simulator"
  },
  {
    name:"Social Media API",
    desc:"RESTful API for social media platforms",
    link:"https://github.com/eaeitalo/social-media-api"
  },
  {
    name:"Appointment Scheduler",
    desc:"Complete appointment scheduling API",
    link:"https://github.com/eaeitalo/agendador-horarios"
  },
  {
    name:"OrderFlow",
    desc:"Order management system with Spring Boot, AWS and clean architecture",
    link:"https://github.com/eaeitalo/OrderFlow"
  }
];

const container = document.getElementById("projects");

projects.forEach(p=>{
  const div=document.createElement("div");
  div.className="project";

  div.innerHTML=`
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
  `;

  div.onclick=()=>window.open(p.link,"_blank");

  container.appendChild(div);
});

/* SCROLL ANIMATION */

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-in")
.forEach(el=>observer.observe(el));

/* ============================= */
/* PARTICLES + SNAKE CYBER 🔥 */
/* ============================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const snakeCanvas = document.getElementById("snake");
const sctx = snakeCanvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

snakeCanvas.width = window.innerWidth;
snakeCanvas.height = 200;

/* PARTICLES */

let particlesArray = [];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2 + 1;
  }

  update(){
    this.x += (Math.random()-0.5)*0.3;
    this.y += (Math.random()-0.5)*0.3;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle="rgba(172,88,233,0.5)";
    ctx.fill();
  }
}

/* SNAKE */

let snake = [];

for(let i=0;i<25;i++){
  snake.push({x: i*15, y: 100});
}

/* INTERAÇÃO */

function interact(){
  particlesArray.forEach(p=>{
    snake.forEach(seg=>{
      let dx = p.x - seg.x;
      let dy = p.y - (canvas.height - snakeCanvas.height + seg.y);
      let dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < 60){
        let force = (60 - dist) / 60;
        p.x += dx * force * 0.2;
        p.y += dy * force * 0.2;
      }
    });
  });
}

/* INIT */

function init(){
  particlesArray=[];
  for(let i=0;i<80;i++){
    particlesArray.push(new Particle());
  }
}

/* ANIMAÇÃO */

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  sctx.clearRect(0,0,snakeCanvas.width,snakeCanvas.height);

  /* partículas */
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });

  /* snake */
  snake.forEach((seg,i)=>{
    let size = 10 - i*0.25;

    sctx.beginPath();
    sctx.arc(seg.x, seg.y, size, 0, Math.PI*2);

    sctx.fillStyle="rgba(172,88,233,0.8)";
    sctx.shadowBlur=20;
    sctx.shadowColor="#AC58E9";
    sctx.fill();
  });

  /* movimento snake */
  for(let i=snake.length-1;i>0;i--){
    snake[i].x = snake[i-1].x;
    snake[i].y = snake[i-1].y;
  }

  snake[0].x += 2;
  snake[0].y = 100 + Math.sin(Date.now()*0.003)*25;

  if(snake[0].x > snakeCanvas.width + 100){
    snake.forEach((seg,i)=>{
      seg.x = -i*15;
    });
  }

  /* interação */
  interact();

  requestAnimationFrame(animate);
}

/* START */

init();
animate();

/* RESPONSIVO */

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  snakeCanvas.width = window.innerWidth;
});