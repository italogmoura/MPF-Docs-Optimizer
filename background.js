// Service Worker para MPF Docs Optimizer

// Listener para instalação da extensão
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Configurações iniciais
    const defaultSettings = {
      hideUnicoBar: false,
      hideDocsBar: false,
      fullscreenMode: false,
      autoHide: false,
      zoomLevel: 100
    };
    
    try {
      await chrome.storage.sync.set({ mpfDocsSettings: defaultSettings });
      console.log('MPF Docs Optimizer: Configurações iniciais salvas');
    } catch (error) {
      console.error('MPF Docs Optimizer: Erro ao salvar configurações iniciais', error);
    }
    
    // Abrir página de boas-vindas (opcional)
    // chrome.tabs.create({ url: 'welcome.html' });
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

// Função para injetar script no contexto do iframe (necessário para cross-origin)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'injectToIframe' && request.frameId) {
    chrome.scripting.executeScript({
      target: { 
        tabId: sender.tab.id,
        frameIds: [request.frameId]
      },
      func: (settings) => {
        // Este código será executado dentro do iframe
        const applyDocsStyles = () => {
          let styleEl = document.getElementById('mpf-docs-optimizer-styles');
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'mpf-docs-optimizer-styles';
            document.head.appendChild(styleEl);
          }
          
          let styles = '';
          
          if (settings.hideDocsBar || settings.fullscreenMode) {
            styles += `
              .docs-material-menu-button-outer-box,
              .docs-titlebar-buttons,
              .docs-branding-container,
              #docs-chrome,
              .docs-material-gm-select-outer-box,
              .docs-title-outer {
                display: none !important;
              }
              
              .docs-material #docs-header {
                height: 30px !important;
                min-height: 30px !important;
              }
              
              .docs-material .docs-menubar {
                height: 30px !important;
                padding: 0 !important;
              }
              
              .kix-appview-editor-container {
                top: 30px !important;
              }
            `;
          }
          
          if (settings.zoomLevel !== 100) {
            styles += `
              .kix-page-container {
                zoom: ${settings.zoomLevel}% !important;
              }
            `;
          }
          
          styleEl.textContent = styles;
        };
        
        applyDocsStyles();
        
        // Observar mudanças
        const observer = new MutationObserver(() => {
          const styleEl = document.getElementById('mpf-docs-optimizer-styles');
          if (!styleEl || !document.head.contains(styleEl)) {
            applyDocsStyles();
          }
        });
        
        observer.observe(document.head, { childList: true });
      },
      args: [request.settings]
    });
    
    sendResponse({ success: true });
    return true;
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

// Limpar dados antigos periodicamente (manutenção)
chrome.alarms.create('cleanup', { periodInMinutes: 60 * 24 }); // Uma vez por dia

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanup') {
    // Limpar dados temporários se necessário
    chrome.storage.local.get(['tempData'], (result) => {
      if (result.tempData) {
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const filteredData = Object.entries(result.tempData || {})
          .filter(([key, value]) => value.timestamp > oneWeekAgo)
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        
        chrome.storage.local.set({ tempData: filteredData });
      }
    });
  }
});