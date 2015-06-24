namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeDefaultsEditableSettings : JsonObject
    {
        public DiagramShapeDefaultsEditableSettings()
        {
            Enabled = true;
            //>> Initialization
        
            Tools = new List<DiagramShapeDefaultsEditableSettingsTool>();
                
        //<< Initialization
        }

        //>> Fields
        
        public bool? Connect { get; set; }
        
        public bool? Drag { get; set; }
        
        public bool? Remove { get; set; }
        
        public List<DiagramShapeDefaultsEditableSettingsTool> Tools
        {
            get;
            set;
        }
        
        //<< Fields

        public bool Enabled { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Enabled)
            {
                //>> Serialization
        
            if (Connect.HasValue)
            {
                json["connect"] = Connect;
            }
                
            if (Drag.HasValue)
            {
                json["drag"] = Drag;
            }
                
            if (Remove.HasValue)
            {
                json["remove"] = Remove;
            }
                
            var tools = Tools.ToJson();
            if (tools.Any())
            {
                json["tools"] = tools;
            }
        //<< Serialization
            }
        }
    }
}
