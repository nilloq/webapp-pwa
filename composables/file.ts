
export function useFile() {

  // Get Cloudinary image URL
  // Mahali images are only available once transformed, so in "private" area
  // cloudName: "mahali",
  // transfName : "mahali_detail_full_screen_watermarked" | "mahali_detail_thumb_watermarked"
  function getCloudinaryImageUrl(cloudinaryId:string, transfName = 'mahali_detail_full_screen_watermarked') {
    return `https://res.cloudinary.com/mahali/image/private/d_e5eirecjhqkpgstgvh7a.png,t_${transfName}/v1/${cloudinaryId}`
  }

  // Get the private transformed square photo URL in Cloudinary (used for user profile and order photos)
  function getCloudinarySquareImageUrl(cloudinaryId: string) {
    return `https://res.cloudinary.com/mahali/image/private/t_mahali_user_profile/v1/${cloudinaryId}`
  }

  return { getCloudinaryImageUrl, getCloudinarySquareImageUrl }
}
