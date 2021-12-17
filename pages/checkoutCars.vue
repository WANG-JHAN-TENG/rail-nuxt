<template>
    <div class="container">
				<h1>後台管理系統</h1>
        <div class="searchBar row">
            <div class="carSearch col">
                <label for="dateSearch">日期</label>
                <input type="date" name="dateSearch" id="dateSearch" v-model="dateSearch">
                <label for="carSearch">請輸入列車編號</label>
                <input  name="carSearch" id="carSearch" v-model="trainNo" @keyup.enter="getSeatsInfo">
                <div class="btn btn-outline-info" @click="getSeatsInfo">查詢</div>
            </div>
            <div class="col-2">
								<NuxtLink to="/manage">
										<div class="btn btn-outline-secondary">
												訂位管理
										</div>
								</NuxtLink>
            </div>
            <div class="backButton col-2">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢列車時刻
                    </div>
                </NuxtLink>
            </div>
        </div>
				<div class="infoTable row">
						<div class="seatTable col-10">
								<div class="seatTitle">
										<h2>剩餘座位數 : {{leftSeats}}</h2>
										<div class="showStatus">
												<div class="ready">
														未預定 <div class="canBeChoose">可</div>
														已預定 <div class="cantBeChoose">否</div>
												</div>
										</div>
								</div>
								<div class="seatChoice">
										<h3>列車車頭</h3>
										<div class="oneTrain">
												<div class="seat" v-for="(seat, index) in seats" :key="seat.index">
															<div class="selectCar" v-if="selectedCar == index">
																	<div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
																			<label  v-if="seatNum.booked === '0' " @click="checkInfo(seatNum.No)"><input type="checkbox" name="label" disabled>
																					<span class="round button">
																						{{seatNum.No}}
																					</span>
																			</label>
																			<label v-else @click="checkInfo(seatNum.No)"><input type="checkbox" name="label" checked disabled>
																					<span class="round button">
																						{{seatNum.No}}
																					</span>
																			</label>
																	</div>
															</div>
												</div>
										</div>
										<div class="carNo">
												<div class="singleCar" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
														{{carNo}}
												</div>
										</div>
										<div class="selectedCar">
												車廂 : {{showSelectedCar}}
										</div>
								</div>
						</div>
						<div class="info col align-self-center" v-if="showInfos.seatsNo">
								<table class="table table-borderless">
										<tbody>
											<tr>
												<th scope="row">座位</th>
												<td>{{showInfos.seatsNo}}</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">南港</th>
												<td v-if="showInfos.tookOrNot[0].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">台北</th>
												<td v-if="showInfos.tookOrNot[1].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">板橋</th>
												<td v-if="showInfos.tookOrNot[2].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">桃園</th>
												<td v-if="showInfos.tookOrNot[3].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">新竹</th>
												<td v-if="showInfos.tookOrNot[4].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">苗栗</th>
												<td v-if="showInfos.tookOrNot[5].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">台中</th>
												<td v-if="showInfos.tookOrNot[6].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">彰化</th>
												<td v-if="showInfos.tookOrNot[7].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">雲林</th>
												<td v-if="showInfos.tookOrNot[8].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">嘉義</th>
												<td v-if="showInfos.tookOrNot[9].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr class="table-primary">
												<th scope="row">台南</th>
												<td v-if="showInfos.tookOrNot[10].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
											<tr>
												<th scope="row">左營</th>
												<td v-if="showInfos.tookOrNot[11].took === false">尚未被預訂</td>
												<td v-else>已預訂</td>
											</tr>
										</tbody>
								</table>
						</div>
				</div>
    </div>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, child, get } from "firebase/database";

export default {
	data() {
		return {
			trainNo:"",
			dateSearch:"",
			seats: [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			],
			carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			selectedCar: "0",
			showSelectedCar: "A",
			inputSeatData: [],
			leftSeats: 0,
			showInfos: {
				seatsNo : "",
				tookOrNot: [
					{ station : "0990" , took : false } ,
					{ station : "1000" , took : false } ,
					{ station : "1010" , took : false } ,
					{ station : "1020" , took : false } ,
					{ station : "1030" , took : false } ,
					{ station : "1035" , took : false } ,
					{ station : "1040" , took : false } ,
					{ station : "1043" , took : false } ,
					{ station : "1047" , took : false } ,
					{ station : "1050" , took : false } ,
					{ station : "1060" , took : false } ,
					{ station : "1070" , took : false }
				],
			},
		};
	},
	created() {
		this.createSeats();
	},
	updated() {
		this.countLeftSeats();
		this.showSelectedCar = this.carNos[this.selectedCar];
	},
	methods: {
		createSeats() {
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			for ( let i = 1 ; i < 21 ; i++ ) {
				let item = { No: `A${i}` , booked: "0" };
				this.seats[0].push(item);
				let item1 = { No: `B${i}` , booked: "0" };
				this.seats[1].push(item1);
				let item2 = { No: `C${i}` , booked: "0" };
				this.seats[2].push(item2);
				let item3 = { No: `D${i}` , booked: "0" };
				this.seats[3].push(item3);
				let item4 = { No: `E${i}` , booked: "0" };
				this.seats[4].push(item4);
				let item5 = { No: `F${i}` , booked: "0" };
				this.seats[5].push(item5);
				let item6 = { No: `G${i}` , booked: "0" };
				this.seats[6].push(item6);
				let item7 = { No: `H${i}` , booked: "0" };
				this.seats[7].push(item7);
				let item8 = { No: `I${i}` , booked: "0" };
				this.seats[8].push(item8);
				let item9 = { No: `J${i}` , booked: "0" };
				this.seats[9].push(item9);
			}
		},
		countLeftSeats() {
			if ( this.inputSeatData.length > 0 ) {
				let result = 80 - this.inputSeatData.length;
				this.leftSeats = result;
			} else {
				this.leftSeats = 80;
			}
		},
		getSeatsInfo() {
			this.inputSeatData = [];
			return new Promise( ( resolve , reject ) => {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const date = this.dateSearch;
				const trainNo = this.trainNo;
				get( child( dbRef, `bookedSeats/${date}` + `/${trainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputSeatData = response.seatsData;
						this.createSeats();
						this.initSeatTable();
						resolve();
					} else {
						this.createSeats();
					}
				}).catch( (error) => {
					console.log(error);
					reject();
				});
			})
		},
		initSeatTable() {
			if ( this.inputSeatData.length > 0 ) {
				const inputs = this.inputSeatData;
				const seats = this.seats;
				for (let i = 0 ; i < inputs.length ; i++ ){
					for (let j = 0 ; j < seats.length ; j++ ){
						let seat = seats[j];
						for ( let k = 0 ; k < seat.length ; k++){
							if ( seat[k].No === inputs[i].seatsNo ) {
								let input = inputs[i];
								for (let l = 0 ; l < input.tookOrNot.length ; l++ ) {
									if ( input.tookOrNot[l].took === true ) {
										seat[k].booked = "1";
									}
								}
							}
						}
					}
				}
			}
		},
		keyInCarNo(index) {
			this.selectedCar = index;
		},
		checkInfo(value) {
			this.showInfos = {
				seatsNo : "",
				tookOrNot: [
					{ station : "0990" , took : false } ,
					{ station : "1000" , took : false } ,
					{ station : "1010" , took : false } ,
					{ station : "1020" , took : false } ,
					{ station : "1030" , took : false } ,
					{ station : "1035" , took : false } ,
					{ station : "1040" , took : false } ,
					{ station : "1043" , took : false } ,
					{ station : "1047" , took : false } ,
					{ station : "1050" , took : false } ,
					{ station : "1060" , took : false } ,
					{ station : "1070" , took : false }
				],
			};
			if ( this.inputSeatData.length > 0 ){
				for ( let i = 0 ; i < this.inputSeatData.length ; i++ ) {
					if( value === this.inputSeatData[i].seatsNo ) {
						this.showInfos = this.inputSeatData[i];
					} else {
						this.showInfos.seatsNo = value;
					}
				}
			} else {
				this.showInfos.seatsNo = value;
			}

		},
	},
}
</script>

<style>
	.change{
		margin: 1%;
	}
	.seatsInfo{
		display: inline-block;
		margin:0 1%;
	}
	.seatTitle{
		text-align: center;
	}
	.seatTitle .canBeChoose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
	}
	.seatTitle .cantBeChoose{
		display: inline-block;
		background: #5e7380;
		color: #5e7380;
	}
	.seatChoice{
		margin: 5% auto;
		width: 70%;
		border: 2px solid #ccc;
		text-align: center;
	}
	.seatChoice h3{
		display: inline-block;
		margin: 2% 0 0 0;
	}
	.oneTrain{
		margin: 3% auto;
	}
	.selectCar{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.seatNum{
		margin: 3% 2%;
		height: 6vh;
		width: 15%;
	}
	.selectCar :nth-child(2){
		margin-right: 12%;
	}
	.selectCar :nth-child(6){
		margin-right: 12%;
	}
	.selectCar :nth-child(10){
		margin-right: 12%;
	}
	.selectCar :nth-child(14){
		margin-right: 12%;
	}
	.selectCar :nth-child(18){
		margin-right: 12%;
	}
	.oneTrain input[type="checkbox"] {
		display: none; 
	}
	.oneTrain input:checked + .button {
		background: #5e7380; 
		color: #fff;
	}
	.oneTrain .button {
		display: inline-block;
		background: #8ecbcf;
		height: 8vh;
		width: 8vh; 
		color: #333; 
		cursor: pointer;
		line-height: 8vh;
	}
	.oneTrain .button:hover {
		background: #8ecbcf7c; 
	}
	.oneTrain .round {
		border-radius: 5px; 
	}
	.carNo{
		margin: 2% 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.singleCar{
		margin: 0 2%;
		height: 100%;
		width: 4%;
		font-size: normal;
		cursor: pointer;
		color: rgb(0, 0, 0);
		transition: 0.2s ease all;
	}
	.singleCar:hover{
		color: rgb(224, 228, 235);
		background: rgb(122, 173, 231);
		border-radius: 25%;
	}
	.selectedSeats{
		margin: 2% 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.selectedSeat{
		margin: 0 1%;
	}
</style>