// import axios from 'axios';
// import { GetAuthorizationHeader } from '~/assets/Authorization.js';

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
  orginFares: {},
  selectedTrain: {},
  selectedBackTrain: {},
} );

export const mutations = {
  // clearBackMes ( state ) {
  // 	state.backTrainInfo = [];
  // },
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
  insertOriginFares( state, value ) {
    state.orginFares = value;
  },
};

export const actions = {

};
