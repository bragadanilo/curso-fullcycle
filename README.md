# curso-fullcycle
Repositório utilizado para as entregas do curso Fullcycle

### Comandos úteis:
 - To delete all containers including its volumes use,
```
docker rm -vf $(docker ps -aq)
```
 - To delete all the images,
``` 
docker rmi -f $(docker images -aq)
```