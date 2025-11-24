import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://8b23e24d841f3a938540c127168e108a@o4510420114210816.ingest.de.sentry.io/4510420121157712",

  integrations:[
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
//   tracesSampleRate: 1.0,
});
