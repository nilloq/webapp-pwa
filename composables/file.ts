const VALID_IMAGE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 10485760

export function useFile() {

  // Get Cloudinary image URL
  // Mahali images are only available once transformed, so in "private" area
  // cloudName: "mahali",
  // transfName : "mahali_detail_full_screen_watermarked" | "mahali_detail_thumb_watermarked" | "mahali_post"
  function getCloudinaryImageUrl(cloudinaryId:string, transfName = 'mahali_detail_full_screen_watermarked') {
    return `https://res.cloudinary.com/mahali/image/private/s--bcOIh4fh--/t_${transfName}/v1/${cloudinaryId}`
  }

  function getCloudinaryShortLink(url:string, transfName = 'mahali_detail_full_screen_watermarked') {
    const regex = new RegExp(`${transfName}/v1/(.*)$`)
    const res = url.match(regex)
    return res ? res[1] : undefined
  }

  // Get the private transformed square photo URL in Cloudinary (used for user profile and order photos)
  function getCloudinarySquareImageUrl(cloudinaryId: string) {
    return `https://res.cloudinary.com/mahali/image/private/t_mahali_user_profile/v1/${cloudinaryId}`
  }

  function isValidImageType(file: File) {
    return VALID_IMAGE_TYPES.includes(file.type)
  }

  function isValidImageSize(file: File) {
    return file.size < MAX_IMAGE_SIZE
  }


  return {
    getCloudinaryImageUrl, getCloudinarySquareImageUrl, getCloudinaryShortLink,
    isValidImageType, isValidImageSize
  }
}
