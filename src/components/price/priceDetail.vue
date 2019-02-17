<template>
  <div class="plusPrice">
    <Row><router-link to="customerPrice"><Button  icon="chevron-left">返回</Button></router-link></Row>
    <Row class="search top20">
      <Form :model="formItem"  :label-width="80" class="top20">
        <Row>
          <Col span="8">
          <Form-item label="调价标题:" prop="title">
            <div>{{formItem.title}}</div>
          </Form-item>
          </Col>
          <Col span="8">
          <Form-item label="调整日期:" prop="adjustTime">
            <div v-model="formItem.adjustTime">{{formItem.adjustTime}}</div>
          </Form-item>
          </Col>
          <Col span="8">
          <Form-item label="调整描述:" prop="description">
            <div  v-model="formItem.description">{{formItem.description}}</div>
          </Form-item>
          </Col>
        </Row>
      </Form>
    </Row>
    <Row>
        <Table  border :context="self" :columns="columns1" :data="data1"></Table>
    </Row>
  </div>
</template>
<script>
  import api from '@/api/api';
  export default {
    name:'priceDetail',
    data () {
      return {
        self: this,
        formItem:{
          title:'',
          adjustTime:'',
          description:'',
          adjustSkus:''
        },
        columns1: [
          {
            title: '客户名称',
            key: 'customerName',
            width: '100'
          },
          {
            title: '产品名称',
            key: 'productName',
            width:'200'
          },
          {
            title: '属性组合',
            key: 'skuAttributeValues',
            width:'200'
          },
          {
            title: '价格',
            key: 'price',
            width:'170'
          },
          {
            title: '计量单位',
            key: 'unitName',
            width:'100'
          },
          {
            title: '生效日期',
            key: 'validateFrom',
            width:'170'
          },
          {
            title: '终止日期',
            key: 'validateTo',
            width:'170'
          },
          {
            title: '说明',
            key: 'description',
            width:'170'
          },
          {
            title: 'sku',
            key: 'sku',
          }
        ],
        data1: [
          {
            customerId: '',
            customer: '',
            productId:'',
            productName:'',
            pri:'',
            skuId:'',
            skuStr:''
          }
        ]
      }
    },
    mounted (){
      const _this=this;
      this.axios.get(api.customer+api.adjustment+this.$route.query.id+api.queryById)
        .then(function (res) {
            _this.formItem=res.data.datas;
            _this.data1=res.data.datas.lines;
        }).catch(function (err) {
        console.log(err);
      });
    }
  }
</script>
<style scoped>
.plusPrice{ padding: 20px 40px;background: #ffffff;}
.top20{ margin-top: 20px;}
</style>
