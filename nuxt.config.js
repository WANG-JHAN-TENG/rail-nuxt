export default {
  target: 'static',
  router: {
    base: '/rail-nuxt/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rail-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      {
        code: "tw" ,
        name: "繁體中文" ,
        iso: "zh-TW" ,
      },
      {
        code: "en" ,
        name: "English" ,
        iso: "en-US" ,
      },
    ],
    defaultLocale: 'tw',
    vueI18n: {
      fallbackLocale: 'tw',
      messages: {
        tw: {
          index: {
            title: "高鐵時刻表與票價查詢" ,
            search: "查詢" ,
            bookSearch: "訂單查詢" ,
            manage: "管理系統"
          },
          trainInfo: {
            title: "請選擇列車" ,
            error: "請選擇車站與時段",
            book: "進入訂票頁面" ,
            back: "返回查詢頁面" ,
            bookSearch: "訂單查詢" ,
            priceTable: "車廂票價參考" ,
            adult: "全票" ,
            kidLoveOlder: "孩童票/敬老票/愛心票" ,
            group: "團體票" ,
            standard: "標準車廂" ,
            business: "商務車廂" ,
            free: "自由座車廂" ,
          },
          booking: {
            title: "請選擇車次" ,
            id: "訂票人ID" ,
            phone: "手機號碼" ,
            station: "起訖站" ,
            carType: "車廂種類" ,
            time: "時間" ,
            ticket: "票數" ,
            price: "總價" ,
            seatChoice: "請選擇座位" ,
            freeSeat: "可選擇" ,
            selectSeat: "已選擇" ,
            tokenSeat: "已預定" ,
            carDirect: "列車車頭" ,
            carriageNo: "車廂 :" ,
            select: "確認座位" ,
            reset: "Reset" ,
            goSeat: "去乘座位" ,
            backSeat: "回乘座位" ,
            selectGoSeat: "選擇去乘座位" ,
            selectBackSeat: "選擇回乘座位" ,
            adultTick: "成人票 :" ,
            kidTick: "孩童票 :" ,
            loveTick: "愛心票 :" ,
            olderTick: "敬老票 :" ,
            studentTick: "學生票 :" ,
            book: "訂票" ,
            index: "查詢首頁" ,
            back: "選擇其他列車" ,
            bookSearch: "訂單查詢"
          },
          bookingInfo: {
            title: "訂票查詢系統" ,
            search: "查詢" ,
            searchAll: "查詢所有紀錄" ,
            index: "查詢首頁" ,
            update: "確認變更" ,
            showList: "顯示列表" ,
            trainInfo: "乘車資訊" ,
            price: "票價 " ,
            goInfo: "去程資料" ,
            change: "變更票數" ,
            cancel: "取消變更" ,
            quit: "取消訂票" ,
            date: "日期" ,
            trainNo: "列車編號" ,
            departure: "起站" ,
            arrvial: "訖站" ,
            drivingTime: "行駛時間" ,
            carType: "車廂種類" ,
            standard: "標準車廂" ,
            business: "商務車廂" ,
            ticket: "票數" ,
            adultTick: "成人票 " ,
            kidTick: "孩童票 " ,
            loveTick: "愛心票 " ,
            olderTick: "敬老票 " ,
            studentTick: "大學生優惠票 " ,
            seatInfo: "座位資訊" ,
            adult: "成人票 : " ,
            kid: "孩童票 : " ,
            love: "愛心票 : " ,
            older: "敬老票 : " ,
            student: "學生票 : " ,
            total: "總價" ,
            backInfo: "回程資料" ,
            pic: " 張" ,
          },
        },
        en: {
          index: {
            title: "High-speed rail timetable and fare query" ,
            search: "INQUIRE" ,
            bookSearch: "checkOrder" ,
            manage: "Manage"
          },
          trainInfo: {
            title: "Please select a train" ,
            error: "Please select the station and time slot" ,
            book: "gobook" ,
            back: "return" ,
            bookSearch: "checkOrder" ,
            priceTable: "Ticket Fare" ,
            adult: "ADULT" ,
            kidLoveOlder: "KID / LOVE / OLDER" ,
            group: "GROUP" ,
            standard: "Standrd Carriage" ,
            business: "Business Carriage" ,
            free: "Free Seat Carriage" ,
          },
          booking: {
            title: "Please select a train" ,
            id: "ID" ,
            phone: "Phone" ,
            station: "Station" ,
            carType: "Type" ,
            time: "Time" ,
            ticket: "Ticket" ,
            price: "Price" ,
            seatChoice: "Please choose a seat" ,
            freeSeat: "Free" ,
            selectSeat: "Selected" ,
            tokenSeat: "Token" ,
            carDirect: "Train Head" ,
            carriageNo: "Carriage No :" ,
            select: "Confirm Seat" ,
            reset: "Reset" ,
            goSeat: "Outbound Seat" ,
            backSeat: "Return Seat" ,
            selectGoSeat: "Select Outbound Seat" ,
            selectBackSeat: "Select Return Seat" ,
            adultTick: "ADULT :" ,
            kidTick: "KID :" ,
            loveTick: "LOVE :" ,
            olderTick: "ELDER :" ,
            studentTick: "STUDENT :" ,
            book: "BOOK" ,
            index: "HOME" ,
            back: "RETURN" ,
            bookSearch: "checkOrder"
          },
          bookingInfo: {
            title: "Order Inquiry System" ,
            search: "Search" ,
            searchAll: "History" ,
            index: "HOME" ,
            update: "Update" ,
            showList: "Show List" ,
            trainInfo: "Train Info" ,
            price: "Price " ,
            goInfo: "Outbound" ,
            change: "Change" ,
            cancel: "Cancel" ,
            quit: "Quit" ,
            date: "Date" ,
            trainNo: "Train No" ,
            departure: "Departure" ,
            arrival: "Arrvial" ,
            drivingTime: "Travel Time" ,
            carType: "Type" ,
            standard: "Standard" ,
            business: "Business" ,
            ticket: "Ticket" ,
            adultTick: "ADULT " ,
            kidTick: "KID " ,
            loveTick: "LOVE " ,
            olderTick: "ELDER " ,
            studentTick: "STUDENT " ,
            seatInfo: "SEAT" ,
            adult: "ADULT : " ,
            kid: "KID : " ,
            love: "LOVE : " ,
            older: "ELDER : " ,
            student: "STUDENT : " ,
            total: "Price" ,
            backInfo: "Return" ,
            pic: " tickets" ,
          },
        },
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
