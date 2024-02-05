import fetch from "node-fetch";
import crypto from "node:crypto";
import 'dotenv/config';

const public_key = process.env.PUBKEY
const private_key = process.env.PRIKEY
const timestamp = Date.now().toString();

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const newURL = new URL(url);
    newURL.searchParams.append("ts", timestamp);
    newURL.searchParams.append("apikey", public_key);
    const hash = getHash(public_key, private_key, timestamp);
    newURL.searchParams.append("hash", await hash);
    const response = await fetch(newURL)
    const data = await response.json()
    console.log("data = ");console.log(data);

    const tableau = []
    for (let i = 0; i < data.data.results.length; i++) {
        const obj = gestionChara(data.data.results[i]);
        if (obj != null) {
            tableau[i] = obj;
        }
    }
    console.log("### Items du tableau : ###")
    tableau.forEach(function(item, i) {
        console.log(item);
    } )

    return tableau;
}
function gestionChara(item) {
    const chara = {}
    if (item.thumbnail.path.endsWith("image_not_available")) {
        return null;
    }
    else {
        chara.name = item.name;
        chara.description = item.description;
        chara.imageUrl = (item.thumbnail.path + "." + item.thumbnail.extension);
        return chara;
    }
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return crypto.createHash("md5")
        .update(timestamp + privateKey + publicKey)
        .digest("hex");
}