/**
 * JD Bella Arte - Otimizador de Catálogo
 * Implementação das funcionalidades específicas do catálogo de produtos
 */

'use strict';

class CatalogOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Inicializar componentes
    this.setupFilterListeners();
    this.setupLazyLoading();
    this.cleanupDuplicateSections();
    this.enhanceAccessibility();
  }

  /**
   * Configura os listeners para os filtros de catálogo
   */
  setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.catalog-filter');
    const catalogSections = document.querySelectorAll('.catalog-section');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Atualiza classes ativas nos botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Mostra/oculta seções correspondentes
        catalogSections.forEach(section => {
          if (category === 'todos' || section.dataset.category === category) {
            section.style.display = 'block';
            
            // Anima itens quando a seção se torna visível
            setTimeout(() => {
              const items = section.querySelectorAll('.card');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('in-view');
                }, 50 * index);
              });
            }, 100);
          } else {
            section.style.display = 'none';
          }
        });
        
        // Scroll suave até o catálogo
        document.querySelector('#catalogo').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  /**
   * Configura lazy loading otimizado para imagens do catálogo
   */
  setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Lazy loading nativo do navegador
      const images = document.querySelectorAll('.catalog-image');
      images.forEach(img => {
        img.loading = 'lazy';
      });
    } else {
      // Fallback para navegadores que não suportam lazy loading nativo
      this.setupIntersectionObserver();
    }
  }

  /**
   * Configura IntersectionObserver para lazy loading
   */
  setupIntersectionObserver() {
    const images = document.querySelectorAll('.catalog-image');
    
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );
    
    images.forEach(image => {
      if (image.dataset.src) {
        imageObserver.observe(image);
      }
    });
  }

  /**
   * Corrige problema de seções duplicadas no catálogo
   */
  cleanupDuplicateSections() {
    const categories = [];
    const sections = document.querySelectorAll('.catalog-section');
    
    // Identificar e remover seções duplicadas
    sections.forEach(section => {
      const category = section.dataset.category;
      
      if (categories.includes(category)) {
        console.warn(`Seção duplicada encontrada: ${category}`);
        section.remove();
      } else {
        categories.push(category);
      }
    });
  }

  /**
   * Melhora acessibilidade dos elementos do catálogo
   */
  enhanceAccessibility() {
    // Adicionar atributos ARIA para melhor acessibilidade
    const filterButtons = document.querySelectorAll('.catalog-filter');
    const catalogSections = document.querySelectorAll('.catalog-section');
    
    filterButtons.forEach(button => {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', button.classList.contains('active'));
    });
    
    catalogSections.forEach(section => {
      section.setAttribute('role', 'tabpanel');
      section.setAttribute('aria-labelledby', `filter-${section.dataset.category}`);
    });
    
    // Melhorar navegação por teclado
    filterButtons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const direction = e.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (index + direction + filterButtons.length) % filterButtons.length;
          filterButtons[nextIndex].focus();
        }
      });
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.catalogOptimizer = new CatalogOptimizer();
});

// Exportar para uso em outros scripts
if (typeof module !== 'undefined') {
  module.exports = { CatalogOptimizer };
}
