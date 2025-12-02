# Radhark Gallery Frontend Teste

Esse projeto é de galeria de imagens interativa e de alta performance desenvolvido como solução para o desafio de front-end da empresa Radhark. O foco do projeto é demonstrar robustez no fluxo de dados, alem de oferecer uma excelente experiência ao usuario (UX) através de Optimistic UI e design kit moderno.

## Links Uteis

- [Acesse aqui](https://galeria-radhark.vercel.app/) a aplicação hospedada na vercel

## Funcionalidades chave & conformidade com o teste

Este projeto cumpre os requisitos do teste, focando-se na integração com o backend para o fluxo de persistência de dados.

### Funcionalidades

- **Listagem e Exibição**: Exibição de fotos em formato de grid.
- **Navegação direcional**: A navegação no dialog atraves das setas direcionais foi implementada. Alem disso, a modal se fecha ao apertar ESC.
- **Controle de layout**: Botoes que permitem ao usuario o controle e disposicao do layout, com variação de tamanhos (Small, Medium, Large)
- **Rolagem Infinita**: Carrega novas páginas de imagens automaticamente, com estado de bloqueio (`isFetchingNextPage`) para prevenir chamadas duplicadas à API e um indicador de "Fim da Galeria".
- **Listagem de Imagens (GET)**: Integração avançada para realizar `GET /api/v1/images` e exibir a lista armazenada.
- **URL Assinada (Upload)**: Implementa o fluxo de segurança do backend: `POST /signed` para obter URL assinada e, em seguida, `PUT` para o armazenamento.
- **Upload Otimista (Optimistic UI)**: Ao selecionar um arquivo, um placeholder (preview/skeleton) é exibido imediatamente, garantindo uma UX fluida enquanto o upload assíncrono ocorre.
- **Persistência (POST)**: Envia metadados (URL final) para `POST /api/v1/images` após o envio do arquivo ser concluído.
- **Segurança**: Todas as requisições à API (GET, POST) são autenticadas via cabeçalho `Authorization: Bearer <TOKEN>`.
- **Feedback por Toasts**: Feedback visual em tempo real usando a biblioteca sonner para informar o utilizador sobre o status do upload (carregando, sucesso ou falha na validação/API).

## Desafios Técnicos Resolvidos

A implementação do Optimistic UI e do Infinite Scroll introduziram complexidades de estado e sincronização que exigiram refatoração cuidadosa:

1. **Conflito de Chaves (Keys) e Duplicação de Elementos**
   - **Problema**: A falha mais crítica foi a colisão de chaves entre os itens para preview otimista (Optimistic UI), que foram criados no frontend com IDs temporários,  e os itens reais (retornados pela API). Isso resultou em duplicações massivas e reordenação desordenada da galeria após a rolagem e o refresh da página.
   - **Solução**: Implementação de um slug unico (nome-do-arquivo-timestamp) para a preview otimista. A chave final do React (key) foi então definida condicionalmente em `GalleryContent.tsx`. Esta transição de chave estável resolveu definitivamente os problemas de duplicação.

2. **Estabilidade do Infinite Scroll**
   - **Problema**: O scroll listener era disparado múltiplas vezes antes que o fetch da próxima página fosse concluído. Isso estava sobrecarregando a API e causando a duplicação dos mesmos itens na galeria.
   - **Solução**: Foi feita a centralizacao total da lógica de scroll no `useImages.ts`, alem da adição de um estado de bloqueio (`isFetchingNextPage`) que impede que novas requisições sejam enviadas até que o carregamento da página anterior termine. Isso garante a integridade dos dados e a estabilidade.

3. **Integração do React Hook Form (RHF) com Input Oculto**
   - **Problema**: Integrar o RHF com o input `type="file"` oculto ( que foi ocultado visando uma maior versatilidade de estilizacao). A submissão falhava porque o RHF e a ref manual do botão entravam em conflito, e assim,  o RHF não era notificado sobre o arquivo selecionado, o que resultava na ausência de requisição de upload.
   - **Solução**: Foi feita a separação das responsabilidades:
     - O botão apenas aciona o clique manual na input.
     - O `onChange` do input foi customizado (`handleFileSelect`) para primeiro chamar o `onChange` interno do RHF (para atualizar o estado) e, em seguida, forçar a submissão via `handleSubmit(onSubmit)()`.

## Tech Stack & Arquitetura

- **Framework**: Next.js 16.0.4 (App Router).
- **Estilização**: Tailwind CSS 4+ e Design System com Shadcn/Radix.
- **Gerenciamento de Estado**: Zustand (para o estado de Optimistic UI).
- **Formulários**: React Hook Form.
- **Performance**: Implementação de `URL.revokeObjectURL` para limpeza de memória após previews otimistas.

##  Executando o projeto

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```plaintext
NEXT_PUBLIC_API_BASE_URL="https://frontend-challenge-backend-842303020925.us-east1.run.app"
NEXT_PUBLIC_API_BEARER_TOKEN="SEU_TOKEN_SECRETO_AQUI" 
```

### 2. Instalação e Execução
Instalação das dependências
```plaintext
npm install
```
# ou
```plaintext
yarn install
```

# Inicia o servidor de desenvolvimento
```plaintext
npm run dev
```
# ou
```plaintext
yarn dev
```


Abra http://localhost:3000 para começar a usar a galeria.
