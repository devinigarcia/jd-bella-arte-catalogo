/**
 * JD Bella Arte - Catálogo Premium
 * JavaScript principal com foco em performance e experiência do usuário
 * 
 * Funcionalidades:
 * - Hero slider automático e manual
 * - Navegação responsiva
 * - Lazy loading de imagens
 * - Animações on scroll
 * - Sistema de filtros
 * - Modal de produtos
 * - SEO e performance
 */

'use strict';

/**
 * Utilitários e helpers
 */
const Utils = {
  // Debounce para otimizar eventos
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle para scroll events
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Verificar se elemento está na viewport
  isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    return elementTop < windowHeight * (1 - threshold) && elementBottom > windowHeight * threshold;
  },

  // Smooth scroll personalizado
  smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // Ajuste para header fixo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  },

  // Lazy loading de imagens
  lazyLoadImage(img) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          image.classList.add('loaded');
          imageObserver.unobserve(image);
        }
      });
    });
    
    imageObserver.observe(img);
  },

  // Preload de imagens críticas
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  // Formatação de preços
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  },

  // LocalStorage com fallback
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage não disponível:', e);
      }
    },
    
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('Erro ao ler localStorage:', e);
        return null;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('Erro ao remover do localStorage:', e);
      }
    }
  }
};

/**
 * Sistema de Hero Background Slideshow
 */
class HeroBackgroundSlider {
  constructor(heroElement) {
    this.hero = heroElement;
    this.backgroundImages = [
      'assets/images/catalogo/moveis-sob-medida/119a0e2d-1702-4ccd-9d31-b50b68b0dc56.jpg',
      'assets/images/catalogo/chales-modulares/1ff9cd9e-7642-4ca6-88aa-4836d9ec4329.jpg',
      'assets/images/catalogo/estantes/4f16c465-1781-4f97-a2c5-8fd612882c0b.jpg',
      'assets/images/catalogo/aparadores/8e21a3af-df42-41be-a16c-ff3071f5a693.jpg',
      'assets/images/catalogo/conjuntos/68c52739-8225-4617-b258-f6e3deca7c74.jpg'
    ];
    this.currentImageIndex = 0;
    this.slideInterval = null;
    this.slideDuration = 8000; // 8 segundos por imagem
    
    this.init();
  }

  init() {
    if (!this.hero || this.backgroundImages.length === 0) return;
    
    this.preloadImages();
    this.startSlideshow();
    this.setupEventListeners();
  }

  preloadImages() {
    // Precarregar todas as imagens para transições suaves
    this.backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      if (index === 0) {
        // Aplicar primeira imagem imediatamente
        this.updateBackground(src);
      }
    });
  }

  updateBackground(imageSrc) {
    this.hero.style.backgroundImage = `linear-gradient(rgba(43, 33, 24, 0.8), rgba(43, 33, 24, 0.7)), url('${imageSrc}')`;
    this.hero.style.backgroundSize = 'cover';
    this.hero.style.backgroundPosition = 'center';
    this.hero.style.backgroundAttachment = 'fixed';
    this.hero.style.transition = 'background-image 1.5s ease-in-out';
  }

  nextSlide() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    this.updateBackground(this.backgroundImages[this.currentImageIndex]);
  }

  startSlideshow() {
    this.stopSlideshow();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  stopSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  setupEventListeners() {
    // Pausar slideshow quando o usuário não está vendo a página
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopSlideshow();
      } else {
        this.startSlideshow();
      }
    });

    // Pausar slideshow no hover (opcional)
    this.hero.addEventListener('mouseenter', () => this.stopSlideshow());
    this.hero.addEventListener('mouseleave', () => this.startSlideshow());
  }

  destroy() {
    this.stopSlideshow();
  }
}

/**
 * Sistema de Navegação Responsiva
 */
class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.mobileOverlay = document.querySelector('.mobile-overlay');
    this.navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleScroll();
    this.setActiveLink();
  }

  setupEventListeners() {
    // Toggle menu mobile
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Fechar menu ao clicar no overlay
    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Smooth scroll nos links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e, link));
    });

    // Scroll events
    window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 10));

    // Fechar menu mobile no ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Fechar menu mobile ao redimensionar
    window.addEventListener('resize', Utils.debounce(() => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250));
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    this.mobileToggle?.classList.add('active');
    this.mobileNav?.classList.add('active');
    this.mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileToggle?.classList.remove('active');
    this.mobileNav?.classList.remove('active');
    this.mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleLinkClick(e, link) {
    const href = link.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        Utils.smoothScrollTo(target);
        this.closeMobileMenu();
        this.setActiveLink(href);
      }
    } else if (href && !href.startsWith('http')) {
      // Link interno - fechar menu mobile
      this.closeMobileMenu();
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Adicionar classe quando rola a página
    if (this.header) {
      this.header.classList.toggle('scrolled', currentScrollY > 50);
    }

    // Esconder/mostrar header baseado na direção do scroll
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      // Scrolling down
      this.header?.classList.add('header--hidden');
    } else {
      // Scrolling up
      this.header?.classList.remove('header--hidden');
    }

    this.lastScrollY = currentScrollY;

    // Atualizar link ativo baseado na seção visível
    this.updateActiveSection();
  }

  setActiveLink(activeHref = null) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (activeHref && link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      }
    });
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.setActiveLink(`#${sectionId}`);
      }
    });
  }
}

/**
 * Sistema de Animações on Scroll
 */
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    // Usar Intersection Observer para melhor performance
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Para de observar o elemento após a animação
        this.observer.unobserve(entry.target);
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Sistema de Lazy Loading
 */
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.images.length) return;

    this.observer = new IntersectionObserver(
      (entries) => this.handleImageIntersection(entries),
      {
        threshold: 0,
        rootMargin: '50px 0px'
      }
    );

    this.images.forEach(img => {
      img.classList.add('lazy');
      this.observer.observe(img);
    });
  }

  handleImageIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.classList.remove('lazy');
    
    img.onload = () => {
      img.classList.add('loaded');
    };

    img.onerror = () => {
      img.classList.add('error');
      console.warn('Erro ao carregar imagem:', src);
    };
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Sistema de Filtros para Catálogo
 */
class ProductFilter {
  constructor(container) {
    this.container = container;
    this.filterButtons = container.querySelectorAll('.filter-btn');
    this.products = container.querySelectorAll('.product-card');
    this.activeFilter = 'all';
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateProductCount();
  }

  setupEventListeners() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter;
        this.setActiveFilter(filter);
      });
    });
  }

  setActiveFilter(filter) {
    this.activeFilter = filter;
    this.updateFilterButtons();
    this.filterProducts();
    this.updateProductCount();
  }

  updateFilterButtons() {
    this.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === this.activeFilter);
    });
  }

  filterProducts() {
    this.products.forEach(product => {
      const categories = product.dataset.categories?.split(',') || [];
      const shouldShow = this.activeFilter === 'all' || categories.includes(this.activeFilter);
      
      if (shouldShow) {
        product.classList.remove('hidden');
        product.style.display = '';
      } else {
        product.classList.add('hidden');
        product.style.display = 'none';
      }
    });

    // Animar entrada dos produtos visíveis
    this.animateVisibleProducts();
  }

  animateVisibleProducts() {
    const visibleProducts = [...this.products].filter(p => !p.classList.contains('hidden'));
    
    visibleProducts.forEach((product, index) => {
      product.style.opacity = '0';
      product.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        product.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        product.style.opacity = '1';
        product.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  updateProductCount() {
    const visible = [...this.products].filter(p => !p.classList.contains('hidden')).length;
    const total = this.products.length;
    
    const counter = this.container.querySelector('.product-count');
    if (counter) {
      counter.textContent = `Mostrando ${visible} de ${total} produtos`;
    }
  }
}

/**
 * Sistema de Performance e SEO
 */
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.prefetchCriticalResources();
    this.setupServiceWorker();
    this.monitorPerformance();
  }

  optimizeImages() {
    // Configurar lazy loading para todas as imagens
    const images = document.querySelectorAll('img:not([data-src])');
    images.forEach(img => {
      if (!img.complete) {
        img.loading = 'lazy';
      }
    });
  }

  prefetchCriticalResources() {
    // Prefetch de páginas importantes
    const criticalPages = ['/catalogo', '/sobre', '/contato'];
    
    criticalPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registrado:', registration);
        })
        .catch(error => {
          console.log('Erro no Service Worker:', error);
        });
    }
  }

  monitorPerformance() {
    // Monitor básico de performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        
        console.log(`Tempo de carregamento: ${loadTime}ms`);
        
        if (loadTime > 3000) {
          console.warn('Página carregando lentamente. Considere otimizações.');
        }
      }, 0);
    });
  }
}

/**
 * Sistema de Formulários
 */
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form[data-form]');
    this.init();
  }

  init() {
    this.forms.forEach(form => this.setupForm(form));
  }

  setupForm(form) {
    form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', Utils.debounce(() => this.validateField(input), 500));
    });
  }

  async handleSubmit(e, form) {
    e.preventDefault();
    
    if (!this.validateForm(form)) {
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      submitBtn.classList.add('loading');

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Simular envio (substituir pela integração real)
      await this.simulateFormSubmission(data);
      
      this.showSuccess(form);
      form.reset();
      
    } catch (error) {
      this.showError(form, error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('loading');
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Validações básicas
    if (field.required && !value) {
      isValid = false;
      message = 'Este campo é obrigatório';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'E-mail inválido';
    } else if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      message = 'Telefone inválido';
    }

    this.showFieldValidation(field, isValid, message);
    return isValid;
  }

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isValidPhone(phone) {
    const regex = /^[\d\s\-\(\)\+]{10,}$/;
    return regex.test(phone);
  }

  showFieldValidation(field, isValid, message) {
    const container = field.closest('.form-group') || field.parentElement;
    const errorElement = container.querySelector('.field-error');

    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid && field.value.trim());

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
    }
  }

  showSuccess(form) {
    const message = form.querySelector('.form-success') || this.createMessage('Mensagem enviada com sucesso!', 'success');
    const container = form.parentElement;
    
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
  }

  showError(form, errorMessage) {
    const message = form.querySelector('.form-error') || this.createMessage(errorMessage, 'error');
    const container = form.parentElement;
    
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
  }

  createMessage(text, type) {
    const div = document.createElement('div');
    div.className = `form-message form-${type}`;
    div.textContent = text;
    div.style.display = 'none';
    return div;
  }

  async simulateFormSubmission(data) {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular sucesso (95% das vezes)
    if (Math.random() < 0.95) {
      console.log('Formulário enviado:', data);
      return { success: true };
    } else {
      throw new Error('Erro no servidor. Tente novamente.');
    }
  }
}

/**
 * Inicialização da aplicação
 */
class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents());
    } else {
      this.initComponents();
    }
  }

  initComponents() {
    try {
      // Inicializar componentes principais
      this.components.navigation = new Navigation();
      this.components.scrollAnimations = new ScrollAnimations();
      this.components.lazyLoader = new LazyLoader();
      this.components.formHandler = new FormHandler();
      this.components.performanceOptimizer = new PerformanceOptimizer();

      // Hero background slideshow (apenas na home)
      const heroContainer = document.querySelector('.hero');
      if (heroContainer) {
        this.components.heroBackgroundSlider = new HeroBackgroundSlider(heroContainer);
      }

      // Filtros de produtos (apenas na página de catálogo)
      const catalogContainer = document.querySelector('.catalog-filters');
      if (catalogContainer) {
        this.components.productFilter = new ProductFilter(catalogContainer);
      }

      // Marcar app como carregada
      document.body.classList.add('app-loaded');
      
      console.log('JD Bella Arte - Aplicação inicializada com sucesso');
      
    } catch (error) {
      console.error('Erro ao inicializar aplicação:', error);
    }
  }

  destroy() {
    // Limpar componentes se necessário
    Object.values(this.components).forEach(component => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
  }
}

// Inicializar aplicação
const app = new App();

// Exportar para uso global se necessário
window.JDBellaArte = {
  app,
  Utils,
  HeroBackgroundSlider,
  Navigation,
  ScrollAnimations,
  LazyLoader,
  ProductFilter,
  FormHandler,
  PerformanceOptimizer
};

// Adicionar eventos globais úteis
window.addEventListener('beforeunload', () => {
  // Salvar estado se necessário
  app.destroy();
});

// Error handling global
window.addEventListener('error', (e) => {
  console.error('Erro JavaScript:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rejeitada:', e.reason);
});

/**
 * Sistema de Loading
 */
const LoadingSystem = {
  init() {
    this.createPageLoader();
    this.setupImageLoading();
    this.showPageLoader();
    
    // Remover loader quando página estiver carregada
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.hidePageLoader(), 200);
      });
    } else {
      setTimeout(() => this.hidePageLoader(), 200);
    }
  },
  
  createPageLoader() {
    if (document.getElementById('page-loader')) return;
    
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'page-loading';
    loader.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Carregando JD Bella Arte...</div>
    `;
    document.body.appendChild(loader);
  },
  
  showPageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.display = 'flex';
    }
  },
  
  hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
  },
  
  setupImageLoading() {
    // Adicionar spinners para imagens que demoram para carregar
    document.addEventListener('click', (e) => {
      if (e.target.closest('.category-card')) {
        this.showCategoryLoader();
      }
    });
  },
  
  showCategoryLoader() {
    const existingLoader = document.querySelector('.category-loading');
    if (existingLoader) return;
    
    const loader = document.createElement('div');
    loader.className = 'category-loading page-loading';
    loader.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Carregando produtos...</div>
    `;
    document.body.appendChild(loader);
    
    // Remover após 1 segundo para carregamento mais rápido
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.opacity = '0';
        setTimeout(() => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 200);
      }
    }, 800);
  }
};

// Inicializar sistema de loading
LoadingSystem.init();
