import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const products = [
  { id: 1, name: 'Clear Frame', price: '₩39,000', tag: 'Transparent' },
  { id: 2, name: 'Black Classic', price: '₩42,000', tag: 'Everyday' },
  { id: 3, name: 'Metal Slim', price: '₩49,000', tag: 'Minimal' },
  { id: 4, name: 'Soft Brown', price: '₩45,000', tag: 'Warm' },
  { id: 5, name: 'Round Silver', price: '₩46,000', tag: 'Round' },
  { id: 6, name: 'Square Bold', price: '₩44,000', tag: 'Square' },
  { id: 7, name: 'Tinted Sun', price: '₩52,000', tag: 'Sunglasses' },
  { id: 8, name: 'Thin Gold', price: '₩50,000', tag: 'Metal' },
]

function ProductGrid() {
  return (
    <section className="section" id="shop">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Collection</h2>
          <p className="section__sub">OJO Studio — minimal frames, everyday identity.</p>
        </div>

        <Swiper
  className="productSwiper"
  modules={[Autoplay, Navigation]}
  loop={true}
  navigation
  spaceBetween={14}
  slidesPerView={4}                 // ✅ se ven 4
  centeredSlides={true}             // ✅ centrado
  autoplay={{
    delay: 2500,                    // ✅ se mueve cada 2.5s (cambiá a gusto)
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  breakpoints={{
    0: { slidesPerView: 1.2, centeredSlides: true },
    520: { slidesPerView: 2.2, centeredSlides: true },
    900: { slidesPerView: 4, centeredSlides: true },
  }}
>

          {products.map((p) => (
            <SwiperSlide className="productSlide" key={p.id}>
              <article className="card">
                <div className="card__img" aria-label={p.name} />
                <div className="card__body">
                  <div className="card__top">
                    <h3 className="card__title">{p.name}</h3>
                    <span className="chip">{p.tag}</span>
                  </div>
                  <div className="card__bottom">
                    <span className="price">{p.price}</span>
                    <button className="btnSmall" type="button">Add</button>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ProductGrid
