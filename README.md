# hof3
Customizable minimalist blog

- Using flow router

### Useful snippets

Copy backups on the server to a backups dir in the local dev machine.
This ssumes ssh loging with key and /ets/hosts including the hof2 entry pointing to the server.
`scp -r root@hof3:backups/* backups`

Restore a dumped db into local meteor (port 3001)
`mongorestore --port=3001 -d meteor backups/2016.04.15/hof3/`



Running manually a production build in staging:

`HOME=/home/staging \
PWD=/home/staging/hof3 \
BIND_IP=127.0.0.1 \
PORT=3000 \
HTTP_FORWARDED_COUNT=1 \
MONGO_URL=mongodb://localhost:27017/staging-hof3 \
ROOT_URL=http://staging.houseoffam.com \
METEOR_SETTINGS='{ "public": { "ga": { "account" : "UA-74818861-2" } } }' \
/usr/local/nvm/v0.10.41/bin/node /home/staging/hof2/bundle/main.js`



