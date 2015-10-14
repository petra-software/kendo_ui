namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System.Text.RegularExpressions;
    using System.Web.Mvc.Html;

    public class TreeList<T> : WidgetBase where T : class
    {
        public IUrlGenerator urlGenerator;

        public TreeList(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            DataSource = new DataSource()
            {
                Type = DataSourceType.Ajax,
                ServerAggregates = true,
                ServerFiltering = true,
                ServerPaging = true,
                ServerSorting = true,
                ServerGrouping = true
            };
            DataSource.Schema.Model = new TreeListModelDescriptor(typeof(T));

            //>> Initialization
        
            ColumnMenu = new TreeListColumnMenuSettings();
                
            Columns = new List<TreeListColumn>();
                
            Editable = new TreeListEditableSettings<T>();
                
            Excel = new TreeListExcelSettings();
                
            Filterable = new TreeListFilterableSettings();
                
            Messages = new TreeListMessagesSettings();
                
            Pdf = new TreeListPdfSettings();
                
            Sortable = new TreeListSortableSettings();
                
            Toolbar = new List<TreeListToolbar>();
                
        //<< Initialization
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        //>> Fields
        
        public bool? AutoBind { get; set; }
        
        public List<TreeListColumn> Columns
        {
            get;
            set;
        }
        
        public bool? Resizable { get; set; }
        
        public bool? Reorderable { get; set; }
        
        public TreeListColumnMenuSettings ColumnMenu
        {
            get;
            set;
        }
        
        public TreeListEditableSettings<T> Editable
        {
            get;
            set;
        }
        
        public TreeListExcelSettings Excel
        {
            get;
            set;
        }
        
        public TreeListFilterableSettings Filterable
        {
            get;
            set;
        }
        
        public double? Height { get; set; }
        
        public TreeListMessagesSettings Messages
        {
            get;
            set;
        }
        
        public TreeListPdfSettings Pdf
        {
            get;
            set;
        }
        
        public bool? Scrollable { get; set; }
        
        public bool? Selectable { get; set; }
        
        public TreeListSortableSettings Sortable
        {
            get;
            set;
        }
        
        public List<TreeListToolbar> Toolbar
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            json["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

            Editable.InitializeEditor(ViewContext, ViewData);

            //>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            var columns = Columns.ToJson();
            if (columns.Any())
            {
                json["columns"] = columns;
            }
            if (Resizable.HasValue)
            {
                json["resizable"] = Resizable;
            }
                
            if (Reorderable.HasValue)
            {
                json["reorderable"] = Reorderable;
            }
                
            var columnMenu = ColumnMenu.ToJson();
            if (columnMenu.Any())
            {
                json["columnMenu"] = columnMenu;
            } else if (ColumnMenu.Enabled != false) {
                json["columnMenu"] = ColumnMenu.Enabled;
            }

            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            } else if (Editable.Enabled != false) {
                json["editable"] = Editable.Enabled;
            }

            var excel = Excel.ToJson();
            if (excel.Any())
            {
                json["excel"] = excel;
            }
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            var messages = Messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }
            var pdf = Pdf.ToJson();
            if (pdf.Any())
            {
                json["pdf"] = pdf;
            }
            if (Scrollable.HasValue)
            {
                json["scrollable"] = Scrollable;
            }
                
            if (Selectable.HasValue)
            {
                json["selectable"] = Selectable;
            }
                
            var sortable = Sortable.ToJson();
            if (sortable.Any())
            {
                json["sortable"] = sortable;
            } else if (Sortable.Enabled != false) {
                json["sortable"] = Sortable.Enabled;
            }

            var toolbar = Toolbar.ToJson();
            if (toolbar.Any())
            {
                json["toolbar"] = toolbar;
            }
        //<< Serialization

            var filterable = Filterable.ToJson();
            if (Filterable.Enabled)
            {
                if (filterable.Any())
                {
                    json["filterable"] = filterable;
                }
                else
                {
                    json["filterable"] = Filterable.Enabled;
                }
            }            

            writer.Write(Initializer.Initialize(Selector, "TreeList", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (Editable.Enabled)
            {
                InitializeEditors();
            }

            var html = new TreeListHtmlBuilder<T>(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }

        private HtmlHelper<T> CreateHtmlHelper(object model)
        {
            return new HtmlHelper<T>(ViewContext, new GridViewDataContainer<T>((T)model, ViewContext.ViewData));
        }

        private void InitializeEditors()
        {
            var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);

            var dataItem = Editable.DefaultDataItem();

            var htmlHelper = CreateHtmlHelper(dataItem);

            if (Editable.Enabled && Editable.Mode != "popup")
            {
                Columns.Each(column =>
                {
                    if (!column.Field.HasValue())
                    {
                        return;
                    }

                    var editorHtml = htmlHelper.Editor(column.Field).ToHtmlString();

                    if (IsInClientTemplate)
                    {
                        editorHtml = popupSlashes.Replace(editorHtml, match =>
                        {
                            return match.Groups[0].Value.Replace("\\", "\\\\");
                        });

                        editorHtml = editorHtml.Trim()
                            .EscapeHtmlEntities()
                            .Replace("\r\n", string.Empty)
                            .Replace("</script>", "<\\/script>")
                            .Replace("jQuery(\"#", "jQuery(\"\\#");
                    }

                    column.Editor = editorHtml;
                });
            }
        }
    }
}

