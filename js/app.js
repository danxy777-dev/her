/**
 * APLICAÇÃO PRINCIPAL: Cartinha de Amor Digital Interativa
 * Jornada de 10 Descobertas Poéticas (Text-First Architecture).
 * Compatível tanto com servidor local (http://) quanto abertura direta (file://).
 */

(function () {
  'use strict';

  // ==========================================
  // AS 10 MENSAGENS E DESCOBERTAS
  // ==========================================
  const fragments = [
    {
      step: 1,
      id: 'step-1',
      badge: '1ª Descoberta • Curiosidade',
      icon: '🌷',
      title: 'O Começo',
      text: 'Eu poderia simplesmente ter escrito tudo de uma vez… mas achei mais bonito deixar você descobrir aos poucos.',
      hint: 'Toque para desdobrar o primeiro pedaço',
    },
    {
      step: 2,
      id: 'step-2',
      badge: '2ª Descoberta • Carinho',
      icon: '💌',
      title: 'Uma Flor de Papel',
      text: 'Tem alguma coisa no seu jeito que faz até os momentos mais simples parecerem especiais.',
      hint: 'Toque na flor superior para ler este carinho',
    },
    {
      step: 3,
      id: 'step-3',
      badge: '3ª Descoberta • Admiração',
      icon: '🌸',
      title: 'Um Bilhete Dobrado',
      text: 'Eu gosto de reparar em você. Nos seus detalhes, no seu jeito de falar, nas pequenas coisas que talvez você nem perceba.',
      hint: 'Toque no bilhete dobrado para abrir',
    },
    {
      step: 4,
      id: 'step-4',
      badge: '4ª Descoberta • Presença',
      icon: '♡',
      title: 'Um Coração de Papel',
      text: 'E, de alguma forma, você começou a ocupar um espaço nos meus pensamentos sem nem pedir.',
      hint: 'Toque no coração de papel',
    },
    {
      step: 5,
      id: 'step-5',
      badge: '5ª Descoberta • Sentimento',
      icon: '🎀',
      title: 'Uma Pequena Confissão',
      text: 'Não sei exatamente em que momento aconteceu, mas em algum ponto você deixou de ser só alguém que eu conheci e passou a ser alguém que eu realmente gosto de ter por perto.',
      hint: 'Toque na flor inferior para ler este sentimento',
    },
    {
      step: 6,
      id: 'step-6',
      badge: '6ª Descoberta • Mais Pessoal',
      icon: '🌹',
      title: 'Um Detalhe Sobre Você',
      text: '[AQUI ENTRA O DETALHE ESPECÍFICO SOBRE ELA: aquele jeito único dela, uma lembrança marcante ou algo que só você nota]',
      hint: 'Toque no cartão com fita para ler',
    },
    {
      step: 7,
      id: 'step-7',
      badge: '7ª Descoberta • Vulnerabilidade',
      icon: '💗',
      title: 'Com Sinceridade',
      text: 'Talvez eu nem sempre saiba demonstrar tudo da melhor forma, mas isso não significa que eu não sinta.',
      hint: 'Toque na pétala central para abrir',
    },
    {
      step: 8,
      id: 'step-8',
      badge: '8ª Descoberta • Preparação',
      icon: '💌',
      title: 'Quase Lá...',
      text: 'E se você chegou até aqui, acho que já percebeu que eu tinha algumas coisas guardadas.',
      hint: 'Toque para preparar a carta principal',
    },
    {
      step: 9,
      id: 'step-9',
      badge: '9ª Descoberta • Declaração Principal',
      icon: '❤️',
      title: 'O Que Meu Coração Queria Te Dizer',
      text: '[DECLARAÇÃO PRINCIPAL: Aqui entrará o seu texto mais importante, escrito especialmente para ela]',
      hint: 'Toque para abrir a declaração principal',
    },
    {
      step: 10,
      id: 'step-10',
      badge: '10ª Descoberta • O Fechamento',
      icon: '🌷',
      title: 'Apenas Uma Certeza',
      text: 'No fim, era só isso que eu queria que você soubesse: você é especial para mim.',
      hint: 'O último detalhe com todo o amor',
    }
  ];

  // ==========================================
  // ESTADO DA EXPERIÊNCIA
  // ==========================================
  const state = {
    currentStep: 0,
    discoveredSteps: new Set(),
    isEnvelopeOpen: false,
    isLetterExpanded: false,
  };

  document.addEventListener('DOMContentLoaded', () => {
    console.log('📜 Inicializando as 10 descobertas da cartinha...');

    initAmbientPetals();
    initPaperFlowers();
    initEnvelopeAndSeal();
    initDiscoveryModal();
    initMouseParallax();
    updateProgressTracker();
  });

  // ==========================================
  // 1. PÉTALAS AMBIENTES
  // ==========================================
  function initAmbientPetals() {
    const backdrop = document.getElementById('ambient-backdrop');
    if (!backdrop || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = window.innerWidth < 640 ? 10 : 20;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'ambient-petal';

      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 16;
      const delay = Math.random() * 14;
      const startRotation = Math.random() * 360;

      petal.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 1.4}px;
        left: ${left}vw;
        top: -30px;
        background: radial-gradient(circle at 30% 30%, #fcedea 0%, #ebc2bc 80%, #d89e95 100%);
        border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
        opacity: ${0.12 + Math.random() * 0.22};
        pointer-events: none;
        filter: blur(${Math.random() > 0.6 ? '1px' : '0.5px'});
        animation: floatPetal ${duration}s linear ${delay}s infinite;
        transform: rotate(${startRotation}deg);
      `;

      fragment.appendChild(petal);
    }

    backdrop.appendChild(fragment);

    if (!document.getElementById('petal-keyframes')) {
      const style = document.createElement('style');
      style.id = 'petal-keyframes';
      style.textContent = `
        @keyframes floatPetal {
          0% { transform: translateY(-20px) rotate(0deg) translateX(0); }
          33% { transform: translateY(35vh) rotate(120deg) translateX(20px); }
          66% { transform: translateY(70vh) rotate(240deg) translateX(-15px); }
          100% { transform: translateY(105vh) rotate(360deg) translateX(10px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==========================================
  // 2. FLORES DE PAPEL EM SVG
  // ==========================================
  function createPaperFlowerSVG(options = {}) {
    const size = options.size || 70;
    const rotation = options.rotation || 0;
    const targetStep = options.targetStep || null;

    const wrapper = document.createElement('div');
    wrapper.className = 'paper-flower';
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;
    wrapper.style.transform = `rotate(${rotation}deg)`;
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('aria-label', 'Flor de papel artesanal');

    wrapper.innerHTML = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="flower-leaves">
          <path class="flower-leaf" d="M25 80 C 15 65, 10 45, 30 35 C 40 45, 45 65, 25 80 Z" />
          <path class="petal-crease" d="M25 80 Q 25 55 30 35" />
          <path class="flower-leaf" d="M75 80 C 85 65, 90 45, 70 35 C 60 45, 55 65, 75 80 Z" />
          <path class="petal-crease" d="M75 80 Q 75 55 70 35" />
        </g>
        <g class="petals-layer-outer">
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
        <g class="petals-layer-inner" transform="rotate(18 50 50)">
          <path class="petal-inner" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(90 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(180 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
          <path class="petal-inner" transform="rotate(270 50 50)" d="M50 50 C 45 36, 55 36, 50 28 C 45 36, 55 36, 50 50 Z" />
        </g>
        <circle class="flower-center" cx="50" cy="50" r="7" />
        <circle cx="50" cy="50" r="4" fill="rgba(255, 255, 255, 0.4)" />
      </svg>
    `;

    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.remove('is-interacted');
      void wrapper.offsetWidth;
      wrapper.classList.add('is-interacted');

      if (targetStep) {
        openFragmentModal(targetStep);
      }
    });

    return wrapper;
  }

  function initPaperFlowers() {
    const clusterTL = document.getElementById('flower-cluster-tl');
    const clusterBR = document.getElementById('flower-cluster-br');

    if (clusterTL && !clusterTL.hasChildNodes()) {
      clusterTL.appendChild(createPaperFlowerSVG({ 
        size: 68, 
        rotation: -20, 
        targetStep: 2 // Flor revela o Passo 2: Carinho
      }));
    }

    if (clusterBR && !clusterBR.hasChildNodes()) {
      clusterBR.appendChild(createPaperFlowerSVG({ 
        size: 76, 
        rotation: 25, 
        targetStep: 5 // Flor revela o Passo 5: Sentimento
      }));
    }
  }

  // ==========================================
  // 3. ENVELOPE E SELO DE CERA ARTESANAL
  // ==========================================
  function initEnvelopeAndSeal() {
    const sealBtn = document.getElementById('start-experience-btn');
    const envelope = document.getElementById('main-envelope');
    const letter = document.getElementById('main-letter');
    const backdrop = document.getElementById('letter-backdrop');
    const closeLetterBtn = document.getElementById('close-letter-btn');

    if (!sealBtn || !envelope) return;

    sealBtn.addEventListener('click', () => {
      if (state.isEnvelopeOpen) return;

      const rect = sealBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      spawnWaxParticles(x, y);
      sealBtn.classList.add('breaking');

      setTimeout(() => {
        envelope.classList.add('is-open');
        state.isEnvelopeOpen = true;
        markStepDiscovered(1); // 1ª Descoberta: Curiosidade
        showTracker();

        const hint = document.querySelector('.action-hint');
        if (hint) hint.textContent = '1ª descoberta revelada • Toque nos detalhes ao redor';
      }, 500);

      setTimeout(() => {
        if (letter && backdrop) {
          letter.classList.add('is-expanded');
          backdrop.classList.add('is-active');
          state.isLetterExpanded = true;
        }
      }, 1200);
    });

    if (letter) {
      letter.addEventListener('click', (e) => {
        if (e.target.closest('[data-step]') || e.target.closest('.letter-close-btn')) {
          return;
        }
        if (state.isEnvelopeOpen && !state.isLetterExpanded) {
          letter.classList.add('is-expanded');
          if (backdrop) backdrop.classList.add('is-active');
          state.isLetterExpanded = true;
        }
      });
    }

    if (closeLetterBtn) {
      closeLetterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (letter && backdrop) {
          letter.classList.remove('is-expanded');
          backdrop.classList.remove('is-active');
          state.isLetterExpanded = false;
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        if (state.isLetterExpanded && letter) {
          letter.classList.remove('is-expanded');
          backdrop.classList.remove('is-active');
          state.isLetterExpanded = false;
        }
      });
    }
  }

  // ==========================================
  // 4. PARTÍCULAS DE CERA
  // ==========================================
  function spawnWaxParticles(originX, originY) {
    const particleCount = 14;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'wax-particle';

      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 35 + Math.random() * 55;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const size = 4 + Math.random() * 6;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      fragment.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }

    document.body.appendChild(fragment);
  }

  // ==========================================
  // 5. MODAL DE DESCOBERTA DAS MENSAGENS (1 A 10)
  // ==========================================
  function initDiscoveryModal() {
    const overlay = document.getElementById('discovery-overlay');
    const closeBtn = document.getElementById('discovery-close-btn');

    if (!overlay) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('is-visible');
        checkCompletion();
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-visible');
        checkCompletion();
      }
    });

    // Registra cliques em todos os elementos com data-step
    document.querySelectorAll('[data-step]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const stepNum = parseInt(el.getAttribute('data-step'), 10);
        if (stepNum) {
          openFragmentModal(stepNum);
        }
      });
    });

    // Botão final para ver a carta completa reunida
    const viewFullBtn = document.getElementById('view-full-letter-btn');
    if (viewFullBtn) {
      viewFullBtn.addEventListener('click', () => {
        renderFullAssembledLetter();
      });
    }
  }

  function openFragmentModal(stepNumber) {
    const fragmentData = fragments.find(f => f.step === stepNumber);
    if (!fragmentData) return;

    const overlay = document.getElementById('discovery-overlay');
    const badgeIcon = document.getElementById('fragment-badge-icon');
    const badgeText = document.getElementById('fragment-badge-text');
    const titleEl = document.getElementById('fragment-title');
    const textEl = document.getElementById('fragment-text');
    const actionBtn = document.getElementById('discovery-close-btn');

    if (!overlay) return;

    if (badgeIcon) badgeIcon.textContent = fragmentData.icon;
    if (badgeText) badgeText.textContent = fragmentData.badge;
    if (titleEl) titleEl.textContent = fragmentData.title;
    if (textEl) textEl.textContent = `“${fragmentData.text}”`;

    // Atualiza botão de ação dependendo do passo
    if (actionBtn) {
      if (stepNumber < 10) {
        actionBtn.textContent = 'Guardar este pedaço & Continuar';
      } else {
        actionBtn.textContent = 'Guardar no coração';
      }
    }

    overlay.classList.add('is-visible');
    markStepDiscovered(stepNumber);
  }

  function markStepDiscovered(stepNumber) {
    state.discoveredSteps.add(stepNumber);
    state.currentStep = Math.max(state.currentStep, stepNumber);
    updateProgressTracker();

    // Revela visualmente elementos subsequentes na carta
    revealNextClues(stepNumber);
  }

  function updateProgressTracker() {
    const tracker = document.getElementById('discovery-tracker');
    const countEl = document.getElementById('tracker-count');
    const dotsContainer = document.getElementById('tracker-petals');

    if (countEl) {
      countEl.textContent = `${state.discoveredSteps.size} de 10`;
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 1; i <= 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'tracker-dot';
        if (state.discoveredSteps.has(i)) {
          dot.classList.add('is-discovered');
        } else if (i === state.currentStep + 1) {
          dot.classList.add('is-current');
        }
        dot.title = `Passo ${i}`;
        dotsContainer.appendChild(dot);
      }
    }
  }

  function showTracker() {
    const tracker = document.getElementById('discovery-tracker');
    if (tracker) tracker.classList.add('is-active');
  }

  function revealNextClues(currentStep) {
    // Revela os elementos gradualmente para manter o suspense
    if (currentStep >= 3) {
      const p4 = document.getElementById('clue-step-4');
      if (p4) p4.style.display = 'flex';
    }
    if (currentStep >= 5) {
      const p6 = document.getElementById('clue-step-6');
      if (p6) p6.style.display = 'block';
    }
    if (currentStep >= 7) {
      const p8 = document.getElementById('clue-step-8');
      if (p8) p8.style.display = 'block';
    }
    if (currentStep >= 8) {
      const p9 = document.getElementById('clue-step-9');
      if (p9) p9.style.display = 'block';
    }
  }

  function checkCompletion() {
    // Quando todas as 10 mensagens forem descobertas, exibe o convite para ler a carta unificada
    if (state.discoveredSteps.size >= 8) {
      const completionCard = document.getElementById('completion-invitation');
      if (completionCard) {
        completionCard.style.display = 'block';
      }
    }
  }

  function renderFullAssembledLetter() {
    const section = document.getElementById('assembled-letter-section');
    const listContainer = document.getElementById('assembled-fragments-list');

    if (!section || !listContainer) return;

    listContainer.innerHTML = '';

    fragments.forEach(f => {
      const item = document.createElement('div');
      item.className = 'assembled-fragment-item';
      item.innerHTML = `
        <span class="assembled-fragment-step">${f.icon} ${f.badge}</span>
        <p class="assembled-fragment-text">“${f.text}”</p>
      `;
      listContainer.appendChild(item);
    });

    section.classList.add('is-visible');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  // ==========================================
  // 6. MICRO-PARALLAX NO PC (CURSOR SUTIL)
  // ==========================================
  function initMouseParallax() {
    if (window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) * 0.012;
      targetY = (e.clientY - centerY) * 0.012;
    }, { passive: true });

    const update = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const stage = document.getElementById('experience-stage');
      if (stage && !state.isLetterExpanded) {
        stage.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      requestAnimationFrame(update);
    };

    update();
  }

})();
