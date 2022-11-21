import {Platform} from 'react-native';
export const BASE_URL = 'http://194.163.131.163/ecommerce/api/';
export const IMAGE_BASE_URL = 'http://194.163.131.163/ecommerce/';
export const PRODUCT_DES_URL =
  'http://194.163.131.163/ecommerce/productDescription/';
export const PRODUCTS_URL = 'http://194.163.131.163/ecommerce/product-detail/';
export const BLOG_URL = 'http://194.163.131.163/ecommerce/blogDetails/';
export const FAQ_URL = 'http://194.163.131.163/ecommerce/faqDescription/';

export const GOOGLE_LOGINKEY =
  Platform.OS == 'android'
    ? '262237353427-k2r47mqmknqb38545a2097rrbkoh3ugc.apps.googleusercontent.com'
    : '262237353427-gu7nc60bn3bkuuse0ie9anm8lcr1kh9o.apps.googleusercontent.com';

export const FBAppId = '1136747710549519';

export const GET_HOME = BASE_URL + 'homePage';
export const GET_ALL_CATEGORY = BASE_URL + 'allCategory?popular=';
export const POST_PRODUCT = BASE_URL + 'shopPage';
export const GET_ALL_BRANDS = BASE_URL + 'allBrands';
export const GET_PRODUCT_DETAILS = BASE_URL + 'productDetail?';
export const GET_TERMS_CONDITIONS = BASE_URL + 'termAndCondition';
export const GET_PRIVACY_POLICY = BASE_URL + 'privacyPolicy';
export const POST_SIGNUP = BASE_URL + 'signUp';
export const POST_SIGNIN = BASE_URL + 'signIn';
export const POST_PROCESS_SIGNUP = BASE_URL + 'processSignup';
export const ADD_WISHLIST = BASE_URL + 'addWishlist';
export const VIEW_WISHLIST = BASE_URL + 'viewWishlist?customers_id=';
export const FAQ = BASE_URL + 'faq';
export const NOTIFICATION_LIST = BASE_URL + 'notificationList?customers_id=';
export const ADD_TO_CART = BASE_URL + 'addToCart';
export const VIEW_CART = BASE_URL + 'viewCart?';
export const DELETE_CART_ITEM = BASE_URL + 'deleteCartItem?id=';
export const UPDATE_CART_QUANTITY = BASE_URL + 'updateCartQuantity';
export const MY_ADDRESS = BASE_URL + 'myAddress';
export const ADD_MY_ADDRESS = BASE_URL + 'addMyAddress';
export const UPDATE_SHIPPING_ADDRESS = BASE_URL + 'updateMyAddress';
export const DELETE_SHIPPING_ADDRESS =
  BASE_URL + 'deleteAddress?address_book_id=';
export const UPDATE_ACCOUNT = BASE_URL + 'accountUpdate';
export const MY_ORDERS = BASE_URL + 'myOrders';
export const CANCLE_ORDER = BASE_URL + 'orderCancle';
export const MY_PURCHASED = BASE_URL + 'myPurchased';
export const SUBMIT_RATTINGS = BASE_URL + 'submitRaitings';
export const RETURN_PRODUCT = BASE_URL + 'returnProcuct';
export const REWARDS = BASE_URL + 'myLoyaltyPoint';
export const TESTIMOIALS = BASE_URL + 'testimonials';
export const CONTACT_US = BASE_URL + 'contactUs';
export const CONTACT_US_REQUEST = BASE_URL + 'contactUsMessage';
export const UPLOAD_PRODUCTS_IMAGES = BASE_URL + 'customerProductImages';
export const GET_ATTRIBUTE_PRICE_ID = BASE_URL + 'getAttributePriceId';

export const FORGET_PASSWORD = BASE_URL + 'forgetPassword';
export const FORGET_PASSWORD_OTP_CHECK = BASE_URL + 'passwordOtpCheck';
export const RESEND_OTP = BASE_URL + 'resendOtp';
export const UPDATE_NEW_PASSWORD = BASE_URL + 'updateNewPassword';
export const CHANGE_PHONE = BASE_URL + 'changePhone?user_id=';
export const CHANGE_EMAIL = BASE_URL + 'changeEmail?user_id=7';
export const UPDATE_PHONE_EMAIL = BASE_URL + 'updatePhoneEmail';
export const SEARCH_SUGGESSION = BASE_URL + 'searchSuggession?searchChar=';
export const POST_SOCIAL_LOGIN = BASE_URL + 'socialLogin';
export const POST_SOCIAL_OTP = BASE_URL + 'socialOtp';
export const POST_PROCESS_SOCIAL_LOGIN = BASE_URL + 'processSocialLogin';
export const GET_PAYMENT_METHODS = BASE_URL + 'getPaymentMethods';
export const ADD_ORDER = BASE_URL + 'add_order';
export const CHECK_PINCODE = BASE_URL + 'pincodeCheck?pincode=';
export const APPLY_COUPON = BASE_URL + 'apply_coupon';
export const NOTIFY_PRODUCT = BASE_URL + 'notifyProduct';
export const BLOGS = BASE_URL + 'getBlogs';
export const BLOG_DETAILS = BASE_URL + 'getBlogDetails?blog_id=';
export const PLAY_STORE = BASE_URL + 'playstore';
