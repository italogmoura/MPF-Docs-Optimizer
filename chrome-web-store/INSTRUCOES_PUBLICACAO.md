# Instruções para Publicação na Chrome Web Store

## Arquivos Necessários

Esta pasta contém todos os arquivos necessários para publicar a extensão MPF Docs Optimizer na Chrome Web Store.

### 📁 Estrutura de Arquivos

```
chrome-web-store/
├── DESCRICAO_CHROME_STORE.md    # Descrições para a listagem
├── icon-design.svg              # Design original do ícone
├── icons/                       # Ícones em PNG
│   ├── icon-16.png             # Ícone pequeno
│   ├── icon-32.png             # Ícone médio
│   ├── icon-48.png             # Ícone padrão
│   └── icon-128.png            # Ícone principal da loja
└── INSTRUCOES_PUBLICACAO.md     # Este arquivo
```

## 📋 Checklist de Publicação

### 1. Preparar Arquivo ZIP
```bash
# Na pasta raiz do projeto, execute:
zip -r mpf-docs-optimizer.zip manifest.json *.js *.css *.html icons/ -x "*/.*" -x "__MACOSX/*"
```

### 2. Capturas de Tela Necessárias
- [ ] **Screenshot 1** (1280x800): Mostrando a extensão em uso com documento aberto
- [ ] **Screenshot 2** (1280x800): Popup da extensão com opções
- [ ] **Screenshot 3** (1280x800): Antes/depois do modo fullscreen
- [ ] **Screenshot 4** (opcional): Demonstração do auto-hide
- [ ] **Screenshot 5** (opcional): Diferentes níveis de zoom

### 3. Imagens Promocionais
- [ ] **Tile pequeno** (440x280): Para listagem na loja
- [ ] **Tile grande** (920x680): Opcional, para destaque
- [ ] **Marquee** (1400x560): Opcional, para promoção

## 🔧 Configurações na Chrome Web Store

### Informações Básicas
- **Nome**: MPF Docs Optimizer
- **Descrição Curta**: Use o texto em `DESCRICAO_CHROME_STORE.md`
- **Descrição Detalhada**: Use o texto completo em `DESCRICAO_CHROME_STORE.md`
- **Categoria**: Produtividade
- **Idioma**: Português (Brasil)

### Ícones
- **Ícone da App**: Use `icons/icon-128.png`

### Detalhes Adicionais
- **Website**: https://github.com/[seu-usuario]/MPF-Docs-Optimizer
- **E-mail de Suporte**: [seu-email]
- **Política de Privacidade**: Criar se necessário

### Preços e Distribuição
- **Visibilidade**: Público
- **Países**: Brasil (ou Todos os países)
- **Preço**: Gratuito

## 📝 Texto para Política de Privacidade (se necessário)

```
# Política de Privacidade - MPF Docs Optimizer

A extensão MPF Docs Optimizer não coleta, armazena ou transmite dados pessoais dos usuários.

## Dados Utilizados
- Configurações da extensão são armazenadas localmente usando a API chrome.storage
- As configurações são sincronizadas entre dispositivos através da conta Google do usuário
- Nenhum dado é enviado para servidores externos

## Permissões
- activeTab: Para aplicar modificações na página ativa
- storage: Para salvar preferências do usuário

## Contato
Para dúvidas sobre privacidade: [seu-email]
```

## 🚀 Passos para Publicação

1. **Criar conta de desenvolvedor** (se ainda não tiver)
   - Acesse: https://chrome.google.com/webstore/devconsole
   - Taxa única: US$ 5

2. **Criar novo item**
   - Upload do arquivo ZIP
   - Preencher todas as informações
   - Adicionar screenshots e ícones

3. **Revisão e Publicação**
   - Enviar para revisão
   - Aguardar aprovação (geralmente 1-3 dias)

## 📌 Dicas Importantes

- Teste a extensão em modo incógnito antes de publicar
- Verifique se todas as funcionalidades estão operacionais
- Considere criar um vídeo demonstrativo (YouTube)
- Mantenha a descrição clara e focada nos benefícios
- Use palavras-chave relevantes: MPF, Google Docs, produtividade, otimização

## 🔄 Atualizações Futuras

Para atualizar a extensão:
1. Incremente a versão no `manifest.json`
2. Crie novo ZIP com as alterações
3. Upload na console de desenvolvedor
4. Aguarde nova revisão