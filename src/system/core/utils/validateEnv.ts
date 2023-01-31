import { makeValidator, EnvMissingError, EnvError, cleanEnv, str, email, json, port, host, num, bool, url } from 'envalid';

//Custom validation
const twochars = makeValidator(x => {
  if (/^[A-Za-z]{2}$/.test(x)) return x.toUpperCase()
  else throw new Error('Expected two letters')
})

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging']}),
    PORT: port(),
  }, {
    reporter: ({ errors, env }) => {
        // emailSiteAdmins('Invalid env vars: ' + Object.keys(errors));
        for (const [envVar, err] of Object.entries(errors)) {
          if (err instanceof EnvError) {
            // emailSiteAdmins('Invalid env vars: ' + Object.keys(errors));
            console.log(Object.keys(errors))
          } else if (err instanceof EnvMissingError) {
            // emailSiteAdmins('Invalid env vars: ' + Object.keys(errors));
            console.log(Object.keys(errors))
          } else {
            // emailSiteAdmins('Invalid env vars: ' + Object.keys(errors));
            console.log(Object.keys(errors))
          }
        }
    }
  });
};

export default validateEnv;
