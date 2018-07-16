const fastXmlParser = require('fast-xml-parser')
const he = require('he')
const J2xParser = fastXmlParser.j2xParser

exports.parse = async (xmlData, options = {}) => {
  if (fastXmlParser.validate(xmlData) === true) {
    return fastXmlParser.parse(xmlData, Object.assign({
      ignoreAttributes: false,
      attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),
      tagValueProcessor: a => he.decode(a)
    }, options))
  }
}

let defaultParser

exports.toXml = (jsonOrObj, options) => {
  let parser
  if (!options) {
    parser = defaultParser = defaultParser || new J2xParser()
  } else {
    parser = new fastXmlParser.Parser(options)
  }
  return parser.parse(jsonOrObj)
}
