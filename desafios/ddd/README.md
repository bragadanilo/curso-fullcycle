## Desafio 3 - DDD


### Repositórios
Implementar todos os métodos da interface `OrderRepositoryInterface` e criar todos os testes para os métodos implementados


#### Como reproduzir:

1. Clonar o projeto:

 `git clone https://github.com/bragadanilo/curso-fullcycle.git`

2. Entrar na pasta do desafio de ddd:

`cd desafios/ddd/` 

3. Instalar dependências e rodar os testes
```
npm install
npm run test

```

4. Resultado:

O resultado esperado deve ser algo parecido com isso:

```
user@mint:~/workspace/curso-fullcycle/desafios/ddd$ npm run test

> test
> npm run tsc -- --noEmit && jest


> tsc
> tsc --noEmit

 PASS  src/infrastructure/repository/product.repository.spec.ts
 PASS  src/infrastructure/repository/customer.repository.spec.ts
 PASS  src/domain/entity/customer.spec.ts
 PASS  src/domain/entity/order.spec.ts
 PASS  src/infrastructure/repository/order.repository.spec.ts
 PASS  src/domain/entity/product.spec.ts
 PASS  src/domain/service/order.service.spec.ts
 PASS  src/domain/service/product.service.spec.ts

Test Suites: 8 passed, 8 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        2.731 s
Ran all test suites.
```
