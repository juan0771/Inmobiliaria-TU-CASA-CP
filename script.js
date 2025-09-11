// Script compartido para index.html y propiedad.html

document.addEventListener('DOMContentLoaded', ()=>{

  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const toggleIcon = menuToggle ? menuToggle.querySelector('i') : null;

  // Menú hamburguesa con animación
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");

  if (navMenu.classList.contains("show")) {
    toggleIcon.classList.remove("fa-bars");
    toggleIcon.classList.add("fa-times");
  } else {
    toggleIcon.classList.remove("fa-times");
    toggleIcon.classList.add("fa-bars");
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuToggle.classList.remove("active");
    toggleIcon.classList.remove("fa-times");
    toggleIcon.classList.add("fa-bars");
  });
});

  /* Si estamos en index.html: asignar comportamiento de botones de cada tarjeta */
  if(location.pathname.endsWith('index.html') || location.pathname.endsWith('/') ){
    const cards = document.querySelectorAll('.cards .card');
    cards.forEach((card, i) => {
      const btn = card.querySelector('button, .btn, a.btn');
      if(!btn) return;
      // id basado en posición (1..N)
      const id = i + 1;
      btn.addEventListener('click', ()=> {
        location.href = `propiedad.html?id=${id}`;
      });
    });
  }

  /* Si estamos en propiedad.html: cargar datos según ?id= */
  if(location.pathname.endsWith('propiedad.html')){
    const properties = {
      "1": {
        title: "Casa en arriendo",
        address: "Normandia, Engativa / Carrera 71A # 53-65",
        desc: "Amplia casa de 3 habitaciones con jardín privado y garaje.",
        features: ["3 habitaciones","2 baños","Jardín","Garaje"],
        images: [
          "img/apto1/apto1.jpg",
          "img/apto1/apto2.jpg",
          "img/apto1/apto3.jpg",
          "img/apto1/apto1.jpg"
        ],
        lat: 4.676, lng: -74.110, whatsapp: "573156165943"
      },
      "2": {
        title:"Apartamento Moderno",
        address:"Plaza Central 5, Barcelona",
        desc:"Apartamento céntrico con diseño moderno y buena iluminación.",
        features:["2 habitaciones","1 baño","Terraza"],
        images:["https://picsum.photos/800/500?random=21","https://picsum.photos/800/500?random=22","https://picsum.photos/800/500?random=23"],
        lat:41.385064,lng:2.173404, whatsapp:"34600111222"
      },
      "3": {
        title:"Casa de Lujo",
        address:"Urbanización Elite, Marbella",
        desc:"Villa de lujo con piscina, spa y acabados premium.",
        features:["5 habitaciones","Piscina","Spa","Garaje"],
        images:["https://picsum.photos/800/500?random=31","https://picsum.photos/800/500?random=32","https://picsum.photos/800/500?random=33"],
        lat:36.510071,lng:-4.882477, whatsapp:"34600111222"
      },
      "4": {
        title:"Chalet con Jardín",
        address:"C/ Tranquila 7, Sevilla",
        desc:"Ideal para familia, gran parcela y zona residencial.",
        features:["4 habitaciones","Parcela grande","Barbacoa"],
        images:["https://picsum.photos/800/500?random=41","https://picsum.photos/800/500?random=42"],
        lat:37.389092,lng:-5.984459, whatsapp:"34600111222"
      },
      "5": {
        title:"Ático Luminoso",
        address:"Av. Vistas 10, Valencia",
        desc:"Ático con terraza grande y excelentes vistas.",
        features:["2 habitaciones","Terraza amplia","Ascensor"],
        images:["https://picsum.photos/800/500?random=51","https://picsum.photos/800/500?random=52"],
        lat:39.469907,lng:-0.376288, whatsapp:"34600111222"
      },
      "6": {
        title:"Casa Reformada",
        address:"C/ Nueva 3, Bilbao",
        desc:"Casa reformada recientemente, lista para entrar a vivir.",
        features:["3 habitaciones","Reformada","Cercana a transporte"],
        images:["https://picsum.photos/800/500?random=61","https://picsum.photos/800/500?random=62"],
        lat:43.263012,lng:-2.934985, whatsapp:"34600111222"
      },
      "7": {
        title:"Piso Económico",
        address:"C/ Ahorro 2, Zaragoza",
        desc:"Buena inversión para alquiler con alta demanda.",
        features:["1 dormitorio","Cocina equipada","Buena renta"],
        images:["https://picsum.photos/800/500?random=71","https://picsum.photos/800/500?random=72"],
        lat:41.648823,lng:-0.889085, whatsapp:"34600111222"
      },
      "8": {
        title:"Villa de Diseño",
        address:"Camino Moderno 1, Málaga",
        desc:"Arquitectura contemporánea y materiales de alta gama.",
        features:["4 habitaciones","Piscina infinita","Vistas al mar"],
        images:["https://picsum.photos/800/500?random=81","https://picsum.photos/800/500?random=82","https://picsum.photos/800/500?random=83"],
        lat:36.721273,lng:-4.421398, whatsapp:"34600111222"
      }
    };

    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const prop = properties[id];

    const titleEl = document.getElementById('prop-title');
    const addrEl = document.getElementById('prop-address');
    const descEl = document.getElementById('prop-desc');
    const featuresEl = document.getElementById('prop-features');
    const galleryEl = document.getElementById('gallery');
    const mapFrame = document.getElementById('map-frame');
    const waBtn = document.getElementById('contact-wa');

    // elementos lightbox
    const lb = document.getElementById('lightbox');
    const lbImage = document.getElementById('lb-image');
    const lbThumbs = document.getElementById('lb-thumbs');
    const lbClose = document.querySelector('.lb-close');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');
    let currentImages = [];
    let currentIndex = 0;

    function renderThumbs(images, active){
      if(!lbThumbs) return;
      lbThumbs.innerHTML = '';
      images.forEach((s, i)=>{
        const t = document.createElement('img');
        t.src = s;
        t.alt = `miniatura ${i+1}`;
        if(i===active) t.classList.add('active');
        t.addEventListener('click', ()=> showIndex(i));
        lbThumbs.appendChild(t);
      });
    }

    function openLightbox(index, images){
      if(!lb || !lbImage) return;
      currentImages = images.slice();
      currentIndex = index;
      lbImage.src = currentImages[currentIndex];
      lbImage.alt = `Imagen ${currentIndex+1}`;
      renderThumbs(currentImages, currentIndex);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden','false');
      // focus for accessibility
      lb.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox(){
      if(!lb || !lbImage) return;
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden','true');
      lbImage.src = '';
      document.body.style.overflow = '';
    }

    function showIndex(i){
      if(!currentImages || !lbImage) return;
      if(i<0) i = currentImages.length - 1;
      if(i>=currentImages.length) i = 0;
      currentIndex = i;
      lbImage.src = currentImages[currentIndex];
      renderThumbs(currentImages, currentIndex);
    }

    // eventos controles lightbox
    if(lbClose) lbClose.addEventListener('click', closeLightbox);
    if(lbPrev) lbPrev.addEventListener('click', ()=> showIndex(currentIndex - 1));
    if(lbNext) lbNext.addEventListener('click', ()=> showIndex(currentIndex + 1));
    // click fuera de la imagen (overlay) cierra
    if(lb){
      lb.addEventListener('click', (e)=>{
        if(e.target === lb) closeLightbox();
      });
    }
    // teclas
    document.addEventListener('keydown', (e)=>{
      if(!lb || !lb.classList.contains('open')) return;
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') showIndex(currentIndex - 1);
      if(e.key === 'ArrowRight') showIndex(currentIndex + 1);
    });

    if(!prop){
      if(titleEl) titleEl.textContent = "Propiedad no encontrada";
      if(descEl) descEl.textContent = "No se ha encontrado la propiedad solicitada.";
    } else {
      titleEl && (titleEl.textContent = prop.title);
      addrEl && (addrEl.textContent = prop.address);
      descEl && (descEl.textContent = prop.desc);

      if(featuresEl) {
        featuresEl.innerHTML = '';
        prop.features.forEach(f=>{
          const li = document.createElement('li');
          li.textContent = f;
          featuresEl.appendChild(li);
        });
      }

      // gallery -> ahora abre lightbox
      if(galleryEl) {
        galleryEl.innerHTML = '';
        prop.images.forEach((src, idx)=>{
          const img = document.createElement('img');
          img.src = src;
          img.alt = `${prop.title} ${idx+1}`;
          img.loading = 'lazy';
          img.dataset.index = idx;
          img.addEventListener('click', ()=> openLightbox(idx, prop.images));
          galleryEl.appendChild(img);
        });
      }

      if(mapFrame) mapFrame.src = `https://www.google.com/maps?q=${prop.lat},${prop.lng}&z=15&output=embed`;

      if(waBtn) {
        waBtn.href = `https://wa.me/${prop.whatsapp}?text=${encodeURIComponent("Hola, estoy interesado en " + prop.title + " (" + prop.address + ")")}`;
        waBtn.setAttribute('aria-label','Contactar por WhatsApp');
      }

      // Ubicar en mapa al hacer clic en dirección o botón
      const btnUbic = document.getElementById('btn-ubicacion');
      const addrElLocal = document.getElementById('prop-address');
      const mapWrapperEl = document.querySelector('.map-wrapper');

      function ubicarEnMapa(){
        if(!mapFrame) return;
        mapFrame.src = `https://www.google.com/maps?q=${prop.lat},${prop.lng}&z=15&output=embed`;
        if(mapWrapperEl) mapWrapperEl.scrollIntoView({behavior:'smooth', block:'center'});
      }

      if(btnUbic) btnUbic.addEventListener('click', ubicarEnMapa);
      if(addrElLocal) addrElLocal.addEventListener('click', ubicarEnMapa);
    }
  }

});

// Smooth Scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // allow normal behavior if target not found
    const target = document.querySelector(this.getAttribute("href"));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Form Validation (only if contact form exists)
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !telefono || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    alert("¡Mensaje enviado con éxito!");
    this.reset();
  });
}

