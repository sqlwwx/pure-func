const fastXmlParser = require('fast-xml-parser')
const he = require('he')

exports.parse = async (xmlData, options = {}) => {
  if (fastXmlParser.validate(xmlData) === true) {
    return fastXmlParser.parse(xmlData, Object.assign({
      ignoreAttributes: false,
      attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),
      tagValueProcessor: a => he.decode(a)
    }, options))
  }
}

let _parser

exports.toXml = (jsonOrObj, options) => {
  let parser
  if (!options) {
    parser = _parser = _parser || new fastXmlParser.j2xParser()
  } else {
    parser = new fastXmlParser.Parser(options)
  }
  return parser.parse(jsonOrObj)
}
