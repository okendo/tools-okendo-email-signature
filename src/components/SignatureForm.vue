<template>
  <form class="form">

    <div class="field field-text">
      <div class="field-label">Full Name <span class="required">*</span></div>
      <div class="field-error" v-show="nameError" v-html="nameError"></div>
      <div class="field-control">
        <input type="text" autocomplete="name" v-model="form.name" v-on:blur="nameBlured = true;" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Job Title <span class="required">*</span></div>
      <div class="field-error" v-show="jobTitleError" v-html="jobTitleError"></div>
      <div class="field-control">
        <input type="text" autocomplete="organization-title" v-model="form.jobTitle" v-on:blur="jobTitleBlured = true;" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Mobile Number</div>
      <div class="field-desc">Enter in the order of country code, area code, number. Use dashes between each section.</div>
      <div class="field-error" v-show="mobileError" v-html="mobileError"></div>
      <div class="field-control">
        <input type="text" autocomplete="tel" v-model="form.mobile" v-on:blur="mobileBlured = true;" />
      </div>
    </div>

    <div class="field field-submit">
        <button type="button" :title="btnTitle" :disabled="formValid === false" class="btn primary-btn" @click.prevent="copySignature()">{{ copySignatureBtnText }}</button>
        <button type="button" :title="btnTitle" :disabled="formValid === false" class="btn secondary-btn" @click.prevent="copyHtml()">{{ copyHtmlBtnText }}</button>
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
      nameBlured: false,
      jobTitleBlured: false,
      officeBlured: false,
      mobileBlured: false,
      copiedHtml: false,
      copiedSignature: false
    }
  },
  mounted() {
    if (localStorage.getItem('form')) {
      Object.assign(this.form, JSON.parse(localStorage.getItem('form')));
    }
  },
  methods: {
    generated() {
      let form = this.form;
      localStorage.setItem('form', JSON.stringify(form));
    },
    copySignature: function() {
      let element = this.$parent.$refs.preview;

      if ( ! element ) {
        alert('Preview element not yet ready');
        return false;
      }

      if (document.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(element.$el);
        range.select();
        document.execCommand('copy');

      } else if (window.getSelection) {
        // let tWidth = element.$el.children[0].clientWidth;
        // element.$el.children[0].style.width = (tWidth + 100) + 'px';
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
      setTimeout(() => { this.copiedSignature = false }, 2000)
    },
    copyHtml: function() {
      let element = this.$parent.$refs.preview;

      if ( ! element ) {
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
      setTimeout(() => { this.copiedHtml = false }, 2000)
    }
  },
  computed: {
    nameError() {
      if ( ! this.nameBlured && ! this.jobTitleBlured  && ! this.officeBlured  && ! this.mobileBlured ) {
        return '';
      }

      var value = this.form.name.trim();
      if ( ! value ) {
        return 'Please fill in your name.';
      }

      return '';
    },
    jobTitleError() {
      if ( ! this.jobTitleBlured && ! this.officeBlured  && ! this.mobileBlured ) {
        return '';
      }

      var value = this.form.jobTitle.trim();
      if ( ! value ) {
        return 'Please fill in your job title.';
      }

      return '';
    },
    mobileError() {
      var value = this.form.mobile.trim();
      if ( ! value || value === '+' || ! this.mobileBlured ) {
        return '';
      }

      var phoneNumberPattern = /^\+?[0-9-]+$/;  
      if ( phoneNumberPattern.test( value ) == false ) {
        return 'Numbers only, use dashes to separate.';
      }

      return '';
    },

    btnTitle() {
      return this.formValid ? '' : 'Please fill up the form first.'
    },
    copySignatureBtnText() {
      return this.copiedSignature ? 'Copied' : 'Copy Signature'
    },
    copyHtmlBtnText() {
      return this.copiedHtml ? 'Copied' : 'Copy HTML'
    },
    formValid() {
      if ( ! this.form.name) {
        return false;
      }

      if ( ! this.form.jobTitle.trim() ) {
        return false;
      }

      return true;
    }
  }
}
</script>

<style>
/* Form */
.form .field {
    margin: 0 0 24px;
    padding: 0 0 24px;
    border-bottom: 1px solid #F4F4F4;
}
.form .field:last-child {
    border: none;
    margin: 0;
    padding: 0;
}
.form .field-label {
    color: #1D2135;
    font: 700 16px 'Mulish', sans-serif;
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
    font: 400 16px 'Noto Sans', sans-serif;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
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
.field-select .field-control::after {
    top: 50%;
    margin-top: -3.5px;
    content: " ";
    right: 20px;
    width: 10px;
    height: 7px;
    display: block;
    position: absolute;
    background: url('../assets/dropdown.svg') no-repeat;
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