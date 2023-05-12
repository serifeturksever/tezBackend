'use strict';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import express, { request } from 'express';
import { VARIABLES } from '../app';

const randomNumber = require("random-number-csprng");
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export class Crypt {
    private key = Buffer.from(key);
    private iv = iv;
    private ALGO = 'aes-256-cbc';
    private saltRounds = 12;
    // private jwtSecret = VARIABLES.JWT!.toString();
    // private jwtRefreshSecret = VARIABLES.JWTREFRESH!.toString();
  
    public encrpyt = (message: string): string => {
      const cipher = crypto.createCipheriv(this.ALGO, this.key, this.iv);
      let enc = cipher.update(message, 'utf8', 'base64');
      enc += cipher.final('base64');
      return enc;
    }
  
    public decrypt = (enc: string): string => {
      const decipher = crypto.createDecipheriv(this.ALGO, this.key, this.iv);
      let str = decipher.update(enc, 'base64', 'utf8');
      str += decipher.final('utf8');
      return str;
    }
  
    public hash(text: string): Promise<string> {
      return new Promise((resolve, reject) => {
        bcrypt.hash(text, this.saltRounds)
          .then(hash => {
            resolve(hash);
          })
          .catch(err => {
            reject(err.toString());
          });
      });
    }
  
    public compareHashes(text: string, encryptText: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        bcrypt.compare(text, encryptText, function (err, snc) {
          if (err) {
            resolve(false);
          }
          else resolve(snc);
        });
      });
    }
  
    public createToken(prefix: string = "t."): Promise<string> {
      return new Promise(async (resolve, reject) => {
        const rndNumber = await randomNumber(100000, 999999);
        const token: string = Math.random().toString(36).substring(7) + rndNumber.toString();
        const uuid = uuidv4();
        resolve(prefix + uuid + "." + token);
      })
  
    }
  
    public createCookie(res: express.Response, key: string, value: string, expires: number): Object {
      const expiresAt = expires * 24 * 3600000
      const cookieOptions: Object = {
        // "domain": "34.90.67.225",
        // "path": "/admin", 
        "signed": true,
        "httpOnly": false,
        // "maxAge": expiresAt, // maxAge: 86_400_000, // 1 gun
        "expires": new Date(Date.now() + expiresAt),
        "encode": (e: String): String => e,
        // "secure": true,
        // "sameSite": true
      }
      res.clearCookie(key);
      res.cookie(key, value.toString(), cookieOptions);
      return {
  
      }
    }
  }