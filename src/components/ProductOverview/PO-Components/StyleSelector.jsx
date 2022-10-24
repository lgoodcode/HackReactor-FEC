import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '@/styles/productOverview/styleSelector.css'
import { IconCheck } from '@tabler/icons'

export default function StyleSelector({ product, id, skusHandler, changePhotos, setSalePrice }) {
  const [styles, setStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleStyleClick = (styleId, index) => {
    // console.log('style_id that was clicked', styleId)
    // .filter returns an array, filteredStyle -> [{styles}]
    const filteredStyle = styles.filter((style, index) => style.style_id === styleId)
    // format into its own object
    const selectedStyle = { ...filteredStyle[0] }
    console.log('newStyle based on style_id', selectedStyle)
    // change the current style state
    setCurrentStyle(selectedStyle)
    // change photos in the image gallery component
    changePhotos(selectedStyle)
    setSalePrice(selectedStyle.sale_price)
    // pass up the skus to parent component
    skusHandler(selectedStyle.skus)
    // helpful for the conditional rendering below
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!product) return

    axios
      .get(`/products/${id}/styles`)
      .then((styleObj) => {
        setStyles(styleObj.data.results) // the entire styles array
        const defaultStyle = product.styles.find((style) => style.default) || product.styles[0]
        setCurrentStyle(defaultStyle)
        const { sale_price } = defaultStyle
        // console.log('results array in styles:', styleObj.data.results)
        // console.log('currentStyle:', styleObj.data.results[0])
        skusHandler(styleObj.data.results[0].skus)
        setSalePrice(sale_price)
        // console.log('currentSku:', styleObj.data.results[0].skus)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <div className="style-container">
      <div className="style-heading">STYLE &gt; {currentStyle.name}</div>
      <div className="bubble-container">
        {styles?.map((style, index) => {
          return (
            <div
              className={index === currentIndex ? 'bubble active' : 'bubble'}
              onClick={() => handleStyleClick(style.style_id, index)}
              key={index}
            >
              <img className="style-bubble" src={style.photos[0].thumbnail_url} alt={style.name} />
              {index === currentIndex && <IconCheck className="bubble-check" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
