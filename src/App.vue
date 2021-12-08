<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <LogoFile class="logo" />
      </div>
    </header>
    <main class="main">
      <div class="container">
        <div class="inner">
          <div class="form-section">
            <div class="box">
              <div class="box-heading">
                <h2>Enter Details</h2>
              </div>
              <div class="box-content">
                <SignatureForm 
                  :form="form"
                />
              </div>
            </div>
          </div>
          <div class="preview-section">
            <div class="preview-sticky">
              <div class="box">
                <div class="box-heading">
                <h2>Signature Preview</h2>
                </div>
                <div class="box-content">
                <SignaturePreview 
                  :form="form"
                  ref="preview"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LogoFile from './assets/logo.svg?inline'
import SignatureForm from './components/SignatureForm.vue'
import SignaturePreview from './components/SignaturePreview.vue'

export default {
  name: 'App',
  components: {
    LogoFile,
    SignatureForm,
    SignaturePreview
  },
  data() {
    return {
      form: {
        headshotUrl: '',
        name: 'Human Person',
        jobTitle: 'Oxygen Enthusiast',
        email: '',
        phone: '',
        address: 'miami'
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@700&family=Noto+Sans:wght@400;700&display=swap');

body {
    margin: 0;
    padding: 0;
    font: 400 16px 'Noto Sans', sans-serif;
    line-height: 1.5;
    color: #1D2135;
    background: #F4F4F4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    margin: 0 auto;
    padding: 0 24px;
    max-width: 1080px;
}
a {
    color: #00B69C;
}
a:focus {
    color: #1D2135 !important;
    background: #00eab6;
    text-decoration: none;
    box-shadow: 0 2px #1D2135;
}
h1,h2,h3,h4,h5,h6 {
    font-weight: 700;
    font-family: 'Mulish', sans-serif;
    margin: 8px 0 16px;
}
hr {
    background: #F4F4F4;
    border: none;
    height: 2px;
    margin: 24px 0;
}
ol {
    margin: 0;
    padding-left: 16px;
}
ol li {
    margin-bottom: 8px;
}
ol li:last-child {
    margin-bottom: 0;
}
.spacer {
    height: 24px;
}
.box {
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.box-heading {
    padding: 16px 24px;
    border-bottom: 2px solid #F4F4F4;
}
.box-heading h2 {
    font-size: 18px;
    margin: 0;
}
.box-content {
    padding: 24px;
}

/* Header */
.header {
    display: flex;
    align-items: center;
    background: #1D2135;
    padding: 24px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1),
                0px 4px 8px rgba(0, 0, 0, 0.15);
}
.header .logo {
    height: 40px;
}

/* Main */
.main {
    margin: 24px 0 64px;
}
.main .form-section {
    width: 480px;
    max-width: 100%;
}
.main .preview{
    min-width: 450px;
}
@media (max-width: 919px) {
    .main .preview-section {
        margin-top: 24px;
        overflow: hidden;
        overflow-x: auto;
    }
    .preview-sticky {
        margin-bottom: 24px;
    }
}
@media (min-width: 920px) {
    .main .inner {
        display: flex;
    }
    .main .form-section {
        margin-right: 24px;
    }
    .main .preview-section {
        max-width: 580px;
    }
    .preview-sticky {
        top: 24px;
        position: sticky;
    }
}
</style>
