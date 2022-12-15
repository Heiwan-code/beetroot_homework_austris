import Application from '@ioc:Adonis/Core/Application'
import shortid from 'shortid'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Env from '@ioc:Adonis/Core/Env'
import sharp from 'sharp'
import path from 'path'
import { mkdirp } from 'fs-extra'

export async function importImage(newPath: string, image: MultipartFileContract | null) {
  if (!image) {
    return false
  }
  let customName = shortid.generate()
  let relativePath = path.join(newPath, customName)
  relativePath = `${relativePath}.${image.extname}`
  const fullPath = path.join(Application.publicPath(), relativePath)
  const relativePathWithoutFile = path.join(Application.publicPath(), newPath)
  await mkdirp(relativePathWithoutFile)
  await sharp(image.tmpPath).resize(200).toFile(fullPath)
  return `http://${Env.get('SERVE_TO')}:${Env.get('PORT')}/${relativePath}`
}
