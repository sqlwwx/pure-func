# generate key

```
ssh-keygen -t rsa -b 2048 -f jwt_rsa
openssl rsa -in jwt_rsa -pubout -outform PEM -out jwt_rsa.pem
```
