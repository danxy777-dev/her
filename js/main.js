/**
 * ARQUIVO PRINCIPAL: main.js
 * Ponto de entrada modular da cartinha de amor digital.
 * Orquestra o palco, animações ambientes e prepara os pontos de extensão para os próximos passos.
 */

import { state } from './state.js';
import { AmbientBackground } from './components/AmbientBackground.js';
import { PaperFlower } from './components/PaperFlower.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('✨ Cartinha de amor digital inicializada com sucesso.');

  // 1. Inicializar ambiente visual (partículas e iluminação poética)
  const ambientBg = new AmbientBackground();
  ambientBg.init();

  // 2. Renderizar flores de papel artesanais nos cantos decorativos
  initDecorativePaperFlowers();

  // 3. Configurar interação inicial do selo de cera
  initSealInteraction();

  // 4. Ouvinte de estado para futuras transições (Envelope, Carta, Memórias, etc.)
  state.on('currentStep', (newStep) => {
    console.log(`[Narrativa] Transição de etapa para: ${newStep}`);
    // Ponto de integração para os próximos comandos do usuário
  });
});

/**
 * Adiciona as flores de papel artesanais em SVG nos clusters decorativos
 */
function initDecorativePaperFlowers() {
  const clusterTL = document.getElementById('flower-cluster-tl');
  const clusterBR = document.getElementById('flower-cluster-br');

  if (clusterTL) {
    // Flor superior esquerda
    const flowerTL = new PaperFlower({
      id: 'flower-tl-1',
      size: 68,
      rotation: -18,
      hasLeaves: true,
      onClick: () => {
        state.addDiscovery('first_flower_touch');
      }
    });
    clusterTL.appendChild(flowerTL.render());
  }

  if (clusterBR) {
    // Flor inferior direita
    const flowerBR = new PaperFlower({
      id: 'flower-br-1',
      size: 78,
      rotation: 24,
      hasLeaves: true,
      onClick: () => {
        state.addDiscovery('second_flower_touch');
      }
    });
    clusterBR.appendChild(flowerBR.render());
  }
}

/**
 * Configura o toque/clique no selo de cera para iniciar a experiência
 */
function initSealInteraction() {
  const sealBtn = document.getElementById('start-experience-btn');
  const initialCard = document.getElementById('initial-card');

  if (!sealBtn || !initialCard) return;

  sealBtn.addEventListener('click', () => {
    // Feedback visual tátil de clique
    sealBtn.style.transform = 'scale(0.92)';
    
    setTimeout(() => {
      sealBtn.style.transform = '';
      
      // Registra a primeira abertura
      state.addDiscovery('seal_broken');
      
      // Feedback sutil para demonstrar prontidão sem avançar precipitadamente
      const hint = document.querySelector('.action-hint');
      if (hint) {
        hint.textContent = 'O selo se desfez com carinho...';
        hint.style.color = 'var(--color-burgundy-soft)';
      }

      console.log('Selo ativado! Pronto para receber a próxima etapa (Envelope / Carta).');
    }, 200);
  });
}
