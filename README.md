# Cartinha de Amor Digital Interativa

Uma experiência web artesanal baseada **exclusivamente em mensagens de texto**, construída como uma carta de amor dividida em pequenos pedaços para serem descobertos progressivamente.

---

## 🌹 Conceito Central

* **O Texto é o Protagonista:** Não há dependência de fotos, vídeos ou arquivos de áudio externos. O impacto emocional é conduzido pelas palavras.
* **Metáfora:** Uma carta que foi dividida em pequenos pedaços espalhados (envelopes, flores de papel, pequenos bilhetes dobrados, corações de papel).
* **Navegação com Significado:** Cada clique revela um novo fragmento do sentimento:
  * *Tocar em uma flor* → revela um pensamento.
  * *Abrir um envelope* → revela uma mensagem ou declaração.
  * *Tocar em um bilhete* → desdobra uma pequena confissão.
  * *Tocar no coração* → revela um sentimento sincero ou observação sobre ela.

---

## 📁 Estrutura do Projeto

```
her/
├── index.html                   # Ponto de entrada semântico da experiência
├── README.md                    # Documentação e guia da narrativa
├── styles/
│   ├── tokens.css               # Paleta artesanal, tipografia editorial e sombras
│   ├── base.css                 # Reset, textura de papel de algodão e atmosfera
│   └── components/
│       ├── stage.css            # O palco central onde os elementos repousam
│       ├── paper-flower.css     # Flores de papel em camadas vetoriais SVG
│       ├── envelope.css         # Envelope artesanal com dobra 3D e quebra de selo
│       ├── letter.css           # Carta interior desdobrável
│       ├── note.css             # Bilhetes dobrados com washi tape e modal de texto
│       └── heart.css            # Corações de papel artesanal em estilo origami
└── js/
    ├── app.js                   # Orquestrador universal da experiência (file:// e http://)
    ├── messages.js              # Catálogo de mensagens por fases e tipos de texto
    ├── state.js                 # Gerenciador de estado e progresso das descobertas
    └── components/              # Componentes isolados para evolução futura
```

---

## 📖 As 5 Fases da Narrativa (Desenvolvimento Progressivo)

1. **Fase 1: O Começo**
   * O primeiro envelope fechado com selo de cera. Ao abrir, revela a mensagem introdutória: `[MENSAGEM 1]`.
2. **Fase 2: As Descobertas**
   * Flores de papel nos cantos, bilhetes dobrados e corações táteis revelam pensamentos e confissões (`[PENSAMENTO 1]`, `[PENSAMENTO 2]`, `[MENSAGEM 2]`).
3. **Fase 3: O Desenvolvimento**
   * O tom das mensagens aprofunda suavemente para admiração e carinho (`[DECLARAÇÃO]`).
4. **Fase 4: O Momento Especial**
   * Um envelope ou elemento marcante surge após as descobertas preliminares com uma mensagem maior: `[MENSAGEM ESPECIAL]`.
5. **Fase 5: A Carta Final**
   * A mensagem mais importante e o encerramento da jornada: `[CARTA FINAL]`.

---

## 🔒 Princípio de Privacidade de Conteúdo

Nenhum histórico pessoal ou conteúdo sensível é inventado. Todos os textos permanecem como placeholders claros prontos para serem preenchidos pelo autor passo a passo.
