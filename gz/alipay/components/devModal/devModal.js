Component({
  mixins: [],
  data: {
    //isShow: false,  //是否显示
  },
  props: {
    onSureParent: ''
  },
  didMount() {
    console.log(this.props.isPopShow);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    /**
     * 子组件传递父组件: this.props.onSureChildHandle(参数),  
     * <my-component onSureChildHandle = "onSureHandle">  
     * 左边 onSureChildHandle 是子组件写的 methods 函数this.props.XXX(参数)， 右边 onSureHandle 是父组件写在page里的函数
     */

    //sure 
    handleSure(){
      const { onSureChildHandle } = this.props;
      //点击确定 => 关闭弹窗
      //this.props.onSureChildHandle(!this.props.isPopShow);
      onSureChildHandle(!this.props.isPopShow);
    },

    //取消
    handleCancel(){
      //直接关闭弹窗
      const { onCancleChildHandle } = this.props;
      onCancleChildHandle(!this.props.isPopShow);
    },

  },
});
