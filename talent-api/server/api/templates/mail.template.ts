import '../../common/env';
function recruiterMailTemplate(to, dossierLink) {
  return {
    from: process.env.MAILGUN_TALENT,
    to: to,
    subject: 'Talent Support',
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
          <div>
              <h3>Folder with candidates</h3>
              <a href=${dossierLink}> Open folder here </a>
              <p>thanks for doing business with us</p>
          </div>
      </body>
      </html>`,
  };
}
export default recruiterMailTemplate;
