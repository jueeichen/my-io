import { baseApi } from "../../utils/util"

const app = getApp();
Page({
  data: {
    companyName: "移联天下",
    orgName: "特耐王超级充"
  },
  getOrgInfo() {
    let _this = this;

    app.http(`${baseApi}token/org/getOrgInfo`, 'GET', {}, true).then(
      res => {
        console.log(res.data);
        if (res.data.code == '10000') {
          let { companyName, orgName } = res.data.data
          _this.setData({
            companyName: companyName ? companyName : _this.data.companyName,
            orgName: orgName ? orgName : _this.data.orgName
          });

        } else {
          _this.setData({
            hotLine: hotLine
          });
        }
      }
    );

  },
  onLoad() {
    this.getOrgInfo()



  },
});
