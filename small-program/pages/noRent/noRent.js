Page({
  data: {
    content: ''
  },

  onLoad(e) {
    let _this = this;

    _this.setData({
      content: e.content
    });
  },
});
