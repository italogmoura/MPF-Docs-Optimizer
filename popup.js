// Elementos do DOM
const elements = {
  hideUnicoBar: document.getElementById('hideUnicoBar'),
  hideDocsBar: document.getElementById('hideDocsBar'),
  fullscreenMode: document.getElementById('fullscreenMode'),
  autoHide: document.getElementById('autoHide'),
  zoomOut: document.getElementById('zoomOut'),
  zoomIn: document.getElementById('zoomIn'),
  zoomValue: document.getElementById('zoomValue'),
  resetSettings: document.getElementById('resetSettings'),
  statusMessage: document.getElementById('statusMessage')
};

// Estado da aplicação
let currentSettings = {
  hideUnicoBar: false,
  hideDocsBar: false,
  fullscreenMode: false,
  autoHide: false,
  zoomLevel: 100
};

// Configurações padrão
const defaultSettings = {
  hideUnicoBar: false,
  hideDocsBar: false,
  fullscreenMode: false,
  autoHide: false,
  zoomLevel: 100
};

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  setupEventListeners();
  updateUI();
});

// Carregar configurações salvas
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['mpfDocsSettings']);
    if (result.mpfDocsSettings) {
      currentSettings = { ...defaultSettings, ...result.mpfDocsSettings };
    }
    // Aplicar indicadores visuais de estado ativo
    updateActiveStates();
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    showStatus('Erro ao carregar configurações', 'error');
  }
}

// Salvar configurações
async function saveSettings() {
  try {
    await chrome.storage.sync.set({ mpfDocsSettings: currentSettings });
    showStatus('Configurações salvas!', 'success');
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    showStatus('Erro ao salvar', 'error');
  }
}

// Configurar event listeners
function setupEventListeners() {
  // Toggle switches com aplicação automática
  elements.hideUnicoBar.addEventListener('change', async (e) => {
    currentSettings.hideUnicoBar = e.target.checked;
    if (e.target.checked && currentSettings.fullscreenMode) {
      // Desativar modo tela cheia se estiver ativando controle individual
      currentSettings.fullscreenMode = false;
      elements.fullscreenMode.checked = false;
    }
    await saveSettings();
    await applySettingsToTab();
  });

  elements.hideDocsBar.addEventListener('change', async (e) => {
    currentSettings.hideDocsBar = e.target.checked;
    if (e.target.checked && currentSettings.fullscreenMode) {
      currentSettings.fullscreenMode = false;
      elements.fullscreenMode.checked = false;
    }
    await saveSettings();
    await applySettingsToTab();
  });

  elements.fullscreenMode.addEventListener('change', async (e) => {
    currentSettings.fullscreenMode = e.target.checked;
    if (e.target.checked) {
      // Ativar ambas as barras quando modo tela cheia ativo
      currentSettings.hideUnicoBar = true;
      currentSettings.hideDocsBar = true;
      elements.hideUnicoBar.checked = true;
      elements.hideDocsBar.checked = true;
    }
    await saveSettings();
    await applySettingsToTab();
  });

  elements.autoHide.addEventListener('change', async (e) => {
    currentSettings.autoHide = e.target.checked;
    await saveSettings();
    await applySettingsToTab();
  });

  // Controles de zoom com aplicação automática
  elements.zoomOut.addEventListener('click', async () => {
    if (currentSettings.zoomLevel > 50) {
      currentSettings.zoomLevel -= 10;
      updateZoomDisplay();
      await saveSettings();
      await applySettingsToTab();
    }
  });

  elements.zoomIn.addEventListener('click', async () => {
    if (currentSettings.zoomLevel < 200) {
      currentSettings.zoomLevel += 10;
      updateZoomDisplay();
      await saveSettings();
      await applySettingsToTab();
    }
  });

  // Botão de reset (único botão restante)
  elements.resetSettings.addEventListener('click', resetSettings);
}

// Aplicar configurações na aba ativa
async function applySettingsToTab() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateSettings',
        settings: currentSettings
      });
    }
    showStatus('Aplicado automaticamente!', 'success');
  } catch (error) {
    console.error('Erro ao aplicar configurações:', error);
    showStatus('Erro ao aplicar', 'error');
  }
}

// Restaurar configurações padrão
async function resetSettings() {
  currentSettings = { ...defaultSettings };
  await saveSettings();
  updateUI();
  await applySettingsToTab();
  showStatus('Configurações restauradas!', 'success');
}

// Atualizar interface
function updateUI() {
  elements.hideUnicoBar.checked = currentSettings.hideUnicoBar;
  elements.hideDocsBar.checked = currentSettings.hideDocsBar;
  elements.fullscreenMode.checked = currentSettings.fullscreenMode;
  elements.autoHide.checked = currentSettings.autoHide;
  updateZoomDisplay();
}

// Atualizar display do zoom
function updateZoomDisplay() {
  elements.zoomValue.textContent = `${currentSettings.zoomLevel}%`;
  
  // Desabilitar botões nos limites
  elements.zoomOut.disabled = currentSettings.zoomLevel <= 50;
  elements.zoomIn.disabled = currentSettings.zoomLevel >= 200;
}

// Mostrar status
function showStatus(message, type = 'normal') {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status ${type}`;
  
  // Limpar status após 3 segundos
  setTimeout(() => {
    elements.statusMessage.textContent = 'Pronto para otimizar';
    elements.statusMessage.className = 'status';
  }, 3000);
}

// Verificar se está na página do MPF
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0] && !tabs[0].url.includes('mpf.mp.br')) {
    showStatus('Esta extensão funciona apenas no Sistema Único do MPF', 'error');
    
    // Desabilitar controles
    document.querySelectorAll('input, button').forEach(el => {
      el.disabled = true;
    });
  }
});

// Função para atualizar indicadores visuais de estado ativo (Nielsen: Visibilidade do Status)
function updateActiveStates() {
  const controlItems = document.querySelectorAll('.control-item');
  const settings = [
    { element: controlItems[0], active: currentSettings.hideUnicoBar },
    { element: controlItems[1], active: currentSettings.hideDocsBar },
    { element: controlItems[2], active: currentSettings.fullscreenMode },
    { element: controlItems[3], active: currentSettings.autoHide }
  ];
  
  settings.forEach(({ element, active }) => {
    if (element) {
      element.classList.toggle('active', active);
    }
  });
}

// Melhorar feedback visual dos botões (Nielsen: Feedback)
function addButtonFeedback() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Adicionar estado de loading
      this.classList.add('loading');
      
      // Remover loading após ação
      setTimeout(() => {
        this.classList.remove('loading');
      }, 500);
    });
  });
}

// Implementar atalhos de teclado (Nielsen: Controle e Liberdade)
document.addEventListener('keydown', (e) => {
  // Escape: Restaurar padrões
  if (e.key === 'Escape') {
    e.preventDefault();
    elements.resetSettings.click();
  }
  
  // Ctrl/Cmd + R: Reset
  if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
    e.preventDefault();
    elements.resetSettings.click();
  }
});

// Aplicar melhorias de UX ao inicializar
document.addEventListener('DOMContentLoaded', () => {
  addButtonFeedback();
  
  // Adicionar tooltips informativos
  const tooltips = {
    'hideUnicoBar': 'Remove completamente a barra do Sistema Único - Aplicado automaticamente',
    'hideDocsBar': 'Mantém apenas ferramentas essenciais do Google Docs - Aplicado automaticamente',
    'fullscreenMode': 'Ativa ambas as opções acima automaticamente',
    'autoHide': 'Barras desaparecem durante rolagem e reaparecem quando parar',
    'resetSettings': 'Atalho: Escape ou Ctrl+R'
  };
  
  Object.entries(tooltips).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.title = text;
    }
  });
});

// Adicionar observador para mudanças em tempo real (Nielsen: Feedback Imediato)
function setupRealtimeUpdates() {
  const toggles = document.querySelectorAll('input[type="checkbox"]');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      updateActiveStates();
      
      // Feedback visual sutil
      const controlItem = toggle.closest('.control-item');
      if (controlItem) {
        controlItem.style.transform = 'scale(1.02)';
        setTimeout(() => {
          controlItem.style.transform = '';
        }, 100);
      }
    });
  });
}

// Inicializar melhorias de UX
document.addEventListener('DOMContentLoaded', () => {
  setupRealtimeUpdates();
});