const fastXmlParser = require('fast-xml-parser')
const he = require('he')
const J2xParser = fastXmlParser.j2xParser

exports.parse = async (xmlData, options = {}) => {
  if (fastXmlParser.validate(xmlData) === true) {
    return fastXmlParser.parse(xmlData, Object.assign({
      ignoreAttributes: false,
      cdataTagName: '__cdata',
      attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),
      tagValueProcessor: a => he.decode(a)
    }, options))
  }
}

let defaultParser

exports.toXml = (jsonOrObj, options) => {
  let parser
  if (!options) {
    parser = defaultParser = defaultParser || new J2xParser({
      ignoreAttributes: false,
      cdataTagName: '__cdata'
    })
  } else {
    parser = new J2xParser(options)
  }
  return parser.parse(jsonOrObj)
}
