<template>
	<div class="tiaojia">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>销售</Breadcrumb-item>
			<Breadcrumb-item>价格设置</Breadcrumb-item>
		</Breadcrumb>

		<div class="right_home_warp test-1">

			<!--<Row>
				<router-link to="customerPrice">
					<Button icon="chevron-left">返回</Button>
				</router-link>
			</Row>-->
			<Row class="search">
				<Form :model="formItem" :label-width="85">
					<Row>
						<Col span="8" class="col_label">
						<label>调价标题:</label>
						<Input type="text" v-model="formItem.title" placeholder="请输入调价标题"></Input>
						</Col>
						<Col span="8" class="col_label">
						<label>调整日期:</label>
						<Date-picker type="date" @on-change="changeDate" placement="bottom-start" placeholder="选择调整日期"></Date-picker>
						</Col>
					</Row>
					<Row>
						<Col span="16" class="col_label">
						<label>调整描述:</label>
						<Input type="textarea" v-model="formItem.description" placeholder="请输入调整描述"></Input>
						</Col>
					</Row>
				</Form>
				<!--<Col span="8"><label>流水号：</label></Col><Col span="8"><label>流水号：</label></Col><Col span="8"><label>流水号：</label></Col>-->
				<!--<Col span="24" class="searchSel top20"><label>定价维度：</label><a href="javascript:;" v-for='(item,index) in menu' :class="{'active': flag==index }"  @click='light(index);modal1 = true'>{{item.name}}</a></Col>-->
				<Modal v-model="modal1" title="提示信息：" @on-ok="ok" @on-cancel="cancel">
					<p>切换价格纬度将会重置列表中的数据,确定切换吗?</p>
				</Modal>
			</Row>

			<Row class="top20">
				<Table border :context="self" :columns="columns1" :data="data1"></Table>
				<Modal v-model="modal2" title="选择客户信息" width="800" @on-ok="closemodel" @on-cancel="cancel">
					<Row>
						<Table border :columns="columns2" :data="data2" @on-row-dblclick="selectInfo" @on-selection-change='selcusmes'></Table>
					</Row>
					<Row type="flex" justify="end" class="top20">
						<Page :total="oTotal1" :page-size="pageNums1" show-elevator @on-change="changePage1"></Page>
					</Row>
				</Modal>
				<Modal v-model="modal3" title="选择产品信息" width="800" @on-ok="closemodel" @on-cancel="cancel">
					<Row>
						<Table border :columns="columns3" :data="data3" @on-row-dblclick="selectInfo2" @on-selection-change='selcusmes2'></Table>
					</Row>
					<Row type="flex" justify="end" class="top20">
						<Page :total="oTotal2" :page-size="pageNums2" show-elevator @on-change="changePage2"></Page>
					</Row>
				</Modal>
				<Modal v-model="modal4" title="提示信息：" @on-ok="minusList" @on-cancel="cancel">
					<p>您确认删除该条数据吗?</p>
				</Modal>
				<Modal v-model="modal5" title="选择属性组合：" @on-ok="selAttributes" @on-cancel="cancel">
					<Row>
						<Col span="24" class="searchSel top20" v-for='(item,parIndex) in menu' :key="item.id"><label>{{item.name}}：</label>
						<Radio-group v-for='(val,index) in item.productAttributeValues' :key="val.id" class="radioInit" v-model="productAttrInit[parIndex]" type="button" @on-change="radioChange">
							<Radio :label="val.name"></Radio>
						</Radio-group>
						</Col>
						<!--<Col span="24" class="searchSel top20" v-for='(item,parIndex) in menu'><label>{{item.name}}：</label><a href="javascript:;" v-for='(val,index) in item.productAttributeValues' :class="{'active': val.description }"  @click='light(index,val.name,val,val.id,item.productAttributeValues);'>{{val.name}}</a></Col>-->
						<!--<Col span="24" class="searchSel top20" v-for='(item,parIndex) in menu'><label>{{parIndex+1}}：</label><a href="javascript:;" v-for='(val,index) in item.productSkuAttributes' :class="{'active': flag==index }"  @click='light(parIndex,index);'>{{val.attributeName}}：{{val.attributeValueName}}</a></Col>-->
					</Row>
				</Modal>
			</Row>
			<Row type="flex" justify="center" class="top20">
				<Button type="info" @click="saveAdjustment">保存</Button>
			</Row>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api';
	export default {
		name: 'plusPrice',
		data() {
			return {
				selctionnum:{},
				self: this,
				modal1: false,
				modal2: false,
				modal3: false,
				modal4: false,
				modal5: false,
				menu: [],
				productAttrInit: [],
				adjustSkus: [],
				parFlag: 0,
				flag: 0,
				formItem: {
					title: '',
					adjustTime: '',
					description: '',
					adjustSkus: ''
				},
				minusFlag: false,
				columns1: [{
						title: '操作',
						key: 'action',
						width: '100',
						align: "center",
						render(row, column, index) {
							return `<Tooltip content="增加一行调价单记录" placement="right">
                <i-button  size="small" @click="addList()"><Icon type="plus"></Icon></i-button>
            </Tooltip>
            <Tooltip content="删除一行调价单记录" placement="right" v-show="minusFlag">
                <i-button  size="small" @click="delRemind(${index})"><Icon type="minus-round"></Icon></i-button>
            </Tooltip>`;
						}
					},
					{
						title: '客户名称',
						key: 'customerId',
						align: "center",
						width: '100',
						render(row, column, index) {
							return `<Tooltip content="选择客户信息" placement="right">${row.customer}<i-button class="left10" size="small" @click="customerInfo(${index})"><Icon type="ios-keypad"></Icon></i-button></Tooltip>`;
						}
					},
					{
						title: '产品名称',
						key: 'productId',
						align: "center",
						width: '200',
						render(row, column, index) {
							return `<Tooltip content="点击选择产品" placement="right">${row.productName}<i-button  size="small" @click="productInfo(${index})"><Icon type="ios-keypad"></Icon></i-button></Tooltip>`;
						}
					},
					{
						title: '属性组合',
						align: "center",
						key: 'skuId',
						width: '200',
						render(row, column, index) {
							return `<Tooltip content="点击选择属性组合" placement="right">${row.skuStr}<i-button  size="small" @click="productSku(data1[${index}].productId)"><Icon type="ios-keypad"></Icon></i-button></Tooltip>`;
						}
					},
					{
						title: '价格',
						align: "center",
						key: 'price',
						width: '170',
						render(row, column, index) {
							return `<i-input v-model="data1[${index}].price" placeholder="请输入价格"></i-input>`;
						}
					},
					{
						title: '计量单位',
						align: "center",
						key: 'unitName',
						width: '100'
					},
					{
						title: '生效日期',
						align: "center",
						key: 'validateFrom',
						width: '170',
						render(row, column, index) {
							return `<Date-picker type="date"  @on-change="changeDate1" placement="bottom-start" placeholder="选择生效日期" style="width: 130px"></Date-picker>`;
						}
					},
					{
						title: '终止日期',
						align: "center",
						key: 'validateTo',
						width: '170',
						render(row, column, index) {
							return `<Date-picker type="date"  @on-change="changeDate2" placement="bottom-start" placeholder="选择终止日期" style="width: 130px"></Date-picker>`;
						}
					},
					{
						title: '说明',
						align: "center",
						key: 'description',
						width: '170',
						render(row, column, index) {
							return `<i-input v-model="data1[${index}].description" placeholder="请输入说明"></i-input>`;
						}
					},
					{
						title: 'sku',
						align: "center",
						key: 'sku',
					}
				],
				data1: [{
					customerId: '',
					customer: '',
					productId: '',
					productName: '',
					pri: '',
					skuId: '',
					skuStr: ''
				}],
				value1: '',
				columns2: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '客户ID',
						key: 'customerId',
						align: 'center'
					},
					{
						title: '客户名称',
						key: 'customerName',
						align: 'center'
					}
				],
				data2: [{
					customerId: '1111',
					customerName: '南孚'
				}],
				oTotal1: 100,
				pageNums1: 10,
				page: 1,
				columns3: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '产品名称',
						key: 'name'
					},
					{
						title: '产品ID',
						key: 'id',
					},
					{
						title: '产品价格',
						key: 'price',
					}
				],
				data3: [{
					name: '1111',
					id: '南孚',
					price: '5555'
				}],
				oTotal2: 100,
				pageNums2: 10,
				page2: 1,
				index: 0,

			}
		},
		created() {},
		methods: {
			//      light (index,name,val,valId,menu) {
			//        this.flag=val.id;
			//        for (let j=0;j<menu.length;j++){
			//          menu[j].description = false;
			//        }
			//        val.description=true;
			//      },
			radioChange() {
				const _this = this;
				var skuFlag = false;
				var productArr2 = this.productAttrInit.slice(0);
				this.adjustSkus.forEach(function(parItem, parIndex) {
					var productArr1 = [];
					parItem.productSkuAttributes.forEach(function(item, index) {
						productArr1.push(item.attributeValueName);
					});
					if(productArr1.sort().toString() == productArr2.sort().toString()) {
						_this.data1[_this.index].skuId = parItem.id;
						skuFlag = true
					}
				});
				if(!skuFlag) {
					_this.$Message.warning('请重新选择属性组合');
				}
			},
			addList() {
				const _data = {
					customerId: '',
					customer: '',
					productId: '',
					productName: '',
					skuId: ''
				};
				this.data1.push(_data);
				if(this.data1.length > 1) {
					this.minusFlag = true;
				}
			},
			delRemind(index) {
				this.modal4 = true;
				this.index = index;
			},
			minusList() {
				this.data1.splice(this.index, 1);
				if(this.data1.length < 2) {
					this.minusFlag = false;
				}
			},
			customerInfo(index) {
				this.modal2 = true;
				this.index = index;
				this.searchCustomer();
				//          const _this=this;
				//          this.axios({})

			},
			searchCustomer() {
				const _this = this;
				const formData = {
					pageStart: _this.page1,
					pageNums: _this.pageNums1
				};
				this.axios({
					method: 'post',
					url: api.main + api.queryByRequest,
					data: api.convertParam(formData)
				}).then(function(res) {
					_this.data2 = res.data.datas.rows;
					_this.oTotal1 = res.data.datas.total;
					console.log(res);
				}).catch(function(err) {
					console.log(err);
				})

			},
			selectInfo(currentRow) {
				this.data1[this.index].customerId = currentRow.customerId;
				this.data1[this.index].customer = currentRow.customerName;
				this.modal2 = false
			},
			selcusmes(selection) {
				let _this = this;
				_this.selctionnum = selection;
				_this.data1[_this.index].customerId = selection[0].customerId;
				_this.data1[_this.index].customer = selection[0].customerName;
			},
			
			closemodel() {
				let _this = this;
				if(_this.selctionnum.length > 1) {
					_this.$Message.warning('一次只能选择一个客户');
				} else {
					_this.modal2 = false
				}

			},
			changePage1(page) {
				this.page = page;
				this.searchCustomer();
			},
			productInfo(index) {
				this.modal3 = true;
				this.index = index;
				this.searchProduct();
			},
			searchProduct() {
				const _this = this;
				const formData = {
					pageStart: _this.page2,
					pageNums: _this.pageNums2
				};
				this.axios({
					method: 'post',
					url: api.productMain + api.queryByRequest,
					data: api.convertParam(formData)
				}).then(function(res) {
					_this.data3 = res.data.datas.rows;
					_this.oTotal2 = res.data.datas.total;
				}).catch(function(err) {
					console.log(err);
				})

			},
			selectInfo2(currentRow) {
				this.data1[this.index].productId = currentRow.id;
				this.data1[this.index].productName = currentRow.name;
				this.data1[this.index].unitName = currentRow.unitName;
				this.modal3 = false
			},
			selcusmes2(selection) {
				let _this = this;
				_this.selctionnum = selection;
				_this.data1[_this.index].productId = selection[0].id;
				_this.data1[_this.index].productName = selection[0].name;
				_this.data1[_this.index].unitName = selection[0].unitName;
			},
			productSku(productId) {
				this.modal5 = true;
				this.queryProductInfo(productId);
			},
			queryProductInfo(productId) {
				const _this = this;
				this.axios.get(api.productMain + productId + api.queryById).then(function(res) {
					_this.menu = res.data.datas.attributes;
					_this.productAttrInit = []; //初始化的数组进行置空，要不然还会存在别的选择的时候的属性值，这样与下面的id对比就不会有相同的了
					_this.menu.forEach(function(item, index) {
						_this.productAttrInit[index] = item.productAttributeValues[0].name;
					});
					_this.adjustSkus = res.data.datas.skus;
					var productArr2 = _this.productAttrInit.slice(0);
					_this.adjustSkus.forEach(function(parItem, parIndex) {
						var productArr1 = [];
						parItem.productSkuAttributes.forEach(function(item, index) {
							productArr1.push(item.attributeValueName);
						});
						if(productArr1.sort().toString() == productArr2.sort().toString()) {
							_this.data1[_this.index].skuId = parItem.id;
						}
					});
				}).catch(function(err) {
					console.log(err, 298)
				})
			},
			selAttributes() {
				const skusListAtt = this.adjustSkus;
				const _this = this;
				_this.data1[_this.index].skuStr = '';
				skusListAtt.forEach(function(parItem, parIndex) {
					if(parItem.id == _this.data1[_this.index].skuId) {
						parItem.productSkuAttributes.forEach(function(item, index) {
							_this.data1[_this.index].skuStr += item.attributeName + ':' + item.attributeValueName + '&nbsp' + ';';
						})
					}
				});
				if(_this.data1[_this.index].skuStr == '') {
					_this.$Message.warning('请重新选择属性组合');
				}
			},
			changePage2(page) {
				this.page2 = page;
				this.searchProduct();
			},
			saveAdjustment() {
				const _this = this;
				this.formItem.adjustSkus = this.data1;
				this.axios({
					method: 'post',
					url: api.customer + api.adjustment + api.indeustryAdd,
					data: api.convertParam(_this.formItem)
				}).then(function(res) {
					if(res.data.status == '1') {
						_this.$router.push({
							name: 'customerPrice'
						})
					}
					console.log(res);
				}).catch(function(err) {
					console.log(err)
				})
			},
			changeDate(date) {
				this.formItem.adjustTime = date;
			},
			changeDate1(date) {
				this.data1[this.index].validateFrom = date;
			},
			changeDate2(date) {
				this.data1[this.index].validateTo = date;
			},
			ok() {
				this.$Message.info('点击了确定');
			},
			cancel() {
				this.$Message.info('点击了取消');
			}
		}
	}
</script>
<style scoped>
	/*.plusPrice {
		padding: 20px 40px;
		background: #ffffff;
	}*/
	.tiaojia {
		/*position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;*/
		font-size: 14px;
	}
	

	
 .search .searchSel a {
		margin: 0 10px;
		line-height: 20px;
		display: inline-block;
		padding: 0 10px;
	}
 .search .searchSel a.active,
 .search .searchSel a:hover {
		background: #ffa63d;
		color: #ffffff;
	}
	
	.searchSel a {
		margin: 0 10px;
		line-height: 20px;
		display: inline-block;
		padding: 0 10px;
	}
	
	.searchSel a.active,
	.searchSel a:hover {
		background: #ffa63d;
		color: #ffffff;
	}
	
	.top20 {
		margin-top: 20px;
	}
	
	.left10 {
		margin-left: 10px;
	}
	
	.radioInit {
		margin-right: 10px;
		border: #ffa63d;
		color: #ffa63d;
	}
	
	.col_label {
		display: flex;
		margin: 15px 20px;
	}
	
	.col_label label {
		width: 80px;
		font-size: 14px;
		line-height: 30px;
	}
</style>