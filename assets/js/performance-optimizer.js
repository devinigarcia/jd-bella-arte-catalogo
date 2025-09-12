/**
 * JD Bella Arte - Otimizador de Performance
 * Script responsável por melhorar a performance geral do site
 */

'use strict';

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.deferNonCriticalResources();
    this.setupServiceWorker();
    this.monitorPerformance();
    this.optimizeFonts();
  }

  /**
   * Otimiza o carregamento de imagens
   */
  optimizeImages() {
    // Implementa carregamento progressivo de imagens
    this.setupProgressiveImageLoading();
    
    // Adiciona srcset para imagens responsivas quando possível
    this.addResponsiveImageSupport();
  }

  /**
   * Configura carregamento progressivo de imagens
   */
  setupProgressiveImageLoading() {
    document.querySelectorAll('img').forEach(img => {
      // Skip imagens que já têm loading lazy
      if (img.loading === 'lazy') return;
      
      // Skip imagens muito pequenas
      if (img.width < 100 || img.height < 100) return;
      
      // Aplica carregamento lazy em imagens abaixo da dobra
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy';
      }
    });
  }

  /**
   * Adiciona suporte a imagens responsivas usando srcset
   */
  addResponsiveImageSupport() {
    const heroImages = document.querySelectorAll('.hero__slide');
    
    heroImages.forEach(heroImage => {
      const bgUrl = window.getComputedStyle(heroImage).backgroundImage;
      const url = bgUrl.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
      
      if (url && url !== 'none') {
        // Gera URLs para diferentes tamanhos (isso é apenas ilustrativo)
        const baseUrl = url.replace(/\.(jpg|png|webp)$/, '');
        const extension = url.match(/\.(jpg|png|webp)$/)[1];
        
        // Cria media queries para imagens de fundo
        const mediaQueries = `
          @media (max-width: 640px) {
            .hero__slide[style*="${url}"] {
              background-image: url(${baseUrl}-small.${extension});
            }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .hero__slide[style*="${url}"] {
              background-image: url(${baseUrl}-medium.${extension});
            }
          }
        `;
        
        // Insere as media queries no head
        // Comentado para não afetar o site atual
        /*
        const style = document.createElement('style');
        style.textContent = mediaQueries;
        document.head.appendChild(style);
        */
      }
    });
  }

  /**
   * Adia o carregamento de recursos não críticos
   */
  deferNonCriticalResources() {
    // Identifica scripts não críticos
    document.querySelectorAll('script').forEach(script => {
      if (!script.src) return;
      
      // Scripts que não são críticos para renderização inicial
      const nonCriticalPaths = [
        'analytics',
        'tracking',
        'social-media',
        'chat'
      ];
      
      const isNonCritical = nonCriticalPaths.some(path => script.src.includes(path));
      
      if (isNonCritical && !script.async && !script.defer) {
        // Cria uma nova tag de script com defer
        const deferredScript = document.createElement('script');
        deferredScript.src = script.src;
        deferredScript.defer = true;
        
        // Substitui o script original
        script.parentNode.replaceChild(deferredScript, script);
      }
    });
  }

  /**
   * Configura o Service Worker para caching
   */
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service Worker registrado com sucesso:', registration.scope);
        }).catch(error => {
          console.log('Registro do Service Worker falhou:', error);
        });
      });
    }
  }

  /**
   * Monitora métricas de performance
   */
  monitorPerformance() {
    // Observa eventos Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime / 1000, 'segundos');
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime, 'ms');
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
      
      // CLS - Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    }
  }

  /**
   * Otimiza carregamento de fontes
   */
  optimizeFonts() {
    // Adiciona preconnect para Google Fonts se não existir
    if (!document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      
      document.head.insertBefore(preconnect1, document.head.firstChild);
      document.head.insertBefore(preconnect2, document.head.firstChild);
    }
    
    // Adiciona font-display swap para evitar texto invisível
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Montserrat';
        font-display: swap;
      }
    `;
    
    document.head.appendChild(styleSheet);
  }
}

// Inicializar otimizador
document.addEventListener('DOMContentLoaded', () => {
  window.performanceOptimizer = new PerformanceOptimizer();
});

// Exportar para uso em outros scripts
if (typeof module !== 'undefined') {
  module.exports = { PerformanceOptimizer };
}
