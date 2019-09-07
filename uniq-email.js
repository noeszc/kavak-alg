// compose :: 
const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  );

// isArray :: Array -> Boolean
const isArray = value => Array.isArray(value) && value.length;

// getLocalPart :: String -> String
const getLocalPart = value => value.match(/^([^@]*)@/)[1];

// getDomainPart :: String -> String
const getDomainPart = value => value.replace(/.*@/, "");

// stripLocalPart :: String -> String
const stripLocalPart = value => value.replace(/(?:\.|\+.*)(?=.*?)/g, "");

// uniq :: Array -> Array
const uniq = value => value.filter((v, i, a) => a.indexOf(v) === i)

// parseEmail :: Array -> Array
const parseEmail = (value) => value.map(
  item =>
    compose(
      stripLocalPart,
      getLocalPart
    )(item) + `@${getDomainPart(item)}`
);

var emailUnicos = function(emails) {
  if (!isArray(emails)) return;
  return compose(
    uniq,
    parseEmail
  )(emails)
};

console.log(
  emailUnicos([
    "test.email+alex@kavak.com",
    "test.e.mail+bob.cathy@kavak.com",
    "testemail+david@ka.vak.com"
  ])
);
