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
          data: {
            oneWay: "單程",
            roundTrip: "來回程",
            station0: "請選擇",
            station1: "南港" ,
            station2: "台北" ,
            station3: "板橋" ,
            station4: "桃園" ,
            station5: "新竹" ,
            station6: "苗栗" ,
            station7: "台中" ,
            station8: "彰化" ,
            station9: "雲林" ,
            station10: "嘉義" ,
            station11: "台南" ,
            station12: "左營" ,
          },
          index: {
            title: "高鐵時刻表與票價查詢" ,
            search: "查詢" ,
            bookSearch: "訂單查詢" ,
            manage: "管理系統" ,
            departure: "起程站" ,
            arrival: "到達站" ,
            goDate: "去程日期" ,
            goTime: "去程時間" ,
            backDate: "回程日期" ,
            backTime: "回程時間" ,
          },
          trainInfo: {
            title: "請選擇列車" ,
            trainNo: '列車編號',
            departTime: '出發時間',
            arriveTime: '抵達時間',
            movingTime: '行車時間',
            book: "進入訂票頁面" ,
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
            id: "訂票人身分證字號" ,
            idRule0: '請輸入ID',
            idRule1: '身分證長度有誤',
            idRule2: '格式不正確',
            phone: "手機號碼" ,
            phoneRule0: '請輸入電話',
            phoneRule1: '請輸入完整手機號碼',
            station: "起訖站" ,
            departure: "起程站" ,
            arrival: "到達站" ,
            carType: "車廂種類" ,
            standard: "標準車廂" ,
            business: "商務車廂" ,
            time: "時間" ,
            goDate: "去程日期" ,
            trainNo: "車次號碼" ,
            backDate: "回程日期" ,
            ticket: "票數" ,
            price: "總價" ,
            seatChoice: "請選擇座位" ,
            freeSeat: "可選擇" ,
            selectSeat: "已選擇" ,
            tokenSeat: "已預定" ,
            carDirect: "列車車頭" ,
            carriageNo: "車廂 :" ,
            select: "確認座位" ,
            reset: "重選" ,
            goSeat: "去乘座位" ,
            backSeat: "回乘座位" ,
            selectGoSeat: "選擇去乘座位" ,
            selectBackSeat: "選擇回乘座位" ,
            seatArray: '座位依照所選順序排列',
            adultTick: "全票 " ,
            kidTick: "孩童票 " ,
            kidTickL: "孩童票(6~11歲) " ,
            loveTick: "愛心票 " ,
            olderTick: "敬老票 " ,
            olderTickL: "敬老票(65歲以上) " ,
            studentTick: "學生票 " ,
            studentTickL: "大學生優惠票 " ,
            book: "訂票" ,
            index: "查詢首頁" ,
            bookSearch: "訂單查詢"
          },
          bookingInfo: {
            title: "訂票查詢系統" ,
            userId: "訂票人身分證字號",
            phone: "訂票人電話",
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
            arrival: "訖站" ,
            drivingTime: "行駛時間" ,
            carType: "車廂種類" ,
            standard: "標準車廂" ,
            business: "商務車廂" ,
            ticket: "票數" ,
            adultTick: "全票 " ,
            kidTick: "孩童票 " ,
            kidTickL: "孩童票(6-11歲) " ,
            loveTick: "愛心票 " ,
            olderTick: "敬老票 " ,
            olderTickL: "敬老票(65歲以上) " ,
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
          manage:{
            title: "後台管理系統",
            userId: "訂票人身分證字號",
            phone: "訂票人電話",
            search: "查詢" ,
            allUsers: "所有訂票人" ,
            leftSeats: "查列車餘位" ,
            index: "查詢首頁" ,
            phone: "電話" ,
            list: "顯示列表" ,
            trainInfo: "乘車資訊" ,
            price: "票價" ,
            priceTable: "票價表" ,
            between: "票價需介於0 ~ 2500" ,
            adult: "全票" ,
            kid: "孩童票" ,
            kidL: "孩童票(6-11歲) " ,
            love: "愛心票" ,
            older: "敬老票" ,
            olderL: "敬老票(65歲以上) " ,
            student: "學生票" ,
            studentL: "大學生優惠票" ,
            standard: "標準車廂" ,
            business: "商務車廂" ,
            free: "自由座車廂" ,
            reset: "重設" ,
            goInfo: "去程資料" ,
            change: "變更票數" ,
            cancel: "取消變更" ,
            update: "確認變更" ,
            quit: "取消訂票" ,
            date: "日期" ,
            trainNo: "列車編號" ,
            departure: "起站" ,
            arrival: "訖站" ,
            drivingTime: "行駛時間" ,
            carType: "車廂種類" ,
            ticket: "票數" ,
            seatInfo: "座位資訊" ,
            total: "總價" ,
            backInfo: "回程資訊" ,
            seatChoice: "請選擇座位" ,
            freeSeat: "可選擇" ,
            selectSeat: "已選擇" ,
            tokenSeat: "已預定" ,
            carDirect: "列車車頭" ,
            carriageNo: "車廂 :" ,
            select: "確認座位" ,
            goSeat: "去乘座位" ,
            backSeat: "回乘座位" ,
            selectedSeats: "更新後座位" ,
            selectGoSeat: "選擇去乘座位" ,
            selectBackSeat: "選擇回乘座位" ,
            pic: " 張"
          },
          checkoutCars: {
            title: "後台管理系統" ,
            date: "日期" ,
            trainNo: "列車編號" ,
            search: "查詢" ,
            manage: "訂單管理" ,
            index: "查詢首頁" ,
            table: "剩餘座位數" ,
            free: "可選擇" ,
            select: "已選擇" ,
            token: "已預定" ,
            carriageNo: "車廂" ,
            seatNo: "座位" ,
            station1: "南港" ,
            station2: "台北" ,
            station3: "板橋" ,
            station4: "桃園" ,
            station5: "新竹" ,
            station6: "苗栗" ,
            station7: "台中" ,
            station8: "彰化" ,
            station9: "雲林" ,
            station10: "嘉義" ,
            station11: "台南" ,
            station12: "左營" ,
          },
        },
        en: {
          data: {
            oneWay: "One Way",
            roundTrip: "Round Trip",
            station0: "Select",
            station1: "Nangang" ,
            station2: "Taipei" ,
            station3: "Banqiao" ,
            station4: "Taoyuan" ,
            station5: "Hsinchu" ,
            station6: "Miaoli" ,
            station7: "Taichung" ,
            station8: "Chnghua" ,
            station9: "Yunlin" ,
            station10: "Chiayi" ,
            station11: "Tainan" ,
            station12: "Zuoying" ,
          },
          index: {
            title: "High-speed rail timetable and fare query" ,
            search: "INQUIRE" ,
            bookSearch: "checkOrder" ,
            manage: "Manage" ,
            departure: "Departure" ,
            arrival: "Arrival" ,
            goDate: "Outbound Date" ,
            goTime: "Outbound Time" ,
            backDate: "Return Date" ,
            backTime: "Return Time" ,
          },
          trainInfo: {
            title: "Please select a train" ,
            trainNo: 'Train No',
            departTime: 'Depart Time',
            arriveTime: 'Arrive Time',
            movingTime: 'Duration',
            book: "gobook" ,
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
            id: "Your ID" ,
            idRule0: 'Your ID',
            idRule1: 'ID Length ERROR',
            idRule2: 'Format ERROR',
            phone: "Phone" ,
            phoneRule0: 'Your Phone Number',
            phoneRule1: 'Cell Phone Please',
            station: "Station" ,
            departure: "Departure" ,
            arrival: "Arrival" ,
            carType: "Type" ,
            standard: "Standrad" ,
            business: "Business" ,
            time: "Time" ,
            goDate: "Outbound Date" ,
            trainNo: "Train No" ,
            backDate: "Return Date" ,
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
            seatArray: 'Seats Array refer to your order',
            adultTick: "ADULT " ,
            kidTick: "KID " ,
            kidTickL: "KID(6~11 Yeards old) " ,
            loveTick: "LOVE " ,
            olderTick: "ELDER " ,
            olderTickL: "ELDER(UPON 65 Yeards old) " ,
            studentTick: "STUDENT " ,
            studentTickL: "STUDENT " ,
            book: "BOOK" ,
            index: "HOME" ,
            bookSearch: "checkOrder"
          },
          bookingInfo: {
            title: "Order Inquiry System" ,
            userId: "ID",
            phone: "Phone",
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
            kidTickL: "KID(6~11 Yeards old) " ,
            loveTick: "LOVE " ,
            olderTick: "ELDER " ,
            olderTickL: "ELDER(Upon 65) " ,
            studentTick: "STUDENT " ,
            seatInfo: "Seat No" ,
            adult: "ADULT : " ,
            kid: "KID : " ,
            love: "LOVE : " ,
            older: "ELDER : " ,
            student: "STUDENT : " ,
            total: "Price" ,
            backInfo: "Return" ,
            pic: " tickets" ,
          },
          manage:{
            title: "Manage System",
            userId: "ID",
            phone: "Phone",
            search: "Search" ,
            allUsers: "All Users" ,
            leftSeats: "Check Train" ,
            index: "HOME" ,
            phone: "Phone" ,
            list: "Show List" ,
            trainInfo: "Train Info" ,
            price: "Price " ,
            priceTable: "Ticket Fare" ,
            between: "Price should between 0 ~ 2500" ,
            adult: "ADULT" ,
            kid: "KID" ,
            kidL: "KID(6~11 Yeards old) " ,
            love: "LOVE" ,
            older: "ELDER" ,
            olderL: "ELDER(Upon 65) " ,
            student: "STUDENT" ,
            studentL: "STUDENT" ,
            standard: "Standard Carriage" ,
            business: "Business Carriage" ,
            free: "Free Carriage" ,
            reset: "Reset Fare" ,
            goInfo: "Outbound" ,
            change: "Change" ,
            cancel: "Cancel" ,
            update: "Update" ,
            quit: "Quit" ,
            date: "Date" ,
            trainNo: "Train No" ,
            departure: "Departure" ,
            arrival: "Arrival" ,
            drivingTime: "Travel Time" ,
            carType: "Type" ,
            ticket: "Tickets" ,
            seatInfo: "Seats No" ,
            total: "Price" ,
            backInfo: "Return" ,
            seatChoice: "Please select your seats" ,
            freeSeat: "Free" ,
            selectSeat: "Selected" ,
            tokenSeat: "Token" ,
            carDirect: "Train Direct" ,
            carriageNo: "Carriage :" ,
            select: "Confirm Seats" ,
            goSeat: "Outbound seat" ,
            backSeat: "Return Seat" ,
            selectedSeats: "Selected Seats" ,
            selectGoSeat: "Select Outbound Seat" ,
            selectBackSeat: "Select Return Seat" ,
            pic: " Tickets"
          },
          checkoutCars: {
            title: "Manage System" ,
            date: "Date" ,
            trainNo: " Train No" ,
            search: "Search" ,
            manage: "Manage" ,
            index: "HOME" ,
            table: "Seats Table" ,
            free: "Free" ,
            select: "Selected" ,
            token: "Token" ,
            carriageNo: "Carriage No" ,
            seatNo: "Seat No" ,
            station1: "Nangang" ,
            station2: "Taipei" ,
            station3: "Banqiao" ,
            station4: "Taoyuan" ,
            station5: "Hsinchu" ,
            station6: "Miaoli" ,
            station7: "Taichung" ,
            station8: "Chnghua" ,
            station9: "Yunlin" ,
            station10: "Chiayi" ,
            station11: "Tainan" ,
            station12: "Zuoying" ,
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
