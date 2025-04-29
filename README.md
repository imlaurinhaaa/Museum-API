# Museu API

Esta é a API do Museu, que permite gerenciar artistas e galerias. A API fornece endpoints para criar, atualizar, excluir e listar informações sobre artistas e galerias.

## Endpoints

### Artistas
- **GET /artists**: Retorna todos os artistas.
- **POST /artists**: Cria um novo artista.
- **PUT /artists/:id**: Atualiza um artista existente.
- **DELETE /artists/:id**: Exclui um artista.

### Galerias
- **GET /galleries**: Retorna todas as galerias.
  - Parâmetro opcional: `?localization=<valor>` para filtrar por localização.
- **POST /galleries**: Cria uma nova galeria.
- **PUT /galleries/:id**: Atualiza uma galeria existente.
- **DELETE /galleries/:id**: Exclui uma galeria.

## Testando a API no Postman

Você pode testar a API usando o Postman. Clique no link abaixo para importar a coleção do Postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/42619953/2sB2j3BBxj)
