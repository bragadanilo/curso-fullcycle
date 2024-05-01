### Useful commands

Pods

```
kubectl apply -f k8s/pod.yaml


kubectl get pods

kubectl describe pod goserver

kubectl get events | grep goserver

kubectl port-forward pod/goserver 8000:8080
kubectl delete pod goserver

# entrar no pod com bash
kubectl exec -it goserver-6b686978f4-8bssj -- bash
kubectl logs goserver-6b686978f4-8bssj
```

Nodes

```
kubectl describe nodes
```

Clusters

```
kind get clusters

kind delete cluster --name fullcycle

kind create cluster

kind create cluster --config=k8s/kind.yaml --name fullcycle

kubectl cluster-info --context kind-fullcycle
```

# colocar uma app do zero no k8s

watch -n 1 kubectl get pods

kind get clusters

kind delete cluster --name fullcycle
kind create cluster --config=k8s/kind.yaml --name fullcycle

kubectl apply -f k8s/configmap-env.yaml
kubectl apply -f k8s/configmap-family.yaml
kubectl apply -f k8s/secret.yaml

kubectl apply -f k8s/deployment.yaml
kubectl get deployments

kubectl apply -f k8s/service.yaml
kubectl get services

kubectl apply -f k8s/pvc.yaml

kubectl apply -f k8s/hpa.yaml
kubectl get hpa

kubectl port-forward service/goserver-service 8080:8080

# gerar imagem docker

docker build -t danilobraga/hello-go:v5.4 .
docker push danilobraga/hello-go:v5.4

docker build -t danilobraga/hello-go:v5.7 . && docker push danilobraga/hello-go:v5.7

# volumes

kubectl apply -f k8s/pvc.yaml

kubectl get pvc
kubectl get storageclass

# stateful sets and headless service

kubectl apply -f k8s/statefulset.yaml

kubectl apply -f k8s/mysql-service-h.yaml

`é possível chamar o serviço pelo nome do pod, mysql-0.mysql-h`
kubectl exec -it goserver-c8b7bd559-w2946 -- bash
ping mysql-0.mysql-h
