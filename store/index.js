export const state = () => ({
  departureName: '',
  departureValue: '',
  arrivalName: '',
  arrivalValue: '',
  oneWayOrNot: false,
  departDate: '',
  departTime: '',
  backDepartDate: '',
  backDepartTime: '',
  trainInfo: [],
  backTrainInfo: [],
  ticketInfo: {},
  selectedTrain: {},
  selectedBackTrain: {},
} );

export const getters = {
  departureName: state => state.departureName,
  departureValue: state => state.departureValue,
  arrivalName: state => state.arrivalName,
  arrivalValue: state => state.arrivalValue,
  oneWayOrNot: state => state.oneWayOrNot,
  departDate: state => state.departDate,
  departTime: state => state.departTime,
  backDepartDate: state => state.backDepartDate,
  backDepartTime: state => state.backDepartTime,
  trainInfo: state => state.trainInfo,
  ticketInfo: state => state.ticketInfo,
  backTrainInfo: state => state.backTrainInfo,
  selectedTrain: state => state.selectedTrain,
  selectedBackTrain: state => state.selectedBackTrain,
};

export const mutations = {
  insertData( state, value ) {
    state.departureName = value.departure.name;
    state.departureValue = value.departure.value;
    state.arrivalName = value.arrival.name;
    state.arrivalValue = value.arrival.value;
    state.oneWayOrNot = value.oneWayOrNot;
    state.departDate = value.departDate;
    state.departTime = value.departTime;
    state.backDepartDate = value.backDepartDate;
    state.backDepartTime = value.backDepartTime;
  },
  chooseTrain( state, value ) {
    state.selectedTrain = value;
  },
  chooseBackTrain( state, value ) {
    state.selectedBackTrain = value;
  },
  insertTrainInfo( state, value ) {
    state.trainInfo = value;
  },
  insertTicketInfo( state, value ) {
    state.ticketInfo = value;
  },
  insertBackTrainInfo( state, value ) {
    state.backTrainInfo = value;
  },
};

export const actions = {

};
