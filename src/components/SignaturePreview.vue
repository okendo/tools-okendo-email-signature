<template>
  <div class="preview">
    <table cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td :width="logoWidth" :style="{'vertical-align': 'middle'}">
          <img :src="logoUrl" :width="logoWidth" :height="logoHeight" :style="{'display': 'block', 'image-rendering': '-webkit-optimize-contrast'}" />
        </td>
        <td>
          <table cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td :style="nameStyle">{{ name }}</td>
            </tr>
            <tr v-if="jobTitle">
              <td :style="jobTitleStyle">{{ jobTitle }}</td>
            </tr>
            <tr v-if="mobile">
              <td :style="{'padding': '0px 0px 4px 0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
                <table cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td v-if="mobile" :style="{'padding': '0px', 'font-family' : fontFamily, 'font-weight': 600, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary, 'whitespace': 'nowrap'}">
                      {{ mobile }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td :style="{'padding': '0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
                <a href="https://www.okendo.io" :style="{'font-family' : fontFamily, 'font-weight': 400, 'color': colorAccent}">
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
      separatorHeight: 64,
      colorPrimary: '#1D2135',
      colorSecondary: '#8F9097',
      colorAccent: '#00B69C',
      fontFamily: "Roboto, sans-serif",
      fontSizeSmall: '14px',
      lineHeightSmall: '16px',
      logoUrl: '',
      logoWidth: 0,
      logoHeight: 62
    }
  },
  computed: {
    nameStyle() {
      return {
        'font-family' : this.fontFamily, 
        'font-weight': 700, 
        'font-size': '16px', 
        'line-height': '18px', 
        'color': this.colorPrimary, 
        'whitespace': 'nowrap', 
        'padding': '0px 0px 4px 0px'
      }
    },
    jobTitleStyle() {
      return {
        'font-family' : this.fontFamily, 
        'font-weight': 400, 
        'font-size': this.fontSizeSmall, 
        'line-height': this.lineHeightSmall, 
        'color': this.colorSecondary, 
        'whitespace': 'nowrap', 
        'padding': '0px 0px 8px 0px'
      }
    },
    name() {
      if ( ! this.form.name.trim()) {
        return 'First Last';
      }

      return this.form.name.trim();
    },
    jobTitle() {
      if (! this.form.jobTitle) {
        return 'Job Title';
      }

      return this.form.jobTitle.trim();
    },
    mobile() {
      let mobile = this.form.mobile.trim();
      if (mobile === '+') {
        return '';
      }

      return mobile
    }
  }
}
</script>

<style>
.preview-buttons {
    margin-top: 16px;
    margin-left: 24px;
}
.preview-buttons button + button {
    margin-left: 10px;
}
@media (max-width: 919px) {
    .preview{
        display: inline-block;
    }
}
</style>