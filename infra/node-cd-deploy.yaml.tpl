apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: node-cd
spec:
  replicas: $replicas
  template:
    metadata:
      labels:
        app: node-cd
        release: stable
    spec:
      volumes:
        - name: node-cd-volume
          configMap:
            name: node-cd
      containers:
        - name: node-cd
          image: gcr.io/ebay-n/node-cd:$tag
          imagePullPolicy: Always
          ports:
            - containerPort: 3003
              name: http-port
          volumeMounts:
            - name: node-cd-volume
              mountPath: /node-cd
          env:
            - name: CONFIGPATH
              value: "/node-cd/foo"
            - name: PROP_DEMO
              value: "$propDemo"
            - name: REPLICAS
              value: "$replicas"
            - name: CONSUL_HOST
              value: "$consulHost"
            - name: CONSUL_PORT
              value: "$consulPort"
            - name: ENV
              value: "$env"
            - name: REGION
              value: "$region"
            - name: CLUSTER
              value: "$cluster"
            - name: TAG
              value: "$tag"
            - name: SHA
              value: "$sha"
            - name: TIMESTAMP
              value: "$timestamp"
