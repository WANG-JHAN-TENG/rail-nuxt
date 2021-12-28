<template>
		<v-app>
				<v-container>
						<div class="ticket">
								<div class="ticketTitle">
										<h3>車廂票價參考</h3>
								</div>
								<div class="ticketTable">
										<v-simple-table>
												<template v-slot:default>
														<thead>
																<tr>
																		<th></th>
																		<th>全票</th>
																		<th>孩童票/敬老票/愛心票</th>
																		<th>團體票</th>
																</tr>
														</thead>
														<tbody>
																<tr>
																		<td>標準車廂</td>
																		<td>{{ticketInfo.standardAdult}}</td>
																		<td>{{ticketInfo.standardKid}}</td>
																		<td>{{ticketInfo.standardGroup}}</td>
																</tr>
																<tr>
																		<td>商務車廂</td>
																		<td>{{ticketInfo.bussinessAdult}}</td>
																		<td>{{ticketInfo.bussinessKid}}</td>
																		<td>{{ticketInfo.bussinessGroup}}</td>
																</tr>
																<tr>
																		<td>自由座車廂</td>
																		<td>{{ticketInfo.freeAdult}}</td>
																		<td>{{ticketInfo.freeKid}}</td>
																		<td>-</td>
																</tr>
														</tbody>
												</template>
										</v-simple-table>
								</div>
						</div>
				</v-container>
		</v-app>
</template>

<script>
export default {
	props:["parentInfo"],
	data(){
		return{
			ticketInfo: this.parentInfo,
		};
	},
	updated(){

	},
	computed: {

	},
	methods:{

	},
}
</script>

<style>
	.ticket{
		text-align: center;
	}
	.v-application--wrap{
		min-height: 0px;
	}
	.ticketTitle{
		position: relative;
		margin: 20px auto;
		padding: 5px;
		font-size: 2rem;
		font-weight: normal;
		letter-spacing: 2px;
	}
	.ticketTitle ::after{
		content: "";
		display: block;
		position: absolute;
		width: 90px;
		height: 3px;
		left: 50%;
		bottom: 0;
		background-color: #ca4f0f;
		margin-left: -45px;
	}
	.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
	.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
		text-align: center !important;
		font-size: 1.25rem;
	}
	.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
		font-size: 16px;
	}
	@media (max-width: 665px) {
		.ticketTitle h3{
			font-size: 24px;
		}
		.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
		.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
			font-size: 14px;
			padding: 5px;
		}
		.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
			font-size: 14px;
			padding: 5px;
		}
		.ticketTable input{
			width: 40px;
		}
	}
</style>