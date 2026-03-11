import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const products = [
  { id: 1, name: 'Clear Frame', price: '₩39,000', tag: 'Transparent', img: '/img/glasses (1).png' },
  { id: 2, name: 'Black Classic', price: '₩42,000', tag: 'Everyday', img: '/img/glasses (2).png' },
  { id: 3, name: 'Metal Slim', price: '₩49,000', tag: 'Minimal', img: '/img/glasses (3).png' },
  { id: 4, name: 'Soft Brown', price: '₩45,000', tag: 'Warm', img: '/img/glasses (4).png' },
  { id: 5, name: 'Round Silver', price: '₩46,000', tag: 'Round', img: '/img/glasses (5).png' },
  { id: 6, name: 'Square Bold', price: '₩44,000', tag: 'Square', img: '/img/glasses (6).png' },
  { id: 7, name: 'Tinted Sun', price: '₩52,000', tag: 'Sunglasses', img: '/img/glasses (7).png' },
  { id: 8, name: 'Thin Gold', price: '₩50,000', tag: 'Metal', img: '/img/glasses (8).png' },
]

function ProductGrid() {
  return (
    <section className="section" id="collection">
      <div className="container">

        <div className="section__head">
          <h2 className="section__title">Collection</h2>
          <p className="section__sub">
            OJO Studio — minimal frames, everyday identity.
          </p>
        </div>

        <Swiper
          className="productSwiper"
          modules={[Autoplay, Navigation]}
          loop={true}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            520: { slidesPerView: 2.2 },
            900: { slidesPerView: 4 },
          }}
        >

          {products.map((p) => (
            <SwiperSlide key={p.id} className="productSlide">

              <article className="card">

                <div className="card__img">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="card__imgReal"
                  />
                </div>

                <div className="card__body">

                  <div className="card__top">
                    <h3 className="card__title">{p.name}</h3>
                    <span className="chip">{p.tag}</span>
                  </div>

                  <div className="card__bottom">
                    <span className="price">{p.price}</span>
                    <button className="btnSmall">Add</button>
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