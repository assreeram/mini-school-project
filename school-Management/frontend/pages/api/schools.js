import db from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/schoolImages');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      const { name, address, city, state, contact, email_id } = fields;
      const image = files.image[0].newFilename;

      try {
        await db.query(
          
          [name, address, city, state, contact, image, email_id]
        );
        res.status(200).json({ message: 'School added successfully!' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
