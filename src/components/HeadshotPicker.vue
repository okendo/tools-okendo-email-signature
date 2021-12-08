<template>
  <div class="headshot-picker" @click="$refs.file.click()" @keydown.enter="$refs.file.click()" tabindex="0">
    <img id="headshot-image" :src="value" ref="image" width="96" height="96" @load.prevent="handleImageLoad"/>
    <input type="file" ref="file" accept="image/png" @change="handleFileChange"/>
  </div>
</template>

<script>
export default {
  props: [
    'value'
  ],
  data() {
    return {
      imageFile: null,
      imageSrc: ''
    }
  },
  methods: {
    handleFileChange(e) {
      if (e.target.files) {
        this.imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('headshot-image').src = e.target.result;
        }
        reader.readAsDataURL(this.imageFile);
      }
    },
    handleImageLoad() {
      if (this.imageFile) {
        const canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = true;
        ctx.webkitImageSmoothingEnabled = true;
        ctx.msImageSmoothingEnabled = true;
        ctx.imageSmoothingEnabled = true;

        const MAX_WIDTH = 100;
        const MAX_HEIGHT = 100;

        let width = this.$refs.image.width;
        let height = this.$refs.image.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Resize uploaded image
        ctx.drawImage(this.$refs.image, 0, 0, width, height);

        var dataurl = canvas.toDataURL(this.imageFile.type);
        this.$emit('input', dataurl);
      }
    }
  }
}
</script>

<style scoped>
.headshot-picker {
    display: block;
    position: relative;
    margin: 8px 0;
    border-radius: 100%;
    width: 96px;
    height: 96px;
    background: #F4F4F4;
    cursor: pointer;
    overflow: hidden;
    box-shadow: none;
}
.headshot-picker input[type="file"] {
    display: none;
}
.headshot-picker::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
}
.headshot-picker:hover::after,
.headshot-picker:focus::after {
    background: center / 32px no-repeat url('../assets/add-image.svg'),
                rgba(0, 0, 0, 0.5);
}
.headshot-picker:focus::after {
    box-shadow: inset 0 0 0 2px #1D2135,
                inset 0 0 0 4px #fff;
}
</style>