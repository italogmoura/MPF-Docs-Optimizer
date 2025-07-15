# MPF Docs Optimizer - Guia de Instalação

## 📁 Estrutura de Arquivos

Crie uma pasta chamada `mpf-docs-optimizer` com a seguinte estrutura:

```
mpf-docs-optimizer/
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── content.js
├── content.css
├── background.js
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 🎨 Criando os Ícones

Como os ícones não podem ser gerados automaticamente, você pode:

1. **Opção Rápida**: Criar ícones simples coloridos
   - Crie imagens quadradas nas dimensões: 16x16, 32x32, 48x48 e 128x128 pixels
   - Use uma cor sólida (ex: azul #0066cc) ou adicione as letras "MPF"

2. **Opção Profissional**: Use um gerador online
   - Acesse: https://favicon.io/favicon-generator/
   - Digite "MPF" ou "MD" (MPF Docs)
   - Baixe e renomeie os arquivos conforme necessário

## 📦 Instalação no Chrome

1. **Preparar os arquivos**:
   - Copie todos os códigos fornecidos para seus respectivos arquivos
   - Certifique-se de que os ícones estão na pasta `icons/`

2. **Abrir o gerenciador de extensões**:
   - Abra o Chrome
   - Digite `chrome://extensions/` na barra de endereços
   - Ou acesse: Menu (⋮) → Mais ferramentas → Extensões

3. **Ativar o Modo do desenvolvedor**:
   - No canto superior direito, ative o toggle "Modo do desenvolvedor"

4. **Carregar a extensão**:
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `mpf-docs-optimizer`
   - A extensão aparecerá na lista

5. **Fixar a extensão** (opcional):
   - Clique no ícone de quebra-cabeça (🧩) na barra de ferramentas
   - Clique no pin (📌) ao lado de "MPF Docs Optimizer"

## 🚀 Como Usar

1. **Acesse o Sistema Único do MPF**
   - Navegue até uma página com Google Docs integrado

2. **Clique no ícone da extensão**
   - O popup abrirá com as opções disponíveis

3. **Configure suas preferências**:
   - **Ocultar Barra Sistema Único**: Remove a barra superior do sistema
   - **Compactar Barra Google Docs**: Mantém apenas a barra mínima do editor
   - **Modo Tela Cheia Inteligente**: Maximiza completamente o editor
   - **Auto-ocultar ao Rolar**: Barras desaparecem durante a rolagem
   - **Zoom do Editor**: Ajuste o tamanho do conteúdo (50% a 200%)

4. **Aplique as configurações**:
   - Clique em "✓ Aplicar Configurações"
   - As mudanças serão aplicadas imediatamente

## 🔧 Solução de Problemas

### A extensão não funciona
- Verifique se está em uma página do domínio `mpf.mp.br`
- Recarregue a página (F5) após instalar a extensão
- Verifique o console (F12) para mensagens de erro

### As barras não estão sendo ocultadas
- Certifique-se de clicar em "Aplicar Configurações"
- Aguarde alguns segundos para o iframe do Google Docs carregar
- Tente desativar e reativar a opção

### O zoom não está funcionando
- O zoom só funciona dentro do editor do Google Docs
- Alguns documentos podem ter restrições de zoom

## 📝 Notas Importantes

- A extensão funciona **apenas** no Sistema Único do MPF
- As configurações são **sincronizadas** entre dispositivos (quando logado no Chrome)
- O **Modo Tela Cheia Inteligente** ativa automaticamente a ocultação de ambas as barras
- O **Auto-ocultar** funciona independentemente das outras configurações

## 🔄 Atualizações

Para atualizar a extensão após modificações:
1. Acesse `chrome://extensions/`
2. Clique no botão de atualização (🔄) no card da extensão
3. Ou clique em "Atualizar" no topo da página

## 🗑️ Desinstalação

Para remover a extensão:
1. Acesse `chrome://extensions/`
2. Localize "MPF Docs Optimizer"
3. Clique em "Remover"
4. Confirme a remoção

## 💡 Dicas de Uso

- Use **Ctrl+F5** para forçar recarregamento completo se houver problemas
- O **Modo Tela Cheia Inteligente** é ideal para leitura focada
- Combine **Auto-ocultar** com zoom reduzido para ver mais conteúdo
- As preferências são mantidas mesmo após fechar o navegador