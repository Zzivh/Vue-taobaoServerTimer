<template>
  <div id="app">
    <div class="box">
      <div class="time">
        <span>{{hour}}时</span>
        <span>{{minute}}分</span>
        <span>{{second}}秒</span>
        <span>{{ms}}ms</span>
      </div>
      <div class="btn">
        <button @click="start()" class="start" v-show="isBegin">开始</button>
        <button @click="stop()" class="stop" v-show="!isBegin">停止</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBegin: true,
      time: 0,
      hour: 0,
      minute: 0,
      second: 0,
      ms: 0
    };
  },
  methods: {
    // 时间自增
    timeIncrease() {
      this.ms += 50;
      if (this.ms >= 1000) {
        this.ms = 0;
        this.second++;
      }
      if (this.second >= 60) {
        this.second = 0;
        this.minute++;
      }
      if (this.minute >= 60) {
        this.minute = 0;
        this.hour++;
      }
      if (this.hour >= 24) {
        [this.hour, this.minute, this.second, this.ms] = 0;
      }
    },

    // 获取淘宝服务器时间
    getTime() {
      this.$axios
        .post("/api?api=mtop.common.getTimestamp&callback=cb")
        .then(e => {
          this.time = new Date(JSON.parse(e.data.data.t));
          this.hour = this.time.getHours();
          this.minute = this.time.getMinutes();
          this.second = this.time.getSeconds();
          this.ms = this.time.getMilliseconds();
        })
        .catch(() => {
          alert("请联网保持时间准确");
        });
    },

    // 开始计时
    start() {
      this.isBegin = false;
      this.getTime();
      this.ds1 = setInterval(this.getTime, 5000);
      this.ds2 = setInterval(this.timeIncrease, 50);
    },

    // 停止计时
    stop() {
      this.isBegin = true;
      clearInterval(this.ds1);
      clearInterval(this.ds2);
    }
  }
};
</script>

<style lang="stylus">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.time span {
  display: inline-block;
  width: 100px;
  font-weight: 700;
  color: #000;
  font-size: 35px;
}

.time span:last-child {
  width: 3rem;
  font-size: 10px;
  color: black;
}

.btn button {
  margin-top: 4rem;
  height: 4rem;
  width: 8rem;
  font-weight: 500;
  font-size: 26px;
  border-radius: 3px;
}

.start {
  background: #a576766e;
  color: white;
}

.stop {
  background: #ccc;
  color: black;
}
</style>
