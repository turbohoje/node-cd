# node-cd

Demo of CD on a minimal app with Node.

[![Build
Status](http://drone.nsync.us/api/badges/N/node-cd/status.svg)](http://drone.nsync.us/N/node-cd)

See [Jenkinsfile](Jenkinsfile), [Dockerfile](Dockerfile), and [CD
instructions](https://github.corp.ebay.com/N/eng-practices/blob/cd/CD.md#setup-your-app-for-cd).

## Local build and deploy

```
docker build -t gcr.io/ebay-n/node-cd:local .
gcloud docker push gcr.io/ebay-n/node-cd:local

kc create namespace tmp
export KUBE_NAMESPACE=tmp
kc apply -f infra/
kc apply -f node-cd-deploy-example.yaml

kc get svc
```

## Clean up

```
kc delete -f infra/
kc delete -f node-cd-deploy-example.yaml
kc delete namespace tmp
```

## Helm

```bash

helm install --debug --dry-run -f infra/values-dev.yaml \
  --set foo=YEP infra

helm upgrade -f infra/values-dev.yaml \
  --set foo=dyel,another=raddddddddddddddd node-cd-dev infra
```
