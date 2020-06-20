/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
const parseXml = require('@rgrove/parse-xml');
let count = 1
const isEmpty = (obj) => {
  if (obj.name && obj.hasOwnProperty("name")) {
    return false;
  }
  return true;
};
exports.isValidXML = (xmlString) => {
  let returnVal = true;
  if (xmlString.length === 0) {
    return false;
  }
  try {
   let doc =  parseXml(xmlString)
   let xmlDoc = doc.children
   if (xmlString.length === 0) {
    return false;
   }
   else if (xmlDoc.length > 0 ) {
    if (xmlDoc[0].children && xmlDoc[0].children[0]&& xmlDoc[0].children[0].children&&xmlDoc[0].children[0].children[0]===true) {
      count +=1
    returnVal =  isEmpty(xmlDoc[0].children[0].children[0])
    return returnVal
    }
    returnVal = true;
    count +=1
    return returnVal
  }
  
 } catch (error) {
   count +=1
  if(error.message.includes("Extra content at the end of the document")===true) {
    count+=1
    return true
  } 
  return false
 }
return returnVal
}
