<template>
	<div>
		<Row class="nav"><Button  icon="skip-backward" @click="fh()">返回</button></Row>
        <div class="editCustomer right_home_warp test-1">
            <Row class="nav">
                <Col span="8"><label>客户名称：</label><label>{{customerName}}</label></Col><Col span="8"><label>客户编号：</label><label>{{customerId}}</label></Col>
            </Row>
            <Form :model="formItem"  :label-width="85">
                <Row>
                    <Col span="12">
                        <Form-item label="行业:" prop='industryId'>
                            <Select v-model="formItem.industryId" placeholder="请选择行业">
                                <Option v-for="item in industryList" :value="item.id" :key="item">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="级别:" prop='levelId'>
                            <Select v-model="formItem.levelId"  placeholder="请选择级别">
                                <Option v-for="item in levelList" :value="item.id" :key="item">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="区域:" prop="regionId">
                        <Cascader :data="regionList" v-model="regionVal"  @on-change="onChangeRegion"></Cascader>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="分类:" prop="catalogId">
                            <Cascader :data="categoryList" v-model="catalogVal" @on-change="onChangeCatalog"></Cascader>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="业务员:" prop="salesmanName">
                            <Input v-model="formItem.salesmanName" disabled  placeholder="可点击省略号选择">
                                <Button slot="append" icon="ios-more" @click="modal1 = true;searchUser()" ></Button>
                            </Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
    		<div class="tag">
				<div class="tag-le">客户归属：</div>
                    <div class="tag-ri">
                        <div>{{fruit}}</div>
                        <div class="tag-ri-bot">
                            <div class="tag-ri-so">
                            <div>
                                <Select v-model="model1" style="width:200px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div class="tag-ri-so_tow">
                                <input class="search-input" type="text" placeholder="产品名称/编码"/>
                                <button class="search-btn"><Icon type="search"></Icon></button>
                                <!--<Input placeholder="产品名称/编码" style="width: 230px" v-model='name'></Input>-->
                                <!--<Button type="warning" @click='query'>查询</Button>-->
                            </div>
                        </div>
                        <div class="tag-ri-so-tag">
                            <div>
                                <ul>
                                    <li v-for="reg in region" track-by="$index" class="ul_zi">
                                        <div>{{reg.title}}</div>
                                        <div class='aa'>
                                            <ul class="ul_zi">
                                                <li v-for="item in reg.list" >
                                                    <!--<input type="checkbox"  />{{item}}-->
                                                    <CheckboxGroup >
                                                        <Checkbox :label="item" ></Checkbox>
                                                    </CheckboxGroup>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
						</div>
					</div>
				</div>
			</div>
        <Modal
            v-model="modal1"
            title="选择人员" width="800"
            @on-ok="ok"
            @on-cancel="cancel">
            <Row>
                <Col span="12">
                    <Input v-model="name">
                        <Button slot="append" icon="ios-search" @click="searchUser()"></Button>
                    </Input>
                </Col>
            </Row>
            <Row class="top20">
                <Table  border :columns="columns4" :data="data1" @on-row-dblclick="selectInfo"></Table>
            </Row>
            <Row type="flex" justify="end" class="top20">
                <Page :total="oTotal" :page-size="pageNums" show-elevator @on-change="changePage"></Page>
            </Row>
        </Modal>
    </div>
    <div class="btn-bot">
			<button class="btn-save" @click="saveModify()">保存</Button>
			<button class="btn-cancel">取消</Button>
		</div>
  	</div>
</template>
<script>
  import api from '@/api/api'
  export default {
    components: 'editCustomer',
    mounted (){
        const _this=this;
        this.axios.get(api.main+this.$route.query.id+api.queryById)
          .then(function (res) {
              _this.formItem.id=res.data.datas.id;
              _this.customerName=res.data.datas.customerName;
              _this.customerId=res.data.datas.customerId;
              _this.formItem.industryId=res.data.datas.industryId;
              _this.formItem.levelId=res.data.datas.levelId;
              const regionIdLinks=res.data.datas.regionIdLinks;
              _this.regionVal=regionIdLinks.split(",");
              const catalogIdLinks=res.data.datas.catalogIdLinks;
              _this.catalogVal=catalogIdLinks.split(",");
              _this.formItem.catalogId=res.data.datas.catalogId;
              _this.formItem.salesmanId=res.data.datas.salesmanId;
              _this.formItem.salesmanName=res.data.datas.salesmanName;
          })
          
      this.axios.get(api.customer + api.industry+api.queryAll)
        .then(function(res) {
          _this.industryList = res.data.datas;
        })

      this.axios.get(api.customer + api.level+api.queryAll)
        .then(function(res) {
          _this.levelList = res.data.datas;
        })

      this.axios.get(api.region+api.queryAll)
        .then(function(res) {
          _this.regionList = res.data.datas;
        })

      this.axios.get(api.category+api.queryAll)
        .then(function(res) {
          _this.categoryList = res.data.datas;
        })

    },
    data () {
      return {
        modal1: false,
        name: '',
        cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                 fruit: [],
                 	region:[
                 	{
                 			title:'华南地区',
                 			list:['成龙','洪金宝','元彪','元华','元秋','周润发','周星驰','周杰伦','李小龙']
                 	},
                 	{
                 			title:'华南地区2',
                 			list:['成龙3','洪金宝宝','元彪','元华','元秋','周润发','周星驰','周杰伦','李小龙','周星驰','周杰伦','李小龙','周星驰','周杰伦','李小龙']
                 	},
                 		{
                 			title:'华南地区3',
                 			list:['成龙3','洪金宝','元彪','元华','元秋','周润发','周星驰','周杰伦','李小龙']
                 	},
                 		{
                 			title:'华南地区4',
                 			list:['成龙4','洪金宝','元彪','元华','元秋','周润发','周星驰','周杰伦','李小龙']
                 	}
                 	
                 	],
			
        customerName:'',
        customerId:'',
        regionVal:[],
        catalogVal:[],
        formItem: {
          id:'',
          industryId:'',
          levelId:'',
          regionId:'',
          catalogId:'',
          salesmanId:'',
          salesmanName:'',
        },
        columns4: [
          {
            title: '名称',
            key: 'name',
          },
          {
            title: '职位',
            key: 'sysUserTag'
          },
          {
            title: '电话',
            key: 'mobile'
          },
          {
            title: '电子邮箱',
            key: 'email'
          }
        ],
        data1: [
          {
            customer: '黄色小鸭经贸有限公司',
            type:'生活',
            region:'南孚',
            level: '2',
          }
        ],
        oTotal:100,
        pageNums:10,
        page:1,
        industryList:[
          {id:'',name:''}
        ],
        levelList:[
          {id:'',name:''}
        ] ,
        regionList:[
          {value:'11',label:'22',children:[{value:'33',label:'44'}]}
        ],
        categoryList:[
          {value:'11',label:'22',children:[{value:'33',label:'44'}]}
        ]
      }
    },
    methods: {
//  		   handleAdd () {
//              if (this.region.list.length) {
//                  this.region.list.push(this.region[this.region.list.length - 1] + 1);
//              } else {
//                  this.region.list.push(0);
//              }
//          },
//          handleClose2 (event, name) {
//              const index = this.count.indexOf(name);
//              this.count.splice(index, 1);
//          },
    	fh(){
    		let _this = this;
    		_this.$router.go(-1)
    	},
      saveModify(){
          const _this=this;
          this.axios({
            method:'post',
            url:api.main+api.cetegoryModify,
            data:api.jsonData(_this.formItem)
          }).then(function (res) {
//            _this.$Message.info('修改成功');
            _this.$router.push({name:'customerList'});
          }).catch(function (err) {
             console.log(err);
          })

      },
      searchUser(){
        const _this=this;
        const nameDate={name:_this.name,pageStart:_this.page,pageNums:_this.pageNums};
        this.axios({
          method:'post',
          url:api.user+api.queryByRequest,
          data:api.jsonData(nameDate)
        }).then(function (res) {
          _this.data1=res.data.datas.rows;
          _this.oTotal=res.data.datas.total;
        }).catch(function (err) {
          console.log(err);
        })
      },
      changePage(page){
          this.page=page;
           this.searchUser()
      },
      selectInfo(currentRow){
          this.formItem.salesmanName=currentRow.name ;
          this.formItem.salesmanId=currentRow.id ;
          this.modal1=false
      },
      onChangeRegion(value){
          this.formItem.regionId=value[value.length-1];
      },
      onChangeCatalog(value){
          this.formItem.catalogId=value[value.length-1];
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
<style scoped>
  .editCustomer .nav{margin-bottom: 20px;}
  .editCustomer .nav label{font-size: 14px;font-weight: 600;margin-left: 40px;}
  .top20{ margin-top: 20px;}

    .tag{
		margin-bottom: 80px;
		display: flex;
		
	}
	.tag-le{
		font-size: 14px;
		line-height: 44px;
	}
	.tag-ri div:nth-child(1){
		font-size: 14px;
		line-height: 44px;
	}
	.tag-ri-bot{
		border: solid 1px #ddd;
		padding: 10px;
		width: 1050px;
	}
	.tag-ri-so{
		display: flex;
		margin-top: 15px;
		 align-items: center;
	
	}
	.tag-ri-so div:nth-child(1){
		margin-right: 15px;
	}
	.tag-ri-so-tag{
		display: flex;
	}
	.tag-ri-so-tag div:nth-child(1){
		margin: 3px 0 0 0;
		font-size: 14px;
	}
	.tag-ri-so-tag>ul>li{
		display: flex;
    }
    li.ul_zi{
        border-bottom: 1px solid #e1e7f6;
    }
    .ul_zi{
        display: flex;
    }
    .ul_zi>div:nth-child(1){
        width: 90px ;
        
    }
    ul.ul_zi{
        width: 940px;
        flex-wrap: wrap;
    }
    .ul_zi>li{
        width: 90px;
    }
    .tag-ri-so_tow{
        display: flex;
    }
	.aa {
		display:flex;
	}
</style>
