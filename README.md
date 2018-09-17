# GCF Logger
This is a reusable logger for Google Cloud Functions that includes a traceable ID

# Installation
```
npm install gcf-logger
yarn add gcf-logger
```

# Usage
## Node
``` javascript
const logger = require("gcf-logger");

// instantiate: assume ENV var API_KEY exists
const log = new logger.Logger({
    name: "my-feature",
    level: 2
});

// using
log.info(`Something happened`);
```

## Typescript
``` typescript
import {ILogger, Logger} from "gcf-logger";

// instantiate: with just name
const log: ILogger = new Logger({
    name: "my-feature"
});

// pass in reference (requestId) for traceability
log.init({requestId: 'http-12345'});

// using
log.info(`Something happened`);
```

# Output
The output is sent to stdout as a stringified JSON object, making it easier to consume
in document storage for later analysis.

```
{
    ts: '2018-01-01T08:32:30.858Z', 
    msg: 'Something happened', 
    ref: 'http-12345', 
    type: 'info', 
    level: 2, 
    host: 'localhost', 
    pid: 12345
}
```

# Testing
```
npm test
npm run coverage
```

# Build (compiles Typescript to JS)
```
npm run build
```
