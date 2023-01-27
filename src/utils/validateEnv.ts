import { makeValidator, EnvMissingError, EnvError, cleanEnv, str, email, json, port, host, num, bool, url } from 'envalid';

//Custom validation
const twochars = makeValidator(x => {
  if (/^[A-Za-z]{2}$/.test(x)) return x.toUpperCase()
  else throw new Error('Expected two letters')
})

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  }, {
    reporter: ({ errors, env }) => {
        //emailSiteAdmins('Invalid env vars: ' + Object.keys(errors));
        for (const [envVar, err] of Object.entries(errors)) {
          if (err instanceof EnvError) {
            // emailSiteAdmins
          } else if (err instanceof EnvMissingError) {
            // emailSiteAdmins
          } else {
            // emailSiteAdmins
          }
        }
    }
  });
};

export default validateEnv;
