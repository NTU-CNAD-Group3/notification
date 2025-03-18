import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    this.PORT = process.env.PORT || 8000;
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
  }
}

export default new Config();
