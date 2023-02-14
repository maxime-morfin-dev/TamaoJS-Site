// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { queryBuilder } from "lib/planetscale";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await queryBuilder
        .insertInto("ressources")
        .values({
          link: req.body.link,
          description: req.body.description,
        })
        .execute();
    } catch (error) {
      console.error(error);
    }

    return res.status(200).json({ error: null });
  }

  if (req.method === "DELETE") {
    await queryBuilder
      .deleteFrom("ressources")
      .where("id", "=", req.body.id)
      .execute();

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
