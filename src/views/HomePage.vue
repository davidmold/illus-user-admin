<template>
  <div>
    <h2><router-link to="/admin/user_admin/vue/faqs">{{ subtitle }}</router-link></h2>
    <p>
      The portfolio management area enables you and us total control of your web
      presence on illustrationweb.com.
    </p>
    <p>
      It has been designed to make it easy to do, whilst giving us the flexibility
      to be shown off individually and fully within the context of the site. Updating
      your homepage and content is important as you have new work and evolutions in your practice.
    </p>
    <p>
      You will be able to get a feel of which are your most popular images, by way of a
      counter that will rank them by the number of times the larger image is shown.
      This will help in selection and management of the portfolio images and choose the best
      images for the style galleries.
    </p>
    <p>From your <b>Home page</b> users of the site will be able to:
    <ul>
      <li> see up to 50 of your images on the Web portfolio.</li>
      <li> have a resource that enables them to print top quality encapsulated
        documents of between 20 and 40 selected works for presentations, meetings and reference.</li>
      <li> show your animation reels</li>
    </ul>
    </p>
    <p>
      It is a site with unprecedented access and facility.
    </p>
    <p>
      Once you have made changes to your portfolio it will go live and an email will be
      sent to all your agents around the world so that we are all immediately familiar
      with your latest work etc.
    </p>

  </div>
</template>

<script>
export default {
  data () {
    return {
      subtitle: 'Frequently Asked Questions regarding Artist payments'
    }
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Manage your Illustration web presence')
  }
}
</script>

<style>
</style>
