<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async() => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    // eslint-disable-next-line no-alert
    alert('Check your email for the login link!')
  }
  catch (error) {
    console.warn(error.error_description || error.message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="flex justify-center" @submit.prevent="handleLogin">
    <div class="">
      <h1 class="">
        Supabase + Nuxt 3
      </h1>
      <p class="description">
        Sign in via magic link with your email below
      </p>
      <div>
        <input v-model="email" class="inputField" type="email" placeholder="Your email">
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        >
      </div>
    </div>
  </form>
</template>