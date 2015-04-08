namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionEditableSettingsToolMenuButton settings.
    /// </summary>
    public class DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramConnectionEditableSettingsToolMenuButton container;

        public DiagramConnectionEditableSettingsToolMenuButtonBuilder(DiagramConnectionEditableSettingsToolMenuButton settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the HTML attributes of a menu button.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> HtmlAttributes(object value)
        {
            return this.HtmlAttributes(value.ToDictionary());
        }
        
        /// <summary>
        /// Specifies the HTML attributes of a menu button.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> HtmlAttributes(IDictionary<string,object> value)
        {
            container.HtmlAttributes = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the menu button is initially enabled or disabled.
        /// </summary>
        /// <param name="value">The value that configures the enable.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> Enable(bool value)
        {
            container.Enable = value;

            return this;
        }
        
        /// <summary>
        /// Sets icon for the menu buttons. The icon should be one of the existing in the Kendo UI theme sprite.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the ID of the menu buttons.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// If set, the ToolBar will render an image with the specified URL in the menu button.
        /// </summary>
        /// <param name="value">The value that configures the imageurl.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> ImageUrl(string value)
        {
            container.ImageUrl = value;

            return this;
        }
        
        /// <summary>
        /// Defines a CSS class (or multiple classes separated by spaces) which will be used for menu button icon.
        /// </summary>
        /// <param name="value">The value that configures the spritecssclass.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> SpriteCssClass(string value)
        {
            container.SpriteCssClass = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the menu buttons.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the url of the menu button to navigate to.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public DiagramConnectionEditableSettingsToolMenuButtonBuilder<TShapeModel,TConnectionModel> Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        //<< Fields
    }
}

