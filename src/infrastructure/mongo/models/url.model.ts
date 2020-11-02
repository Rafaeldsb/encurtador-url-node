import { model, Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  code: string;
  shortenedUrl: string;
}

const schema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
  },
}).index('code');

export const UrlModel = model<IUrl>('Url', schema);
