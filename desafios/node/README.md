## Desafio 2 - Nginx com Node.js

#### Sumário

Ter uma aplicão em nodejs que disponibiliza um endpoint que quando acessado deverá inserir um item no banco de dados MySql e retornar a lista de todos os itens já armazenados.
No entanto, deve ter um servidor Nginx que faça o papel de um proxy reverso, onde as chamadas a aplicação em Nodejs sejam através dele.

### Como usar:
 - clonar o repositório
 - entrar na pasta `cd curso-fullcycle/desafios/node`
 - executar: `docker-compose up` 

Após subirem os containers, entrar em [localhost:8080](http://localhost:8080/)

### Resultado esperado: 
```
Full Cycle Rocks!
- 1 - dbraga - <timestamp>
- 2 - dbraga - <timestamp>
...
- n - dbraga - <timestamp>
``` 

