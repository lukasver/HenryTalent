import path from 'path';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

export default (app: Application): void => {
  const apiSpec = path.join(__dirname, 'api.yml');
  const validateResponses = !!(
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
  );
  app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateResponses,
      ignorePaths: /.*\/spec(\/|$)/,
    })
  );
};
