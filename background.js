// Service Worker para MPF Docs Optimizer

// Listener para instalação da extensão
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Configurações iniciais
    const defaultSettings = {
      hideUnicoBar: false
    };
    
    try {
      await chrome.storage.sync.set({ mpfDocsSettings: defaultSettings });
      console.log('MPF Docs Optimizer: Configurações iniciais salvas');
    } catch (error) {
      console.error('MPF Docs Optimizer: Erro ao salvar configurações iniciais', error);
    }
  }
});

// Listener para cliques no ícone da extensão (caso o popup não abra)
chrome.action.onClicked.addListener(async (tab) => {
  // Verificar se está no domínio correto
  if (tab.url && tab.url.includes('mpf.mp.br')) {
    // Enviar mensagem para alternar modo rápido
    chrome.tabs.sendMessage(tab.id, {
      action: 'toggleQuickMode'
    });
  } else {
    // Notificar que a extensão só funciona no MPF
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.svg',
      title: 'MPF Docs Optimizer',
      message: 'Esta extensão funciona apenas no Sistema Único do MPF'
    });
  }
});

// Listener para mensagens entre componentes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    // Retornar configurações salvas
    chrome.storage.sync.get(['mpfDocsSettings'], (result) => {
      sendResponse(result.mpfDocsSettings || {});
    });
    return true; // Manter canal aberto para resposta assíncrona
  }
  
  if (request.action === 'checkDomain') {
    // Verificar se a aba atual está no domínio MPF
    const isValidDomain = sender.tab?.url?.includes('mpf.mp.br') || false;
    sendResponse({ isValid: isValidDomain });
  }
});

// Monitorar mudanças no storage para sincronização entre abas
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.mpfDocsSettings) {
    // Notificar todas as abas do MPF sobre a mudança
    chrome.tabs.query({ url: '*://*.mpf.mp.br/*' }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'settingsUpdated',
          settings: changes.mpfDocsSettings.newValue
        }).catch(() => {
          // Ignorar erros se a aba não tiver o content script
        });
      });
    });
  }
});