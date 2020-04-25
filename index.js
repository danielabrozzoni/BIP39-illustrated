let entropy = ""
for (let i = 0; i < 128; i++)
    entropy += Number(Math.random() < 0.5);
console.log(entropy);


function pad(num, size) {
    // num is a string representation of a binary number; size is the length of the 
    // of the desired padded result. "000000000" has to be modfied for desired lengths longer than this
      var s = "000000000" + num;
      return s.substr(s.length-size);
  }

function parseHexString(str) {
    var result = "";
    while (str.length >= 8) {
        result += pad(parseInt(str.substring(0, 8), 16).toString(2), 32);
        str = str.substring(8, str.length);
    }

    return result; 
}