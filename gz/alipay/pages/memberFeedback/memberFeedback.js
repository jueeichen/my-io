const { baseApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    typeLists: ['请选择', '投诉', '建议', '设备故障', '其他'],
    categoryLists: ['请选择', '充电宝-宝身', '充电宝-数据线', '线充', '机柜'],
    typeIndex: 0,
    categoryIndex: 0,
    typeText: '',
    categoryText: '',
    isShowCategory: false
  },
  onLoad() {
    this.setData({
      typeText: this.data.typeLists[0],
      categoryText: this.data.categoryLists[0]
    });
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

  //类型
  handleCategoryInput(e){
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      categoryIndex: e.detail.value,
      categoryText: this.data.categoryLists[e.detail.value]
    });
  },

  //form表单提交
  handleFeedback(e){
    let formVal = e.detail.value;

    if (this.data.typeIndex == 0) {
      my.alert({
        content: "请选择反馈类别！"
      })
      return;
    } else if (this.data.typeIndex == 3) {
      if (this.data.categoryIndex == 0) {
        my.alert({
          content: "请选择反馈类型！"
        })
        return;
      }

      if (formVal.snNo == '' || formVal.snNo == undefined) {
        my.alert({
          content: "请输入SN码！"
        })
        return;
      }
    }

    if( !formVal.content ){
      my.alert({
        content: "请输入反馈内容！"
      })
      return;
    }
    let parmas = Object.assign({},{"snNo": formVal.snNo}, {"content": formVal.content}, {"questionType": this.data.typeIndex}, {"feedbackType": this.data.categoryIndex});
    this.feedbackRequest(parmas);
  },

  //request
  feedbackRequest(parmas){
    my.showLoading({
      content: "加载中..."
    });
    app
      .http(`${baseApi}/token/feedback/saveFeedback`, "POST", parmas, true)
      .then( res =>{
        console.log(res.data);
        if(res.data.code == '10000'){
          //success
          my.showToast({
            type: 'success',
            content: '反馈成功',
            duration: 2000,
            success: () => {
              my.navigateBack({
                delta: 1
              });
            },
          });
        }
        else{
          //fail
          my.showToast({
            type: 'fail',
            content: '操作异常',
            duration: 2000
          });
        }
      })
      .catch( res => {
         console.log( `===> ${res}` );
      })
      /*.then( res =>{
        my.hideLoading();
      })*/
  }
});
