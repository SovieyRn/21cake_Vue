<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions" class="swiper-box">
      <swiper-slide v-for="(item, index) in imgs" :key="index">
        <img :src="item.img" :alt="item.alt">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "SwiperWrap",
  data() {
    return {
      imgs: [
        {
          img: 'https://static.21cake.com//upload/images/d002ad9be924e1565b637c2856861e2c.jpg',
          alt: '银点'
        },
        {
          img: 'https://static.21cake.com//upload/images/f85354a7eb45dc3725b5b595a393d6ae.jpg',
          alt: '蔓生上线'
        },
        {
          img: 'https://static.21cake.com//upload/images/717571c8df5eb70f3b148396b0078389.jpg',
          alt: '国庆'
        },
        {
          img: 'https://static.21cake.com//upload/images/ca9e0211b2910589238cd68ed38dc3c3.jpg',
          alt: '面包卡'
        }
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        loop: true,
        spend: 800
      }
    };
  }
}
</script>

<style scoped>
.swiper .swiper-box img {
  display: block;
  width: 100%;
  height: 4rem;
}
.swiper >>> .swiper-pagination-bullet {
  width: 0.1rem;
  height: 0.1rem;
  border: 1px solid #C69C6D;
  background: none;
  opacity: 1;
}
.swiper >>> .swiper-pagination-bullet-active {
  background: #C69C6D !important;
}
</style>