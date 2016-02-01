sap.ui.controller("com.zhenergy.organization.view.OrganizationView", {

	onInit: function() {
	    this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function() {
			    this._query();
			}, this)
		});
	},
	_query:function(){
	    //create date
	    this._drawDatePickers();
        //create input
        this._drawTree();
        // Create a ComboBox
        this._drawComboBox();
        // create a simple button with some text and a tooltip only
       this._drawButton();
	},
	_drawTable:function(divIndex,divIndex2,obj){
        if(divIndex2!=9999){
            var standardListItem = new sap.m.StandardListItem({title:obj.name});
            standardListItem.placeAt("com_content_table_"+divIndex+"_"+divIndex2,"only");
        }else{
            var standardListItem = new sap.m.StandardListItem({title:obj.name});
            standardListItem.placeAt("com_content_table_"+divIndex,"only");
        }
	},
	_drawDatePickers:function(){
		// create DatePickers and bind to model
	    var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
        	dateValue: new Date()
        });
        sap.ui.getCore().setModel(oModel);
        (new sap.ui.commons.DatePicker("dateQuery",{
        	width: "12em",
        	value:{ 
                path: "/dateValue",
        		type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd", strictParsing: true})
        	}
        })).placeAt("dataForm");    
	},
	_drawComboBox:function(){
	    var oComboBox1 = new sap.ui.commons.ComboBox("ComboBox1");
        oComboBox1.setEditable(true);
        oComboBox1.setValue("二级");
        oComboBox1.setWidth("150px");
        var oItem = new sap.ui.core.ListItem({text: "organization2", key: "2"});
        oItem.setText("二级");
        oComboBox1.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text: "organization3", key: "3"});
        oItem.setText("三级");
        oComboBox1.addItem(oItem);
        // Attach the ComboBox to the page
        oComboBox1.placeAt("shuChuCengJiForm");
	},
	_drawTree:function(){
	    // create a simple Input field
	    var oInput0 = new sap.ui.commons.TextField('input0',{width:"80px",enabled:false});
        oInput0.placeAt("textFieldForm0");
        var oInput1 = new sap.ui.commons.TextField('input1',{enabled:false});
        oInput1.placeAt("textFieldForm");
        var oButton1 = new sap.ui.commons.Button({
            	text : "选择组织单元",
            	press : function(oEvent) {
            	    var oInput0 = sap.ui.getCore().byId("input0");  
            	    var oInput1 = sap.ui.getCore().byId("input1"); 
            	    var oDialog1 = new sap.ui.commons.Dialog();  // Dialog弹出窗
            	    oDialog1.setWidth("500px");
                	oDialog1.setTitle("选择组织单元");
                	var oTreeTable = new sap.ui.table.TreeTable({   //  TreeTable
                         columns : [ 
                         new sap.ui.table.Column({  
                         label : "Name", 
                         template : "Name"  
                         })],  
                         selectionMode : sap.ui.table.SelectionMode.Single,  
                         enableColumnReordering : true,
                         selectionBehavior:sap.ui.table.SelectionBehavior.RowOnly,
                         rowSelectionChange:function(oEvent){      // Click 事件
                            //  var sPath = oEvent.getParameters().cellControl.mBindingInfos.text.binding.oContext.sPath;
                            //  var sPats = sPath.split("'");
                            //  var text = oEvent.getParameters().cellControl.mProperties.text;
                             var sPath = oEvent.getParameters().rowContext.sPath;
                             var data  = oModel.getProperty(sPath);
                             oInput0.setValue(data.Id);
                             oInput1.setValue(data.Name);
                             oDialog1.close();
                         }
                    }); 
                    oTreeTable.setColumnHeaderVisible(false);
                    var sServiceUrl = "/sap/opu/odata/SAP/ZHRMAP_SRV/";//  /sap/opu/odata/sap/ZBILLYTREETABLE01_SRV/
                    ///sap/opu/odata/SAP/ZHRMAP_SRV/
                    var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, { useBatch : true });
                    oTreeTable.setModel(oModel);  
                     //annotation service binding  
                     oTreeTable.bindRows({  
                     path : "/OM_ORG_TREE_SET",  
                     parameters : {  
                     countMode: "Inline",  
                     numberOfExpandedLevels : 0  
                     }  
                     });
                	
                	
                	oDialog1.addContent(oTreeTable);
                	oDialog1.open();
            	    
            	}
            });
            oButton1.placeAt("zuZhiDanYanBianMaForm");
	},
	handleMenuItemPress:function(oEvent){
	     sap.ui.getCore().byId("input0").setValue(oEvent.getParameter("item").getTooltip());
	     sap.ui.getCore().byId("input1").setValue(oEvent.getParameter("item").getText() );
	},
	_drawButton:function(){
	     var oButton1 = new sap.ui.commons.Button({
        	text : "查询",
        	tooltip : "查询",
        	width:"100px",
        	press : function() {
        	    var dateId = sap.ui.getCore().byId("dateQuery");
        	    var dateValue = dateId.getValue();
        	    var year = dateValue.substring(0,4);
        	    var month = dateValue.substring(5,7);
        	    var day = dateValue.substring(8,10);
        	    var dateNew = year+month+day;
        	    var jiBie = sap.ui.getCore().byId("ComboBox1").getSelectedKey();
        	    var bianHao = sap.ui.getCore().byId("input0").getValue();
                //   配置服务器
				var sServiceUrl = "/sap/opu/odata/SAP/ZHRMAP_SRV/";
                var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
                sap.ui.getCore().setModel(oModel);
                var jModel = new sap.ui.model.json.JSONModel();
                var mParameters = {};
                mParameters['async'] = true;
                mParameters['success'] = jQuery.proxy(function(data) {
                    var results = data.results;
                    if(results.length>0){
                        var depArrs = eval('(' + results[0].Retstr + ')');
                        var depArray =   depArrs.list;//第二层
                        if(depArray!=undefined){
                            var htmls = '<div class="" style="display:inline-block;width: 150px;margin-top: 7px;padding: 5px;"><span id="nameHead"></span></div><div class="line-v" ><span></span></div><div class="strt-block" id="strt_block_table" ><div style="clear:both;"></div></div>';
                            $('#htmlstrtpart').html(htmls);
                            var heads = new sap.m.StandardListItem({title:depArrs.name});
                            heads.placeAt("nameHead","only");
                            //第三层
                            var num =25;
                            var nums=0;
                            var len=1;
                            var count=0;
                            if(depArray!=null){
                                len =depArray.length;
                                for(var i=0;i<depArray.length;i++){
                                    if(depArray[i].list!=null){
                                        nums+=depArray[i].list.length;
                                    }else{
                                        count++;
                                    }
                                }
                            }
                            if(nums!=0){
                              len=count+nums; 
                            }
                            num = num*len;
                            if(num<100){
                                num=100;
                            }
                            var sty = num+"%";
                            document.getElementById('strt_block_table').style.width=sty;
                            sap.ui.controller("com.zhenergy.organization.view.OrganizationView")._drawDiv(depArray,'#strt_block_table');
                        }else{
                           $('#htmlstrtpart').empty(); 
                           $("#strt_block_table").empty();
                           sap.m.MessageToast.show("无数据显示"); 
                        }    
                    }else{
                        $('#htmlstrtpart').empty(); 
                        $("#strt_block_table").empty();
                        sap.m.MessageToast.show("数据返回异常");
                    }
                    
                    
                    
                });
                mParameters['error'] = jQuery.proxy(function(data) {
                    sap.m.MessageToast.show("网络连接失败，请重试");
                }, this);
                dateId.setValue(dateValue);
                if(dateValue==""){
                    sap.m.MessageToast.show("查询日期必填");
                    return;
                }
                if(jiBie==""){
                    sap.m.MessageToast.show("输出级别必填");
                    return;
                }
                if(bianHao==""){
                    sap.m.MessageToast.show("组织单元必填");
                    return;
                }
                
                oModel.read("/OM_ORGSTRU_SET/?$filter=Objid eq '"+bianHao+"' and Begda eq '"+dateNew+"' and ExpandLevel eq "+jiBie+"",mParameters);///sap/opu/odata/SAP/ZHRMAP_SRV/OM_ORGSTRU_SET?$filter=Objid eq '10003001'
                //"/OM_ORGSTRU_SET/?$filter=Objid eq '"+bianHao+"' and Begda eq '"+dateNew+"'"
        	}
        });
        // attach it to some element in the page
        oButton1.placeAt("queryButton");
	},
	_drawDiv:function(depArray,div){
	    var html = "";
	        for(var i=0;i<depArray.length;i++){
	            var list = depArray[i].list;
	            html+='<div class="strt-part">';
                if(i==0&&depArray.length==1){
                    html+='<span class="line-h"></span>';
                }else if(i==0&&depArray.length!=1){
                    html+='<span class="line-h line-h-r"></span>';
                }else if(i==depArray.length-1){
                    html+='<span class="line-h line-h-l"></span>';
                }else{
                    html+='<span class="line-h line-h-c"></span>';
                }
                html+='<div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div>';
                html=this.onHtml(html, list,i);
                html+='</div>';
            }
            // console.log(html);
        $(div).html(html);
        for(var j=0;j<depArray.length;j++){
                this._drawTable(j,9999,depArray[j]);
                if(depArray[j].list!=undefined){
                    for(var l=0;l<depArray[j].list.length;l++){
                        this._drawTable(j,l,depArray[j].list[l]);
                    }
                }
        }
	},
	onHtml:function(html,list,i){
	    if(list!=undefined){
            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                for(var k=0;k<list.length;k++){
                    if(k==0&&list.length==1){
                        html+='<div class="strt-part"><span class="line-h "></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                    }else if(k==0&&list.length>1){
                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                    }else if(k==list.length-1){
                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                    }else{
                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                    }
                }
            html+='</div>';
        }
        return html;
	}

});