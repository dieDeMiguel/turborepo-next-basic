export type ImageAsset = {
  _ref: string
  _type: 'reference'
}

export type ImageValue = {
  _type: 'image'
  alt: string
  _key: string
  asset: ImageAsset
}

export type ImageProps = {
  value: ImageValue
}
