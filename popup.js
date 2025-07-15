// Elementos do DOM
const elements = {
  hideUnicoBar: document.getElementById('hideUnicoBar'),
  zoomOut: document.getElementById('zoomOut'),
  zoomIn: document.getElementById('zoomIn'),
  zoomLevel: document.getElementById('zoomLevel'),
  resetSettings: document.getElementById('resetSettings'),
  statusMessage: document.getElementById('statusMessage')
};

// Estado da aplicação
let currentSettings = {
  hideUnicoBar: false,
  zoomLevel: 100
};

// Configurações padrão
const defaultSettings = {
  hideUnicoBar: false,
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
    await saveSettings();
    await applySettingsToTab();
    updateActiveStates();
  });

  // Zoom controls
  elements.zoomOut.addEventListener('click', () => updateZoom(-10));
  elements.zoomIn.addEventListener('click', () => updateZoom(10));
  elements.zoomLevel.addEventListener('change', async () => {
    let level = parseInt(elements.zoomLevel.value, 10);
    if (isNaN(level)) level = 100;
    if (level < 50) level = 50;
    if (level > 200) level = 200;
    currentSettings.zoomLevel = level;
    elements.zoomLevel.value = level; // Correct the value if it was out of bounds
    await saveSettings();
    await applySettingsToTab();
  });

  // Botão de reset (único botão restante)
  elements.resetSettings.addEventListener('click', resetSettings);
}

async function updateZoom(change) {
  let level = currentSettings.zoomLevel + change;
  if (level < 50) level = 50;
  if (level > 200) level = 200;
  currentSettings.zoomLevel = level;
  updateUI();
  await saveSettings();
  await applySettingsToTab();
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
  elements.zoomLevel.value = currentSettings.zoomLevel;
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

// Função para atualizar indicadores visuais de estado ativo
function updateActiveStates() {
  const controlItem = document.querySelector('.control-item');
  if (controlItem) {
    controlItem.classList.toggle('active', currentSettings.hideUnicoBar);
  }
}

// Implementar atalhos de teclado
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

// Adicionar observador para mudanças em tempo real
function setupRealtimeUpdates() {
  const toggle = document.getElementById('hideUnicoBar');
  
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
}

// Inicializar melhorias de UX
document.addEventListener('DOMContentLoaded', () => {
  setupRealtimeUpdates();
});