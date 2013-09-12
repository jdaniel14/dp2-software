Ext.define("MyApp.Toolbar", {
    extend : "Ext.Toolbar",

    gantt : null,

    initComponent : function () {
        var gantt = this.gantt;

        gantt.taskStore.on({
            'filter-set'   : function () {
                this.down('[iconCls=icon-collapseall]').disable()
                this.down('[iconCls=icon-expandall]').disable()
            },
            'filter-clear' : function () {
                this.down('[iconCls=icon-collapseall]').enable()
                this.down('[iconCls=icon-expandall]').enable()
            },
            scope          : this
        })

        Ext.apply(this, {
            items : [
                {
                    xtype   : 'buttongroup',
                    title   : 'View tools',
                    columns : 3,
                    items   : [
                        {
                            iconCls : 'icon-prev',
                            text    : 'Previous',
                            handler : function () {
                                gantt.shiftPrevious();
                            }
                        },
                        {
                            iconCls : 'icon-next',
                            text    : 'Next',
                            handler : function () {
                                gantt.shiftNext();
                            }
                        },
                        {
                            text    : 'Collapse all',
                            iconCls : 'icon-collapseall',
                            handler : function () {
                                gantt.collapseAll();
                            }
                        },
                        {
                            text     : 'View full screen',
                            iconCls  : 'icon-fullscreen',
                            disabled : !this._fullScreenFn,
                            handler  : function () {
                                this.showFullScreen();
                            },
                            scope    : this
                        },
                        {
                            text    : 'Zoom to fit',
                            iconCls : 'zoomfit',
                            handler : function () {
                                gantt.zoomToFit();
                            }
                        },
                        {
                            text    : 'Expand all',
                            iconCls : 'icon-expandall',
                            handler : function () {
                                gantt.expandAll();
                            }
                        }
                    ]},
                {
                    xtype   : 'buttongroup',
                    title   : 'View resolution',
                    columns : 2,
                    items   : [
                        {
                            text    : '6 weeks',
                            handler : function () {
                                gantt.switchViewPreset('weekAndMonth');
                            }
                        },
                        {
                            text    : '10 weeks',
                            handler : function () {
                                gantt.switchViewPreset('weekAndDayLetter');
                            }
                        },
                        {
                            text    : '1 year',
                            handler : function () {
                                gantt.switchViewPreset('monthAndYear');
                            }
                        },
                        {
                            text    : '5 years',
                            handler : function () {
                                var start = new Date(gantt.getStart().getFullYear(), 0);

                                gantt.switchViewPreset('monthAndYear', start, Ext.Date.add(start, Ext.Date.YEAR, 5));
                            }
                        }
                    ]},
                {
                    xtype    : 'buttongroup',
                    title    : 'Set percent complete',
                    columns  : 5,
                    defaults : { scale : "large", width : 40 },
                    items    : [
                        {
                            text    : '0%<div class="percent percent0"></div>',
                            scope   : this,
                            handler : function () {
                                this.applyPercentDone(0);
                            }
                        },
                        {
                            text    : '25%<div class="percent percent25"><div></div></div>',
                            scope   : this,
                            handler : function () {
                                this.applyPercentDone(25);
                            }
                        },
                        {
                            text    : '50%<div class="percent percent50"><div></div></div>',
                            scope   : this,
                            handler : function () {
                                this.applyPercentDone(50);
                            }
                        },
                        {
                            text    : '75%<div class="percent percent75"><div></div></div>',
                            scope   : this,
                            handler : function () {
                                this.applyPercentDone(75);
                            }
                        },
                        {
                            text    : '100%<div class="percent percent100"><div></div></div>',
                            scope   : this,
                            handler : function () {
                                this.applyPercentDone(100);
                            }
                        }
                    ]
                },
                '->',
                {
                    xtype   : 'buttongroup',
                    title   : 'Try some features...',
                    columns : 3,
                    items   : [
                        {
                            text         : 'Highlight critical path',
                            iconCls      : 'togglebutton',
                            enableToggle : true,
                            handler      : function (btn) {
                                var v = gantt.getSchedulingView();
                                if (btn.pressed) {
                                    v.highlightCriticalPaths(true);
                                } else {
                                    v.unhighlightCriticalPaths(true);
                                }
                            }
                        },
                        {
                            iconCls : 'action',
                            text    : 'Highlight tasks longer than 8 days',
                            handler : function (btn) {
                                gantt.taskStore.queryBy(function (task) {
                                    if (task.data.leaf && task.getDuration() > 8) {
                                        var el = gantt.getSchedulingView().getElementFromEventRecord(task);
                                        el && el.frame('lime');
                                    }
                                }, this);
                            }
                        },
                        {
                            iconCls      : 'togglebutton',
                            text         : 'Filter: Tasks with progress < 30%',
                            enableToggle : true,
                            toggleGroup  : 'filter',
                            handler      : function (btn) {
                                if (btn.pressed) {
                                    gantt.taskStore.filterTreeBy(function (task) {
                                        return task.get('PercentDone') < 30;
                                    });
                                } else {
                                    gantt.taskStore.clearTreeFilter();
                                }
                            }
                        },
                        {
                            iconCls      : 'togglebutton',
                            text         : 'Cascade changes',
                            enableToggle : true,
                            pressed      : gantt.cascadeChanges,
                            handler      : function (btn) {
                                gantt.setCascadeChanges(btn.pressed);
                            }
                        },
                        {
                            iconCls : 'action',
                            text    : 'Scroll to last task',
                            handler : function (btn) {
                                var latestEndDate = new Date(0),
                                    latest;
                                gantt.taskStore.getRootNode().cascadeBy(function (task) {
                                    if (task.get('EndDate') >= latestEndDate) {
                                        latestEndDate = task.get('EndDate');
                                        latest = task;
                                    }
                                });
                                gantt.getSchedulingView().scrollEventIntoView(latest, true);
                            }
                        },
                        {
                            xtype           : 'textfield',
                            emptyText       : 'Search for task...',
                            width           : 150,
                            enableKeyEvents : true,
                            listeners       : {
                                keyup      : {
                                    fn     : function (field, e) {
                                        var value = field.getValue();
                                        var regexp = new RegExp(Ext.String.escapeRegex(value), 'i')

                                        if (value) {
                                            gantt.taskStore.filterTreeBy(function (task) {
                                                return regexp.test(task.get('Name'))
                                            });
                                        } else {
                                            gantt.taskStore.clearTreeFilter();
                                        }
                                    },
                                    buffer : 300,
                                    scope  : this
                                },
                                specialkey : {
                                    fn : function (field, e) {
                                        if (e.getKey() === e.ESC) {
                                            field.reset();

                                            gantt.taskStore.clearTreeFilter();
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

    applyPercentDone : function (value) {
        this.gantt.getSelectionModel().selected.each(function (task) {
            task.setPercentDone(value);
        });
    },

    showFullScreen : function () {
        this.gantt.el.down('.x-panel-body').dom[this._fullScreenFn]();
    },

    // Experimental, not X-browser
    _fullScreenFn  : (function () {
        var docElm = document.documentElement;

        if (docElm.requestFullscreen) {
            return "requestFullscreen";
        }
        else if (docElm.mozRequestFullScreen) {
            return "mozRequestFullScreen";
        }
        else if (docElm.webkitRequestFullScreen) {
            return "webkitRequestFullScreen";
        }
    })()
})
;
