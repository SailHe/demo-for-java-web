/*必须等待网页中所有东西都加载完毕后才会执行(如果有多条类似语句的话只会执行后一句)
    window.onload = function () {}
//所有dom结点绘制完毕后就执行(可能与dom有关联的东西并未加载完)
jQuery(document).ready(function () {
   var $cr = $("#cb_grid-table");//cb_grid-table
   var cr = $cr.get(0);
   $cr.click(function () {
       if(cr.checked){
           alert("感谢使用!");
       }
       //$cr.is(":checked"))是jQuery中的方法,判断jQuery对象是否被选中
       if($cr.is(":checked")){
           alert("再次感谢!");
       }
   })
})*/
/*上一句的简写*/
$(function () {
    // 每页显示行数
    //var recordCount = parseInt(($(window).height() - 300) / 30);
    var parent_column = $("#grid-table").closest('[class*="col-"]');
    // 自适应页面大小
    $(window).on('resize.jqGrid', function () {
        $("#grid-table").jqGrid('setGridWidth', parent_column.width());
    })
    // 导航条或者页面大小重置时，自适应页面大小
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            setTimeout(function () {
                $("#grid-table").jqGrid('setGridWidth', parent_column.width());
            }, 20);
        }
    })
    // 行内编辑时使用///行号
    var lastRowId = 0;
    ///创建jqGrid
    $("#grid-table").jqGrid({
        caption: '省份信息',
        url: '/basicProvince/getRecord4Grid',///组件创建完成之后请求数据的url
        editurl: '/basicProvince/update4Grid',///定义对form编辑时的url
        datatype: "json",///从服务器端返回的数据类型，默认xml
        mtype: 'POST',///ajax提交方式。POST或者GET，默认GET
        colNames: ['', '操作', '省份编号', '省份编号', '省份名称', '省份简称', '省份拼音'],///列显示名称，是一个数组对象
        /// 列模型：：用于设定各列的参数
        colModel: [
            ///第1列::不是选项框 是一个隐藏的操作栏
            {
                name: 'acthidden',//name 列显示的名称
                index: '',//index 传到服务器端用来排序用的列名称
                width: 80,//width 列宽度(都隐藏了还设宽度干嘛)
                fixed: true,///列宽是否固定不可变
                search: false,///搜索模式下此列是否可定义为搜索列
                sortable: false,//sortable 是否可以排序
                resize: false,///是否可改变大小？？？
                formatter: 'actions',///对列进行格式化时的函数名或类型
                hidden: true,///初始化表格时是否隐藏此列
                //预定义的列格式化程序
                formatoptions: {
                    onSuccess: function (response) {
                        if (JSON.parse(response.responseText).success) {
                            alert(response.responseText);
                            //$.aceAlert('数据处理成功！', 'success');
                        } else {
                            //$.aceAlert('数据处理失败！', 'error');
                        }
                        alert("你进入了onSuccess函数");
                        //trigger:触发被选元素的指定事件
                        $("#grid-table").trigger("reloadGrid");//触发重载页面事件
                    },
                    keys: true,///设置为true时，我们可以使用[Enter]键来保存该行[Esc]键取消编辑。
                    ///翻译:::行图标删除事件
                    delOptions: {
                        url: '/basicProvince/delete4Grid',
                        recreateForm: true,///翻译:::退出
                        ///回调函数
                        beforeShowForm: beforeDeleteCallback,
                        afterComplete: callback///change
                    }
                }
            },
            ///第2列::操作
            {
                name: 'act', index: '', width: 80, fixed: true, search: false, sortable: false, resize: false
            },
            ///第3列id(未知列)
            {
                name: 'id',
                index: 'Id',
                width: '',
                sorttype: 'int',
                fixed: true,
                sortable: false,
                editable: true,
                key: true,
                hidden: true
            },
            ///第4列 省份编号
            {
                name: 'provinceCode',
                index: 'ProvinceCode',
                width: 150,
                fixed: true,
                sortable: false,
                editable: true,
                align: 'center',//align 对齐方式
                editrules: {required: true}
            },
            ///第5列 省份名称
            {
                name: 'provinceName',
                index: 'ProvinceName',
                width: 120,
                fixed: true,
                sortable: false,
                editable: true,
                align: 'center',
                editrules: {required: true},
            },
            ///第6列 省份简称
            {
                name: 'provinceAbbreviation',
                index: 'ProvinceAbbreviation',
                fixed: true,
                width: 150,
                sortable: false,
                editable: true,
                align: 'center',
                editrules: {edithidden: true}
            },
            ///第7列 省份拼音
            {
                name: 'provinceLetter',
                index: 'ProvinceLetter',
                width: 150,
                fixed: true,
                sortable: false,
                editable: true,
                align: 'center',
                editrules: {edithidden: true}
            },
        ],
        autowidth: true,///如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
        shrinktofit: true,
        rowNum: 15,///在grid上显示记录条数，这个参数是要被传递到后台
        rowList: [5, 10, 15, 20, 30, 40, 50, 100],///一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
        ///prmNames是jqGrid的一个重要选项，用于设置jqGrid将要向Server传递的参数名称。
        prmNames: {page: "page"/*请求页*/, rows: "rows"/*请求行*/, search: "search"/*是否是搜索请求*/}, // 请求参数  ///向后台传递的参数名称
        sortable: true,
        sortname: 'id',      // 默认根据某字段自动排序///默认的排序列。可以是列名称或者是一个数字，这个参数会被提交到后台
        sortorder: 'desc',
        editable: true,      // 行内可编辑
        viewrecords: true,   // 显示几条记录///定义是否要显示总记录数
        multiselect: true,   // 多选
        multiboxonly: true,  // 单击只选一条
        autowidth: true,
        altRows: true,///设置表格 zebra-striped 值
        height: '100%',
        shrinkToFit: true,
        rownumbers: true,     // 序号
        pager: '#grid-pager',//定义翻页用的导航栏，必须是有效的html元素。翻页工具栏可以放置在html页面任意位置
        toolbar: [true, "top"],
        ///描述json 数据格式的数组  定义jsonReader来跟服务器端返回的数据做对应
        jsonReader: {
            root: "jsonArray",      // json中代表实际模型数据的入口
            page: "currentPage",    // json中代表当前页码的数据       ///当前页
            total: "totalPage",     // json中代表页码总数的数据       ///总页数
            records: "totalRecord", // json中代表数据行总数的数据      ///查询出的记录数
            repeatitems: false,            // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。
            id: "0"///行id
        },
        ///当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
        gridComplete: function () {
            // 表头居中
            $("#jqgh_grid-table_cb").css("text-align", "center");
            $(".ui-jqgrid-sortable").css("text-align", "center");
            // 操作行
            var ids = $("#grid-table").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var rowId = ids[i];
                var rowData = $("#grid-table").jqGrid("getRowData", rowId);
                $.changeAct(ids[i]);
            }
        },
        // 行内双击事件       ///双击行时触发。rowid：当前行id；iRow：当前行索引位置；iCol：当前单元格位置索引；e:event对象
        ondblClickRow: function (id) {
            if (id) {
                if (id != lastRowId)
                    $.changeAct(lastRowId);
                $.editRowOpt(id);
                lastRowId = id;
            }
        },
        //单击事件          ///当选择行时触发此事件。rowid：当前行id；status：选择状态，当multiselect 为true时此参数才可用
        onSelectRow: function (id) {
            if (id != lastRowId)
                $.changeAct(lastRowId);
        },
        ///当从服务器返回响应时执行，xhr：XMLHttpRequest 对象
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        }
    });
    //触发jqGrid随窗口大小变化自适应大小事件
    $(window).triggerHandler('resize.jqGrid');
    // 工具条操作按钮配置
    $("#grid-table").jqGrid('navGrid', '#grid-pager',
        ///工具条属性
        {
            edit: true,
            edittext: "编辑",
            editicon: 'ace-icon fa fa-pencil blue',
            add: true,
            addicon: 'ace-icon fa fa-plus-circle purple',
            del: true,
            deltext: "工具条删除",
            delicon: 'ace-icon fa fa-trash-o red',
            search: true,
            searchtext: "查找",
            searchicon: 'ace-icon fa fa-search orange',
            refresh: true,
            refreshtext: "刷新",
            refreshicon: 'ace-icon fa fa-refresh green',
            view: true,
            viewicon: 'ace-icon fa fa-search-plus grey',
        },
        // 工具条编辑功能
        {
            url: '/basicProvince/update4Grid',
            closeAfterEdit: true,
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            },
            afterComplete: function (response) {
                if (JSON.parse(response.responseText).success) {
                    parent.$.aceAlert('数据处理成功！', 'success');
                } else {
                    parent.$.aceAlert('数据处理失败！', 'error');
                }
            },
        },
        // 工具条新增功能
        {
            url: '/basicProvince/insert4Grid',
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            },
            afterComplete: function (response) {
                ///解析
                if (JSON.parse(response.responseText).success) {
                    parent.$.aceAlert('数据处理成功！', 'success');
                } else {
                    parent.$.aceAlert('数据处理失败！', 'error');
                }
            }
        },
        // 工具条删除功能
        {
            url: '/basicProvince/delete4Grid',
            recreateForm: true,///每次操作是否创建新的表单
            beforeShowForm: beforeDeleteCallback,///change
            afterComplete: callback///change
        },
        // 工具条搜索功能
        {
            recreateForm: true,
            afterShowSearch: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                style_search_form(form);
            },
            afterRedraw: function () {
                style_search_filters($(this));
            },
            multipleSearch: true,
            showQuery: false,
            multipleGroup: true,
            onSearch: function () {
                var $filter = $("#" + $.jgrid.jqID("fbox_" + this.id)),
                    queryData = $filter.jqFilter('toSQLString');
                queryData = queryData.replace(/\"/g, "'");
                // 获取SQL查询语句
                // /当执行搜索时会用查询数据填充???postData 此数组内容直接赋值到url上(参数???)
                $("#grid-table").jqGrid("setGridParam", {postData: {queryData: queryData}});
            }
        }, {}
    );
    // 退出行内编辑模式样式
    $.changeAct = function (rowId) {
        var edit = "<div style='margin-left:8px;' id='editModal_" + rowId + "'>" +
            "<div class='ui-pg-div ui-inline-edit' style='float:left;cursor:pointer;'" +
            "onclick='$.editModel(" + rowId + ")'> <span class='ui-icon ui-icon-pencil'></span></div>";
        var del = "<div class='ui-pg-div ui-inline-del' style='float:left;' " +
            "onclick='$.deleteType(" + rowId + ")'><span class='ui-icon ui-icon-trash'></span></div>";
        /// setRowData:更新行的值
        /// rowid为行id。
        /// data值格式：{name1:value1,name2: value2…} name为colModel中名称
        /// cssprop：如果是string则会使用addClass方法将其加入到行的css中，如果是array或者对象则会直接加到style属性中
        $("#grid-table").jqGrid('setRowData', rowId, {act: edit + del});///第二列的act事件方法变化
    }

    // 工具条编辑功能对话框样式
    function style_edit_form(form) {
        // 设置列元素
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();
        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
        buttons = form.next().find('.navButton a');
        buttons.find('.ui-icon').hide();
        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
    }

    // 工具条搜索功能
    function style_search_form(form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable')
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
    }

    // 工具条搜索过滤功能
    function style_search_filters(form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-xs btn-primary');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }

    // 自定义 工具条删除操作
    function style_delete_form(form) {
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
    }

    // 行内删除操作对话框样式
    function beforeDeleteCallback(e) {
        var form = $(e[0]);
        if (form.data('styled')) return false;
        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
        style_delete_form(form);
        form.data('styled', true);
    }

    //通用简易回调响应方法
    function callback(response) {
        //与Json对应上(responseText就是Json)
        if (JSON.parse(response.responseText).isSuccess) {
            //parent.$.aceAlert('数据处理成功！', 'success');
            alert("操作成功!");
        } else {
            //parent.$.aceAlert('数据处理失败！', 'error');
            alert("操作失败!");
        }
    }

    // 工具条样式
    function updatePagerIcons(table) {
        var replacement =
            {
                'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
                'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
                'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
                'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
            };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }

    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({container: 'body'});
        $(table).find('.ui-pg-div').tooltip({container: 'body'});
    }

    // 行内添加
    var rowAddParameters = {
        addtitle: "行内添加",
        addtext: "添加",
        savetitle: "保存",
        canceltitle: "取消",
        edit: false,
        editicon: "ui-icon-pencil",
        add: true,
        addicon: "ace-icon fa fa-plus-circle purple",
        save: false,
        saveicon: "ace-icon fa fa-check",
        cancel: false,
        cancelicon: "ace-icon fa fa-remove",
        addParams: {
            //新建rowID
            rowID: "new_row",
            position: "last", // 第一行///最后一行
            useDefValues: false,
            useFormatter: false,
            addRowParams: {
                oneditfunc: function (rowId) {
                    //主要用于当有行编辑时点击添加 行编辑模式不退出的BUG
                    $.cancelRowChange(lastRowId);
                    // 触发编辑变成保存和取消操作
                    var save = "<div style='margin-left:8px;' id='saveRowChange_" + rowId + "'>" +
                        "<div class='ui-pg-div ui-inline-save' onclick=\"$.saveRowAdd('" + rowId + "')\" " +
                        "style='float:left;cursor:pointer;'><span class='ui-icon ui-icon-disk'></span></div>";
                    var canl = "<div class='ui-pg-div ui-inline-cancel' style='float:left;' " +
                        "onclick=\"$.cancelRowChange('" + rowId +
                        "')\"><span class='ui-icon ui-icon-cancel'></span></div></div>";
                    $("#grid-table").jqGrid('setRowData', rowId, {
                        act: save + canl
                    });
                },
                restoreAfterError: true,
            }
        }
    }

    /// navGrid:功能按钮(增删改查,搜,刷新)设置
    ///$("#crud").jqGrid('navGrid', '#pcrud', {});
    /*jQuery("#list2").jqGrid('navGrid', '#pager2', {edit: true, add: true, del: true}, {
        //edit-------------这里注意 edit ,add ,del 的顺序，默认的这个顺序，好像是不能改的
        // afterShowForm:afterShowEdit,
        afterSubmit: processAddEdit,
        //beforeSubmit:validateData,
        closeAfterAdd: true,
        closeAfterEdit: true,
        reloadAfterSubmit: true
    }, {//add
        // afterShowForm:afterShowAdd,
        afterSubmit: processAddEdit,
        //beforeSubmit:validateData,
        closeAfterAdd: true,
        closeAfterEdit: true
    }, {//del
    })*/
    $("#grid-table").jqGrid('inlineNav', '#grid-pager', rowAddParameters);
    /// p68向每个元素内部追加内容
    //$("#t_grid-table").append(rowAddParameters);
    //$('#grid-pager').insertBefore('#t_grid-table');
    ///／复制匹配的DOM元素以及其所有的事件处理 并将其插入到另一个指定的元素集合的前面
    $('#grid-table_pager_left').clone(true).insertBefore('#grid-table_toppager_center')
    //使用这个方法时需要把导航条中的add按钮开启***
    var td1 = $("#add_grid-table"),
        td2 = $("#grid-table_iladd"),
        tempTd = $('<td />').insertBefore(td1); // 临时站位
    // 把td1移到td2前面
    td1.insertBefore(td2);
    // 把td2移到tempTd前面
    td2.insertBefore(tempTd);
    // 移除临时站位
    tempTd.remove();

    //模态框添加隐藏
    $("#add_grid-table").hide();
    // 行内添加保存
    $.saveRowAdd = function (rowId) { // rowId为"new_row",
        var reData = $("#grid-table").serialize();
        $('#grid-table').jqGrid("saveRow", rowId, {
            url: "/basicProvince/insert4Grid",
            mtype: "POST",
            data: reData,
            restoreAfterError: false,
            successfunc: function (response) {
                if (JSON.parse(response.responseText).success) {
                    parent.$.aceAlert('数据处理成功！', 'success');
                    $("#grid-table").trigger("reloadGrid");//处理成功重载页面 多此一句
                } else {
                    parent.$.aceAlert('数据处理失败！', 'error');
                }
            },
        });
    }
    // 行内编辑模态框
    $.editModel = function (rowid) {
        $("#" + rowid + "").click();
        $("#edit_grid-table").trigger("click");//触发表格单击事件?
    }
    // 双击开启行内编辑
    $.editRowOpt = function (rowId) {
        var optButton = {
            oneditfunc: function (rowId) { //在行成功转为编辑模式下触发的事件，参数为此行数据id
                var save = "<div style='margin-left:8px;' id='saveRowChange_" + rowId + "'><div class='ui-pg-div ui-inline-save' onclick='$.saveRowChanges(" + rowId + ")'" +
                    "style='float:left;cursor:pointer;'><span class='ui-icon ui-icon-disk'></span></div>";
                var canl = "<div class='ui-pg-div ui-inline-cancel' style='float:left;' onclick='$.cancelRowChange(" + rowId +
                    ")'><span class='ui-icon ui-icon-cancel'></span></div></div>";
                $("#grid-table").jqGrid('setRowData', rowId, {
                    act: save + canl
                });
            }
        }
        $("#grid-table").editRow(rowId, optButton);//开启可编辑模式
        $('#grid-table').jqGrid('editRow', rowId, true, function (rowid) {
            window.rowid = rowid;
        });//开启可编辑模式
    }
    // 保存
    $.saveRowChanges = function (rowId) {
        var parameter = {
            url: "/Type/UpdateType", //代替jqgrid中的editurl
            mtype: "POST",
            restoreAfterError: false,
            successfunc: function (response) { //在成功请求后触发;事件参数为XHR对象，需要返回true/false;
                if (JSON.parse(response.responseText).success) {
                    parent.$.aceAlert('数据处理成功！', 'success');
                    $("#grid-table").trigger("reloadGrid");
                    $.changeAct(rowId);
                } else {
                    parent.$.aceAlert('数据处理失败！', 'error');
                }
            }//end successfunc
        }//end paramenter
        $('#grid-table').saveRow(rowId, parameter);
    }
    // 取消编辑
    $.cancelRowChange = function (rowId) {
        $('#grid-table').restoreRow(rowId);
        $.changeAct(rowId);
    }
    // 删除触发
    $.deleteType = function (rowid) {
        alert("deleteType");
        $("#jDeleteButton_" + rowid + "").trigger("click");
    }
});