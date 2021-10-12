# SmartBeans Frontend
This is the new upcoming frontend version 2. This works only with the new upcoming backend >= v2.x.

## Installation instructions
### Prerequisites
- Install `npm`.

### Installation
1. Clone the repository.
2. Clone the smartbeans-content repository into the static folder. (WIP: in the future it will be a git submodule)
3. Configure it:
  Copy the `src/lib/config/config.sample.js` to `src/lib/config/config.js` and change the following:

  ```js
  export const backend_url = "change-this"; // e.g. https://your-url.tld/api
  export const sessionDuration = 3600; // Must fit the time in the Backend configurations (session_duration)
  export const staticAssetPath = "/img/assets" 
  export const staticAssetFilePath = '/img/assets/assets.json';
  export const frontend_url = 'change-this'; // e.g. https://your-url.tld/
  ```
4. Initialize the node_modules via running:
  ```
  npm install
  ```
5. Create a systemd service `smartbeans-frontend.service`:
  ```
  [Unit]
  Description=The SmartBeans Backend
  After=network.target

  [Service]
  Type=simple
  User=cloud
  Group=cloud
  WorkingDirectory=path-to-smartbeans-frontend-folder
  ExecStart=/bin/bash -c "cd path-to-smartbeans-frontend-folder && npm run build && npx svelte-kit preview --port 8080"
  Restart=on-failure
  # Other restart options: always, on-abort, etc

  [Install]
  WantedBy=multi-user.target
  ```
6. Start the service:
  ```
  systemctl start smartbeans-frontend.service
  ```
### Updates
For updates call `git pull` and restart the service.

## License
Copyright (c) 2021 Ole Umlauft and other contributors

All contents of this repository are provided under the MIT License. See [LICENSE](https://github.com/SmartBeansGoe/smartbeans-frontend/blob/main/LICENSE) for the full text.


