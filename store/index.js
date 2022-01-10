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
	selectedTrain: {},
	selectedBackTrain: {},
})
  
export const mutations = {
	// clearBackMes ( state ) {
	// 	state.backTrainInfo = [];
	// },
	insertData ( state , value ) {
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
	chooseTrain ( state , value ) {
		state.selectedTrain = value;
		console.log(value);
	},
	chooseBackTrain ( state , value ) {
		state.selectedBackTrain = value;
	},
	insertTrainInfo ( state , value ) {
		state.trainInfo = value;
	},
	insertTicketInfo ( state , value ) {
		state.ticketInfo = value;
	},
	insertBackTrainInfo( state ,value ) {
		state.backTrainInfo = value;
	}
	// sendMes ( state , response ) {
	// 	state.trainInfo = response.data;
	// 	console.log(state.trainInfo);
	// },
	// infoFilter ( state ) {
	// 	if ( state.departTime != "" ) {
	// 		const input = state.departTime;
	// 		const value = state.trainInfo;
	// 		let result = [];
	// 		let selectedTime = input.split(":");
	// 		for ( let i = 0 ; i < value.length ; i++ ) {
	// 			let item = value[i];
	// 			let time = item.OriginStopTime.DepartureTime;
	// 			let startTime = time.split(":");
	// 			if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
	// 					result.push(item);
	// 			}
	// 		}
	// 		if ( result.length > 5 ) {
	// 			result.length = 5;
	// 		}
	// 		state.trainInfo = result;
	// 	}
	// },
	// timeFilter ( state ) {
	// 	const info = state.trainInfo;
	// 	for ( let i = 0 ; i <info.length ; i++ ) {
	// 		let item = info[i];
	// 		let trainDate = item.TrainDate;
	// 		let date = trainDate.split("-");
	// 		let depart = item.OriginStopTime.DepartureTime;
	// 		let departTime = depart.split(":");
	// 		let arrival = item.DestinationStopTime.ArrivalTime;
	// 		let arrivalTime = arrival.split(":");
	// 		let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
	// 		let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
	// 		let time = time2 - time1;
	// 		let countHr = time * 0.000000278;
	// 		let hr = "";
	// 		let min = "";
	// 		if ( countHr >= 1 ) {
	// 			hr = Math.floor(countHr);
	// 			let countMin = (countHr - hr) * 60
	// 			if ( countMin >= 1 ) {
	// 				min = Math.round(countMin);
	// 			} else {
	// 				min = "0";
	// 			}
	// 		} else {
	// 			hr = "0";
	// 			let countMin = countHr * 60;
	// 			min = Math.round(countMin);
	// 		}
	// 		let timming = `${hr}小時:${min}分`;
	// 		let obj = state.trainInfo[i]
	// 		let add = { movingTime : timming }
	// 		let Time = `${depart}~${arrival}`;
	// 		let add2 = { startEndTime : Time }
	// 		state.trainInfo[i] = Object.assign( {} , obj , add , add2 )
	// 	}
	// },
	// getSeatMes ( state , response ) {
	// 	const standardSeat = response.data.AvailableSeats[0].StandardSeatStatus;
	// 	const businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus;
	// 	for ( let i = 0 ; i < state.trainInfo.length ; i++ ) {
	// 		if ( state.trainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo ) {
	// 			let obj = state.trainInfo[i];
	// 			let add = { BusinessSeatStatus : businessSeat };
	// 			let add2 = { StandardSeatStatus : standardSeat };
	// 			let add3 = { SeatStatus : `標準席:${standardSeat};商業席:${businessSeat}` };
	// 			state.trainInfo[i] = Object.assign( {} , obj , add ,add2 , add3 )
	// 		}
	// 	}
	// },
	// sendBackMes ( state , response ) {
	// 	state.backTrainInfo = response.data;
	// },
	// backInfoFilter ( state ) {
	// 	if ( state.backDepartTime != "" ) {
	// 		const input = state.backDepartTime;
	// 		const value = state.backTrainInfo;
	// 		let result = [];
	// 		let selectedTime = input.split(":");
	// 		for ( let i = 0 ; i < value.length ; i++ ) {
	// 			let item = value[i];
	// 			let time = item.OriginStopTime.DepartureTime;
	// 			let startTime = time.split(":");
	// 			if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
	// 					result.push(item);
	// 			}
	// 		}
	// 		if ( result.length > 5 ) {
	// 			result.length = 5;
	// 		}
	// 		state.backTrainInfo = result;
	// 	}
	// },
	// backTimeFilter ( state ) {
	// 	const info = state.backTrainInfo;
	// 	for ( let i = 0 ; i <info.length ; i++ ) {
	// 		let item = info[i];
	// 		let trainDate = item.TrainDate;
	// 		let date = trainDate.split("-");
	// 		let depart = item.OriginStopTime.DepartureTime;
	// 		let departTime = depart.split(":");
	// 		let arrival = item.DestinationStopTime.ArrivalTime;
	// 		let arrivalTime = arrival.split(":");
	// 		let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
	// 		let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
	// 		let time = time2 - time1;
	// 		let countHr = time * 0.000000278;
	// 		let hr = "";
	// 		let min = "";
	// 		if ( countHr >= 1 ) {
	// 			hr = Math.floor(countHr);
	// 			let countMin = (countHr - hr) * 60;
	// 			if ( countMin >= 1 ) {
	// 				min = Math.round(countMin);
	// 			} else{
	// 				min = "0";
	// 			}
	// 		} else {
	// 			hr = "0";
	// 			let countMin = countHr * 60;
	// 			min = Math.round(countMin);
	// 		}
	// 		let timming = `${hr}小時:${min}分`;
	// 		let obj = state.backTrainInfo[i];
	// 		let add = { movingTime : timming };
	// 		let Time = `${depart}~${arrival}`;
	// 		let add2 = { startEndTime : Time }
	// 		state.backTrainInfo[i] = Object.assign( {} , obj , add , add2 )
	// 	}
	// },
	// getBackSeatMes ( state, response ) {
	// 	const standardSeat = response.data.AvailableSeats[0].StandardSeatStatus;
	// 	const businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus;
	// 	for ( let i = 0 ; i < state.backTrainInfo.length ; i++ ) {
	// 		if (state.backTrainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo ) {
	// 			let obj = state.backTrainInfo[i];
	// 			let add = { BusinessSeatStatus : businessSeat };
	// 			let add2 = { StandardSeatStatus : standardSeat };
	// 			let add3 = { SeatStatus : `標準席:${standardSeat};商業席:${businessSeat}` };
	// 			state.backTrainInfo[i] = Object.assign( {} , obj , add ,add2 , add3 )
	// 		}
	// 	}
	// },
	// getTicketInfo ( state , response ) {
	// 	let infos = [];
	// 	for ( let i = 0 ; i < response.data[0].Fares.length ; i++ ) {
	// 		let info = response.data[0].Fares[i].Price;
	// 		infos.push(info);
	// 	}

	// 	infos.sort( function( a, b) {
	// 		return a - b;
	// 	});
	// 	state.ticketInfo.freeKid = infos[0];
	// 	state.ticketInfo.standardKid = infos[1];
	// 	state.ticketInfo.standardGroup = infos[2];
	// 	state.ticketInfo.freeAdult = infos[3];
	// 	state.ticketInfo.standardAdult = infos[4];
	// 	state.ticketInfo.bussinessKid = infos[5];
	// 	state.ticketInfo.bussinessGroup = infos[6];
	// 	state.ticketInfo.bussinessAdult = infos[7];
	// },
}

export const actions = {
	// async sendMes ( {state , commit } ) {
	// 	const startStation = state.departureValue;
	// 	const endStation = state.arrivalValue;
	// 	const date = state.departDate;
	// 	let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
	// 	if ( startStation && endStation && date && state.departTime ) {
	// 		await axios.get(
	// 			url,
	// 			{ headers: GetAuthorizationHeader () }
	// 			)
	// 			.then( ( response ) => {
	// 				commit( 'sendMes' , response );
	// 				commit( 'infoFilter' );
	// 				commit( 'timeFilter' );
	// 		})
	// 	}
	// },
	// async getSeatMes ( { state , commit } ) {
	// 	const startStation = state.departureValue;
	// 	const endStation = state.arrivalValue;
	// 	const date = state.departDate;
	// 	for (let i = 0 ; i < state.trainInfo.length ; i++ ) {
	// 		let trainNo = state.trainInfo[i].DailyTrainInfo.TrainNo;
	// 		let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
	// 		await axios.get(
	// 			url,
	// 			{ headers: GetAuthorizationHeader () }
	// 		)
	// 		.then((response) =>{
	// 			commit( 'getSeatMes' , response );
	// 		})
	// 		.catch( () => {
	// 			console.log("查無此區間資料");
	// 		})
	// 	}
	// },
	// async getTicketInfo ( { state , commit } ) {
	// 	const startStation = state.departureValue;
	// 	const endStation = state.arrivalValue;
	// 	let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
	// 	if ( startStation != "" && endStation != "" ) {
	// 		await axios.get(
	// 			url,
	// 			{ headers: GetAuthorizationHeader() }
	// 		)
	// 		.then( ( response ) =>{
	// 			commit( 'getTicketInfo' , response );
	// 		})         
	// 	}
	// },
	// async sendBackMes ( { state , commit } ) {
	// 	const startStation = state.arrivalValue;
	// 	const endStation = state.departureValue;
	// 	const date = state.backDepartDate;
	// 	let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
	// 	if ( startStation && endStation && date && state.backDepartTime ) {
	// 		await axios.get(
	// 			url,
	// 			{ headers: GetAuthorizationHeader () }
	// 			)
	// 			.then( ( response ) => {
	// 			commit( 'sendBackMes', response );
	// 			commit('backInfoFilter' );
	// 			commit('backTimeFilter' );
	// 		})
	// 	}
	// },
	// async getBackSeatMes ( { state , commit } ) {
	// 	const startStation = state.arrivalValue;
	// 	const endStation = state.departureValue;
	// 	const date = state.backDepartDate;
	// 	for ( let i = 0 ; i < state.backTrainInfo.length ; i++ ) {
	// 		let trainNo = state.backTrainInfo[i].DailyTrainInfo.TrainNo;
	// 		let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
	// 		await axios.get(
	// 			url,
	// 			{ headers: GetAuthorizationHeader () }
	// 		)
	// 		.then( ( response ) =>{
	// 			commit( 'getBackSeatMes', response );
	// 		})
	// 		.catch( () =>{
	// 			console.log( "查無此區間資料" );
	// 		})
	// 	}
	// },
	// async oneWaySearching ( { commit , dispatch } ) {
	// 	try {
	// 		await commit( 'clearBackMes' );
	// 		let sendMes = await dispatch( 'sendMes' );
	// 		let getSeatMes = await dispatch( 'getSeatMes' );
	// 		let getTicketInfo = await dispatch( 'getTicketInfo' );
	// 		await Promise.all( [sendMes, getSeatMes, getTicketInfo] );
	// 	}
	// 	catch (err) {
	// 		console.log( 'catch' , err );
	// 	}
	// },
	// async searching ( { dispatch } ) {
	// 	try {
	// 		let sendMes = await dispatch( 'sendMes' );
	// 		let getSeatMes = await dispatch( 'getSeatMes' );
	// 		let getTicketInfo = await dispatch( 'getTicketInfo' );
	// 		let sendBackMes = await dispatch( 'sendBackMes' );
	// 		let getBackSeatMes = await dispatch( 'getBackSeatMes' );
	// 		await Promise.all( [ sendMes , getSeatMes , getTicketInfo , sendBackMes , getBackSeatMes ] );
	// 	}
	// 	catch (err) {
	// 		console.log( 'catch' , err );
	// 	}
	// },
}