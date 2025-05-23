export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'kronos')
  formData.append('cloud_name', 'dqop5hdkk')

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dqop5hdkk/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    console.log(data.secure_url)
    return data.secure_url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
