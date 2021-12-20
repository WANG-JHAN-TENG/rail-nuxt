import axios from 'axios';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';

export const state = () => ({
	departureName: "請選擇",
	departureValue: "",
	arrivalName: "請選擇",
	arrivalValue: "",
	oneWayOrNot: "false",
	departDate: "",
	departTime: "",
	backDepartDate: "",
	backDepartTime: "",
	trainInfo: [],
	backTrainInfo: [],
	ticketInfo: {},
	selectedTrain: [],
	selectedBackTrain: [],
})
  
export const mutations = {
	clearBackMes ( state ) {
		state.backTrainInfo = [];
	},
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
	},
	chooseBackTrain ( state , value ) {
		state.selectedBackTrain = value;
	},
	sendMes ( state , response ) {
		state.trainInfo = response.data;
	},
	infoFilter ( state ) {
		if ( state.departTime != "" ) {
			const input = state.departTime;
			const value = state.trainInfo;
			let result = [];
			let selectedTime = input.split(":");
			for ( let i = 0 ; i < value.length ; i++ ) {
				let item = value[i];
				let time = item.OriginStopTime.DepartureTime;
				let startTime = time.split(":");
				if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
						result.push(item);
				}
			}
			if ( result.length > 5 ) {
				result.length = 5;
			}
			state.trainInfo = result;
		}
	},
	timeFilter ( state ) {
		const info = state.trainInfo;
		for ( let i = 0 ; i <info.length ; i++ ) {
			let item = info[i];
			let trainDate = item.TrainDate;
			let date = trainDate.split("-");
			let depart = item.OriginStopTime.DepartureTime;
			let departTime = depart.split(":");
			let arrival = item.DestinationStopTime.ArrivalTime;
			let arrivalTime = arrival.split(":");
			let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
			let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
			let time = time2 - time1;
			let countHr = time * 0.000000278;
			let hr = "";
			let min = "";
			if ( countHr >= 1 ) {
				hr = Math.floor(countHr);
				let countMin = (countHr - hr) * 60
				if ( countMin >= 1 ) {
					min = Math.round(countMin);
				} else {
					min = "0";
				}
			} else {
				hr = "0";
				let countMin = countHr * 60;
				min = Math.round(countMin);
			}
			let timming = `${hr}小時:${min}分`;
			let obj = state.trainInfo[i]
			let add = { movingTime : timming }
			state.trainInfo[i] = Object.assign( {} , obj , add )
		}
	},
	getSeatMes ( state , response ) {
		const standardSeat = response.data.AvailableSeats[0].StandardSeatStatus;
		const businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus;
		for ( let i = 0 ; i < state.trainInfo.length ; i++ ) {
			if ( state.trainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo ) {
				let obj = state.trainInfo[i];
				let add = { BusinessSeatStatus : businessSeat };
				let add2 = { StandardSeatStatus : standardSeat };
				state.trainInfo[i] = Object.assign( {} , obj , add , add2 )
			}
		}
	},
	sendBackMes ( state , response ) {
		state.backTrainInfo = response.data;
	},
	backInfoFilter ( state ) {
		if ( state.backDepartTime != "" ) {
			const input = state.backDepartTime;
			const value = state.backTrainInfo;
			let result = [];
			let selectedTime = input.split(":");
			for ( let i = 0 ; i < value.length ; i++ ) {
				let item = value[i];
				let time = item.OriginStopTime.DepartureTime;
				let startTime = time.split(":");
				if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
						result.push(item);
				}
			}
			if ( result.length > 5 ) {
				result.length = 5;
			}
			state.backTrainInfo = result;
		}
	},
	backTimeFilter ( state ) {
		const info = state.backTrainInfo;
		for ( let i = 0 ; i <info.length ; i++ ) {
			let item = info[i];
			let trainDate = item.TrainDate;
			let date = trainDate.split("-");
			let depart = item.OriginStopTime.DepartureTime;
			let departTime = depart.split(":");
			let arrival = item.DestinationStopTime.ArrivalTime;
			let arrivalTime = arrival.split(":");
			let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
			let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
			let time = time2 - time1;
			let countHr = time * 0.000000278;
			let hr = "";
			let min = "";
			if ( countHr >= 1 ) {
				hr = Math.floor(countHr);
				let countMin = (countHr - hr) * 60;
				if ( countMin >= 1 ) {
					min = Math.round(countMin);
				} else{
					min = "0";
				}
			} else {
				hr = "0";
				let countMin = countHr * 60;
				min = Math.round(countMin);
			}
			let timming = `${hr}小時:${min}分`;
			let obj = state.backTrainInfo[i];
			let add = { movingTime : timming };
			state.backTrainInfo[i] = Object.assign( {} , obj , add );
		}
	},
	getBackSeatMes ( state, response ) {
		const standardSeat = response.data.AvailableSeats[0].StandardSeatStatus;
		const businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus;
		for ( let i = 0 ; i < state.backTrainInfo.length ; i++ ) {
			if (state.backTrainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo ) {
				let obj = state.backTrainInfo[i];
				let add = { BusinessSeatStatus : businessSeat };
				let add2 = { StandardSeatStatus : standardSeat };
				state.backTrainInfo[i] = Object.assign( {} , obj , add , add2 );
			}
		}
	},
	getTicketInfo ( state , response ) {
		let infos = [];
		for ( let i = 0 ; i < response.data[0].Fares.length ; i++ ) {
			let info = response.data[0].Fares[i].Price;
			infos.push(info);
		}

		infos.sort( function( a, b) {
			return a - b;
		});
		state.ticketInfo.freeKid = infos[0];
		state.ticketInfo.standardKid = infos[1];
		state.ticketInfo.standardGroup = infos[2];
		state.ticketInfo.freeAdult = infos[3];
		state.ticketInfo.standardAdult = infos[4];
		state.ticketInfo.bussinessKid = infos[5];
		state.ticketInfo.bussinessGroup = infos[6];
		state.ticketInfo.bussinessAdult = infos[7];
	},
}

export const actions = {
	async sendMes ( {state , commit } ) {
		const startStation = state.departureValue;
		const endStation = state.arrivalValue;
		const date = state.departDate;
		let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
		if ( startStation && endStation && date && state.departTime ) {
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
				)
				.then( ( response ) => {
					commit( 'sendMes' , response );
					commit( 'infoFilter' );
					commit( 'timeFilter' );
			})
		}
	},
	async getSeatMes ( { state , commit } ) {
		const startStation = state.departureValue;
		const endStation = state.arrivalValue;
		const date = state.departDate;
		for (let i = 0 ; i < state.trainInfo.length ; i++ ) {
			let trainNo = state.trainInfo[i].DailyTrainInfo.TrainNo;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
			)
			.then((response) =>{
				commit( 'getSeatMes' , response );
			})
			.catch( () => {
				console.log("查無此區間資料");
			})
		}
	},
	async getTicketInfo ( { state , commit } ) {
		const startStation = state.departureValue;
		const endStation = state.arrivalValue;
		let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
		if ( startStation != "" && endStation != "" ) {
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader() }
			)
			.then( ( response ) =>{
				commit( 'getTicketInfo' , response );
			})         
		}
	},
	async sendBackMes ( { state , commit } ) {
		const startStation = state.arrivalValue;
		const endStation = state.departureValue;
		const date = state.backDepartDate;
		let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
		if ( startStation && endStation && date && state.backDepartTime ) {
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
				)
				.then( ( response ) => {
				commit( 'sendBackMes', response );
				commit('backInfoFilter' );
				commit('backTimeFilter' );
			})
		}
	},
	async getBackSeatMes ( { state , commit } ) {
		const startStation = state.arrivalValue;
		const endStation = state.departureValue;
		const date = state.backDepartDate;
		for ( let i = 0 ; i < state.backTrainInfo.length ; i++ ) {
			let trainNo = state.backTrainInfo[i].DailyTrainInfo.TrainNo;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
			)
			.then( ( response ) =>{
				commit( 'getBackSeatMes', response );
			})
			.catch( () =>{
				console.log( "查無此區間資料" );
			})
		}
	},
	async oneWaySearching ( { commit , dispatch } ) {
		try {
			await commit( 'clearBackMes' );
			await dispatch( 'sendMes' );
			await dispatch( 'getSeatMes' );
			await dispatch( 'getTicketInfo' );
		}
		catch (err) {
			console.log( 'catch' , err );
		}
	},
	async searching ( { dispatch } ) {
		try {
			await dispatch( 'sendMes' );
			await dispatch( 'getSeatMes' );
			await dispatch( 'getTicketInfo' );
			await dispatch( 'sendBackMes' );
			await dispatch( 'getBackSeatMes' );
		}
		catch (err) {
			console.log( 'catch' , err );
		}
	},
}