import shortid from "shortid";
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import sharp from 'sharp'
// import imagemin from 'imagemin'
// import mozjpeg from 'imagemin-mozjpeg'
import { Stream } from "stream";
import { S3 } from 'aws-sdk'

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

const client = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})


export const processUploads = async (files: any) => {
  let uploads600: any = []
  const uploads800: any = []
  const uploads1500: any = []
  const uploadsRaw: any = []

  for (let file of files) {
    const { createReadStream, data } = await Promise.resolve(file)
    const content = data || (await streamToBuffer(createReadStream()));

    const id = shortid.generate();
    const filename600 = `${id}_600.jpeg`
    const filename800 = `${id}_800.jpeg`
    const filename1500 = `${id}_1500.jpeg`
    const filenameRaw = `${id}_raw.jpeg`

    const size600: any = await sharp(content)
      .resize(600, 600, {
        fit: "cover"
      })
      .jpeg()
      .toBuffer()

    const size800: any = await sharp(content)
      .resize(800, 800, {
        fit: "cover"
      })
      .jpeg()
      .toBuffer()

    const size1500: any = await sharp(content)
      .resize(1500, 900, {
        kernel: sharp.kernel.nearest,
        fit: "cover"
      })
      .jpeg()
      .toBuffer();

    const sizeRaw: any = await sharp(content)
      .jpeg()
      .toBuffer();

    uploads600.push({
      name: filename600,
      content: size600
    })

    uploads800.push({
      name: filename800,
      content: size800
    })

    uploads1500.push({
      name: filename1500,
      content: size1500
    })

    uploadsRaw.push({
      name: filenameRaw,
      content: sizeRaw
    })
  }


  const clientUpload = async ({ name, content }: any) => {
    const response = await client
      .upload({
        Key: name,
        ACL: 'public-read',
        Body: content,
        ContentType: 'image/jpeg',
        Bucket: 'keyconomy-uploads'
      }).promise()
    return response.Location
  }

  uploads600.map(async ({ name, content }: any) => {
    await clientUpload({ name, content })
  });

  uploads800.map(async ({ name, content }: any) => {
    return await clientUpload({ name, content })
  });

  uploads1500.map(async ({ name, content }: any) => {
    return await clientUpload({ name, content })
  });

  uploadsRaw.map(async ({ name, content }: any) => {
    return await clientUpload({ name, content })
  });

  const results600 = uploads600.map(({ name }: any) => {
    return `https://keyconomy-uploads.s3.amazonaws.com/${name}`
  })
  const results800 = uploads800.map(({ name }: any) => {
    return `https://keyconomy-uploads.s3.amazonaws.com/${name}`
  })
  const results1500 = uploads1500.map(({ name }: any) => {
    return `https://keyconomy-uploads.s3.amazonaws.com/${name}`
  })
  const resultsRaw = uploadsRaw.map(({ name }: any) => {
    return `https://keyconomy-uploads.s3.amazonaws.com/${name}`
  })

  return { results600, results800, results1500, resultsRaw }

}



