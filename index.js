let state = {
    MS: null,
    ENT: null,
    CS: null,
    entropy: null,
    entropySHA: null,
    checksum: null,
    E: null,
    E_divided: null,
    wordList: null,
    M: null,
}

function parseHexString(str) {
    var result = "";
    while (str.length >= 8) {
        result += pad(parseInt(str.substring(0, 8), 16).toString(2), 32);
        str = str.substring(8, str.length);
    }

    return result; 
}

function calculate() {
    state.MS = document.getElementById('MS_selector').value;
    console.log(state.MS);
    state.ENT = state.MS * 32 / 3;
    state.CS = state.ENT/32;
    state.entropy = ""
    for (let i = 0; i < state.ENT; i++)
        state.entropy += Number(Math.random() < 0.5);

    state.entropySHA = CryptoJS.SHA256(state.entropy);
    state.entropySHA = state.entropySHA.toString(CryptoJS.enc.Hex);
    state.entropySHA = parseHexString(state.entropySHA);
    state.checksum = state.entropySHA.substring(0, state.CS);
    state.E = state.entropy + state.checksum;
    divideEntropy();
    if (state.wordList !== null) {
        calculateM();
    }
    updateValues();
}

function divideEntropy() {
    state.E_divided = "";
    for (let i = 0; i < state.MS; i++) {
        state.E_divided += state.E.substring(i*11, i*11 + 11) + " ";
    }
}

function calculateM() {
    state.M = ""
    for(let i = 0; i < state.MS; i++) {
        let word = state.E_divided.substring(i*12, i*12 + 11);
        state.M += state.wordList[parseInt(word, 2)] + " ";
    }
}

function updateValues() {
    let keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
        let elements = document.getElementsByClassName(keys[i]);
        for (let j = 0; j < elements.length; j++) {
            elements[j].innerText = state[keys[i]];
        }
    }
}

function pad(num, size) {
      var s = "0000000000000000" + num;
      return s.substr(s.length-size);
}

fetch("https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt")
    .then( response => response.text() )
    .then( text => {
        state.wordList = text.split(/\r?\n/);
        calculateM();
        updateValues();
        document.getElementById('firstWord').innerText = state.wordList[0];
        document.getElementById('secondWord').innerText = state.wordList[1];
    });