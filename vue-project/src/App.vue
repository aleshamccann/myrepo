<script>
import Number from './components/Number.vue'

export default{
  name: 'App',
  components: {
    Number
  }
}

</script>

<template>
  <header>
      <nav>
        <div>
          Alesha McCann
        </div>
        <div>
          <a href="https://github.com/aleshamccann" title="GitHub" class="contact-link">
            <img src="./assets/images/GitHub-logo.png" />
          </a>
        </div>
        <div>
          <a href="mailto:ammccann87@gmail.com" title="Contact" class="contact-link">
            ammccann87@gmail.com
          </a>
        </div>
      </nav>
    </header>
  <body>
    <Number />
  </body>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  color: black;
}

header>nav {
  background-color:#BF408C;
  color:white;
  overflow:hidden;
  display:flex;
  justify-content:space-between;
  align-items:center
}

img {
  height: 40px;
}

header>nav>div {
  float: left;
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}

body {
  margin: 0;
  padding: 0;
  max-height: 100%;
}

.contact-link{
  color:#fff;
  text-decoration:none
}

</style>
