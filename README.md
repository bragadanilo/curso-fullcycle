# curso-fullcycle
Repositório utilizado para as entregas do curso Fullcycle

### Desafios

  - Go
    - Criar uma imagem docker do Go com menos de 5Mb

  - NodeJs
    - Criar uma aplicação em node acessando o banco de dados MySql com um proxy reverso usando Nginx
    - As aplicações deve ter uma imagem docker separada e todas devem subir juntas usando docker-compose


### Comandos úteis:
 - To delete all containers including its volumes use,
```
docker rm -vf $(docker ps -aq)
```
 - To delete all the images,
``` 
docker rmi -f $(docker images -aq)
```