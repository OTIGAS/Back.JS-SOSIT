/*DOTENV*/ require('dotenv').config()

const crypto = require('crypto')

const algorithm = process.env.ALGORITHM_CRYPTO
const key = process.env.PALAVRA_CHAVE_CRYPTO

async function encripto(value) {
  try {
    const iv = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)

    let encrypted = cipher.update(value)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function decripto(crypted) {
  try {
    const [iv, encrypted] = crypted.split(":");
    const ivBuffer = Buffer.from(iv, "hex");
    
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(process.env.PALAVRA_CHAVE_CRYPTO), ivBuffer);

    let value = decipher.update(Buffer.from(encrypted, "hex"));
    value = Buffer.concat([value, decipher.final()]);

    return value.toString();
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  encripto,decripto
};
