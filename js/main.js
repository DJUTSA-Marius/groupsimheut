/* Groupe SIMHEUT — JS léger, sans dépendance */
(function(){
  "use strict";

  /* Menu mobile */
  var toggle=document.querySelector(".nav-toggle");
  var nav=document.getElementById("navigation");
  if(toggle&&nav){
    toggle.addEventListener("click",function(){
      var open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded",open?"true":"false");
    });
    /* Sous-menus en mobile */
    nav.querySelectorAll(".has-drop > a").forEach(function(a){
      a.addEventListener("click",function(e){
        if(window.innerWidth<=760){
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  }

  /* Révélation au scroll */
  var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items=document.querySelectorAll(".reveal");
  if(items.length){
    if(reduced||!("IntersectionObserver" in window)){
      items.forEach(function(el){el.classList.add("in");});
    }else{
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}
        });
      },{threshold:.12});
      items.forEach(function(el){io.observe(el);});
    }
  }

  /* Année du pied de page */
  var y=document.getElementById("year");
  if(y){y.textContent=new Date().getFullYear();}

  /* Filtres des réalisations */
  var filterBar=document.querySelector(".filters");
  if(filterBar){
    var cards=document.querySelectorAll(".work-card");
    filterBar.addEventListener("click",function(e){
      var btn=e.target.closest(".filter-btn");
      if(!btn){return;}
      filterBar.querySelectorAll(".filter-btn").forEach(function(b){
        b.setAttribute("aria-pressed",b===btn?"true":"false");
      });
      var f=btn.getAttribute("data-filter");
      cards.forEach(function(c){
        c.hidden=(f!=="all"&&c.getAttribute("data-branch")!==f);
      });
    });
  }

  /* Formulaire de contact (démonstration front-end) */
  var form=document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var status=document.getElementById("form-status");
      var required=form.querySelectorAll("[required]");
      var valid=true;
      required.forEach(function(f){
        f.style.borderColor="";
        if(!f.value.trim()){
          valid=false;f.style.borderColor="#B3261E";
        }
      });
      var email=form.querySelector("#email");
      if(email&&email.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        valid=false;email.style.borderColor="#B3261E";
      }
      if(!valid){
        status.className="form-status err";
        status.textContent="Merci de compléter les champs obligatoires (format e-mail valide requis).";
        status.setAttribute("role","alert");
        return;
      }
      status.className="form-status ok";
      status.textContent="Votre demande est prête à être envoyée. Branchez ce formulaire à votre service e-mail (voir note dans le code) pour l'activer en production.";
      form.reset();
    });
  }
})();