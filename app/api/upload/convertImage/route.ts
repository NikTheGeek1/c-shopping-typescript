import { apiHandler, setJson } from '@/helpers/api'
import sharp from 'sharp';
import { NextRequest } from 'next/server';

const convertImage = apiHandler(async (
  req: NextRequest,
) => {
  try {
    const formData = await req.formData();

    const quality = 50;
    const file = formData.get('file') as File;
    const imgBuffer = await file.arrayBuffer();

    const results = await sharp(Buffer.from(imgBuffer)).avif({ quality }).toBuffer();
    return setJson({
      data: Array.from(results)
    });
  } catch (e: any) {
    console.log("Error trying to convert image2:", e);
    return setJson({ message: e.message, code: 500 })
  }
},
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const POST = convertImage
export const dynamic = 'force-dynamic'
