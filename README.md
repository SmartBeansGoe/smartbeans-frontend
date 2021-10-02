# SmartBeans React Client
This repository contains the frontend for smartbeans.

## Start to develope

Clone the repository
```bash
clone git@github.com:TeamPractical/smartbeans-react-client.git
cd smartbeans-react-client
```

Initialize and load dependencies
```bash
yarn
```

### Start on localhost
Change the backend url in js/config.js
```javascript
const backend_url = 'https://your-smartbeans-url.tld/api/';
```
Start the client on localhost:3000
```bash
yarn start
```

## Build SmartBeans and Deploy
```bash
yarn build
```

The build can be moved to /var/www/html/ and use an apache server to deploy it.

## License
The code is under MIT license.

All SVG graphics licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a><br/> <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
