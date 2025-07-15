// Configurações atuais
let settings = {
  hideUnicoBar: false,
  hideDocsBar: false,
  fullscreenMode: false,
  autoHide: false,
  zoomLevel: 100
};

// Variáveis de controle
let isScrolling = false;
let scrollTimeout = null;
let lastScrollTop = 0;
let barsHidden = false;

// Inicialização
(async function init() {
  // Carregar configurações salvas
  await loadSettings();
  
  // Aplicar configurações iniciais
  applySettings();
  
  // Configurar listeners
  setupListeners();
  
  // Observar mudanças no DOM para detectar o iframe do Google Docs
  observeIframeLoad();
})();

// Carregar configurações do storage
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['mpfDocsSettings']);
    if (result.mpfDocsSettings) {
      settings = result.mpfDocsSettings;
    }
  } catch (error) {
    console.error('MPF Docs Optimizer: Erro ao carregar configurações', error);
  }
}

// Aplicar configurações
function applySettings() {
  // Aplicar estilos no Sistema Único
  if (settings.hideUnicoBar || settings.fullscreenMode) {
    hideUnicoBar();
  } else {
    showUnicoBar();
  }
  
  // Aplicar configurações no iframe do Google Docs
  const docsIframe = findDocsIframe();
  if (docsIframe) {
    applyDocsSettings(docsIframe);
  }
  
  // Configurar auto-hide
  if (settings.autoHide) {
    enableAutoHide();
  } else {
    disableAutoHide();
  }
}

// Encontrar iframe do Google Docs
function findDocsIframe() {
  // Procurar por iframes que contenham docs.google.com
  const iframes = document.querySelectorAll('iframe');
  for (const iframe of iframes) {
    if (iframe.src && iframe.src.includes('docs.google.com')) {
      return iframe;
    }
  }
  return null;
}

// Observar carregamento do iframe
function observeIframeLoad() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IFRAME' && node.src?.includes('docs.google.com')) {
          // Aguardar carregamento do iframe
          node.addEventListener('load', () => {
            applyDocsSettings(node);
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Ocultar barra do Sistema Único
function hideUnicoBar() {
  // Adicionar classe para ocultar elementos
  document.body.classList.add('mpf-hide-unico-bar');
  
  // Ajustar iframe para ocupar tela toda mantendo margens para barra de rolagem
  const docsIframe = findDocsIframe();
  if (docsIframe) {
    docsIframe.style.position = 'fixed';
    docsIframe.style.top = '0';
    docsIframe.style.left = '0';
    docsIframe.style.width = 'calc(100vw - 20px)';
    docsIframe.style.height = 'calc(100vh - 20px)';
    docsIframe.style.margin = '10px';
    docsIframe.style.border = 'none';
    docsIframe.style.zIndex = '1000';
    docsIframe.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
  }
}

// Mostrar barra do Sistema Único
function showUnicoBar() {
  document.body.classList.remove('mpf-hide-unico-bar');
  
  const docsIframe = findDocsIframe();
  if (docsIframe) {
    // Restaurar estilos originais
    docsIframe.style.position = '';
    docsIframe.style.top = '';
    docsIframe.style.left = '';
    docsIframe.style.width = '';
    docsIframe.style.height = '';
    docsIframe.style.margin = '';
    docsIframe.style.border = '';
    docsIframe.style.zIndex = '';
    docsIframe.style.boxShadow = '';
  }
}

// Aplicar configurações no Google Docs
function applyDocsSettings(iframe) {
  try {
    // Injetar script no iframe
    const script = `
      (function() {
        const settings = ${JSON.stringify(settings)};
        
        // Função para aplicar estilos
        function applyStyles() {
          let styleEl = document.getElementById('mpf-docs-optimizer-styles');
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'mpf-docs-optimizer-styles';
            document.head.appendChild(styleEl);
          }
          
          let styles = '';
          
          // Ocultar/compactar barra do Google Docs
          if (settings.hideDocsBar || settings.fullscreenMode) {
            styles += \`
              /* Ocultar elementos da barra superior */
              .docs-material-menu-button-outer-box,
              .docs-titlebar-buttons,
              .docs-branding-container,
              #docs-chrome,
              .docs-material-gm-select-outer-box,
              .docs-title-outer {
                display: none !important;
              }
              
              /* Compactar barra de menus */
              .docs-material #docs-header {
                height: 30px !important;
                min-height: 30px !important;
              }
              
              .docs-material .docs-menubar {
                height: 30px !important;
                padding: 0 !important;
              }
              
              /* Ajustar editor */
              .kix-appview-editor-container {
                top: 30px !important;
              }
            \`;
          }
          
          // Aplicar zoom
          if (settings.zoomLevel !== 100) {
            styles += \`
              .kix-page-container {
                zoom: ${settings.zoomLevel}% !important;
              }
            \`;
          }
          
          styleEl.textContent = styles;
        }
        
        // Aplicar estilos quando o documento carregar
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', applyStyles);
        } else {
          applyStyles();
        }
        
        // Observar mudanças para reaplicar estilos se necessário
        const observer = new MutationObserver(() => {
          const styleEl = document.getElementById('mpf-docs-optimizer-styles');
          if (!styleEl || !document.head.contains(styleEl)) {
            applyStyles();
          }
        });
        
        observer.observe(document.head, { childList: true });
      })();
    `;
    
    // Executar script no contexto do iframe
    iframe.contentWindow.postMessage({
      type: 'MPF_DOCS_OPTIMIZER_INJECT',
      script: script
    }, '*');
    
  } catch (error) {
    console.error('MPF Docs Optimizer: Erro ao aplicar configurações no Docs', error);
  }
}

// Habilitar auto-hide
function enableAutoHide() {
  window.addEventListener('scroll', handleScroll);
}

// Desabilitar auto-hide
function disableAutoHide() {
  window.removeEventListener('scroll', handleScroll);
  if (barsHidden) {
    showBarsTemporarily();
  }
}

// Manipular scroll para auto-hide
function handleScroll() {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Detectar direção do scroll
  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    // Scrolling down - ocultar barras
    if (!barsHidden) {
      hideBarsTemporarily();
    }
  } else {
    // Scrolling up - mostrar barras
    if (barsHidden) {
      showBarsTemporarily();
    }
  }
  
  lastScrollTop = currentScrollTop;
  
  // Reset timer para mostrar barras quando parar de scrollar
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (barsHidden) {
      showBarsTemporarily();
    }
  }, 1500);
}

// Ocultar barras temporariamente
function hideBarsTemporarily() {
  document.body.classList.add('mpf-auto-hide-active');
  barsHidden = true;
}

// Mostrar barras temporariamente
function showBarsTemporarily() {
  document.body.classList.remove('mpf-auto-hide-active');
  barsHidden = false;
}

// Configurar listeners
function setupListeners() {
  // Listener para mensagens do popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
      settings = request.settings;
      applySettings();
      sendResponse({ success: true });
    }
  });
  
  // Listener para mensagens do iframe (resposta ao postMessage)
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MPF_DOCS_OPTIMIZER_READY') {
      // O iframe está pronto, reaplicar configurações se necessário
      const docsIframe = findDocsIframe();
      if (docsIframe) {
        applyDocsSettings(docsIframe);
      }
    }
  });
}