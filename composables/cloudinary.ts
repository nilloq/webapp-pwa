const VALID_IMAGE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 10485760

export function useCloudinary() {

  // Get Cloudinary image URL
  // Mahali images are only available once transformed, so in "private" area
  // cloudName: "mahali",
  // transfName : "mahali_detail_full_screen_watermarked" | "mahali_detail_thumb_watermarked" | "mahali_post"
  function getCloudinaryImageUrl(cloudinaryId:string, transfName = 'mahali_detail_full_screen_watermarked') {
    return `https://res.cloudinary.com/mahali/image/private/s--bcOIh4fh--/t_${transfName}/v1/${cloudinaryId}`
  }

  function getCloudinaryShortLink(url:string, transfName = 'mahali_detail_full_screen_watermarked'):string {
    const regex = new RegExp(`${transfName}/v1/(.*)$`)
    const res = url.match(regex)
    return res ? res[1] : ''
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

  // let source:any

  // // Upload an image in Cloudinary
  // async function uploadImageToCloudinary(file: File, onUploadProgress: any, type: string) {
  //   source = axios.CancelToken.source()
  //   const config:AxiosRequestConfig = {
  //     onUploadProgress,
  //     cancelToken: source.token
  //   }
  //   const data = new FormData()
  //   data.append('upload_preset', `pwa_upload_${type}`)
  //   data.append('tags', 'pwa_upload') // Optional - add tag for image admin in Cloudinary
  //   data.append('file', file)
  //   try {
  //     const response = await cloudinary.post('', data, config)
  //     return response.data.public_id
  //   }
  //   catch(err) {
  //     if (axios.isCancel(err))
  //       console.warn('Image upload cancelled')
  //     else
  //       console.warn('Failed to upload image')
  //     return null
  //   }
  // }

  // function cancelCloudinaryUpload() {
  //   source.cancel()
  // }

  return {
    getCloudinaryImageUrl, getCloudinarySquareImageUrl, getCloudinaryShortLink,
    isValidImageType, isValidImageSize
    // uploadImageToCloudinary, cancelCloudinaryUpload
  }
}
