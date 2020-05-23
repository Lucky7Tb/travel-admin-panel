<template>
  <div>
    <h1>Ini dashboard</h1>
  </div>
</template>

<script>

export default {
  name: "dashboard",
  data() {
    return{
      message: '',
      chats: []
    }
  },
  mounted(){
    // this.$socket.on('ready', () => {
    //   console.log("Halo sudah subscribe nih");
    // });
    // this.$socket.on("message", (data) => {
    //   this.chats.push(data);
    // })
  },
  methods: {
    // SendMessage() { 
    //   this.$socket.emit("message", {message: this.message, isAdmin: false});
    //   this.chats.push({message: 'me: ' + this.message, isAdmin: false});

    //   this.message = '';
    // }
  }
};
</script>