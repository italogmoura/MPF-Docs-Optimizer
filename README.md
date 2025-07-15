# MPF Docs Optimizer

Uma extensão do Chrome que otimiza a experiência do Google Docs integrado ao Sistema Único do MPF (Ministério Público Federal), oferecendo opções para ocultar elementos da interface e melhorar o fluxo de edição.

## 🚀 Funcionalidades

- **Ocultar Barra do Sistema Único**: Remove a barra superior do MPF para maximizar o espaço de edição
- **Compactar Barra do Google Docs**: Reduz a altura da barra de ferramentas do Google Docs
- **Modo Tela Cheia Inteligente**: Ativa automaticamente ambas as opções acima
- **Auto-ocultar no Scroll**: Oculta temporariamente as barras durante a rolagem
- **Controle de Zoom**: Ajusta o nível de zoom do editor (50-200%)
- **Sincronização de Configurações**: Configurações salvas na nuvem do Chrome

## 📦 Instalação

1. Baixe ou clone este repositório
2. Abra o Chrome e acesse `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" no canto superior direito
4. Clique em "Carregar sem compactação" e selecione a pasta do projeto
5. A extensão será instalada e estará pronta para uso

## 🔧 Como Usar

1. Navegue até qualquer página do Sistema Único do MPF (`*.mpf.mp.br`)
2. Abra um documento do Google Docs dentro do sistema
3. Clique no ícone da extensão na barra de ferramentas do Chrome
4. Configure as opções conforme sua preferência:
   - ✅ **Ocultar Barra Sistema Único**: Remove completamente a interface do MPF
   - ✅ **Compactar Barra Google Docs**: Reduz a barra de ferramentas do Docs
   - ✅ **Modo Tela Cheia**: Ativa ambas as opções automaticamente
   - ✅ **Auto-ocultar no Scroll**: Oculta barras temporariamente ao rolar
   - 🔍 **Zoom**: Ajuste de 50% a 200%

## 🛠️ Tecnologias

- **Manifest V3**: Versão mais recente das extensões do Chrome
- **Chrome Storage API**: Sincronização de configurações
- **Cross-origin Communication**: Comunicação com iframes do Google Docs
- **CSS Injection**: Modificações visuais dinâmicas
- **MutationObserver**: Monitoramento de mudanças no DOM

## 📁 Estrutura do Projeto

```
├── manifest.json          # Configuração da extensão
├── background.js          # Service worker
├── content.js             # Script de conteúdo para páginas MPF
├── content.css            # Estilos para modificações da UI
├── popup.html             # Interface do popup
├── popup.js               # Lógica do popup
├── popup.css              # Estilos do popup
├── icons/                 # Ícones da extensão
└── INSTALACAO.md          # Instruções de instalação
```

## 🔒 Segurança e Privacidade

- A extensão funciona apenas em domínios `*.mpf.mp.br`
- Não coleta dados pessoais
- Configurações armazenadas localmente no Chrome
- Código aberto para auditoria

## 🐛 Resolução de Problemas

### A extensão não funciona
- Verifique se está em uma página do MPF (`*.mpf.mp.br`)
- Recarregue a página após ativar a extensão
- Verifique se a extensão está habilitada em `chrome://extensions/`

### Configurações não salvam
- Verifique se a sincronização do Chrome está ativa
- Tente desabilitar e reabilitar a extensão

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🏛️ Aviso Legal

Esta extensão é um projeto independente e não é oficialmente afiliada ao Ministério Público Federal. É desenvolvida para melhorar a experiência dos usuários do sistema MPF.