let state = {
    MS: null,
    ENT: null,
    CS: null,
    entropy: null,
    entropySHA: null,
    checksum: null,
    E: null,
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
    updateValues();
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