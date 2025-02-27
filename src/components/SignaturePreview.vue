<template>
  <div class="preview">
    <table cellspacing="0" cellpadding="0" border="0" :style="{'line-height': '1'}">
      <tr>
        <td v-if="headshotUrl" :width="headshotSize" :style="headshotStyle">
          <img :src="headshotUrl" :width="headshotSize" :height="headshotSize" :style="{'display': 'block', 'border-radius': '100%'}" />
        </td>
        <td>
          <table cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td :style="titleStyle">
                {{ name }}
                <span :style="subtitleStyle">/ {{ jobTitle }}</span>
              </td>
            </tr>
            <tr v-if="email">
              <td>
                <a :href="'mailto:' + email" :style="[linkStyle, {'font-size': this.fontSizeLarge}]">
                  {{ email }}
                </a>
              </td>
            </tr>
            <tr v-if="phone">
              <td>
                <a :href="'tel:' + phone" :style="[linkStyle, {'font-size': this.fontSizeLarge}]">
                  {{ phone }}
                </a>
              </td>
            </tr>
            <tr>
              <td :style="tagLineStyle">15,000+ Shopify brands use <a href="https://okendo.io">Okendo</a> | 1,000+ Shopify <a href="https://apps.shopify.com/okendo-reviews">reviews</a></td>
            </tr>
            <tr>
              <td :style="{'padding': '8px 0px 16px 0px'}">
                <img src="https://mail.okendo.co/hubfs/Okendo%20HubSpot%20Assets/Emails/Signature%20Image%20-%20Superfans.png" width="342" :style="{'display': 'block'}" />
              </td>
            </tr>
            <tr>
              <td :style="addressStyle" v-if="form.address === 'miami'">Okendo Inc.</td>
              <td :style="addressStyle " v-if="form.address === 'sydney'">Okendo Pty Ltd</td>
            </tr>
            <tr>
              <td :style="addressStyle" v-if="form.address === 'miami'">
                2222 Ponce de Leon, Miami, FL 33134, United States
              </td>
              <td :style="addressStyle" v-if="form.address === 'sydney'">
                407/50 Holt St, Surry Hills NSW 2010
              </td>
            </tr>
            <tr>
              <td>
                <a href="https://www.okendo.io" :style="[linkStyle, {'font-style': 'italic'}]">
                  www.okendo.io
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SignaturePreview',
  props: ['form'],
  data() {
    return {
      headshotSize: 64,
      colorPrimary: '#1D2135',
      colorSecondary: '#8F9097',
      colorAccent: '#00B69C',
      fontFamily: "IBM Plex Sans, sans-serif",
      fontSizeSmall: '12px',
      fontSizeLarge: '14px',
      lineHeightSmall: '14px',
      lineHeightLarge: '16px'
    }
  },
  computed: {
    
    headshotStyle() {
      return {
        'vertical-align': 'top',
        'padding': '0 16px 0 0'
      }
    },

    titleStyle() {
      return {
        'font' : `700 ${this.fontSizeLarge} ${this.fontFamily}`,
        'line-height': this.lineHeightLarge, 
        'color': this.colorPrimary, 
        'whitespace': 'nowrap', 
        'padding': '8px 0px 2px 0px'
      }
    },

    subtitleStyle() {
      return {
        'font' : `400 ${this.fontSizeLarge} ${this.fontFamily}`,
        'line-height': this.lineHeightSmall, 
        'color': this.colorSecondary, 
        'whitespace': 'nowrap'
      }
    },

    addressStyle() {
      return {
        'font' : `400 ${this.fontSizeSmall} ${this.fontFamily}`,
        'line-height': this.lineHeightSmall, 
        'color': this.colorSecondary, 
        'whitespace': 'nowrap',
        'font-style': 'italic'
      }
    },

    tagLineStyle() {
      return {
        'font' : `400 ${this.fontSizeLarge} ${this.fontFamily}`,
        'line-height': this.lineHeightLarge, 
        'color': this.colorPrimary, 
        'whitespace': 'nowrap',
        'font-style': 'italic',
        'padding': '2px 0px'
      }
    },

    linkStyle() {
      return {
        'font' : `400 ${this.fontSizeSmall} ${this.fontFamily}`,
        'line-height': this.lineHeightSmall, 
        'color': this.colorAccent, 
        'whitespace': 'nowrap'
      }
    },

    headshotUrl() {
      if (!this.form.headshotUrl.trim()) {
        return '';
      }
      return this.form.headshotUrl.trim();
    },

    email() {
      if (!this.form.email.trim()) {
        return '';
      }
      return this.form.email.trim();
    },

    name() {
      if (!this.form.name.trim()) {
        return 'First Last';
      }
      return this.form.name.trim();
    },

    jobTitle() {
      if (!this.form.jobTitle) {
        return 'Job Title';
      }
      return this.form.jobTitle.trim();
    },

    phone() {
      if (!this.form.phone.trim()) {
        return '';
      }
      return this.form.phone.trim();
    },

  }
}
</script>

<style>
.preview a:focus {
    color: #00B69C !important;
    background: transparent;
    text-decoration: underline;
    box-shadow: none;
}
.preview-buttons {
    margin-top: 16px;
    margin-left: 24px;
}
.preview-buttons button + button {
    margin-left: 10px;
}
@media (max-width: 919px) {
    .preview {
        display: inline-block;
    }
}
</style>
