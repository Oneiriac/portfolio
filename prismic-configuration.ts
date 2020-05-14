import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/src/documents";

import { NextApiRequest } from "next";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
const API_TOKEN = process.env.PRISMIC_API_TOKEN;

export const Client = (req: NextApiRequest | null = null) =>
  Prismic.client(REF_API_URL, { accessToken: API_TOKEN, req });

export function linkResolver(doc: Document) {
  if (doc.type === "page") return `/${doc.uid}`;
  if (doc.type === "project") return `/projects/${doc.uid}`;
  return `/`;
}
