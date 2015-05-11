namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListFilterableSettings : JsonObject
    {
        public TreeListFilterableSettings()
        {
            Enabled = false;
            Messages = new FilterableMessages();
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        public FilterableMessages Messages { get; private set; }

        //>> Fields
        
        public bool? Extra { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            var messages = Messages.ToJson();

            if (messages.Any())
            {
                json["messages"] = messages;
            }

            //>> Serialization
        
            if (Extra.HasValue)
            {
                json["extra"] = Extra;
            }
                
        //<< Serialization
        }
    }
}
