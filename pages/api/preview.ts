import { NextApiRequest, NextApiResponse } from "next";

import { Client, linkResolver } from "../../prismic-configuration";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const previewToken = req.query.token as string;
  const documentId = req.query.documentId as string;
  const client = Client(req);

  if (previewToken && documentId) {
    try {
      const url = await client.previewSession(previewToken, linkResolver, "/");
      res.setPreviewData({ ref: previewToken });
      res.writeHead(302, { Location: url });
      res.end();
    } catch {
      res
        .status(400)
        .send("Something went wrong with the getPreviewResolver request");
    }
  } else {
    res
      .status(400)
      .send("Missing token and/or documentId from preview request");
  }
};
