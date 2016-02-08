namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListColumnFilterableSettings : JsonObject
    {
        public TreeListColumnFilterableSettings()
        {
            Enabled = true;

            Ui = new ClientHandlerDescriptor();
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public ClientHandlerDescriptor Ui { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Ui.HasValue())
            {
                json["ui"] = Ui;
            }
            
        //<< Serialization
        }
    }
}
