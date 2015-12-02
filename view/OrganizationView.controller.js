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
        //Create an instance of the table control
        console.log(divIndex2+"+++"+obj);
        if(divIndex2!=9999){
            var standardListItem = new sap.m.StandardListItem({title:obj.name});
            standardListItem.placeAt("com_content_table_"+divIndex+"_"+divIndex2);
        }else{
            var standardListItem = new sap.m.StandardListItem({title:obj.name});
            standardListItem.placeAt("com_content_table_"+divIndex);
        }
        
        // sap.ui.controller("com.zhenergy.organization.view.OrganizationView")._drawDiv(depArray,'#strt_block_table');
        var children = obj.list;

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
	    //Create a MenuButton Control
        var oMenuButton = new sap.ui.commons.MenuButton("menuButton",{text: "选择组织单元"}); 
        //Create the menu
        var oMenu1 = new sap.ui.commons.Menu();
        //Create the items and add them to the menu
        var oMenuItem1 = new sap.ui.commons.MenuItem({text: "New",tooltip: "1001",select:this.handleMenuItemPress}); //Icon must be not larger than 16x16 px
        oMenu1.addItem(oMenuItem1);
        var oMenuItem2 = new sap.ui.commons.MenuItem({text: "Delete",tooltip: "1002",select:this.handleMenuItemPress});
        oMenu1.addItem(oMenuItem2);
        var oMenuItem3 = new sap.ui.commons.MenuItem({text: "Properties",tooltip: "1003",select:this.handleMenuItemPress});
        oMenu1.addItem(oMenuItem3);
        //Create a sub menu for item 1
        var oMenu2 = new sap.ui.commons.Menu();
        oMenuItem1.setSubmenu(oMenu2);
        //Create the items and add them to the sub menu
        var oMenuItem4 = new sap.ui.commons.MenuItem({text: "TXT",tooltip: "1004"});
        oMenu2.addItem(oMenuItem4);
        var oMenuItem5 = new sap.ui.commons.MenuItem({text: "RAR",tooltip: "1005"});
        oMenu2.addItem(oMenuItem5);
        
        //Create a sub menu for item 1
        var oMenu3 = new sap.ui.commons.Menu();
        oMenuItem2.setSubmenu(oMenu3);
        //Create the items and add them to the sub menu
        var oMenuItem6 = new sap.ui.commons.MenuItem({text: "ABC"});
        oMenu3.addItem(oMenuItem6);
        var oMenuItem7 = new sap.ui.commons.MenuItem({text: "DEF"});
        oMenu3.addItem(oMenuItem7);
        
        
        //Attach the Menu to the MenuButton
        oMenuButton.setMenu(oMenu1);
        //Attach an event to raise an alert when an item is selected.
        // oMenuButton.attachItemSelected(function (oEvent){
        //     sap.ui.getCore().byId("input1").setValue(oEvent.getParameter("item").getText() );
        // });
        
        //Attach the MenuButton to the page
        oMenuButton.placeAt("zuZhiDanYanBianMaForm");
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
        	    var dateValue = sap.ui.getCore().byId("dateQuery").getValue();
        	    var year = dateValue.substring(0,4);
        	    var month = dateValue.substring(5,7);
        	    var day = dateValue.substring(8,10);
        	    var dateNew = year+month+day;
        	    var jiBie = sap.ui.getCore().byId("ComboBox1").getSelectedKey();
        	    var bianHao = sap.ui.getCore().byId("input0").getValue();
        	    
                var depArray = [
                	{name:"总经理工作部",list:[{name:"二级部门"},{name:"三级部门"}]},
                	{name:"人力资源部",list:[{name:"二级部门"},{name:"三级部门"}]},
                	{name:"燃料部",list:[{name:"二级部门"},{name:"三级部门"}]}
                ];
                var htmls = '<div class="strt-name-div" style="margin-top: 7px;padding: 5px;"><span>公司领导</span><span style="padding-left:20px" id="com_content_title"></span></div><div class="line-v" ><span></span></div><div class="strt-block" id="strt_block_table" ><div style="clear:both;"></div></div>';
                $('#htmlstrtpart').html(htmls);                
                var num =20;
                var len = depArray.length;
                if(len>5){
                    num = num* len;
                    var sty = num+"%";
                    document.getElementById('strt_block_table').style.width=sty;
                }    
                sap.ui.controller("com.zhenergy.organization.view.OrganizationView")._drawDiv(depArray,'#strt_block_table');

        	}
        });
        // attach it to some element in the page
        oButton1.placeAt("queryButton");
	},
	_drawDiv:function(depArray,div){
	    var html = "";
	        for(var i=0;i<depArray.length;i++){
                if(i==0){
                        var list = depArray[i].list;
                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div>';
                        if(list!=undefined){
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                            }
                            html+='</div>';
                        }
                        
                }else if(i==depArray.length-1){
                        var list = depArray[i].list;
                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div>';
                        if(list!=undefined){
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                            }
                            html+='</div>';
                        }
                    
                }else{
                        // console.log("dddd");
                        var list = depArray[i].list;
                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div>';
                        // console.log("dddd");
                        if(list!=undefined){
                            
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                            }
                            html+='</div>';
                        }
                    
                }
                html+='</div>';
            }
            console.log(html);
        $(div).html(html);
        for(var j=0;j<depArray.length;j++){
                this._drawTable(j,9999,depArray[j]);
                if(depArray[j].list!=undefined){
                    for(var l=0;l<depArray[j].list.length;l++){
                        this._drawTable(j,l,depArray[j].list[l]);
                    }
                }
        }
	}

});