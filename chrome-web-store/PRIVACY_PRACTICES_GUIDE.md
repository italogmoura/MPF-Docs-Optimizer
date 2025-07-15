# Guia para Preenchimento de Práticas de Privacidade

Este guia fornece o texto e as opções a serem marcadas na seção de Práticas de Privacidade da Chrome Web Store para a extensão **MPF Docs Optimizer**.

---

## 1. Finalidade Única

A Chrome Web Store exige que a extensão tenha uma finalidade única e fácil de entender. A finalidade da sua extensão é:

**Texto para o campo "Finalidade Única":**

```
Otimizar a experiência de edição de documentos no sistema do Ministério Público Federal (MPF), permitindo que o usuário oculte elementos da interface para ganhar mais espaço de tela, controle o nível de zoom do editor e acesse ações comuns rapidamente.
```

---

## 2. Justificativa de Permissões

Você precisará justificar por que a extensão precisa de cada permissão solicitada no `manifest.json`. Abaixo estão as justificativas para cada uma.


### Permissão: `storage`
**Justificativa:**
```
É usada para salvar as preferências de visualização do usuário (como a opção de ocultar a barra superior e o nível de zoom) no armazenamento local do navegador. Isso permite que as configurações do usuário persistam entre as sessões.
```

### Permissão: `activeTab`
**Justificativa:**
```
Esta permissão é necessária para que a extensão possa interagir com a página do MPF quando o usuário clica no ícone da extensão. Ela garante que a extensão só atue na aba ativa e mediante a ação do usuário, sem precisar de acesso amplo a todas as páginas.
```

### Permissão: `alarms`
**Justificativa:**
```
Usada para tarefas agendadas internamente pela extensão. Atualmente, está reservada para futuras funcionalidades de verificação periódica, garantindo que a extensão funcione corretamente ao longo do tempo.
```

### Permissão: `notifications`
**Justificativa:**
```
Utilizada para exibir notificações importantes ao usuário. Por exemplo, para informar que a extensão só funciona no site do MPF, caso o usuário tente ativá-la em outro domínio.
```

### Permissão: `scripting`
**Justificativa:**
```
Essencial para o funcionamento do recurso principal da extensão. É usada para modificar a aparência da página (ocultar a barra do sistema) e aplicar o nível de zoom no editor de documentos, conforme configurado pelo usuário no popup.
```

### Permissão de Host: `*://*.mpf.mp.br/*` e `*://docs.google.com/*`
**Justificativa:**
```
A extensão precisa de permissão para acessar os sites do MPF (`mpf.mp.br`) e do Google Docs (`docs.google.com`) porque ela foi projetada para funcionar exclusivamente nesses domínios. A permissão é usada para ocultar elementos da interface do MPF e para controlar o zoom dentro do editor do Google Docs que está incorporado na página do sistema.
```

---

## 3. Coleta de Dados

Nesta seção, você deve declarar se a extensão coleta algum tipo de dado do usuário. A extensão **MPF Docs Optimizer** **NÃO** coleta dados.

Marque **"Não"** para todas as seguintes categorias:

-   **Informações de identificação pessoal** (ex: nome, endereço, e-mail, idade, número de identificação)
-   **Informações de saúde**
-   **Informações financeiras e de pagamento**
-   **Informações de autenticação** (ex: senhas, credenciais, perguntas de segurança)
-   **Comunicações pessoais** (ex: e-mails, mensagens de texto)
-   **Localização**
-   **Histórico da Web**
-   **Atividade do usuário** (ex: monitoramento de rede, cliques, posição do mouse, rolagem de tela, registros de pressionamento de tecla)
-   **Conteúdo do site** (ex: texto ou links de uma página da Web)

**Declaração Final:**

Ao final, você certificará que:

-   **Não vende dados a terceiros.**
-   **Não usa ou transfere dados para fins não relacionados à finalidade principal do item.**
-   **Não usa ou transfere dados para determinar a capacidade de crédito ou para fins de empréstimo.**

Basta marcar as caixas de seleção confirmando essas declarações.
