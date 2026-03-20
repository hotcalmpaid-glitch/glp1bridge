import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

4. Click **Commit changes**

After that your structure should be:
```
src/
├── App.jsx  ✅
└── main.jsx ✅
index.html
package.json
vite.config.js
