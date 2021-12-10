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
                <a :href="'mailto:' + email" :style="linkStyle">
                  {{ email }}
                </a>
              </td>
            </tr>
            <tr v-if="phone">
              <td>
                <a :href="'tel:' + phone" :style="linkStyle">
                  {{ phone }}
                </a>
              </td>
            </tr>
            <tr>
              <td :style="titleStyle">Okendo Inc.</td>
            </tr>
            <tr>
              <td :style="subtitleStyle" v-if="form.address === 'miami'">
                Level 8, 360 NW 27th Street, Miami, 33127
              </td>
              <td :style="subtitleStyle" v-if="form.address === 'sydney'">
                Level 13, 333 George Street, Sydney, 2000
              </td>
            </tr>
            <tr>
              <td>
                <a href="https://www.okendo.io" :style="linkStyle">
                  www.okendo.io
                </a>
              </td>
            </tr>
            <tr>
              <td :style="{'padding': '16px 0px 0px 0px'}">
                <img src="https://fs.hubspotusercontent00.net/hubfs/2846103/Okendo%20HubSpot%20Assets/Emails/Email%20CTA%20-%20Stats.png" width="280" :style="{'display': 'block'}" />
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
      fontFamily: "Roboto, sans-serif",
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
        'font' : `400 ${this.fontSizeSmall} ${this.fontFamily}`,
        'line-height': this.lineHeightSmall, 
        'color': this.colorSecondary, 
        'whitespace': 'nowrap'
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