// Configurações atuais
let settings = {
  hideUnicoBar: false,
  zoomLevel: 100
};

// Inicialização
(async function init() {
  // Carregar configurações salvas
  await loadSettings();
  
  // Aplicar configurações iniciais
  applySettings();
  
  // Configurar listeners
  setupListeners();
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
  if (settings.hideUnicoBar) {
    hideUnicoBar();
  } else {
    showUnicoBar();
  }

  // Aplicar zoom no editor do Google Docs
  applyZoom();
}

// Ocultar barra do Sistema Único
function hideUnicoBar() {
  // Adicionar classe para ocultar elementos
  document.body.classList.add('mpf-hide-unico-bar');
}

// Mostrar barra do Sistema Único
function showUnicoBar() {
  document.body.classList.remove('mpf-hide-unico-bar');
}

// Aplicar zoom ao editor do Google Docs
function applyZoom() {
  const iframe = document.querySelector('iframe[src*="docs.google.com"]');
  if (iframe && iframe.contentWindow) {
    const zoomValue = settings.zoomLevel / 100;
    console.log(`MPF Docs Optimizer: Sending zoom level ${zoomValue} to iframe.`);
    iframe.contentWindow.postMessage({ 
      action: 'applyZoom', 
      zoom: zoomValue 
    }, '*'); // Using * for the target origin is less secure, but more likely to work in this context.
  } else {
    console.log('MPF Docs Optimizer: Google Docs iframe not found.');
  }
}

// Configurar listeners
function setupListeners() {
  // Listener para mensagens do popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
      settings = request.settings;
      applySettings();
      sendResponse({ success: true });
    } else if (request.action === 'executeUnicoAction') {
      executeUnicoAction(request.unicoAction)
        .then(success => sendResponse({ success }))
        .catch(error => {
          console.error('Erro ao executar ação do Único:', error);
          sendResponse({ success: false, error: error.message });
        });
      return true; // Indica resposta assíncrona
    }
  });
}

// Executar ações do Sistema Único
async function executeUnicoAction(action) {
  const selectorMap = {
    'exibirDados': 'button[ng-click="btnExibirDados()"]',
    'visualizarPdf': 'button[ng-click="btnVisualizarPdf()"]',
    'salvarModelo': 'button[ng-click="btnSalvarComoModelo()"]',
    'salvarFechar': 'button[ng-click="btnPainel()"]'
  };

  const selector = selectorMap[action];
  if (!selector) {
    throw new Error(`Ação não reconhecida: ${action}`);
  }

  const button = document.querySelector(selector);
  if (!button) {
    throw new Error(`Botão não encontrado para a ação: ${action}`);
  }

  // Simular clique no botão
  button.click();
  
  console.log(`MPF Docs Optimizer: Executada ação "${action}"`);
  return true;
}