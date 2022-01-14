export default {
  data: {
    password: 'Password',
    passwordErr: 'Password ERROR',
    standard: 'Standard',
    business: 'Business',
    oneWay: 'One Way',
    roundTrip: 'Round Trip',
    station0: 'Select',
    station1: 'Nangang',
    station2: 'Taipei',
    station3: 'Banqiao',
    station4: 'Taoyuan',
    station5: 'Hsinchu',
    station6: 'Miaoli',
    station7: 'Taichung',
    station8: 'Chnghua',
    station9: 'Yunlin',
    station10: 'Chiayi',
    station11: 'Tainan',
    station12: 'Zuoying',
    alertSeat: 'Please Reduce The Selected Seats First',
    alertWholeMes: 'Please input the whole information',
    alertBackMes: 'Please input the return train infomation',
    alertCheckSeat: 'Please check your ticket and seats',
    selectTick: 'Select tickets',
    alertNoMes: 'Cannot find Info',
    alertNoCarMes: 'This train has not been booked yet',
    alertInsert: 'Please input your name and phone',
    alertAgain: 'Please input your ID again',
    alertIDErr: 'ID ERROR',
    confirmCancel: 'Are you sure of the cancel?',
    confirmBackCancel: 'Are you sure about the cancel?',
    alertGoCancel: 'Success',
    alertBackCancel: 'Success',
    alertTicks: 'Selected Seats is different with the Tickets',
    confirmChange: 'Are you sure about the change?',
    success: 'Success',
    bookSuccess: 'Success',
    searchSuccess: 'Success',
    goBook: 'If you want to booking, please go to the Booking System',
    bookAgain: 'Book faild, please try again',
    selectSeats: 'Select seats',
    full: 'This train had no more seat for free',
  },
  index: {
    title: 'High-speed rail timetable and fare query',
    search: 'INQUIRE',
    bookSearch: 'checkOrder',
    manage: 'Manage',
    departure: 'Departure',
    arrival: 'Arrival',
    goDate: 'Outbound Date',
    goTime: 'Outbound Time',
    backDate: 'Return Date',
    backTime: 'Return Time',
  },
  trainInfo: {
    title: 'Please select a train',
    trainNo: 'Train No',
    departTime: 'Depart Time',
    arriveTime: 'Arrive Time',
    movingTime: 'Duration',
    book: 'gobook',
    bookSearch: 'checkOrder',
    priceTable: 'Ticket Fare',
    adult: 'ADULT',
    kidLoveOlder: 'KID / LOVE / OLDER',
    group: 'GROUP',
    standard: 'Standrd Carriage',
    business: 'Business Carriage',
    free: 'Free Seat Carriage',
  },
  booking: {
    title: 'Please select a train',
    id: 'Your ID',
    idRule0: 'Your ID',
    idRule1: 'ID Length ERROR',
    idRule2: 'Format ERROR',
    phone: 'Phone',
    phoneRule0: 'Your Phone Number',
    phoneRule1: 'Cell Phone Please',
    station: 'Station',
    departure: 'Departure',
    arrival: 'Arrival',
    carType: 'Type',
    standard: 'Standrad',
    business: 'Business',
    time: 'Time',
    goDate: 'Outbound Date',
    trainNo: 'Train No',
    backDate: 'Return Date',
    ticket: 'Ticket',
    price: 'Price',
    seatChoice: 'Please choose a seat',
    freeSeat: 'Free',
    selectSeat: 'Selected',
    tokenSeat: 'Token',
    carDirect: 'Train Head',
    carriageNo: 'Carriage No :',
    select: 'Confirm Seat',
    reset: 'Reset',
    goSeat: 'Outbound Seat',
    backSeat: 'Return Seat',
    selectGoSeat: 'Select Outbound Seat',
    selectBackSeat: 'Select Return Seat',
    seatArray: 'Seats Array refer to your order',
    adultTick: 'ADULT ',
    kidTick: 'KID ',
    kidTickL: 'KID(6~11 Yeards old) ',
    loveTick: 'LOVE ',
    olderTick: 'ELDER ',
    olderTickL: 'ELDER(UPON 65 Yeards old) ',
    studentTick: 'STUDENT ',
    studentTickL: 'STUDENT ',
    book: 'BOOK',
    index: 'HOME',
    bookSearch: 'checkOrder',
  },
  showInfo: {
    check: 'Please check the information',
    check2: 'Please check the information',
    start: 'Departure',
    end: 'Arrival',
    carType: 'Carriage Type',
    goTime: 'Outbound Time',
    backTime: 'Return Time',
    adult: 'Adult',
    kid: 'Kid',
    love: 'Love',
    older: 'Elder',
    student: 'Student',
    seatInfo: 'Selected Seats',
    price: 'Fare',
  },
  bookingInfo: {
    title: 'Order Inquiry System',
    userId: 'ID',
    phone: 'Phone',
    search: 'Search',
    searchAll: 'History',
    index: 'HOME',
    update: 'Update',
    showList: 'Show List',
    trainInfo: 'Train Info',
    price: 'Price ',
    goInfo: 'Outbound',
    change: 'Change',
    cancel: 'Cancel',
    quit: 'Quit',
    date: 'Date',
    trainNo: 'Train No',
    departure: 'Departure',
    arrival: 'Arrvial',
    drivingTime: 'Travel Time',
    carType: 'Type',
    standard: 'Standard',
    business: 'Business',
    ticket: 'Ticket',
    adultTick: 'ADULT ',
    kidTick: 'KID ',
    kidTickL: 'KID(6~11 Yeards old) ',
    loveTick: 'LOVE ',
    olderTick: 'ELDER ',
    olderTickL: 'ELDER(Upon 65) ',
    studentTick: 'STUDENT ',
    seatInfo: 'Seat No',
    adult: 'ADULT : ',
    kid: 'KID : ',
    love: 'LOVE : ',
    older: 'ELDER : ',
    student: 'STUDENT : ',
    total: 'Price',
    backInfo: 'Return',
    pic: ' tickets',
  },
  manage: {
    title: 'Manage System',
    userId: 'ID',
    userPhone: 'Phone',
    search: 'Search',
    allUsers: 'All Users',
    leftSeats: 'Check Train',
    index: 'HOME',
    list: 'Show List',
    trainInfo: 'Train Info',
    price: 'Price ',
    priceTable: 'Ticket Fare',
    between: 'Price should between 0 ~ 2500',
    adult: 'ADULT',
    kid: 'KID',
    kidL: 'KID(6~11 Yeards old) ',
    love: 'LOVE',
    older: 'ELDER',
    olderL: 'ELDER(Upon 65) ',
    student: 'STUDENT',
    studentL: 'STUDENT',
    standard: 'Standard Carriage',
    business: 'Business Carriage',
    free: 'Free Carriage',
    reset: 'Reset Fare',
    goInfo: 'Outbound',
    change: 'Change',
    cancel: 'Cancel',
    update: 'Update',
    quit: 'Quit',
    date: 'Date',
    trainNo: 'Train No',
    departure: 'Departure',
    arrival: 'Arrival',
    drivingTime: 'Travel Time',
    carType: 'Type',
    ticket: 'Tickets',
    seatInfo: 'Seats No',
    total: 'Price',
    backInfo: 'Return',
    seatChoice: 'Please select your seats',
    freeSeat: 'Free',
    selectSeat: 'Selected',
    tokenSeat: 'Token',
    carDirect: 'Train Direct',
    carriageNo: 'Carriage :',
    select: 'Confirm Seats',
    goSeat: 'Outbound seat',
    backSeat: 'Return Seat',
    selectedSeats: 'Selected Seats',
    rebuildSeats: 'Refresh',
    selectGoSeat: 'Select Outbound Seat',
    selectBackSeat: 'Select Return Seat',
    pic: ' Tickets',
  },
  checkoutCars: {
    title: 'Manage System',
    date: 'Date',
    trainNo: ' Train No',
    search: 'Search',
    manage: 'Manage',
    index: 'HOME',
    table: 'Seats Table',
    free: 'Free',
    select: 'Selected',
    token: 'Token',
    carriageNo: 'Carriage No',
    seatNo: 'Seat No',
    station1: 'Nangang',
    station2: 'Taipei',
    station3: 'Banqiao',
    station4: 'Taoyuan',
    station5: 'Hsinchu',
    station6: 'Miaoli',
    station7: 'Taichung',
    station8: 'Chnghua',
    station9: 'Yunlin',
    station10: 'Chiayi',
    station11: 'Tainan',
    station12: 'Zuoying',
    ID: 'ID',
    type: 'Ticket Type',
    seatList: 'Booked Seats',
    system: 'Book System',
    seatFirst: 'Please select the seats first',
    warnMes: 'You can choose more than one seat if is free',
    seatOK: 'Booking panel',
    closeSys: 'Close System',
    openSys: 'Book',
    seat: 'Seats',
    update: 'Update',
    closePanel: 'Close',
    alertSeat: 'Please select the seats first',
    needData: 'Please leave all needed information',
    tickErr: 'Ticket is different with Seats',
    noStop: 'This train will not stop seleced departure or arrival',
    sure: 'Sure?',
    include: 'Selected station include the booked station',
    directERR: 'Selected train direction ERROR',
  },
};
