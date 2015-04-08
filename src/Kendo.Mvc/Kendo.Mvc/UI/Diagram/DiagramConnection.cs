namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnection : JsonObject
    {
        public DiagramConnection()
        {
            //>> Initialization
        
            Content = new DiagramConnectionContentSettings();
                
            Editable = new DiagramConnectionEditableSettings();
                
            EndCap = new DiagramConnectionEndCapSettings();
                
            From = new DiagramConnectionFromSettings();
                
            Hover = new DiagramConnectionHoverSettings();
                
            Points = new List<DiagramConnectionPoint>();
                
            Selection = new DiagramConnectionSelectionSettings();
                
            StartCap = new DiagramConnectionStartCapSettings();
                
            Stroke = new DiagramConnectionStrokeSettings();
                
            To = new DiagramConnectionToSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramConnectionContentSettings Content
        {
            get;
            set;
        }
        
        public DiagramConnectionEditableSettings Editable
        {
            get;
            set;
        }
        
        public DiagramConnectionEndCapSettings EndCap
        {
            get;
            set;
        }
        
        public DiagramConnectionFromSettings From
        {
            get;
            set;
        }
        
        public DiagramConnectionHoverSettings Hover
        {
            get;
            set;
        }
        
        public List<DiagramConnectionPoint> Points
        {
            get;
            set;
        }
        
        public DiagramConnectionSelectionSettings Selection
        {
            get;
            set;
        }
        
        public DiagramConnectionStartCapSettings StartCap
        {
            get;
            set;
        }
        
        public DiagramConnectionStrokeSettings Stroke
        {
            get;
            set;
        }
        
        public DiagramConnectionToSettings To
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var content = Content.ToJson();
            if (content.Any())
            {
                json["content"] = content;
            }
            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            } else if (Editable.Enabled != true) {
                json["editable"] = Editable.Enabled;
            }

            var endCap = EndCap.ToJson();
            if (endCap.Any())
            {
                json["endCap"] = endCap;
            }
            var from = From.ToJson();
            if (from.Any())
            {
                json["from"] = from;
            }
            var hover = Hover.ToJson();
            if (hover.Any())
            {
                json["hover"] = hover;
            }
            var points = Points.ToJson();
            if (points.Any())
            {
                json["points"] = points;
            }
            var selection = Selection.ToJson();
            if (selection.Any())
            {
                json["selection"] = selection;
            }
            var startCap = StartCap.ToJson();
            if (startCap.Any())
            {
                json["startCap"] = startCap;
            }
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
            var to = To.ToJson();
            if (to.Any())
            {
                json["to"] = to;
            }
        //<< Serialization
        }
    }
}
