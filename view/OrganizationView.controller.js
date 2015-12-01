sap.ui.controller("com.zhenergy.organization.view.OrganizationView", {

	onInit: function() {
	    this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function() {
			    this._query();
			}, this)
		});
	},
	_query:function(){
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
        // Create a ComboBox
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
        // create a simple button with some text and a tooltip only
        var oButton1 = new sap.ui.commons.Button({
        	text : "查询",
        	tooltip : "查询",
        	press : function(oEvent) {
        	    var dateValue = sap.ui.getCore().byId("dateQuery").getValue();
        	    var year = dateValue.substring(0,4);
        	    var month = dateValue.substring(5,7);
        	    var day = dateValue.substring(8,10);
        	    var dateNew = year+month+day;
        	    var jiBie = sap.ui.getCore().byId("ComboBox1").getSelectedKey();
        	    var html = "";
                var depArray = [
                	{deptName:"总经理工作部",num:"1"},
                	{deptName:"人力资源部",num:"2"},
                	{deptName:"物资供应部",num:"3"},
                	{deptName:"财务部",num:"4"},
                	{deptName:"计划合同部",num:"5"},
                	{deptName:"安质部",num:"6"},
                	{deptName:"燃料部",num:"99"}
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
                for(var i=0;i<depArray.length;i++){
                    
                    if(i==0){
                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }else if(i==depArray.length-1){
                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }else{
                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }
                }
                $('#strt_block_table').html(html);
                for(var j=0;j<depArray.length;j++){
                    sap.ui.controller("com.zhenergy.organization.view.OrganizationView")._drawTable(j,depArray[j]);
                }
        	    
        	}
        });
        // attach it to some element in the page
        oButton1.placeAt("queryButton");
        
// 		//create the Tree control
// 		var oTree = new sap.ui.commons.Tree("tree");
// 		oTree.setTitle("Explorer");
// 		oTree.setWidth("100%");
// 		oTree.setHeight("auto");
// 		oTree.setShowHeaderIcons(true);
// 		oTree.setShowHorizontalScrollbar(false);

// 		//create Tree Nodes
// 		var oNode1 = new sap.ui.commons.TreeNode("node1", {text:"Computer", icon:"images/system.gif", expanded: true});
// 		var oNode2 = new sap.ui.commons.TreeNode("node2", {text:"OSDisk (C:)", icon:"images/disk.gif", expanded: true});
// 		var oNode3 = new sap.ui.commons.TreeNode("node3", {text:"Program Files", icon:"images/folder.gif"});
// 		var oNode4 = new sap.ui.commons.TreeNode("node4", {text:"Windows", icon:"images/folder.gif"});
// 		var oNode5 = new sap.ui.commons.TreeNode("node5", {text:"Mass Storage (USB)", icon:"images/disk.gif"});
// 		var oNode6 = new sap.ui.commons.TreeNode("node6", {text:"Network", icon:"images/network.gif"});

// 		oNode1.addNode(oNode2);
// 		oNode1.addNode(oNode5);

// 		oNode2.addNode(oNode3);
// 		oNode2.addNode(oNode4);

// 		//add Tree Node root to the Tree
// 		oTree.addNode(oNode1);
// 		oTree.addNode(oNode6);

// 		oTree.placeAt("zuZhiDanYanBianMaForm");
	},
	_drawTable:function(divIndex,obj){
	    var aData = [
        	{lastName: "Dente", num1: "23", num2: "15"},
        	{lastName: "Friese", num1: "2", num2: "23"},
        	{lastName: "Mann", num1: "43", num2: "4"},
        	{lastName: "Schutt", num1: "5", num2: "3"},
        	{lastName: "Open", num1: "66", num2: "6"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Turner", num1: "9", num2: "3"}
        ];
        
        //Create an instance of the table control
        var oTable = new sap.ui.table.Table({
        	title: obj.deptName+" "+obj.num,
        	visibleRowCount: 10
        });
        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗位名称"}),
        	template: new sap.ui.commons.TextView().bindProperty("text", "lastName"),
        	width: "15px"
        });

        oTable.addColumn(oColumn);
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "职位"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "num1"),
        	width: "12px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗级"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "num2"),
        	width: "12px"
        }));
        
        //Create a model and bind the table rows to this model
        var oModel = new sap.ui.model.json.JSONModel();
        // if(divIndex===1){
        //   aData=  [
        // 	{lastName: "Dente", num1: "21", num2: "6"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Turner", num1: "24", num2: "4"}
        // ];
        // }
        oModel.setData({modelData: aData});
        oTable.setModel(oModel);
        oTable.bindRows("/modelData");
        oTable.placeAt("com_content_table_"+divIndex);
	}

});