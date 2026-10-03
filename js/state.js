/**
 * STATE MANAGEMENT LEVE & EXTENSÍVEL
 * Gerencia o fluxo da narrativa, descobertas e estados dos componentes
 */

class ExperienceState {
  constructor() {
    this.data = {
      currentStep: 'intro', // 'intro', 'envelope', 'letter', etc.
      discoveries: new Set(),
      openedItems: new Set(),
      isMusicPlaying: false,
    };
    this.listeners = new Map();
  }

  /**
   * Obtém uma fatia ou valor do estado
   */
  get(key) {
    return this.data[key];
  }

  /**
   * Atualiza uma chave e notifica ouvintes
   */
  set(key, value) {
    const oldValue = this.data[key];
    this.data[key] = value;
    this.emit(key, value, oldValue);
    this.emit('*', this.data);
  }

  /**
   * Registra uma nova descoberta feita pela pessoa
   */
  addDiscovery(discoveryId) {
    if (!this.data.discoveries.has(discoveryId)) {
      this.data.discoveries.add(discoveryId);
      this.emit('discovery', discoveryId);
      this.emit('*', this.data);
    }
  }

  /**
   * Verifica se algo já foi descoberto
   */
  hasDiscovered(discoveryId) {
    return this.data.discoveries.has(discoveryId);
  }

  /**
   * Inscreve um ouvinte para alterações de estado
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(...args);
        } catch (err) {
          console.error(`Erro ao disparar evento de estado [${event}]:`, err);
        }
      });
    }
  }
}

export const state = new ExperienceState();
