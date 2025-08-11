function formatImageUrl(imageUrl, folder) {
  if (!imageUrl) return ''

  if (imageUrl.includes('http://39.98.123.211:8300/images')) {
    return imageUrl.replace('http://39.98.123.211:8300/images', `/assets/images/${folder}`)
  }

  return imageUrl
}

export default formatImageUrl