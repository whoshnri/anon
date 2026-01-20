import SimpleCrypto from "simple-crypto-js";

// In a real app, this should be an environment variable
// For this project, we'll use a fixed key as requested
const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET || "anonx-secure-key-2024";
const simpleCrypto = new SimpleCrypto(secretKey);

/**
 * Encrypts a plain text string.
 */
export const encryptMessage = (plainText: string): string => {
    return simpleCrypto.encrypt(plainText) as string;
};

/**
 * Decrypts a cipher text string.
 * Returns the original text or a fallback if decryption fails.
 */
export const decryptMessage = (cipherText: string): string => {
    try {
        return simpleCrypto.decrypt(cipherText) as string;
    } catch (error) {
        console.error("Decryption failed:", error);
        return cipherText; // Return original if it wasn't encrypted or key mismatch
    }
};
