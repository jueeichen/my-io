/**
  * 所有请求均为post
  * 除注册外其他接口head中加token参数
  * 返回格式：
  * {"code":"10000","message":"登录成功","data":"{"token":"92dc3302ddc0b82a42c0cd7a6465e8e4"}"}
  * code解释
  * 10000-成功
  * 10001-失败
  * 10003-用户不存在或没登录
 */

/**
 * GETCOMMONCONF-获取通用配置1
 */

export const GETCOMMONCONF = '/commonConf/getCommonConf'

/**
* GETCOMMONCONFIMAGE-获取通用配置
* @param {String} type 	1-活动中心优券 2-banner 3-启动图 4-推广海报 101-活动中心推广海报 102-本科教育产品页宣传图 103-研究生产品页宣传图 104-班主任二维码设置
*/

export const GETCOMMONCONFIMAGE = '/commonConf/getCommonConfImage'

/**
 * USERLOGIN-登录注册1
 * @param {String} authCode openId
 */

export const USERLOGIN = '/userInfo/userLogin'

/**
 * DECRYPTPHONE-获取手机号解密1
 * @param token token放在header中
 * @param {String} encryptedData  加密数据	
 * @param {String} iv  初始向量	
 * 
 */

export const DECRYPTPHONE = '/userInfo/decryptPhone'



/**
 * GETUSERINFO-获取用户信息1
 * @param token token放在header中
 * 
 */

 export const GETUSERINFO = '/userInfo/getUserInfo'

//产品相关：
/**
 * GETINDEXPRODUCTLIST-POST请求 产品首页推荐列表
 * @param {String} pageNum 页码
 * @param {String} pageSize 
 * 
 */

export const GETINDEXPRODUCTLIST = '/productInfo/getIndexProductList'

/**
 * GETPRODUCTLISTBYTYPE-POST请求 通过产品productType获取产品详情
 * @param {String} pageNum 页码
 * @param {String} pageSize 
 * @param {String} productType  	1-本科教育 2-研究生
 */

export const GETPRODUCTLISTBYTYPE = '/productInfo/getProductListByType'



/**
 * GETPRODUCTDETAILBYID-POST请求 获取产品详情
 * @param {String} id	 产品ID
 */

export const GETPRODUCTDETAILBYID = '/productInfo/getProductDetailById'

// 订单相关
/**
 * CREATEORDERLEARN-POST请求 创建订单
 * @param {String} productId	 产品ID
 * @param {String} specialitiesName	 专业名称	
 * @param {String} signuperName	 报名人姓名		
 * @param {String} signuperMobile	 报名人手机号	
 * @param {String} signupCouponDetailId	  报名优惠券领取ID	
 *
 */

export const CREATEORDERLEARN = '/orderLearn/createOrderLearn'

/**
 * PAYORDER-POST请求 产品首页列表
 * @param {String} orderNo	 产品ID
 */

export const PAYORDER = '/orderLearn/payOrder'

/**
 * selectCoupon-POST请求 重新选择优惠券
 * 
 * @param {String} orderNo	 订单号	
 * @param {String} tuitionCouponDetailId	  优惠券领取ID	
 * 
 */

export const SELECTCOUPON = '/orderLearn/selectCoupon'

/**
 * getOrderList-POST请求 重新选择优惠券
 * 
 * @param {String} pageNum	  	
 * @param {String} pageSize	   	
 * 
 */

export const GETORDERLIST = '/orderLearn/getOrderList'

/**
 * CANCELORDER-POST请求 取消订单
 * 
 * @param {String} orderNo	  	
 * 
 */
export const CANCELORDER = '/orderLearn/cancelOrder'


/**
 * GETCERTFLOW-POST请求 拿证流程
 * 
 * 
 */
export const GETCERTFLOW = '/orderLearn/getCertFlow'

//积分相关
/**
* GETACCOUNTPOINT-POST请求 获取积分账户信息
*/
export const GETACCOUNTPOINT = '/accountPoint/getAccountPoint'



/**
* GETACCOUNTPOINTDETAILBYTYPE-POST请求 积分明细
* @param {String} orderNo			1-收入 2-支出
*/
export const GETACCOUNTPOINTDETAILBYTYPE = '/accountPoint/getAccountPointDetailByType'


//优惠券相关

/**
* GETACCOUNTPOINTDETAILBYTYPE-POST请求 通过状态获取优惠券
* @param {String} pageNum			
* @param {String} pageSize			 
* @param {String} status 状态 1-待使用，2-已使用，3-已失效，101-可领取，102-可兑换			 
* @param {String} couponType 优惠券类型	是否必填-否 可空值			 
*/
export const GETCOUPONLIST = '/couponInfo/getCouponList'
/**
* EXCHANGECOUPON-POST请求 兑换优惠券
* @param {String} couponId			优惠券ID	
* @param {String} exchangeNum		兑换数量	

*/
export const EXCHANGECOUPON = '/couponInfo/exchangeCoupon'
/**
* RECEIVECOUPON-POST请求 领取优惠券
* @param {String} couponId			优惠券ID	
*/
export const RECEIVECOUPON = '/couponInfo/receiveCoupon'


