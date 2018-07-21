const fastXmlParser = require('fast-xml-parser')
const he = require('he')
const J2xParser = fastXmlParser.j2xParser
const xmlValidate = fastXmlParser.validate

export const parse = async (xmlData, options = {}) => {
  const validate = xmlValidate(xmlData)
  if (validate === true) {
    return fastXmlParser.parse(xmlData, Object.assign({
      ignoreAttributes: false,
      cdataTagName: '__cdata',
      attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),
      tagValueProcessor: a => he.decode(a)
    }, options))
  } else {
    throw validate.err
  }
}

let defaultParser

let defaultParserOptions = {
  ignoreAttributes: false,
  cdataTagName: '__cdata'
}

export const toXml = (jsonOrObj, options) => {
  let parser
  if (!options) {
    parser = defaultParser = defaultParser || new J2xParser(defaultParserOptions)
  } else {
    parser = new J2xParser(Object.assign({}, defaultParserOptions, options))
  }
  return parser.parse(jsonOrObj)
}
