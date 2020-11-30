import '../../common/env';
import mail from 'mailgun-js';
import mailTemplate from '../templates/mail.template';
let mailGunConfig;
let sendMail;
if (
  process.env.MAILGUN_APIKEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.TALENT_URL_ROOT
) {
  mailGunConfig = mail({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  sendMail = (to, uuid) => {
    const dossierLink = `${process.env.TALENT_URL_ROOT}/dossier/${uuid}`;
    mailGunConfig
      .messages()
      .send(mailTemplate(to, dossierLink), (err, data) => {
        if (err) console.log('Error: ', err);
      });
  };
} else {
  console.error('Missing needed env vars for email sending');
}
export default sendMail;
