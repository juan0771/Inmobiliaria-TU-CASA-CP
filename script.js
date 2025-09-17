// Script compartido para index.html y propiedad.html

const properties = {
  "1": {
    title: "Arriendo Casa en Normandia",
    address: "Normandia, Engativa / Carrera 71A # 53-65",
    desc: "Amplia casa de 3 habitaciones con jardín privado.",
    price: "$2.000.000",
    features: ["3 habitaciones","2 baños","Jardín","Garaje"],
    images: [ "img/apto1/apto1.jpg", "img/apto1/apto2.jpg", "img/apto1/apto3.jpg", "img/apto1/apto1.jpg" ],
    lat: 4.676, lng: -74.110, whatsapp: "3142902041"
  },
  "2": {
    title:"Arriendo Apto en Bochica 3",
    address:"Bochica 3, Bogotá",
    desc:"Ubicación céntrica con acceso a transporte y comercios.",
    price: "$2.000.000",
    features:["2 habitaciones","1 baño","Terraza"],
    images:["https://picsum.photos/800/500?random=21","https://picsum.photos/800/500?random=22","https://picsum.photos/800/500?random=23"],
    lat:41.385064,lng:2.173404, whatsapp:"34600111222"
  },
  "3": {
    title:"Casa de Lujo",
    address:"Urbanización Elite, Marbella",
    desc:"Diseño exclusivo, piscina y acabados de primera.",
    price: "Consultar precio",
    features:["5 habitaciones","Piscina","Spa","Garaje"],
    images:["https://picsum.photos/800/500?random=31","https://picsum.photos/800/500?random=32","https://picsum.photos/800/500?random=33"],
    lat:36.510071,lng:-4.882477, whatsapp:"34600111222"
  },
  "4": {
    title:"Chalet con Jardín",
    address:"C/ Tranquila 7, Sevilla",
    desc:"Entorno tranquilo y gran parcela.",
    price: "Consultar precio",
    features:["4 habitaciones","Parcela grande","Barbacoa"],
    images:["https://picsum.photos/400/250?random=4","https://picsum.photos/800/500?random=41","https://picsum.photos/800/500?random=42"],
    lat:37.389092,lng:-5.984459, whatsapp:"34600111222"
  },
  "5": {
    title:"Ático Luminoso",
    address:"Av. Vistas 10, Valencia",
    desc:"Terraza amplia y excelentes vistas.",
    price: "Consultar precio",
    features:["2 habitaciones","Terraza amplia","Ascensor"],
    images:["https://picsum.photos/400/250?random=5","https://picsum.photos/800/500?random=51","https://picsum.photos/800/500?random=52"],
    lat:39.469907,lng:-0.376288, whatsapp:"34600111222"
  },
  "6": {
    title:"Casa Reformada",
    address:"C/ Nueva 3, Bilbao",
    desc:"Reciente reforma, lista para habitar.",
    price: "Consultar precio",
    features:["3 habitaciones","Reformada","Cercana a transporte"],
    images:["https://picsum.photos/400/250?random=6","https://picsum.photos/800/500?random=61","https://picsum.photos/800/500?random=62"],
    lat:43.263012,lng:-2.934985, whatsapp:"34600111222"
  },
  "7": { title:"Piso Económico", desc:"Buena inversión para alquiler.", price: "Consultar precio", features:["1 dormitorio","Cocina equipada","Buena renta"], images:["https://picsum.photos/400/250?random=7","https://picsum.photos/800/500?random=71"], lat:41.648823,lng:-0.889085, whatsapp:"34600111222" },
  "8": { title:"Villa de Diseño", desc:"Arquitectura moderna y acabados premium.", price: "Consultar precio", features:["4 habitaciones","Piscina infinita","Vistas al mar"], images:["https://picsum.photos/400/250?random=8","https://picsum.photos/800/500?random=81"], lat:36.721273,lng:-4.421398, whatsapp:"34600111222" }
};

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
  link.addEventListener("click", (e) => {
    const isMobile = menuToggle.offsetParent !== null;
    const isDropdownToggle = link.parentElement.classList.contains('dropdown');

    if (isMobile && isDropdownToggle) {
      // En vista móvil, el clic en "Servicios" abre/cierra el submenú
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    } else {
      // Para cualquier otro enlace, se cierra el menú principal (si está abierto)
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        toggleIcon.classList.remove("fa-times");
        toggleIcon.classList.add("fa-bars");
        document.querySelectorAll('.nav .dropdown.open').forEach(d => d.classList.remove('open'));
      }
    }
  });
});

  // --- Lightbox Global ---
  // Elementos del lightbox
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
    // Si hay una sola imagen, ocultar los thumbnails
    if (images.length <= 1) {
      lbThumbs.style.display = 'none';
      return;
    }
    lbThumbs.style.display = 'flex';
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

    // Ocultar/mostrar botones de navegación si es una sola imagen
    const showNav = images.length > 1;
    if(lbPrev) lbPrev.style.display = showNav ? 'flex' : 'none';
    if(lbNext) lbNext.style.display = showNav ? 'flex' : 'none';

    lbImage.src = currentImages[currentIndex];
    lbImage.alt = `Imagen ${currentIndex+1}`;
    renderThumbs(currentImages, currentIndex);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if(!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showIndex(i){
    if(!currentImages || !lbImage || currentImages.length <= 1) return;
    if(i < 0) i = currentImages.length - 1;
    if(i >= currentImages.length) i = 0;
    currentIndex = i;
    lbImage.src = currentImages[currentIndex];
    renderThumbs(currentImages, currentIndex);
  }

  /* Si estamos en la nueva página propiedades.html: generar la grilla de propiedades */
  if (location.pathname.endsWith('propiedades.html')) {
    const cardsContainer = document.querySelector('.cards-grid');
    if (cardsContainer) {
        cardsContainer.innerHTML = ''; // Limpiar por si acaso
        for (const id in properties) {
            if (Object.hasOwnProperty.call(properties, id)) {
                const prop = properties[id];
                const imageUrl = prop.images && prop.images.length > 0 ? prop.images[0] : 'https://picsum.photos/400/250';
                
                const card = document.createElement('div');
                card.className = 'card';
                // Usamos el precio del objeto, y mostramos el párrafo solo si existe.
                const priceHTML = prop.price ? `<p><strong>${prop.price}</strong></p>` : '<p><strong>Consultar precio</strong></p>';

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${prop.title}">
                    <h3>${prop.title}</h3>
                    <p>${prop.desc}</p>
                    ${priceHTML}
                    <a class="btn" href="propiedad.html?id=${id}">Más información</a>
                `;
                cardsContainer.appendChild(card);
            }
        }
    }
  }

  /* Si estamos en propiedad.html: cargar datos según ?id= */
  if(location.pathname.endsWith('propiedad.html')){
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

      // --- Cargar Inmuebles Relacionados ---
      const relatedContainer = document.getElementById('related-cards-container');
      if (relatedContainer) {
          relatedContainer.innerHTML = '';
          for (const propId in properties) {
              // Omitir el inmueble actual
              if (propId === id) continue;

              const relatedProp = properties[propId];
              const imageUrl = relatedProp.images && relatedProp.images.length > 0 ? relatedProp.images[0] : 'https://picsum.photos/400/250';
              
              const card = document.createElement('div');
              card.className = 'card';
              const priceHTML = relatedProp.price ? `<p><strong>${relatedProp.price}</strong></p>` : '<p><strong>Consultar precio</strong></p>';

              card.innerHTML = `
                  <img src="${imageUrl}" alt="${relatedProp.title}">
                  <h3>${relatedProp.title}</h3>
                  <p>${relatedProp.desc}</p>
                  ${priceHTML}
                  <a class="btn" href="propiedad.html?id=${propId}">Más información</a>
              `;
              relatedContainer.appendChild(card);
          }
      }
    }
  }
  
  // --- Eventos globales para el Lightbox ---
  if (lb) {
    if(lbClose) lbClose.addEventListener('click', closeLightbox);
    if(lbPrev) lbPrev.addEventListener('click', () => showIndex(currentIndex - 1));
    if(lbNext) lbNext.addEventListener('click', () => showIndex(currentIndex + 1));
    
    // Cerrar al hacer clic en el fondo oscuro
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
    });
  }

  // Añadir funcionalidad de lightbox a las imágenes del equipo en index.html
  const teamImages = document.querySelectorAll('#equipo .team-card img');
  teamImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(0, [img.src]);
    });
  });

});

// Smooth Scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Prevent default for empty links to avoid errors and page jumps
    if (href === "#") {
      e.preventDefault();
      return;
    }
    // allow normal behavior if target not found on the current page
    const target = document.querySelector(href);
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

// Form Validation for consignarForm
const consignarForm = document.getElementById("consignarForm");
if(consignarForm){
  consignarForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreConsignar").value.trim();
    const email = document.getElementById("emailConsignar").value.trim();
    const telefono = document.getElementById("telefonoConsignar").value.trim();
    const mensaje = document.getElementById("mensajeConsignar").value.trim();

    if (!nombre || !email || !telefono || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    alert("¡Información recibida con éxito! Pronto nos pondremos en contacto contigo.");
    this.reset();
  });
}

// Team Carousel
const teamCarousel = document.querySelector('.team-carousel-wrapper');
if (teamCarousel) {
  const cardsContainer = teamCarousel.querySelector('.team-cards');
  const prevBtn = teamCarousel.querySelector('.carousel-btn.prev');
  const nextBtn = teamCarousel.querySelector('.carousel-btn.next');

  const scrollAmount = () => {
    // Scroll by the width of one card + gap
    const card = cardsContainer.querySelector('.team-card');
    if (card) {
      const cardStyle = window.getComputedStyle(card);
      const cardGap = parseFloat(window.getComputedStyle(cardsContainer).gap) || 25;
      return card.offsetWidth + cardGap;
    }
    return 245; // fallback
  };

  nextBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
}

// Related Properties Carousel (on property page)
const relatedCarousel = document.querySelector('#related-properties .carousel-wrapper');
if (relatedCarousel) {
  const cardsContainer = relatedCarousel.querySelector('.cards');
  const prevBtn = relatedCarousel.querySelector('.carousel-btn.prev');
  const nextBtn = relatedCarousel.querySelector('.carousel-btn.next');

  const scrollAmount = () => {
    const card = cardsContainer.querySelector('.card');
    if (card) {
      const cardGap = parseFloat(window.getComputedStyle(cardsContainer).gap) || 20;
      return card.offsetWidth + cardGap;
    }
    return 310; // fallback
  };

  nextBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
}

// Properties Carousel
const propertiesCarousel = document.querySelector('#propiedades .carousel-wrapper');
if (propertiesCarousel) {
  const cardsContainer = propertiesCarousel.querySelector('.cards');
  const prevBtn = propertiesCarousel.querySelector('.carousel-btn.prev');
  const nextBtn = propertiesCarousel.querySelector('.carousel-btn.next');

  const scrollAmount = () => {
    // Scroll by the width of one card + gap
    const card = cardsContainer.querySelector('.card');
    if (card) {
      const cardGap = parseFloat(window.getComputedStyle(cardsContainer).gap) || 20;
      return card.offsetWidth + cardGap;
    }
    return 310; // fallback (290px width + 20px gap)
  };

  nextBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
}
