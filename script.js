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

  /* PARTICLES BACKGROUND */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2 + 0.5;
    this.speedX = (Math.random()-0.5)*0.3;
    this.speedY = (Math.random()-0.5)*0.3;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > canvas.width)
      this.speedX *= -1;

    if(this.y < 0 || this.y > canvas.height)
      this.speedY *= -1;
  }

  draw(){
    ctx.fillStyle = "rgba(172,88,233,0.5)";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray=[];
  for(let i=0;i<50;i++){
    particlesArray.push(new Particle());
  }
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  initParticles();
});