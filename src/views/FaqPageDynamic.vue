<template>
  <div>
    <h1>Frequently Asked Questions regarding Artist payments</h1>
    <main>
      <div class="faq" v-for="faq in faqs" :key="faq.Id">
        <div class="question" v-html="faq.Question"></div>
        <div class="answer" v-html="faq.Answer"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      faqs: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await this.$apix.post('GetAdminFaqs')
      let faqs = res.data.d
      this.faqs = faqs.slice(1)
      this.$nextTick(() => {
        this.initClicks()
      })
    },
    initClicks () {
      const els = document.querySelectorAll('.question')
      for (let item of els) {
        item.onclick = () => {
          item.parentElement.classList.toggle('open')
        }
      }
    }
  }
}
</script>

<style>
.faq {
  margin: 40px 0;
  max-width: 900px;
  font-size: 1.4em;
  line-height: 1.4em;
}

.faq .question{
  font-weight:bold;
  margin-bottom:12px;
  cursor:pointer;
  padding-left:40px;
  background-image:url('/admin/user_admin/img/plus.svg');
  background-size:20px 20px;
  background-position:top left;
  background-repeat:no-repeat;
  font-size:1.1em;
}

.faq.open .question {
  background-image:url('/admin/user_admin/img/minus.svg');
}

.faq .answer{
  display:none;
  padding-left:40px;
}

.faq.open .answer{
  display:block;
}
</style>
