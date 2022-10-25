import { screen, render } from '@testing-library/react'
import ImageGallery from '@/components/ProductOverview/PO-Components/ImageGallery'

describe('image gallery', () => {
  // const photos = [
  //   {
  //     name: 'anime photo',
  //     thumbnail_url:
  //       'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  //   },
  // ]
  // it('should display an image when passed in an array of object literals with thumbnail_url as the key', () => {
  //   // Refer to docs on how to get the element you want to test
  //   // https://testing-library.com/docs/queries/about/
  //   const { queryAllByRole } = render(<ImageGallery photos={photos} />)
  //   expect(queryAllByRole('img')).toBeTruthy()
  // })
  // make test for how many photos on the page

  const noPhotos = [
    {
      name: 'anime photo',
      thumbnail_url: null,
    },
  ]

  it('should display conditional render message when there are no photos', () => {
    // Refer to docs on how to get the element you want to test
    // https://testing-library.com/docs/queries/about/
    render(<ImageGallery photos={noPhotos} />)
    const CRtest = screen.queryByText('No photo(s) at this time. Please check again later.')
    expect(CRtest).toBeTruthy()
  })
  // make test for how many photos on the page
})

describe('test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
