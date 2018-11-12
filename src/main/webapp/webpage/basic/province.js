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
            setTimeout(function () { $("#grid-table").jqGrid('setGridWidth', parent_column.width()); }, 20);
        }
    })
    // 行内编辑时使用
    var lastRowId = 0;
    $("#grid-table").jqGrid({
        caption: '省份信息',
        url: '/basicProvince/getRecord4Grid',
        editurl: '/basicProvince/update4Grid',
        datatype: "json",
        mtype: 'POST',
        colNames: ['','操作', '省份编号', '省份编号', '省份名称', '省份简称', '省份拼音'],
        colModel: [
            {
                name: 'acthidden', index: '', width: 80, fixed: true, search: false, sortable: false, resize: false, formatter: 'actions', hidden: true,
                formatoptions: {
                    onSuccess: function (response) {
                        if (JSON.parse(response.responseText).success) {
                            alert(response.responseText);
                            //$.aceAlert('数据处理成功！', 'success');
                        } else {
                            //$.aceAlert('数据处理失败！', 'error');
                        }
                        $("#grid-table").trigger("reloadGrid");
                    },
                    keys: true,
                    delOptions: {
                        url: '/basicProvince/delete4Grid',
                        recreateForm: true,
                        beforeShowForm: beforeDeleteCallback,
                        afterComplete: function (response) {
                            if (JSON.parse(response.responseText).success) {
                                //$.aceAlert('数据处理成功！', 'success');
                            } else {
                                //$.aceAlert('数据处理失败！', 'error');
                            }
                        }
                    }
                }
            },
            { name: 'act', index: '', width: 80, fixed: true, search: false, sortable: false, resize: false},
            { name: 'id', index: 'Id', width: '', sorttype: 'int', fixed: true, sortable: false, editable: true, key: true, hidden: true },
            { name: 'provinceCode', index: 'ProvinceCode', width: 150, fixed: true, sortable: false, editable: true, align: 'center', editrules: { required: true } },
            { name: 'provinceName', index: 'ProvinceName', width: 120, fixed: true, sortable: false, editable: true, align: 'center', editrules: { required: true }, },
            { name: 'provinceAbbreviation', index: 'ProvinceAbbreviation', fixed: true, width: 150, sortable: false, editable: true, align: 'center', editrules: { edithidden: true } },
            { name: 'provinceLetter', index: 'ProvinceLetter', width: 150, fixed: true, sortable: false, editable: true, align: 'center', editrules: { edithidden: true } },
        ],
        autowidth: true,
        shrinktofit: true,
        rowNum: 15,
        rowList: [5, 10, 15, 20, 30, 40, 50, 100],
        prmNames: { page: "page", rows: "rows", search: "search" }, // 请求参数
        sortable: true,
        sortname: 'id',      // 默认根据某字段自动排序
        sortorder: 'desc',
        editable: true,      // 行内可编辑
        viewrecords: true,   // 显示几条记录
        multiselect: true,   // 多选
        multiboxonly: true,  // 单击只选一条
        autowidth: true,
        altRows: true,
        height: '100%',
        shrinkToFit: true,
        rownumbers: true,     // 序号
        pager: '#grid-pager',
        toolbar: [true, "top"],
        jsonReader: {
            root: "jsonArray",      // json中代表实际模型数据的入口
            page: "currentPage",    // json中代表当前页码的数据
            total: "totalPage",     // json中代表页码总数的数据
            records: "totalRecord", // json中代表数据行总数的数据
            repeatitems: false,            // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。
            id: "0"
        },
        gridComplete: function () {
            // 表头居中
            $("#jqgh_grid-table_cb").css("text-align", "center");
            $(".ui-jqgrid-sortable").css("text-align", "center");
            // 操作行
            var ids = $("#grid-table").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var rowData = $("#grid-table").jqGrid("getRowData", id);
                var edit = "<div style='margin-left:8px' id='editModal_" + id + "'><div class='ui-pg-div ui-inline-edit' onclick='$.editModel(" + id + ")'" +
                    "style='float:left;cursor:pointer;'><span class='ui-icon ui-icon-pencil'></span></div>";
                var del = "<div class='ui-pg-div ui-inline-del' style='float:left;' onclick='$.deleteType(" + id +
                    ")'><span class='ui-icon ui-icon-trash'></span></div></div>";
                $("#grid-table").jqGrid('setRowData', ids[i],
                    {
                        act: edit + del
                    });
            }
        },
        // 行内双击事件
        ondblClickRow: function (id) {
            if (id) {
                if (id != lastRowId)
                    $.changeAct(lastRowId);
                $.editRowOpt(id);
                lastRowId = id;
            }
        },
        //单击事件
        onSelectRow: function (id) {
            if (id != lastRowId)
                $.changeAct(lastRowId);
        },
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        }
    });
    $(window).triggerHandler('resize.jqGrid');
    // 工具条操作按钮配置
    $("#grid-table").jqGrid('navGrid', '#grid-pager', {
        edit: true,
        edittext: "编辑",
        editicon: 'ace-icon fa fa-pencil blue',
        add: true,
        addicon: 'ace-icon fa fa-plus-circle purple',
        del: true,
        deltext: "my删除",
        delicon: 'ace-icon fa fa-trash-o red',
        search: true,
        searchtext: "查找",
        searchicon: 'ace-icon fa fa-search orange',
        refresh: true,
        refreshtext: "刷新",
        refreshicon: 'ace-icon fa fa-refresh green',
        view: true,
        viewicon: 'ace-icon fa fa-search-plus grey',
    }, {
        // 工具条编辑功能
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
    }, {
        // 工具条新增功能
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
            if (JSON.parse(response.responseText).success) {
                parent.$.aceAlert('数据处理成功！', 'success');
            } else {
                parent.$.aceAlert('数据处理失败！', 'error');
            }
        }
    }, {
        // 工具条删除功能
        url: '/basicProvince/delete4Grid',
        recreateForm: true,
        beforeShowForm: function (e) {
            var form = $(e[0]);
            if (form.data('styled')) return false;
            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            style_delete_form(form);
            form.data('styled', true);
        },
        afterComplete: function (response) {
            if (JSON.parse(response.responseText).success) {
                parent.$.aceAlert('数据处理成功！', 'success');
            } else {
                parent.$.aceAlert('数据处理失败！', 'error');
            }
        }
    }, {
        // 工具条搜索功能
        recreateForm: true,
        afterShowSearch: function(e){
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            style_search_form(form);
        },
        afterRedraw: function(){
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
            $("#grid-table").jqGrid("setGridParam", { postData: { queryData: queryData } });
        }
    }, {})
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
    // 工具条删除操作
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
        $('.navtable .ui-pg-button').tooltip({ container: 'body' });
        $(table).find('.ui-pg-div').tooltip({ container: 'body' });
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
            position: "first", // 第一行
            useDefValues: false,
            useFormatter: false,
            addRowParams: {
                oneditfunc: function (rowId) {
                    //主要用于当有行编辑时点击添加 行编辑模式不退出的BUG
                    $.cancelRowChange(lastRowId);
                    // 触发编辑变成保存和取消操作
                    var save = "<div style='margin-left:8px;' id='saveRowChange_" + rowId + "'><div class='ui-pg-div ui-inline-save' onclick=\"$.saveRowAdd('" + rowId + "')\" " +
                        "style='float:left;cursor:pointer;'><span class='ui-icon ui-icon-disk'></span></div>";
                    var canl = "<div class='ui-pg-div ui-inline-cancel' style='float:left;' onclick=\"$.cancelRowChange('" + rowId +
                        "')\"><span class='ui-icon ui-icon-cancel'></span></div></div>";
                    $("#grid-table").jqGrid('setRowData', rowId, {
                        act: save+ canl
                    });
                },
                restoreAfterError: true,
            }
        }
    }
    $("#grid-table").jqGrid('inlineNav', '#grid-pager', rowAddParameters);
    //$("#t_grid-table").append(rowAddParameters);
    //$('#grid-pager').insertBefore('#t_grid-table');
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
        $('#grid-table').jqGrid("saveRow", rowId, {
            url: "/Type/CreateType",
            mtype: "POST",
            restoreAfterError: false,
            successfunc: function (response) {
                if (JSON.parse(response.responseText).success) {
                    parent.$.aceAlert('数据处理成功！', 'success');
                    $("#grid-table").trigger("reloadGrid");
                } else {
                    parent.$.aceAlert('数据处理失败！', 'error');
                }
            },
        });
    }
    // 行内编辑模态框
    $.editModel = function (rowid) {
        $("#" + rowid + "").click();
        $("#edit_grid-table").trigger("click");
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
    // 退出行内编辑模式样式
    $.changeAct = function (rowId) {
        var edit = "<div style='margin-left:8px;' id='editModal_" + rowId + "'><div class='ui-pg-div ui-inline-edit' onclick='$.editModel(" + rowId + ")'" +
            "style='float:left;cursor:pointer;'><span class='ui-icon ui-icon-pencil'></span></div>";
        var del = "<div class='ui-pg-div ui-inline-del' style='float:left;' onclick='$.deleteTemplate(" + rowId +
            ")'><span class='ui-icon ui-icon-trash'></span></div></div>";
        $("#grid-table").jqGrid('setRowData', rowId, {
            act: edit + del
        });
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
        $("#jDeleteButton_" + rowid + "").trigger("click");
    }
});
