/**
 * COMPONENTE: AmbientBackground
 * Cria um ambiente acolhedor e poético, com iluminação suave e
 * pequenas pétalas/brilhos orgânicos flutuantes.
 */

export class AmbientBackground {
  constructor(containerId = 'ambient-backdrop') {
    this.container = document.getElementById(containerId);
    this.particles = [];
    this.particleCount = window.innerWidth < 640 ? 12 : 24;
    this.animationFrameId = null;
  }

  init() {
    if (!this.container) return;
    
    // Verificar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.createFloatingPetals();
    this.bindMouseParallax();
  }

  createFloatingPetals() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.particleCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'ambient-petal';
      
      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 18;
      const delay = Math.random() * 15;
      const startRotation = Math.random() * 360;

      petal.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 1.4}px;
        left: ${left}vw;
        top: -30px;
        background: radial-gradient(circle at 30% 30%, #f7deda 0%, #ebc2bc 80%, #d89e95 100%);
        border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
        opacity: ${0.15 + Math.random() * 0.25};
        pointer-events: none;
        filter: blur(${Math.random() > 0.6 ? '1px' : '0.5px'});
        animation: floatDownPetal ${duration}s linear ${delay}s infinite;
        transform: rotate(${startRotation}deg);
      `;

      fragment.appendChild(petal);
    }

    this.container.appendChild(fragment);

    // Adiciona o estilo das keyframes dinamicamente se não existir
    if (!document.getElementById('ambient-petal-styles')) {
      const style = document.createElement('style');
      style.id = 'ambient-petal-styles';
      style.textContent = `
        @keyframes floatDownPetal {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(35vh) rotate(120deg) translateX(25px);
          }
          66% {
            transform: translateY(70vh) rotate(240deg) translateX(-20px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(15px);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  bindMouseParallax() {
    // Parallax extremamente sutil apenas em desktop
    if (window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) * 0.015;
      targetY = (e.clientY - centerY) * 0.015;
    }, { passive: true });

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const stage = document.querySelector('.experience-stage');
      if (stage) {
        stage.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      this.animationFrameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
