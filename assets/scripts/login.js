let form = document.getElementById("form");
let pseudo = document.getElementById("pseudoInput");
let password = document.getElementById("passwordInput");

const encoder = new TextEncoder();

const algo = {
    name: "AES-GCM",
    length: 256,
};

form.onsubmit = async (e) => {
    e.preventDefault();
    const pass = password.value;
    const name = pseudo.value;
    console.log([name, pass].join("-"));
    // https://developer.mozilla.org/fr/docs/Web/API/SubtleCrypto
    // 
    // 
    const masterPass = await crypto.subtle.importKey(
        "raw",
        encoder.encode(pass),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode(pass.length),
            iterations: 1000,
            hash: { name: "SHA-1" },
        },
        masterPass,
        algo,
        false,
        ["encrypt"]
    );
    const encryptedPass = await crypto.subtle.encrypt(
        { ...algo, iv: encoder.encode(pass) },
        derivedKey,
        str2ab(pass)
    );

    // console.log(masterPass, derivedKey, encryptedPass);

    const formData = new FormData()
    formData.append('pass', new Blob([encryptedPass]), "pass.txt")
    formData.append('name', name)

    // const formData = {
    //     "name": name,
    //     "pass": pass
    // }
    // console.log(formData);

    await fetch('/admin/login', {
        method: "post",
        body: formData
    })

    pseudo.value = ""
    password.value = ""
};

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}