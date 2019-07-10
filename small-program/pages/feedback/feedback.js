// pages/feedback/feedback.js
import {
  loginByWeixin,
  checkLogin,
} from "../../utils/user.js"
import {
  baseApi,
  request,
  checkNum
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeLists: ['请选择', '投诉', '建议', '设备故障', '其他'],
    categoryLists: ['请选择', '充电宝-宝身', '充电宝-数据线', '线充', '柜机'],
    typeIndex: 0,
    categoryIndex: 0,
    typeText: '',
    categoryText: '',
    isShowCategory: false
  },
  //类别
  handleTypeInput(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value);

    if (e.detail.value == 3) {
      this.setData({
        typeIndex: e.detail.value,
        typeText: this.data.typeLists[e.detail.value],
        isShowCategory: true
      });
    } else {
      this.setData({
        typeIndex: e.detail.value,
        typeText: this.data.typeLists[e.detail.value],
        isShowCategory: false
      });
    }
  },
  feedbackRequest(parmas) {
    request(`${baseApi}/token/feedback/saveFeedback`, parmas, "POST").then(
      res => {
        console.log(res.data);
        if (res.data.code == '10000') {
          //success
          wx.showToast({
            icon: 'success',
            title: '反馈成功',
            duration: 2000,
            success: () => {
              wx.navigateBack({
                delta: 1
              });
            },
          });
        } else {
          //fail
          wx.showToast({
            icon: 'none',
            title: '操作异常',
            duration: 2000
          });
        }
      }
    )
  },
  //类型
  handleCategoryInput(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      categoryIndex: e.detail.value,
      categoryText: this.data.categoryLists[e.detail.value]
    });
  },

  //form表单提交
  handleFeedback(e) {
    let formVal = e.detail.value;

    if (this.data.typeIndex == 0) {
      wx.showModal({
        title: '',
        content: '请选择反馈类别！',
      })
      return;
    } else if (this.data.typeIndex == 3) {
      if (this.data.categoryIndex == 0) {
        wx.showModal({
          title: '',
          content: '请选择反馈类型！',
        })
        return;
      }

      if (formVal.snNo == '' || formVal.snNo == undefined) {
        wx.showModal({
          title: '',
          content: '请输入SN码！',
        })
        return;
      } else if (!checkNum(formVal.snNo)) {
        wx.showModal({
          title: '',
          content: '请输入正确的SN码！',
        })
        return;
      }
    }
    console.log(formVal.content)
    if (formVal.content == "" || formVal.content == undefined) {
      wx.showModal({
        title: '',
        content: '请输入反馈内容！',
      })
      return;
    }
    let parmas = Object.assign({}, {
      "snNo": formVal.snNo
    }, {
      "content": formVal.content
    }, {
      "questionType": +this.data.typeIndex
    }, {
      "feedbackType": +this.data.categoryIndex
    });
    this.feedbackRequest(parmas);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      typeText: this.data.typeLists[0],
      categoryText: this.data.categoryLists[0]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})