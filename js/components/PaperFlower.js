/**
 * COMPONENTE: PaperFlower
 * Cria flores de papel artesanais vetoriais em SVG estilizadas com camadas,
 * dobras e interatividade tátil delicada.
 */

export class PaperFlower {
  /**
   * @param {Object} options
   * @param {string} [options.id]
   * @param {string} [options.className]
   * @param {number} [options.size=72]
   * @param {number} [options.rotation=0]
   * @param {boolean} [options.hasLeaves=true]
   * @param {Function} [options.onClick]
   */
  constructor(options = {}) {
    this.id = options.id || `flower-${Math.random().toString(36).substr(2, 9)}`;
    this.className = options.className || '';
    this.size = options.size || 72;
    this.rotation = options.rotation || 0;
    this.hasLeaves = options.hasLeaves !== false;
    this.onClick = options.onClick || null;
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = `paper-flower ${this.className}`.trim();
    container.id = this.id;
    container.style.width = `${this.size}px`;
    container.style.height = `${this.size}px`;
    container.style.transform = `rotate(${this.rotation}deg)`;
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Flor de papel decorativa');
    container.tabIndex = 0;

    // SVG da Flor de Papel em camadas
    container.innerHTML = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${this.hasLeaves ? `
          <!-- Folha de papel artesanal traseira -->
          <g class="flower-leaves">
            <path class="flower-leaf" d="M25 80 C 15 65, 10 45, 30 35 C 40 45, 45 65, 25 80 Z" />
            <path class="petal-crease" d="M25 80 Q 25 55 30 35" />
            <path class="flower-leaf" d="M75 80 C 85 65, 90 45, 70 35 C 60 45, 55 65, 75 80 Z" />
            <path class="petal-crease" d="M75 80 Q 75 55 70 35" />
          </g>
        ` : ''}

        <!-- Camada 1: Pétalas exteriores de papel blush -->
        <g class="petals-layer-outer">
          <!-- 5 pétalas externas com formato suave e dobra de papel -->
          <path class="petal-outer" d="M50 50 C 40 20, 60 20, 50 8 C 40 20, 60 20, 50 50 Z" />
          <path class="petal-crease" d="M50 50 L 50 14" />

          <path class="petal-outer" transform="rotate(72 50 50)" d="M50 50 C 40 20, 60 20, 50 8 C 40 20, 60 20, 50 50 Z" />
          <path class="petal-crease" transform="rotate(72 50 50)" d="M50 50 L 50 14" />

          <path class="petal-outer" transform="rotate(144 50 50)" d="M50 50 C 40 20, 60 20, 50 8 C 40 20, 60 20, 50 50 Z" />
          <path class="petal-crease" transform="rotate(144 50 50)" d="M50 50 L 50 14" />

          <path class="petal-outer" transform="rotate(216 50 50)" d="M50 50 C 40 20, 60 20, 50 8 C 40 20, 60 20, 50 50 Z" />
          <path class="petal-crease" transform="rotate(216 50 50)" d="M50 50 L 50 14" />

          <path class="petal-outer" transform="rotate(288 50 50)" d="M50 50 C 40 20, 60 20, 50 8 C 40 20, 60 20, 50 50 Z" />
          <path class="petal-crease" transform="rotate(288 50 50)" d="M50 50 L 50 14" />
        </g>

        <!-- Camada 2: Pétalas médias intercaladas de papel rosa queimado -->
        <g class="petals-layer-mid" transform="rotate(36 50 50)">
          <path class="petal-mid" d="M50 50 C 43 28, 57 28, 50 18 C 43 28, 57 28, 50 50 Z" />
          <path class="petal-crease" d="M50 50 L 50 22" />

          <path class="petal-mid" transform="rotate(72 50 50)" d="M50 50 C 43 28, 57 28, 50 18 C 43 28, 57 28, 50 50 Z" />
          <path class="petal-crease" transform="rotate(72 50 50)" d="M50 50 L 50 22" />

          <path class="petal-mid" transform="rotate(144 50 50)" d="M50 50 C 43 28, 57 28, 50 18 C 43 28, 57 28, 50 50 Z" />
          <path class="petal-crease" transform="rotate(144 50 50)" d="M50 50 L 50 22" />

          <path class="petal-mid" transform="rotate(216 50 50)" d="M50 50 C 43 28, 57 28, 50 18 C 43 28, 57 28, 50 50 Z" />
          <path class="petal-crease" transform="rotate(216 50 50)" d="M50 50 L 50 22" />

          <path class="petal-mid" transform="rotate(288 50 50)" d="M50 50 C 43 28, 57 28, 50 18 C 43 28, 57 28, 50 50 Z" />
          <path class="petal-crease" transform="rotate(288 50 50)" d="M50 50 L 50 22" />
        </g>

        <!-- Camada 3: Pétalas centrais fechadas de tom vintage -->
        <g class="petals-layer-inner" transform="rotate(18 50 50)">
          <path class="petal-inner" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(90 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(180 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(270 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
        </g>

        <!-- Miolo de papel com relevo dourado -->
        <circle class="flower-center" cx="50" cy="50" r="7.5" />
        <circle cx="50" cy="50" r="4.5" fill="rgba(255, 255, 255, 0.4)" />
      </svg>
    `;

    // Interação
    container.addEventListener('click', (e) => {
      container.classList.remove('is-interacted');
      // Forçar reflow para reiniciar animação
      void container.offsetWidth;
      container.classList.add('is-interacted');

      if (this.onClick) {
        this.onClick(e, this);
      }
    });

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        container.click();
      }
    });

    this.element = container;
    return container;
  }
}
