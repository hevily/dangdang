<template>
	<div class="localimport" @click="maopao">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>添加新客户</Breadcrumb-item>
			<Breadcrumb-item>本地添加</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp">
			<h4>本地添加</h4>
			<Form class="compInfoForm">
				<Tabs value="name1">
					<TabPane label="基本信息" name="name1" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>公司名称：</div>
							<Input placeholder="请输入..." v-model="companyData.name" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>公司电话：</div>
							<Input placeholder="请输入..." v-model="companyData.telephone" style="width:440px"></Input>
						</div>

						<div class="formItem">
							<div class="label"><span class="Must">*</span>联系人及手机号:</div>
							<div class="add_canpinkuang">
								<div>
									<div v-for="(item,index) in cpsshy_rtel" class="cpkuang" :key="index">
										<div v-model="item.value">{{item.value}}<span class="addqukuangnr_del" @click="delcpss_tel(item,index)">X</span></div>
									</div>
								</div>
								<div class="add_canpinkuang_input input_tel">
									<input v-model="cpnr_r" placeholder="请输入联系人名称" />
									<input v-model="cpnr_rtel" placeholder="请输入联系人手机号" />

									<button @click="addcp_tel">确定</button>
								</div>

							</div>
						</div>

						<div class="formItem">
							<div class="label">企业英文名称：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">统一社会信用代码：</div>
							<Input placeholder="请输入..." v-model="companyData.uscc" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">注册地址：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">经营地址：</div>
							<Input placeholder="请输入..." v-model="companyData.address" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">法定代表/企业负责人姓名：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">经营模式：</div>
							<RadioGroup v-model="jyms">
								<Radio label="1">
									<span>生产型</span>
								</Radio>
								<Radio label="2">
									<span>贸易型</span>
								</Radio>
								<Radio label="3">
									<span>生产型+贸易型</span>
								</Radio>
								<Radio label="4">
									<span>物流企业</span>
								</Radio>
							</RadioGroup>
						</div>
						<div class="formItem">
							<div class="label">企业性质：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">企业规模：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">年营业额：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">经营范围：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">企业所属行业：</div>

							<div class="addqu">
								<div class="addqukuang" v-show="qysshy.length>0">
									<div v-for="(item,index) in qysshy" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item.value}}</span><span class="addqukuangnr_del" @click="delqyss(item,index)">X</span></div>
								</div>
								<button @click="modal1 = true">选择/修改</button>
							</div>
						</div>
						<div class="formItem">
							<div class="label">客户所属行业：</div>
							<div class="addqu">
								<div class="addqukuang" v-show="khsshy.length>0">
									<div v-for="(item,index) in khsshy" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item.value}}</span><span class="addqukuangnr_del" @click="delkhss(item,index)">X</span></div>
								</div>
								<button @click="modal2 = true">选择/修改</button>
							</div>
						</div>
						<div class="formItem">
							<div class="label">主要销售区域：</div>
							<div class="addqu">
								<div class=" addqukuang addqukuang2" v-show="xssshy.length>0">
									<div v-for="(item,index) in xssshy" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item.value}}</span><span class="addqukuangnr_del" @click="delxsss(item,index)">X</span></div>
								</div>
								<button @click="modal3 = true">选择/修改</button>
							</div>
							<!--<Cascader :data="industryData" class="industry" v-model="companyData.lstTradeAncestorIds" style="float:left;"></Cascader>-->
						</div>

						<div class="formItem">
							<div class="label">主营产品：</div>
							<div class="add_canpinkuang">
								<div>
									<div v-for="(item,index) in cpsshy" class="cpkuang" :key="index">
										<div v-model="item.value">{{item.value}}<span class="addqukuangnr_del" @click="delcpss(item,index)">X</span></div>

									</div>
								</div>
								<div class="add_canpinkuang_input">
									<Input v-model="cpnr" placeholder="请输入联系人手机号" />
									<button @click="addcp">确定</button>
								</div>

							</div>
						</div>
						<div class="formItem">
							<div class="label">品牌名称：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>

						<div class="formItem">
							<div class="label">公司网址：</div>
							<Input placeholder="请输入..." v-model="companyData.englishName" style="width:440px"></Input>
						</div>

						<div class="formItem">
							<div class="label">公司传真：</div>
							<Input placeholder="请输入..." v-model="companyData.fax" style="width:440px"></Input>
						</div>
						<div class="formItem">
							<div class="label">公司简介：</div>
							<Input type="textarea" :rows="4" v-model="companyData.description" placeholder="请输入..." style="width:500px;height:;"></Input>
						</div>
						<div class="formItem">
							<div class="label">企业营业执照：</div>
							<img :src="companyData.logoUrl" class="logo" v-show="logoShow">
						</div>
						<div class="formItem formLogo" @mouseenter="uploadShow" @mouseleave="uploadHide">
							<div class="label">公司LOGO：</div>
							<div class="uploaddiv">
								<Upload :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadHeader" :on-success="handleSuccessBusiness">
									<Button type="ghost" class="uploadbtn"></Button>
								</Upload>
								<div id="imgupload_zhe_div">
									<img :src="companyData.logoUrl" class="imgshow" />
									<div class="imgupload_zhe">
										<div class="imgupload_zhediv" style="text-align: center;width: 100%;">
											<Icon size="30" color='white' type="eye" @click.native="fangda" />
											<Icon size="30" color='white' type="plus" @click.native="tianjia" />
										</div>

									</div>
								</div>

							</div>
							<!--<img :src="companyData.logoUrl" class="logo" v-show="logoShow">
					<Upload ref="upload" :headers="uploadHeader" :show-upload-list="true" :default-file-list="defaultList" :on-success="handleSuccess" :max-size="11112048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :format="['jpg','jpeg','png']" :before-upload="handleBeforeUpload" :action="uploadUrl" :data='uploadData' class="upFile" v-show="uploadFlag">
						<div>
							<Icon type="android-add"></Icon>
						</div>
					</Upload>-->
						</div>
					</TabPane>
					<TabPane label=" 联系人 " name="name2" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>客户编码：</div>
							<div>
								<Input placeholder="请输入..." style="width:440px"></Input>
							</div>
						</div>

						<div class="formItem">
							<div class="label"><span class="Must">*</span>客户分类：</div>
							<div class="select_js">
								<div class="seljuese" @click="sel_flchu">
									<input class="selinput" type="text" disabled v-model="selfenlei" />
									<img src="../../assets/img/seldown.png" alt="" v-if="sel_fltan" />
									<img src="../../assets/img/selup.png" alt="" v-else/>

								</div>
								<div class="seltan test-1" v-if="sel_fltan">
									<div v-for="(item,index) in json_fenlei" class="selopt" @click="fenlei_click(item)" :key="index">{{item.name}}</div>
									<div class="addfl" @click="addfenlei">
										<div class="import_addimg"></div>
										新增分类
									</div>
								</div>
							</div>
						</div>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>客户级别：</div>
							<div class="select_js">
								<div class="seljuese" @click="sel_jbchu">
									<input class="selinput" type="text" disabled v-model="seljibie" />
									<img src="../../assets/img/seldown.png" alt="" v-if="sel_jbtan" />
									<img src="../../assets/img/selup.png" alt="" v-else/>

								</div>
								<div class="seltan test-1" v-if="sel_jbtan">
									<div v-for="(item,index) in json_jibie" class="selopt" @click="jibie_click(item)" :key="index">{{item.name}}</div>
									<div class="addfl" @click="addjibie">
										<div class="import_addimg"></div>
										新增级别
									</div>
								</div>
							</div>
						</div>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>所属区域：</div>
							<div class="select_js">
								<div class="seljuese" @click="sel_qychu">
									<input class="selinput" type="text" disabled v-model="selquyu" />
									<img src="../../assets/img/seldown.png" alt="" v-if="sel_qytan" />
									<img src="../../assets/img/selup.png" alt="" v-else/>

								</div>
								<div class="seltan test-1" v-if="sel_qytan">
									<div v-for="(item,index) in json_quyu" class="selopt" @click="quyu_click(item)" :key="index">{{item.name}}</div>
									<div class="addfl" @click="addquyu">
										<div class="import_addimg"></div>
										新增区域
									</div>
								</div>
							</div>
						</div>

					</TabPane>
					<TabPane label="收货地址" name="name3" class='test-1'>
						<!--<h4>发票快递信息</h4>-->
						<ul class="form_ul">
							<li>
								<label>联系人:</label><input type="text" placeholder="请输入联系人名" ref="nametext" />
							</li>
							
							<li>
								<label>联系电话:</label><input type="text" placeholder="请输入电话号码" ref="mobiletext" />
							</li>
							<li>
								<label>快递地址:</label><input type="text" placeholder="请输入收货地址" ref="getAddresstext" />
							</li>
						</ul>
					</TabPane>
					<TabPane label="发票信息" name="name4" class='test-1'>

						<!--<h4>企业开票信息</h4>-->
						<ul class="form_ul">
							<li>
								<label>发票抬头:</label><input type="text" placeholder="请输入发票抬头" ref="openNametext" />
							</li>
							<li>
								<label>税号:</label><input type="text" placeholder="请输入税号" ref="dutyParatext" />
							</li>
							<li>
								<label>开户银行:</label><input type="text" placeholder="请输入开户银行" ref="openBanktext" />
							</li>
							<li>
								<label>银行帐号:</label><input type="text" placeholder="请输入银行帐号" ref="openBankNumtext" />
							</li>
							<li>
								<label>固定电话:</label><input type="text" placeholder="请输入固定电话" ref="telephonetext" />
							</li>
							<li>
								<label>公司地址:</label><input type="text" placeholder="请输入地址" ref="registerDetailAddresstext" />
							</li>
						</ul>
					</TabPane>
				</Tabs>

			</Form>
		</div>
		<div v-show="showis" class="rightBox_but" @click="isshow">
			<div @click="isshow">
				<img :src="companyData.logoUrl" @click="isshow" />
			</div>
		</div>
		<!--<div class="qysstan" v-show="modal1">
			<div style="height: auto;">
				<div>选择企业所属行业</div>
				<CheckboxGroup v-model="social">
					<Checkbox :label="item.value" v-for="item in qysshy2">
						<span>{{item.value}}</span>
					</Checkbox>
				</CheckboxGroup>
			</div>
			<button @click="qyssguan">yes</button>
		</div>-->

		<div class="qysstan_box" v-show="modal1">
			<div class="qysstan">
				<div class="py_tit">选择企业所在属行业</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social">
						<Checkbox :label="index" v-for="(item,index) in qysshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="qyssguan">确定</Button>
					<Button type="text" @click='qyssguan_x'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show="modal2">
			<div class="qysstan">
				<div class="py_tit">选择客户所在属行业</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social2">
						<Checkbox :label="index" v-for="(item,index) in qysshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="khssguan">确定</Button>
					<Button type="text" @click='khssguan_x'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show="modal3">
			<div class="qysstan">
				<div class="py_tit">选择主要销售区域</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social3">
						<Checkbox :label="index" v-for="(item,index) in xssshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="xsssguan">确定</Button>
					<Button type="text" @click='xsssguan_x'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show='addfl_tan'>
			<div class="fenleikuang">
				<div class="fenleikuang_header">
					<span>新增分类</span>
				</div>
				<div class="fenleikuang_section">
					<!--<div class="fontitem" style="display: none;">
					<span>上级分类:</span>
					<Input v-model="parentName" disabled class="inputDisabled"></Input>
				</div>-->
					<div class="fontitem">
						<span>分类名称:</span>
						<Input v-model="compileForm.name" placeholder="分类名称"></Input>
						<span v-show="fenleikuang_name" class="errotip">分类名称不能为空！</span>
					</div>
					<div class="fontitem">
						<span>分类编码:</span>
						<Input v-model="compileForm.code" placeholder="分类编码"></Input>
						<span v-show="fenleikuang_code" class="errotip">分类编码不能为空！</span>
					</div>
					<div class="fontitem">
						<span>描述:</span>
						<Input v-model="compileForm.description" type="textarea" placeholder="分类描述"></Input>
						<!--<span  v-show="fenleikuang_name" class="errotip">描述不能为空！</span>-->
					</div>
				</div>
				<div class="fenleikuang_footer">
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show='addjb_tan'>
			<div class="fenleikuang">
				<div class="fenleikuang_header">
					<span>新增级别</span>
				</div>
				<div class="fenleikuang_section">
					<!--<div class="fontitem" style="display: none;">
					<span>上级分类:</span>
					<Input v-model="parentName" disabled class="inputDisabled"></Input>
				</div>-->
					<div class="fontitem">
						<span>名称:</span>
						<Input v-model="compileForm2.name" placeholder="名称"></Input>
						<span v-show="jibiekuang_name" class="errotip">名称不能为空！</span>
					</div>
					<div class="fontitem">
						<span>编码:</span>
						<Input v-model="compileForm2.code" placeholder="编码"></Input>
						<span v-show="jibiekuang_code" class="errotip">编码不能为空！</span>
					</div>
					<div class="fontitem">
						<span>描述:</span>
						<Input v-model="compileForm2.description" type="textarea" placeholder="描述"></Input>
						<!--<span  v-show="fenleikuang_name" class="errotip">描述不能为空！</span>-->
					</div>
				</div>
				<div class="fenleikuang_footer">
					<Button type="info" @click="confirm2('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show='addqy_tan'>
			<div class="fenleikuang">
				<div class="fenleikuang_header">
					<span>新增区域</span>
				</div>
				<div class="fenleikuang_section">
					<!--<div class="fontitem" style="display: none;">
					<span>上级分类:</span>
					<Input v-model="parentName" disabled class="inputDisabled"></Input>
				</div>-->
					<div class="fontitem">
						<span>区域名称:</span>
						<Input v-model="compileForm3.name" placeholder="区域名称"></Input>
						<span v-show="quyukuang_name" class="errotip">名称不能为空！</span>
					</div>
					<div class="fontitem">
						<span>区域编码:</span>
						<Input v-model="compileForm3.code" placeholder="区域编码"></Input>
						<span v-show="quyukuang_code" class="errotip">区域编码不能为空！</span>
					</div>
					<div class="fontitem">
						<span>区域描述:</span>
						<Input v-model="compileForm3.description" type="textarea" placeholder="区域描述"></Input>
						<!--<span  v-show="fenleikuang_name" class="errotip">描述不能为空！</span>-->
					</div>
				</div>
				<div class="fenleikuang_footer">
					<Button type="info" @click="confirm3('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</div>
		</div>
		<div class="btn-bot">
			<button class="btn-save" @click="saveCompany">保存</button>
			<button class="btn-return" @click="back">返回</button>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis
		},

		data() {
			return {

				isshow: false,
				//客户分类
				selfenlei: '',
				sel_fltan: false,
				json_fenlei: '',
				push_fenlei: '',
				addfl_tan: false,
				fenleikuang_name: false,
				fenleikuang_code: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
					description: ''
				},
				parentName: '',

				//客户级别
				seljibie: '',
				sel_jbtan: false,
				json_jibie: '',
				push_jibie: '',
				addjb_tan: false,
				jibiekuang_name: false,
				jibiekuang_code: false,
				compileForm2: {
					name: '',
					code: '',
					description: ''
				},

				//客户区域
				selquyu: '',
				sel_qytan: false,
				json_quyu: '',
				push_quyu: '',
				addqy_tan: false,
				quyukuang_name: false,
				quyukuang_code: false,
				compileForm3: {
					parentId: '',
					name: '',
					code: '',
					description: ''
				},

				re_do: '',
				do_yn: false,
				do_no: false,

				pageInfo: {
					count: 1,
					pageStart: 1,
					pageNums: 10
				},
				qysstan: true,
				qyhy: false,
				showUpList: 'false',
				showis: false,

				externalName: '',
				externalContactFlag: false,
				cflag: false, //区县能否点
				cflag2: false, //城市能否点
				flag: false,
				areaV: '北京市/市辖区/海淀区/',
				areaVarry: [],
				provice: [],
				proviceKey: [],
				cityList: [],
				areaList: [],
				jyms: '1', //经营模式
				companyData: {
					shortName: '', //简称，少于100字
					description: '', //企业简介，不多于500字
					englishName: '', //英文名称，100个字符以内
					address: '', //详细地址，200字以内 
					postCode: '', //邮政编码：6位数字
					telephone: '', //服务电话：20字符以内
					fax: '', //服务传真：20字符以内
					logoUrl: '', //
					provinceId: '', //
					cityId: '', //
					countyId: '', //
					contact: '', //联系人
					uscc: '', //工商执照注册号/统一社会信用代码：60字符以内 
					website: '', //公司网址，100个字符以内
					tradeId: '', //所在行业
					serviceTradeId: '', //服务行业
					contactId: '', //对外联系人ID

				},
				externalContactValue: {
					name: '',
					title: '',
					mobile: '',
					wxId: ''

				}, //对外联系人
				attachments: [],
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'corp/'
				},
				defaultList: [],
				imgUrl: '',
				visible: false,
				uploadFlag: true,
				uploadList: [],
				industryV: [],
				industryServiceV: [],
				logoShow: false,
				cityId: '',
				provinceId: '',
				modal1: false, //企业所属行业弹窗显示关闭开关				
				qysshy: [], //企业所属行业已选择的内容
				social: [], ////企业所属行业弹窗部分已选择的内容
				qysshy2: [{ //企业所属行业弹窗内容，需接入接口数据
						value: '家具制造'
					},
					{
						value: '家具制造2'
					},
					{
						value: '家具制造3'
					},
					{
						value: '家具制造4'
					}
				],
				modal2: false, //客户所属行业弹窗显示关闭开关
				khsshy: [], //客户所属行业已选择内容
				social2: [], ////客户所属行业弹窗部分已选择的内容
				khsshy2: [{ //客户所属行业弹窗内容，需接入接口数据
						value: '家具制造'
					},
					{
						value: '家具制造2'
					},
					{
						value: '家具制造3'
					},
					{
						value: '家具制造4'
					}
				],
				modal3: false, //销售区域弹窗显示关闭开关
				xssshy: [], //销售区域已选择内容
				social3: [], ////销售区域弹窗部分已选择的内容
				xssshy2: [{ //销售区域弹窗内容，需接入接口数据
						value: '非洲'
					},
					{
						value: '木星'
					},
					{
						value: '火星'
					},
					{
						value: '月球'
					}
				],
				cpnr: "",
				cpsshy: [{ //主营产品已有内容，需接入接口数据
						value: '家具制造'
					},
					{
						value: '家具制造2'
					},
					{
						value: '家具制造3'
					},
					{
						value: '家具制造4'
					}
				],
				cpnr_r: '',
				cpnr_rtel: "",
				cpsshy_rtel: [],
				industryData: [{
					value: 'beijing',
					label: '北京',
					children: [{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, {
					value: 'jiangsu',
					label: '江苏',
					children: [{
							value: 'nanjing',
							label: '南京',
							children: [{
								value: 'fuzimiao',
								label: '夫子庙',
							}]
						},
						{
							value: 'suzhou',
							label: '苏州',
							children: [{
									value: 'zhuozhengyuan',
									label: '拙政园',
								},
								{
									value: 'shizilin',
									label: '狮子林',
								}
							]
						}
					],
				}],
				columnsContact: [{
						title: '用户姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '职务',
						align: 'center',
						key: 'title'
					},
					{
						title: '手机号',
						align: 'center',
						key: 'mobile'
					},
					{
						title: '微信号',
						align: 'center',
						key: 'wxId'
					}
				],
				externalContact: [{
						name: '张三',
						title: '',
						mobile: '',
						wxId: ''
					},
					{
						name: '李四',
						title: '',
						mobile: '',
						wxId: ''
					}
				]
			}
		},
		methods: {
			back(){
				const _this = this;
				_this.$router.push({
					path: '/customer'
					//path: '/addCustomer'
				})
			},
			//添加主营产品相关
			addcp() {
				let _this = this;
				if(_this.cpnr == '') {
					_this.do_no = true;
					_this.re_do = '请输入产品名';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					return false;
				} else {
					let zycp = _this.cpnr;
					_this.cpsshy.push(zycp);
					_this.cpnr = '';
				}
			},
			delcpss(item, index) { //删除主营产品
				let _this = this;
				_this.cpsshy.splice(index, 1);
			},
			addcp_tel() {
				let _this = this;
				let re = /(1[3-9]\d{9}$)/;
				if(_this.cpnr_r == '' && _this.cpnr_rtel == '') {
					_this.do_no = true;
					_this.re_do = '请输入联系人及手机号';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					return false;

				} else if(_this.cpnr_r == '') {
					_this.do_no = true;
					_this.re_do = '请输入联系人';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					return false;
				} else if(_this.cpnr_rtel == '') {
					_this.do_no = true;
					_this.re_do = '请输入手机号';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					return false;
				} else if(!re.test(_this.cpnr_rtel)) {
					//_this.errotip = "请输入正确的手机号！";
					_this.do_no = true;
					_this.re_do = '请输入正确的手机号';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					return false;
					return false;
				} else {
					var zycp_tel = {
						value: (_this.cpnr_r + ':') + _this.cpnr_rtel
					};
					_this.cpsshy_rtel.push(zycp_tel);
					_this.cpnr_r = '';
					_this.cpnr_rtel = '';
				}

			},
			delcpss_tel(item, index) { //删除主营产品
				let _this = this;
				_this.cpsshy_rtel.splice(index, 1);
			},
			//添加销售区域所属行业相关
			xsssguan() {
				let _this = this;
				var newxssshy2 = [];
				for(var xss = 0; xss < _this.social3.length; xss++) {
					var newxssshy = {
						value: _this.social3[xss]
					};
					newxssshy2.push(newxssshy);
					_this.xssshy = newxssshy2;

				}
				this.modal3 = false;
			},
			delxsss(item, index) { //删除销售区域已选择的内容
				let _this = this;
				_this.xssshy.splice(index, 1);
				_this.social3.splice(index, 1);
			},

			//添加企业所属行业相关
			qyssguan() {
				let _this = this;
				var newqysshy2 = [];
				for(var qys = 0; qys < _this.social.length; qys++) {
					var newqysshy = {
						value: _this.social[qys]
					};
					newqysshy2.push(newqysshy);
					_this.qysshy = newqysshy2;

				}
				this.modal1 = false;
			},
			delqyss(item, index) { //删除企业所属行业已选择的内容
				let _this = this;
				_this.qysshy.splice(index, 1);
				_this.social.splice(index, 1);
			},
			//添加客户所属行业相关
			khssguan() {
				let _this = this;
				var newkhsshy2 = [];
				for(var khs = 0; khs < _this.social2.length; khs++) {
					var newkhsshy = {
						value: _this.social2[khs]
					};
					newkhsshy2.push(newkhsshy);
					_this.khsshy = newkhsshy2;

				}
				this.modal2 = false;
			},
			delkhss(item, index) { //删除客户所属行业已选择的内容
				let _this = this;
				_this.khsshy.splice(index, 1);
				_this.social2.splice(index, 1);
			},
			//上传logo相关
			handleSuccessBusiness(res, file, fileList) {
				let _this = this;
				_this.companyData.logoUrl = res.url; //上传成功的图片路径
				//_this.imgup.userPhoto = res.url; //显示的图片路径
				//this.$refs.upload.fileList = []; //移除已上传的文件信息
				let imgdiv = document.getElementById("imgupload_zhe_div");
				imgdiv.style.display = "block";

			},
			fangda() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			tianjia() {
				document.querySelector(".uploadbtn").click(); //点击浮动图片
			},
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;
			},

			//选择对外联系人
			selContact(currentRow, oldCurrentRow) {
				this.companyData.contactId = currentRow.id;
				this.externalContactFlag = false;
				this.externalContactValue = currentRow
			},
			showContact() {
				this.externalContactFlag = true;
			},
			//对外联系人分頁
			pageFun(x) {
				const _this = this;
				var pcontactData = {};
				pcontactData.pageStart = x;
				pcontactData.pageNums = this.pageInfo.pageNums;
				console.log(pcontactData);
				this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.queryContact,
						data: api.jsonData(pcontactData),

					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.externalContact = res.data.datas.rows;

						} else {
							//							_this.$Message.warning(res.data.message);
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//搜索对外联系人
			externalSearch() {
				const _this = this;
				var pcontactData = {};
				pcontactData.pageStart = this.pageInfo.pageStart;
				pcontactData.pageNums = this.pageInfo.pageNums;
				pcontactData.name = this.externalName;
				console.log(pcontactData);
				this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.queryContact,
						data: api.jsonData(pcontactData),

					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.externalContact = res.data.datas.rows;
							_this.pageInfo.count = res.data.datas.total;
						} else {
							//_this.$Message.warning(res.data.message);
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			areaTab(index) {
				var len = document.querySelectorAll(".areaCont").length;
				if(index == 0) {
					for(var i = 0; i < len; i++) {
						document.querySelector(".areaTab").children[i].className = "";
						document.querySelectorAll(".areaCont")[i].style.display = "none";
					}
					document.querySelector(".areaTab").children[index].className = "tactive";
					document.querySelectorAll(".areaCont")[index].style.display = "block";
				} else if(index == 1) {
					if(this.cflag2) {
						for(var i = 0; i < len; i++) {
							document.querySelector(".areaTab").children[i].className = "";
							document.querySelectorAll(".areaCont")[i].style.display = "none";
						}
						document.querySelector(".areaTab").children[index].className = "tactive";
						document.querySelectorAll(".areaCont")[index].style.display = "block";
					}
				} else if(index == 2) {
					if(this.cflag) {
						for(var i = 0; i < len; i++) {
							document.querySelector(".areaTab").children[i].className = "";
							document.querySelectorAll(".areaCont")[i].style.display = "none";
						}
						document.querySelector(".areaTab").children[index].className = "tactive";
						document.querySelectorAll(".areaCont")[index].style.display = "block";
					}
				}
			},

			selArea(index, id) {
				const _this = this;
				var str = "";
				var len = document.querySelectorAll(".areaCont").length;
				var len2 = document.querySelectorAll(".areaCont")[index - 1].getElementsByTagName("a").length;
				//加载城市、区县
				var provinceId, cityId;
				if(index == 1) {
					this.provinceId = id;
					this.cflag2 = true;
					this.cflag = false;
					_this.areaList = [];
					_this.cityList = [];
				} else if(index == 2) {
					this.cityId = id;
					this.cflag = true;
					_this.areaList = [];
				} else if(index == 3) {
					this.companyData.provinceId = this.provinceId;
					this.companyData.cityId = this.cityId;
					this.companyData.countyId = id;
					this.flag = false;
				}
				var url = "/api/base/region/" + id + "/queryByPid.do ";
				this.axios(url)
					.then(function(res) {
						if(res.data.status == 1) {
							if(index == 1) {
								//console.log(res.data.datas);
								_this.cityList = res.data.datas;

							} else if(index == 2) {
								_this.areaList = res.data.datas;
							}

						}
					})
					.catch(function(err) {
						console.log(err);
					})
				for(var i = 0; i < len2; i++) {
					document.querySelectorAll(".areaCont")[index - 1].getElementsByTagName("a")[i].className = "";
				}
				event.target.className = "active";
				if(index < len) {
					for(var i = 0; i < len; i++) {
						document.querySelector(".areaTab").children[i].className = "";
						document.querySelectorAll(".areaCont")[i].style.display = "none";
					}
					document.querySelector(".areaTab").children[index].className = "tactive";
					document.querySelectorAll(".areaCont")[index].style.display = "block";
				}
				var actLen = document.querySelectorAll(".areaCont .active").length;
				var txt1 = event.target.innerHTML;
				var txt2;
				if(_this.companyData.countyFullName) {

					if(index == 1) {
						var txt2 = _this.companyData.countyFullName.split("/")[0];
						if(txt1 != txt2) {
							str += txt1 + "/";
						} else {
							for(var i = 0; i < actLen; i++) {
								str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
							}
						}
					} else if(index == 2) {
						var txt2 = _this.companyData.countyFullName.split("/")[1];
						str += document.querySelectorAll(".areaCont .active")[0].innerHTML + "/";
						if(txt1 != txt2) {
							str += txt1 + "/";
						} else {
							for(var i = 1; i < actLen; i++) {
								str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
							}
						}
					} else {
						for(var i = 0; i < actLen; i++) {
							str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
						}
					}
				} else {
					for(var i = 0; i < actLen; i++) {
						str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
					}
				}
				_this.companyData.countyFullName = str;
			},
			maopao() {
				this.flag = false;
			},
			showArea() {
				event.stopPropagation();
				const _this = this;

				if(event.target.className) {
					this.flag = !this.flag;
					if(this.companyData.cityId) {
						this.cflag2 = true;
						var url = "/api/base/region/" + this.companyData.provinceId + "/queryByPid.do ";
						this.axios(url)
							.then(function(res) {
								if(res.data.status == 1) {
									_this.cityList = res.data.datas;
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					}
					if(this.companyData.countyId) {
						this.cflag = true;
						var url = "/api/base/region/" + this.companyData.cityId + "/queryByPid.do ";
						this.axios(url)
							.then(function(res) {
								if(res.data.status == 1) {
									_this.areaList = res.data.datas;
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					}
					if(_this.companyData.countyFullName) {
						var arry = _this.companyData.countyFullName.split("/");
						_this.areaVarry = arry;

					}
				}

			},
			//保存公司信息
			saveCompany() {
				//				const _this = this;
				let _this = this;
				//				const corp = JSON.parse(window.localStorage.getItem('corp'));
				let saveApplyInfo = _this.applyInfoo();
				let re = /(1[3-9]\d{9}$)/;
				let regh = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
				let reg = /^\d+$/;
				var newcompanyData = {};
				var l2 = _this.companyData.description;
				var l3 = _this.companyData.englishName;
				var l4 = _this.companyData.address;
				var l5 = _this.companyData.postCode;
				var l6 = _this.companyData.telephone;
				var l7 = _this.companyData.fax;
				var l8 = _this.companyData.uscc;
				var l9 = _this.companyData.website;
				newcompanyData.description = _this.companyData.description;
				newcompanyData.englishName = _this.companyData.englishName;
				newcompanyData.address = _this.companyData.address;
				newcompanyData.postCode = _this.companyData.postCode;
				newcompanyData.telephone = _this.companyData.telephone;
				newcompanyData.fax = _this.companyData.fax;
				newcompanyData.uscc = _this.companyData.uscc;
				newcompanyData.website = _this.companyData.website;
				newcompanyData.countyFullName = _this.companyData.countyFullName;
				newcompanyData.logoUrl = _this.companyData.logoUrl;
				newcompanyData.id = _this.companyData.id;
				newcompanyData.contact = _this.companyData.contact;
				newcompanyData.contactId = _this.companyData.contactId;

				if(_this.$refs['openNametext'].value == '') {
					_this.taitou = true;
					_this.taitou_m = "请输入抬头";
					_this.yanzhengp = false;

					//_this.$Message.error("请输入抬头")
					//return false;
				} else if(_this.$refs['openNametext'].value.length > 100) {
					_this.taitou = true;
					_this.taitou_m = "抬头不能超过100个字";
					_this.yanzhengp = false;
					//_this.$Message.error("抬头不能超过100个字")
					//return false;
				} else {
					_this.taitou = false;
					_this.yanzhen_tt = true;
				}

				if(_this.$refs['dutyParatext'].value == '') {
					//					alert("ok");
					_this.suihao = true;
					_this.suihao_m = "请输入税号";
					_this.yanzhengp = false;
					//_this.$Message.error("请输入税号")
					//return false;
				} else if(_this.$refs['dutyParatext'].value.length > 100) {
					_this.suihao = true;
					_this.suihao_m = "税号不能超过100个字";
					_this.yanzhengp = false;
					//_this.$Message.error("税号不能超过100个字")
					//return false;
				} else if(!regh.test(_this.formValidate.dutyPara)) {
					_this.suihao = true;
					_this.suihao_m = "请输入正确税号";
					_this.yanzhengp = false;
					//_this.$Message.error("请输入正确税号")
					//return false;
				} else {
					_this.suihao = false;
					_this.yanzhen_sh = true;
				}

				if(_this.$refs['mobiletext'].value == '') {
					_this.dianhua = true;
					_this.dianhua_m = "请输入联系电话";
					_this.yanzhengp = false;
					//_this.$Message.error("请输入固定电话")
					//return false;
				} else if(!reg.test(_this.formValidate.mobile)) {
					_this.dianhua = true;
					_this.dianhua_m = "联系电话只能是数字";
					_this.yanzhengp = false;
					//_this.$Message.error("手机号只能是数字")
					//return false;
				} else if(!re.test(_this.formValidate.mobile)) {
					_this.dianhua = true;
					_this.dianhua_m = "请输入正确的联系电话";
					_this.yanzhengp = false;
					//_this.$Message.error("请输入正确的手机号")
					//return false;
				} else {
					_this.dianhua = false;
					_this.yanzhen_lxdh = true;
				}
				if(_this.companyData.lstTradeAncestorIds) {
					var tradeLen = _this.companyData.lstTradeAncestorIds.length;
					newcompanyData.tradeId = _this.companyData.lstTradeAncestorIds[tradeLen - 1];
				}
				if(_this.companyData.lstServiceTradeAncestorIds) {
					var serviceTradeLen = _this.companyData.lstServiceTradeAncestorIds.length;
					newcompanyData.serviceTradeId = _this.companyData.lstServiceTradeAncestorIds[serviceTradeLen - 1];
				}

				if((l1 == null || l1 == undefined || l1 == "") || (l2 == null || l2 == undefined || l2 == "") || (l3 == null || l3 == undefined || l3 == "") || (l4 == null || l4 == undefined || l4 == "") || (l5 == null || l5 == undefined || l5 == "") || (l6 == null || l6 == undefined || l6 == "") || (l7 == null || l7 == undefined || l7 == "") || (l8 == null || l8 == undefined || l8 == "") || (l9 == null || l9 == undefined || l9 == "")) {
					//					_this.$Message.warning('带红色*为必填项');
					_this.do_no = true;
					_this.re_do = '带红色*为必填项';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);

				} else {
					if(l1.length >= 100) {
						//						_this.$Message.warning('简称，少于100字 ');
						_this.do_no = true;
						_this.re_do = '简称，少于100字';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l2.length > 500) {
						//						_this.$Message.warning('企业简介，不多于500字');
						_this.do_no = true;
						_this.re_do = '企业简介，不多于500字';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l3.length > 100) {
						//						_this.$Message.warning('英文名称，100个字符以内');
						_this.do_no = true;
						_this.re_do = '英文名称，100个字符以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l4.length > 200) {
						//						_this.$Message.warning('详细地址，200字以内');
						_this.do_no = true;
						_this.re_do = '详细地址，200字以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l5.length > 6 && isNaN(this.companyData.postCode)) {
						//						_this.$Message.warning('邮政编码：6位数字');
						_this.do_no = true;
						_this.re_do = '邮政编码：6位数字';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l6.length > 20) {
						//						_this.$Message.warning('服务电话,20字符以内');
						_this.do_no = true;
						_this.re_do = '服务电话,20字符以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l7.length > 20) {
						//						_this.$Message.warning('服务传真,20字符以内 ');
						_this.do_no = true;
						_this.re_do = '服务传真,20字符以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l8.length > 60) {
						//						_this.$Message.warning('工商执照注册号/统一社会信用代码,60字符以内');
						_this.do_no = true;
						_this.re_do = '工商执照注册号/统一社会信用代码,60字符以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else if(l9.length > 100) {
						//						_this.$Message.warning('公司网址，100个字符以内');
						_this.do_no = true;
						_this.re_do = '公司网址，100个字符以内';
						setTimeout(() => {
							_this.do_no = false;
						}, 2000);
					} else {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.companyModify,
								data: api.jsonData(newcompanyData),

							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.do_yn = true;
									_this.re_do = "修改成功";
									setTimeout(() => {
										_this.do_yn = false;

									}, 2000);

									//									_this.$Message.success('修改成功');

								} else {
									_this.do_no = true;
									_this.re_do = '请重新提交';
									setTimeout(() => {
										_this.do_no = false;

									}, 2000);

									//									_this.$Message.warning('请重新提交');
								}
							})
							.catch(function(error) {
								console.log(error);
							});
					}
				}
			},
			//图片上传
			/*handleView(url) {
				this.imgUrl = url;
				this.visible = true;
			},
			handleRemove(file) {
				// 从 upload 实例删除数据
				const _this = this;
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.attachments.forEach(function(item, index) {
					if(item.fileName == file.name && item.url == item.url) {
						_this.attachments.splice(index, 1);
					}
				})
			},*/
			/*handleSuccess(res, file, fileList) {
				file.url = res.url;
				file.name = res.fileName;
				const image = {
					fileName: res.fileName,
					fileType: res.fileSuffix,
					filePath: res.filePath,
					url: res.url,
					orderNum: fileList.length
				}
				this.companyData.logoUrl = res.url;
				this.attachments = [];
				this.attachments.push(image);
				this.logoShow = true;
				this.uploadFlag = false;
				this.$Message.success("上传成功");

			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if(!check) {
					this.$Notice.warning({
						title: '最多只能上传 1 张图片。'
					});
				}
				return check;
			},*/
			uploadShow() {
				if(this.logoShow) {
					this.uploadFlag = true
				}
			},
			uploadHide() {
				if(this.logoShow) {
					this.uploadFlag = false
				}
			},

			//分类
			sel_flchu() { //下拉弹出
				let _this = this;
				_this.sel_fltan = !_this.sel_fltan;
				_this.sel_jbtan = false;
				_this.sel_qytan = false;
			},
			fenlei_click(item) { //选择
				let _this = this;
				_this.selfenlei = item.name;
				_this.sel_fltan = !_this.sel_fltan;
				_this.sel_jbtan = false;
				_this.sel_qytan = false;
				_this.push_fenlei = item.id;
			},
			addfenlei() { //添加框弹出
				let _this = this;
				_this.addfl_tan = true;
			},
			cancel() { //添加框关闭(包括区域，级别，所属)
				let _this = this;
				_this.addfl_tan = false;
				_this.addjb_tan = false;
				_this.addqy_tan = false;
			},
			confirm(name) {
				const _this = this;
				let nameok;
				let codeok;
				if(_this.compileForm.name == '') {
					_this.fenleikuang_name = true;
					nameok = false;
				} else {
					nameok = true;
				}
				if(_this.compileForm.code == '') {
					this.fenleikuang_code = true;
					codeok = false;
				} else {
					codeok = true;
				}
				if(nameok && codeok) {
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.category + api.categoryPostAddRoot,
							data: api.jsonData(_this.compileForm)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.addfl_tan = false;
								_this.json_fenlei.push(res.data.datas);
								_this.compileForm.name = '';
								_this.compileForm.parentId = '';
								_this.compileForm.EPR = '';
								_this.compileForm.code = '';
								_this.compileForm.description = '';

							}
						})
				}

			},

			//级别
			sel_jbchu() { //下拉弹出
				let _this = this;
				_this.sel_jbtan = !_this.sel_jbtan;
				_this.sel_fltan = false;
				_this.sel_qytan = false;
			},
			jibie_click(item) { //选择
				let _this = this;
				_this.seljibie = item.name;
				_this.sel_jbtan = !_this.sel_jbtan;
				_this.sel_fltan = false;
				_this.sel_qytan = false;
				_this.push_jibie = item.id;
			},
			addjibie() { //添加框弹出
				let _this = this;
				_this.addjb_tan = true;
			},
			confirm2(name) {
				const _this = this;
				let nameok;
				let codeok;
				if(_this.compileForm2.name == '') {
					_this.jibiekuang_name = true;
					nameok = false;
				} else {
					nameok = true;
				}
				if(_this.compileForm2.code == '') {
					this.jibiekuang_code = true;
					codeok = false;
				} else {
					codeok = true;
				}
				if(nameok && codeok) {
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.clientLevel + api.clientLevelAdd,
							data: api.jsonData(_this.compileForm2)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.addjb_tan = false;
								_this.json_jibie.push(res.data.datas);
								_this.compileForm2.name = '';
								_this.compileForm2.code = '';
								_this.compileForm2.description = '';

							}
						})
				}

			},
			//区域
			sel_qychu() { //下拉弹出
				let _this = this;
				_this.sel_qytan = !_this.sel_qytan;
				_this.sel_jbtan = false;
				_this.sel_fltan = false;
			},
			quyu_click(item) { //选择
				let _this = this;
				_this.selquyu = item.name;
				_this.sel_qytan = !_this.sel_qytan;
				_this.sel_jbtan = false;
				_this.sel_fltan = false;
				_this.push_quyu = item.id;
			},
			addquyu() { //添加框弹出
				let _this = this;
				_this.addqy_tan = true;
			},
			confirm3(name) {
				const _this = this;
				let nameok;
				let codeok;
				if(_this.compileForm3.name == '') {
					_this.quyukuang_name = true;
					nameok = false;
				} else {
					nameok = true;
				}
				if(_this.compileForm3.code == '') {
					this.quyukuang_code = true;
					codeok = false;
				} else {
					codeok = true;
				}
				if(nameok && codeok) {
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.region + api.regionAddRoot,
							data: api.jsonData(_this.compileForm3)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.addqy_tan = false;
								_this.json_quyu.push(res.data.datas);
								_this.compileForm3.name = '';
								_this.compileForm3.code = '';
								_this.compileForm3.description = '';

							}
						})
				}

			},
		},
		created() {
			const _this = this;
			//加载省份
			var url = "/api/base/region/9999/queryByPid.do";
			this.axios(url)
				.then(function(res) {
					if(res.data.status == 1) {
						var obj = res.data.datas;
						for(var o in obj) {
							_this.proviceKey.unshift(o);
							_this.provice.unshift(obj[o]);
						}
					}
				})
				.catch(function(err) {
					console.log(err);
				})
			//查询公司信息
			this.axios(api.queryMe)
				.then(function(res) {
					if(res.data.status == 1) {
						_this.companyData = res.data.datas;
						_this.externalContactValue = _this.companyData.contactUser;
						console.log(_this.companyData);
						//判断是否存在公司logo
						if(_this.companyData.logoUrl == null && _this.companyData.logoUrl == undefined && _this.companyData.logoUrl == "") {
							_this.uploadFlag = true
							_this.logoShow = false;
						} else {
							_this.uploadFlag = false;
							_this.logoShow = true;
						}
					}
				})
				.catch(function(err) {
					console.log(err);
				})
			//加载行业
			this.axios(api.queryIndustry)
				.then(function(res) {
					if(res.data.status == 1) {
						_this.industryData = res.data.datas;
					}

				})
				.catch(function(err) {
					console.log(err);
				});
			//查询对外联系人
			var contactData = {};
			contactData.pageStart = this.pageInfo.pageStart;
			contactData.pageNums = this.pageInfo.pageNums;
			this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.queryContact,
					data: api.jsonData(contactData),

				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.externalContact = res.data.datas.rows;
						_this.pageInfo.count = res.data.datas.total;
					} else {
						//						_this.$Message.warning(res.data.message);
						_this.do_no = true;
						_this.re_do = res.data.message;
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);

					}
				})
				.catch(function(error) {
					console.log(error);
				});

			//客户分类查询
			this.axios(api.category + api.categoryGetRoots)
				.then(function(res) {
					_this.json_fenlei = res.data.datas;
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})

			//客户级别查询
			this.axios(api.clientLevel + api.clientLevelqueryAll)
				.then(function(res) {
					_this.json_jibie = res.data.datas;
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})

			//所属区域查询
			this.axios(api.region + api.regionGetRoot)
				.then(function(res) {
					_this.json_quyu = res.data.datas;
				})
				.catch(function(err) {
					console.log(err);
				})

		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		/*mounted() {
			this.uploadList = this.$refs.upload.fileList;
		}*/
	}
</script>
<style scoped>
	.localimport {
		font-size: 14px;
	}
	
	.externalSearch {
		overflow: auto;
		margin-bottom: 20px;
	}
	
	.externalSearch .externalnameInp {
		width: 300px;
	}
	
	.formContact {
		position: relative;
	}
	
	.formContact .contactValue {
		float: left;
		width: 32px;
		height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border: 1px solid #d7dde4;
		border-radius: 4px;
		color: #657180;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: pointer;
		text-align: center;
	}
	
	.formContact .contactValue:hover {
		border: 1px solid #39f;
	}
	
	.formContact .contactBox {
		display: none;
		position: absolute;
		left: 82px;
		top: 0;
		z-index: 99;
		width: 500px;
		padding: 10px 20px;
		overflow: auto;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
	}
	
	.compInfoForm .area {
		width: 370px;
		position: absolute;
		left: 112px;
		top: 232px;
		margin: 5px 0;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		z-index: 900;
	}
	
	.compInfoForm .areaTab {
		width: 100%;
		height: 28px;
		line-height: 28px;
	}
	
	.compInfoForm .areaTab span {
		float: left;
		width: 33.33%;
		height: 100%;
		z background-color: #f0f0f0;
		border-left: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
	}
	
	.compInfoForm .areaTab span:first-child {
		border: 0;
	}
	
	.compInfoForm .areaTab .tactive {
		background-color: #fff;
		color: #f60;
	}
	
	.compInfoForm .areaCont {
		display: none;
		padding: 0 28px;
	}
	
	.compInfoForm .areaProv {
		display: block;
	}
	
	.compInfoForm ul {
		overflow: auto;
		/*padding: 20px 0 20px 11px;*/
	}
	
	.compInfoForm ul li {
		min-height: 32px;
		display: flex;
		align-items: center;
	}
	
	.compInfoForm ul a {
		display: inline-block;
		color: #4D4D4D;
		padding: 0 10px;
		outline: 0;
		text-decoration: none;
		white-space: nowrap;
		margin-right: 2px;
		line-height: 2;
	}
	
	.compInfoForm ul .active {
		background-color: #f60;
		color: #fff;
		border-radius: 2px
	}
	
	.compInfoForm {
		margin-top: 20px;
		overflow: auto;
		position: relative;
	}
	
	.compInfoFormBox {
		position: absolute;
		left: 500px;
		top: 2px;
	}
	
	.compInfoForm .title {
		margin-left: -30px;
		margin-bottom: 20px;
		clear: both;
		font-size: 16px;
		color: #39f;
	}
	
	.compInfoForm .formItem {
		width: 100%;
		margin-bottom: 18px;
		float: left;
		clear: both;
		font-size: 13px;
	}
	
	.compInfoForm .ivu-input-wrapper {
		width: 370px;
	}
	
	.compInfoForm .formItem2 {
		float: left;
		width: 282px;
		margin-right: 20px;
		margin-bottom: 18px;
	}
	
	.compInfoForm .formItem .word {
		line-height: 32px;
	}
	
	.compInfoForm .formItem .word .s25 {
		float: left;
		width: 25%;
	}
	
	.compInfoForm .industry {
		float: left;
		width: 370px;
	}
	
	.compInfoForm .industry .ivu-input-wrapper {
		width: 100%;
	}
	
	.compInfoForm .industry li {
		min-height: auto;
	}
	
	.compInfoForm .label {
		float: left;
		width: 193px;
		padding-right: 12px;
		line-height: 32px;
		text-align: right;
		font-size: 14px;
	}
	
	.compInfoForm .star {
		color: #ff0000;
	}
	
	.compInfoForm .upFile {
		float: left;
		width: 80px;
		height: 80px;
		line-height: 80px;
		position: absolute;
		left: 82px;
		top: 0;
		border: 1px dashed #ddd;
		text-align: center;
		font-size: 20px;
	}
	
	.compInfoForm .formLogo {
		display: flex;
		height: 95px;
		overflow: hidden;
	}
	
	.compInfoForm .ivu-upload-list {
		display: none;
	}
	
	.compInfoForm .formItem .logo {
		width: 80px;
		height: 80px;
		visibility: visible;
	}
	
	.compInfoForm .formItem .logoActive {
		visibility: visible
	}
	
	.uploaddiv {
		position: relative;
		width: 300px;
		height: 95px;
	}
	
	.uploadbtn {
		width: 300px;
		height: 95px;
		background: url(../../assets/img/logoupload.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
		margin-left: 0;
	}
	
	.uploadbtn2 {
		width: 70%;
		height: 50px;
		background-color: #f8f9fd;
		border: none;
	}
	
	#imgupload_zhe_div {
		position: absolute;
		top: 0;
		width: 300px;
		height: 95px;
		display: none;
	}
	
	.imgshow {
		width: 300px;
		height: 95px;
		display: block;
	}
	
	#imgupload_zhe_div:hover .imgupload_zhe {
		display: block;
	}
	
	.imgupload_zhe {
		position: absolute;
		top: 0;
		width: 300px;
		height: 95px;
		background-color: rgba(0, 0, 0, 0.4);
		display: none;
	}
	
	.imgupload_zhediv {
		width: 300px;
		height: 95px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		text-align: center;
		margin: 0!important;
		align-content: space-around;
	}
	
	.imgupload_zhediv i {
		margin-top: 11px;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
	}
	
	.rightBox_but div {
		width: 600px;
		margin-left: -260px;
		position: relative;
		top: 100px;
		left: 45%;
	}
	
	.rightBox_but div img {
		width: 100%;
	}
	
	textarea.ivu-input {
		height: 178px!important;
	}
	
	.add_qyhy {
		color: #00c1de;
	}
	
	.add_qyhy:hover {
		cursor: pointer;
	}
	
	.addqu {
		float: left;
		display: flex;
	}
	
	.addqu .addqukuang {
		display: inline-block;
		width: 440px;
		height: 100px;
		border: 1px solid #ccd9e6;
		overflow-y: scroll;
		padding-bottom: 8px;
	}
	
	.addqu .addqukuang2 {
		height: auto;
	}
	
	.addqu .addqukuang .addqukuangnr {
		border: 1px solid #ccd9e6;
		margin: 6px;
		margin-right: 0;
		margin-bottom: 0;
		display: inline-block;
		padding: 6px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangf {
		font-size: 12px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangf:hover {
		cursor: pointer;
		color: #00c1de;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangnr_del {
		margin-left: 6px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangnr_del:hover {
		cursor: pointer;
		color: #00c1de;
	}
	
	.addqu button {
		width: 90px;
		height: 30px;
		margin-left: 15px;
		border: none;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 2px;
		color: #415161;
	}
	
	.qysstan {
		width: 500px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999;
		border: 1px solid #000000;
		z-index: 999;
		padding: 20px;
		background-color: #fff;
		margin-left: -250px;
		margin-top: -250px;
	}
	
	.add_canpinkuang {
		width: 550px;
		float: left;
	}
	
	.add_canpinkuang .add_canpinkuang_input {
		display: flex;
	}
	
	.add_canpinkuang .add_canpinkuang_input button {
		width: 50px;
		height: 30px;
		border: none;
		border: 1px solid #ccd9e6;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 0 2px 2px 0;
		color: #415161;
	}
	
	.cpkuang {
		display: inline-block;
	}
	
	.cpkuang div {
		display: inline-block;
		padding: 5px 5px;
		border: 1px solid #ccd9e6;
		margin-right: 5px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #415161;
	}
	
	.cpkuang div span {
		margin-left: 5px;
	}
	
	.cpkuang div span:hover {
		color: #00c1de;
		cursor: pointer;
	}
	
	.input_tel input {
		display: inline-block;
		width: 215px;
		height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border: 1px solid #dddee1;
		border-radius: 4px;
		color: #495060;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		margin-right: 10px;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	
	.qysstan_box {
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0);
	}
	
	.select_js {
		font-size: 14px;
		position: relative;
	}
	
	.seljuese {
		width: 440px;
		height: 34px;
		border: 1px solid #ccd9e6;
		border-radius: 5px;
		text-align: right;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.seljuese:hover {
		border-color: #00cbea;
	}
	
	.seljuese img {
		margin-right: 10px;
		width: 16px;
		height: 9px;
	}
	
	.seltan {
		width: 440px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
		background-color: #fff;
		position: absolute;
		top: 35px;
		left: 194px;
		border-radius: 5px;
		max-height: 280px;
		z-index: 100;
		/*overflow: hidden;
		overflow-y: scroll;*/
	}
	
	.seltan div {
		padding-left: 10px;
		height: 40px;
		display: flex;
		align-items: center;
	}
	
	.seltan div:hover {
		background-color: #eff1f8;
		color: #1ab3df;
	}
	
	.selinput {
		border: none;
		background-color: #fff;
		width: 270px;
		height: 30px;
		padding-left: 10px;
	}
	
	.import_addimg {
		background: url(../../assets/img/import_addn.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		width: 14px!important;
		height: 14px!important;
		padding: 0!important;
		margin-right: 5px;
	}
	
	.seltan div:hover .import_addimg {
		background: url(../../assets/img/import_add.png) no-repeat;
		background-size: 100% 100%;
		width: 14px;
		height: 14px;
	}
	
	.fenleikuang {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -196px 0 0 -235px;
		background-color: #fff;
		z-index: 400;
		border: 1px solid #1ab3df;
		box-shadow: 0px 0px 30px rgba(0, 198, 226, 0.5);
		font-size: 14px;
	}
	
	.fenleikuang .fenleikuang_header {
		background-color: #eef1f9;
		padding: 20px 0 20px 20px;
	}
	
	.fenleikuang .fenleikuang_section {
		padding: 0 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 25px;
	}
	
	.fenleikuang .fenleikuang_footer {
		background-color: #eef1f9;
		padding: 20px 0;
		display: flex;
		justify-content: center;
	}
	
	.fenleikuang .fenleikuang_footer button {
		width: 89px;
		height: 33px;
		font-size: 14px;
	}
	
	.fenleikuang .fenleikuang_footer button:nth-child(2) {
		border: 1px solid #d9d9d9;
		margin-left: 30px;
	}
	
	.fenleikuang .fenleikuang_footer button:nth-child(2):hover {
		border-color: #00cbea;
		color: #00cbea;
	}
	
	.fontitem {
		display: flex;
		align-items: center;
		margin-bottom: 25px;
		position: relative;
	}
	
	.fontitem span:first-of-type {
		width: 75px;
		display: inline-block;
		text-align: right;
		margin-right: 15px;
	}
	
	.errotip {
		position: absolute;
		top: 34px;
		left: 83px;
		color: red;
	}
	
	.showbtn {
		color: #0099cc;
		position: relative;
		margin-left: 58px;
		font-size: 14px;
		/*height: 30px;*/
		/*background: #000;*/
		margin-bottom: 20px;
		display: inline-block;
	}
	
	.showbtn:hover:before {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: #0099cc;
	}
	
	.form_ul {
		width: 76%;
	}
	
	.form_ul li {
		width: 100%;
		display: flex;
		margin-top: 25px;
		align-items: center;
		position: relative;
	}
	
	.form_ul li label {
		display: block;
		width: 177px;
		padding-right: 10px;
		text-align: right;
		font-size: 14px;
	}
	
	.form_ul li input {
		width: 440px;
		height: 34px;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 10px 10px;
		font-size: 14px;
	}
	
	.form_ul li .errotips {
		position: absolute;
		bottom: -20px;
		left: 187px;
		color: red;
		font-size: 14px;
	}
	
	.form_ul li input:focus {
		border-color: #00d8f8;
		outline: none;
	}
	
	h4 {
		margin-left: 5px;
		font-size: 15px;
		padding-left: 15px;
		color: #415161;
		border-left: 3px solid #ccd9e6;
		font-weight: normal;
	}
</style>