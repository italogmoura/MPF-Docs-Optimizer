# Política de Privacidade para a Extensão MPF Docs Optimizer

**Última atualização:** 15 de julho de 2025

Esta Política de Privacidade descreve as práticas de dados da extensão para o Google Chrome "MPF Docs Optimizer" (doravante, "a Extensão").

## 1. Coleta e Uso de Dados

A Extensão **não coleta, armazena, transmite ou vende qualquer tipo de dado pessoal ou de navegação do usuário**.

Todas as funcionalidades da Extensão operam localmente no navegador do usuário. As configurações, como o nível de zoom ou a preferência por ocultar a barra do sistema, são salvas usando a API `chrome.storage.sync`, que associa os dados à conta Google do usuário no Chrome, permitindo a sincronização entre dispositivos. Esses dados são gerenciados pelo Google e a Extensão apenas os utiliza para funcionar conforme configurado pelo usuário.

## 2. Permissões

A Extensão solicita as seguintes permissões para poder executar suas funções:

*   `storage`: Para salvar as preferências do usuário.
*   `activeTab` e `scripting`: Para aplicar as modificações visuais (ocultar a barra, aplicar zoom) na aba ativa do sistema MPF e do Google Docs.
*   `notifications`: Para exibir alertas úteis, como informar que a extensão só funciona no domínio do MPF.
*   `alarms`: Para tarefas agendadas internamente, reservado para futuras melhorias.

Nenhuma dessas permissões é utilizada para monitorar a atividade do usuário ou coletar informações.

## 3. Transparência

O código-fonte da Extensão é aberto e pode ser inspecionado por qualquer pessoa para verificar o cumprimento desta política.

## 4. Contato

Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato com o desenvolvedor.

**Desenvolvedor:** Ítalo Gonçalves Moura
