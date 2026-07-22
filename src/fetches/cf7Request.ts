/* eslint-disable @typescript-eslint/no-explicit-any */

class CF7Request {
  private formData: FormData

  constructor(formData: Record<string, any>) {
    this.formData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return

      if (value instanceof File || value instanceof Blob) {
        this.formData.append(key, value)
        return
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item === undefined || item === null || item === '') return
          this.formData.append(
            key,
            item instanceof File || item instanceof Blob ? item : String(item),
          )
        })
        return
      }

      this.formData.append(key, String(value))
    })
  }

  private getEndpoint(id: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_CF7
    if (!baseUrl) {
      throw new Error('API base URL is not defined in environment variables.')
    }
    return `${baseUrl}/${id}/feedback`
  }

  public async send({ id, unitTag }: { id: string; unitTag: string }): Promise<any> {
    if (!id || !unitTag) {
      throw new Error("Both 'id' and 'unitTag' are required.")
    }

    try {
      this.formData.set('_wpcf7_unit_tag', unitTag)
      const response = await fetch(this.getEndpoint(id), {
        method: 'POST',
        body: this.formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending CF7 request:', error)
      throw error
    }
  }
}

export default CF7Request
