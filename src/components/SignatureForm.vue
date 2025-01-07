<template>
  <form class="form">

    <div class="field">
      <div class="field-label">Headshot</div>
      <div class="field-desc">Enter a direct link to a headshot image. Ensure it's hosted somewhere that can be accessed publicly.</div>
      <div class="field-error" v-show="headshotError" v-html="headshotError"></div>
      <div class="field-control field-text">
        <input type="text" autocomplete="name" v-model="form.headshotUrl"/>
      </div>
    </div>

    <div class="field">
      <div class="field-label">Full Name <span class="required">*</span></div>
      <div class="field-error" v-show="nameError" v-html="nameError"></div>
      <div class="field-control field-text">
        <input type="text" autocomplete="name" v-model="form.name"/>
      </div>
    </div>

    <div class="field">
      <div class="field-label">Job Title <span class="required">*</span></div>
      <div class="field-error" v-show="jobTitleError" v-html="jobTitleError"></div>
      <div class="field-control field-text">
        <input type="text" autocomplete="organization-title" v-model="form.jobTitle"/>
      </div>
    </div>

    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-error" v-show="emailError" v-html="emailError"></div>
      <div class="field-control field-text">
        <input type="text" autocomplete="email" v-model="form.email"/>
      </div>
    </div>

    <div class="field">
      <div class="field-label">Phone</div>
      <div class="field-desc">Enter in the order: country code, area code, number. Use dashes between each number group.</div>
      <div class="field-error" v-show="phoneError" v-html="phoneError"></div>
      <div class="field-control field-text">
        <input type="text" autocomplete="tel" v-model="form.phone"/>
      </div>
    </div>

    <div class="field">
      <div class="field-label">Address <span class="required">*</span></div>
      <div class="field-error" v-show="addressError" v-html="addressError"></div>
      <div class="field-control field-select">
        <select v-model="form.address">
          <option value="miami">
            2222 Ponce de Leon, Miami, FL 33134, United States
          </option>
          <option value="sydney">
            407/50 Holt St, Surry Hills NSW 2010
          </option>
        </select>
      </div>
    </div>

    <div class="field field-submit">
      <button type="button" :disabled="formValid === false" class="btn" @click.prevent="copySignature()">
        {{ copySignatureBtnText }}
      </button>
      <button type="button" :disabled="formValid === false" class="btn" @click.prevent="copyHtml()">
        {{ copyHtmlBtnText }}
      </button>
    </div>

    <hr>

    <div class="field">
      <div class="field-heading">How to add your signature to Gmail</div>
      <div class="field-paragraph">
        <ol>
          <li>Click on the <strong>Copy Signature</strong> button above and go to your <a href="https://mail.google.com/mail/u/0/#settings/general" target="_blank" rel="noopener noreferrer">Okendo Gmail account settings</a>.</li>
          <li>Select the <strong>Create New</strong> button to add a new signature.</li>
          <li>Give this signature a name and select <strong>Create</strong>.</li>
          <li>Paste the signature into the WYSIWYG editor.</li>
          <li>Select your new signature under <strong>Signature defaults</strong>.</li>
          <li>Scroll to the bottom and select <strong>Save Changes</strong>.</li>
        </ol>
      </div>
    </div>

    <hr>

    <div class="field">
      <div class="field-heading">How to add your signature to HubSpot</div>
      <div class="field-paragraph">
        <ol>
          <li>Click on the <strong>Copy HTML</strong> button above (HTML works best for HubSpot's email signature editor).</li>
          <li>Follow the remaing steps as detailed in <a href="https://knowledge.hubspot.com/account/add-an-email-signature-in-the-crm" target="_blank" rel="noopener noreferrer">HubSpot's documentation</a>.</li>
        </ol>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: 'SignatureForm',
  props: [
    'form'
  ],
  data() {
    return {
      copiedHtml: false,
      copiedSignature: false,
    }
  },
  methods: {

    generated() {
      let form = this.form;
      localStorage.setItem('form', JSON.stringify(form));
    },

    copySignature() {
      let element = this.$parent.$refs.preview;

      if (!element) {
        alert('Preview element not yet ready');
        return false;
      }

      if (document.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(element.$el);
        range.select();
        document.execCommand('copy');

      } else if (window.getSelection) {
        let selection = window.getSelection();        
        let range = document.createRange();
        range.selectNodeContents(element.$el);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
      }

      this.generated();
      this.copiedSignature = true;
      setTimeout(() => { this.copiedSignature = false }, 2000);
    },

    copyHtml() {
      let element = this.$parent.$refs.preview;

      if (!element) {
        alert('Preview element not yet ready');
        return false;
      }

      const el = document.createElement('textarea');

      el.value = element.$el.innerHTML;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);

      const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }

      this.generated();
      this.copiedHtml = true;
      setTimeout(() => { this.copiedHtml = false }, 2000);
    }

  },
  computed: {

    emailError() {
      const email = this.form.email.trim();
      const emailPattern = /\S+@\S.\S/;  
      if (emailPattern.test(email) == false && email) {
        return 'Please enter a valid email.';
      }
      return '';
    },

    nameError() {
      if (!this.form.name.trim()) {
        return 'Please fill in your name.';
      }
      return '';
    },

    jobTitleError() {
      if (!this.form.jobTitle.trim()) {
        return 'Please fill in your job title.';
      }
      return '';
    },

    phoneError() {
      const phone = this.form.phone.trim();
      const phoneNumberPattern = /^\+?[0-9-]+$/;  
      if (phoneNumberPattern.test(phone) == false && phone) {
        return 'Please enter a valid phone number, use dashes to separate number groups.';
      }
      return '';
    },

    addressError() {
      if (!this.form.address.trim()) {
        return 'Please select the nearest Okendo office address.';
      }
      return '';
    },

    headshotError() {
      const headshot = this.form.headshotUrl.trim();
      const headshotUrlPattern = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif))/;  
      if (headshotUrlPattern.test(headshot) == false && headshot) {
        return 'Please enter a valid image URL with the protocol (such as https://) and file extension (such as .png or .jpg) included.';
      }
      return '';
    },

    copySignatureBtnText() {
      return this.copiedSignature ? 'Copied!' : 'Copy Signature'
    },

    copyHtmlBtnText() {
      return this.copiedHtml ? 'Copied!' : 'Copy HTML'
    },

    formValid() {
      if (this.form.name && this.form.jobTitle.trim()) {
        return true;
      }
      return false;
    }

  }
}
</script>

<style>
/* Form */
.form .field {
    margin: 0 0 32px;
}
.form .field:last-child {
    border: none;
    margin: 0;
    padding: 0;
}
.form .field-label {
    color: #1D2135;
    font: 700 16px 'IBM Plex Sans', sans-serif;
    margin: 0 0 4px;
}
.form .field-desc,
.form .field-error {
    font-size: 14px;
}
.form .field-desc {
    color: #1D2135;
    margin: 0 0 8px;
}
.form .field-heading {
    color: #1D2135;
    font: 700 20px 'IBM Plex Sans', sans-serif;
    margin: 0 0 16px;
}
.form .field-paragraph {
    line-height: 1.75;
}
.form .required,
.form .field-error {
    color: #ed5353;
}
.form .field-control select,
.form .field-control input[type="text"],
.form .field-control input[type="email"],
.form .field-control input[type="url"],
.form .field-control input[type="tel"] {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #1D2135;
    padding: 0 16px;
    margin: 8px 0;
    border-radius: 4px;
    box-sizing: border-box;
    background: #FFF;
    border: none;
    font: 400 16px 'IBM Plex Sans', sans-serif;
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
                0 2px 4px rgba(0, 0, 0, 0.1);
}
.form .field-control select:focus,
.form .field-control input[type="text"]:focus,
.form .field-control input[type="email"]:focus,
.form .field-control input[type="url"]:focus,
.form .field-control input[type="tel"]:focus {
    box-shadow: 0 0 0 2px #1D2135,
                0 2px 4px rgba(0, 0, 0, 0.1);
}
@media(max-width: 479px) {
    .form .field-control select,
    .form .field-control input[type="text"],
    .form .field-control input[type="email"],
    .form .field-control input[type="url"],
    .form .field-control input[type="tel"] {
        height: 36px;
        font-size: 14px;
        line-height: 36px;
    }
}
.form .field-control {
    position: relative;
}
.form .field-control select {
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
}
.form .field-headshot {
    display: block;
    position: relative;
    margin: 8px 0;
    border-radius: 100%;
    width: 96px;
    height: 96px;
    background: center / 48px no-repeat url('../assets/empty-headshot.svg'),
              #F4F4F4;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.form .field-headshot:hover,
.form .field-headshot:focus {
    background: #F4F4F4;
}
.form .field-headshot::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
}
.form .field-headshot:hover::after,
.form .field-headshot:focus::after {
    background: center / 32px no-repeat url('../assets/add-image.svg'),
                rgba(0, 0, 0, 0.5);
}
.form .field-headshot:focus::after {
    box-shadow: inset 0 0 0 2px #1D2135,
                inset 0 0 0 4px #fff;
}
.field-select::after {
    content: '';
    display: block;
    position: absolute;
    margin-top: -8px;
    top: 50%;
    right: 12px;
    width: 16px;
    height: 16px;
    background: center / 12px no-repeat url('../assets/dropdown.svg');
    pointer-events: none;
}
.form .btn {
    position: relative;
    margin: 8px 0;
    font: 700 16px 'IBM Plex Sans', sans-serif;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    letter-spacing: 0.01em;
    background: #1D2135;
    border: none;
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}
.form .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.form .btn:focus {
    box-shadow: inset 0 0 0 2px #1D2135,
                inset 0 0 0 4px #fff;
}
.form .btn-google {
    color: #1D2135;
    background: 8px / 32px no-repeat url('../assets/google-logo.svg'),
                #fff;
    padding-left: 48px;
}
.form .field-submit button {
    margin-right: 20px;
}
@media (max-width: 480px) {
    .form .field-submit button {
        width: 100%;
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>