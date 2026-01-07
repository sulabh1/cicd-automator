import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SecurityService {
  private readonly ENCRYPTION_KEY =
    process.env.ENCRYPTION_KEY || this.generateKey();

  private generateKey(): string {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }

  encryptCredentials(credentials: any): string {
    try {
      const jsonString = JSON.stringify(credentials);
      const encrypted = CryptoJS.AES.encrypt(
        jsonString,
        this.ENCRYPTION_KEY,
      ).toString();
      return encrypted;
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  decryptCredentials(encryptedData: string): any {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        this.ENCRYPTION_KEY,
      );
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(jsonString);
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  maskSensitiveData(data: string): string {
    if (data.length <= 8) {
      return '*'.repeat(data.length);
    }
    return `${data.substring(0, 4)}${'*'.repeat(
      data.length - 8,
    )}${data.substring(data.length - 8)}${data.substring(data.length - 4)}`;
  }

  validCredentialFormat(type: string, credential: string): boolean {
    const patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      url: /^https?:\/\/.+/,
      awsAccessKey: /^[A-Z0-9]{20}$/,
      token: /^[\w-]+$/,
    };
    return patterns[type] ? patterns[type].test(credential) : true;
  }

  generateSecureJenkinsCredentialId(credentialName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return `${credentialName}-${timestamp}-${random}`;
  }
}
