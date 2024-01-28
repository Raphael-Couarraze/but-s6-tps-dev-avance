import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'
import uuid4 from "uuid4";
import sha256 from 'js-sha256';


/* Chemin de stockage des blocks */
const path = '../data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} hash
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    console.log("- Ici dans findBlocks")
    //lecture de fichier
    let contents = "";
    try {
        const filePath = new URL(path, import.meta.url)
        contents = JSON.parse(await readFile(filePath, {encoding: 'utf8'}))
        console.log("contents = " + contents)
    }
    catch (err) {
        console.error("error findBlocks = " + err.message)
        contents = err.message
    }
    return contents;
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks();
    console.log("Last block = " + blocks[-1]);
    if (blocks.length == 0)
        return null
    else {
        return blocks[-1]
    }
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const id = uuid4()
    const nom = contenu.nom
    const don = contenu.don
    const date = getDate()
    const hash = sha256(findLastBlock().toString());
    console.log("id " + id + "\nnom : " + nom + "\ndon : " + don + "\ndate : " + date + "\nhash : " + hash)

    const newBlock = {id, nom, don, date, hash}

    const blocks = await findBlocks();
    console.log("Vérif premier bloc = " + blocks[0].nom);
    const newBlocks = [...blocks, newBlock];
    console.log("Push fait !");

    const filePath = new URL(path, import.meta.url)
    await writeFile(filePath, JSON.stringify(newBlocks), {encoding: 'utf8'}, (err) => {
        if (err) {
            console.log("Erreur à l'écriture ! " + err)
        }
        else {
            console.log("Ecriture réussie !\n");
        }
    })

}

