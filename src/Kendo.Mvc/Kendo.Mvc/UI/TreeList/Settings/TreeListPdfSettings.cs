namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListPdfSettings : JsonObject
    {
        public TreeListPdfSettings()
        {
            //>> Initialization
        
            Margin = new TreeListPdfMarginSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public string Author { get; set; }
        
        public bool? AvoidLinks { get; set; }
        
        public string Creator { get; set; }
        
        public DateTime? Date { get; set; }
        
        public string FileName { get; set; }
        
        public bool? ForceProxy { get; set; }
        
        public string Keywords { get; set; }
        
        public bool? Landscape { get; set; }
        
        public TreeListPdfMarginSettings Margin
        {
            get;
            set;
        }
        
        public string PaperSize { get; set; }
        
        public string ProxyURL { get; set; }
        
        public string ProxyTarget { get; set; }
        
        public string Subject { get; set; }
        
        public string Title { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Author.HasValue())
            {
                json["author"] = Author;
            }
            
            if (AvoidLinks.HasValue)
            {
                json["avoidLinks"] = AvoidLinks;
            }
                
            if (Creator.HasValue())
            {
                json["creator"] = Creator;
            }
            
            if (Date.HasValue)
            {
                json["date"] = Date;
            }
                
            if (FileName.HasValue())
            {
                json["fileName"] = FileName;
            }
            
            if (ForceProxy.HasValue)
            {
                json["forceProxy"] = ForceProxy;
            }
                
            if (Keywords.HasValue())
            {
                json["keywords"] = Keywords;
            }
            
            if (Landscape.HasValue)
            {
                json["landscape"] = Landscape;
            }
                
            var margin = Margin.ToJson();
            if (margin.Any())
            {
                json["margin"] = margin;
            }
            if (PaperSize.HasValue())
            {
                json["paperSize"] = PaperSize;
            }
            
            if (ProxyURL.HasValue())
            {
                json["proxyURL"] = ProxyURL;
            }
            
            if (ProxyTarget.HasValue())
            {
                json["proxyTarget"] = ProxyTarget;
            }
            
            if (Subject.HasValue())
            {
                json["subject"] = Subject;
            }
            
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
        //<< Serialization
        }
    }
}
